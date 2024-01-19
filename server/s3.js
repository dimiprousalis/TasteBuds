import {
    GetObjectCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
import dotenv from 'dotenv';



// .env config
dotenv.config({ path: './config/.env' });

// Retrieve AWS S3 configuration from environment variables
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

// Create an instance of the S3 client
const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})

/*-------------------------- UPLOAD TO S3 -------------------------- */

export const uploadToS3 = async ({ file, userId }) => {
    // Generate a unique key for the file in S3
    const key = `${userId}/${uuid()}`;
    // Create a command to put the object in S3
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });
    try {
        // Send the put object command to S3
        await s3.send(command);
        return { key };
    } catch (error) {
        console.log(error);
        return { error };
    }
};

/*-------------------------- GET IMAGE KEYS -------------------------- */

const getImageKeysByUser = async (userId) => {
    // Create a command to list objects in the user's prefix in S3
    const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: userId,
    });
    // Send the list objects command to S3 and get the contents
    const { Contents = [] } = await s3.send(command);
    // Sort the contents by last modified date in descending order
    return Contents.sort(
        (a, b) => new Date(b.LastModified) - new Date(a.LastModified))
        .map((image) => image.Key)
};

/*-------------------------- GET PRESIGNED URLS -------------------------- */

// Function to get user-specific presigned URLs for images from S3
export const getUserPresignedUrls = async (userId) => {
    try {
        // Get image keys for the user from S3
        const imageKeys = await getImageKeysByUser(userId);
        // Generate presigned URLs for each image key
        const presignedUrls = await Promise.all(
            imageKeys.map((key) => {
                const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
                // Get a presigned URL for each image with an expiration time of 900 seconds (default)
                return getSignedUrl(s3, command, { expiresIn: 900 });
            })
        );
        return { presignedUrls };
    } catch (error) {
        console.log(error);
        return { error };
    }
};