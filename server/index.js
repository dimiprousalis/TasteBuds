import express, { json } from "express";
import cors from 'cors';
import connectDB from './config/database.js';
import dotenv from 'dotenv';
import { userRouter } from './routes/auth.js';
import { recipeRouter } from './routes/recipes.js';
import multer, { memoryStorage } from "multer";
import { getUserPresignedUrls, uploadToS3 } from "./s3.js";
import sharp from 'sharp';

// .env config
dotenv.config({ path: './config/.env' });

connectDB()

const app = express();

// Middleware for parsing JSON and handling CORS
app.use(express.json());
app.use(cors());
// Use the defined routers for user and recipe routes
app.use("/", userRouter, recipeRouter);

//----------------------ADDED HERE------------------------------//

// Configure multer with memory storage
const storage = memoryStorage();
const upload = multer({ storage });

//--------------------------POST------------------------------//

// POST endpoint for uploading images to S3
app.post("/images", upload.single("image"), async (req, res) => {
  const { file } = req;
  const userId = req.headers["x-user-id"];
  const mimeType = req.file.mimetype

  // Check if required data is present
  if (!file || !userId) return res.status(400).json({ message: "Bad request" });

  //Resize image
  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer()

  const { error, key } = await uploadToS3({ fileBuffer, userId, mimeType });
  if (error) return res.status(500).json({ message: error.message });

  return res.status(201).json({ key });
});
//--------------------------GET------------------------------//

// GET endpoint for retrieving user-specific image URLs from S3
app.get("/images", async (req, res) => {
  const userId = req.headers["x-user-id"];
  // Check if user ID is present
  if (!userId) return res.status(400).json({ message: "Bad request" });

  // Get presigned URLs for user's images from S3
  const { error, presignedUrls } = await getUserPresignedUrls(userId);

  if (error) return res.status(400).json({ message: error.message });

  // Send the presigned URLs in the response
  return res.json(presignedUrls);
});

//--------------------------------------------------------//

app.listen(process.env.PORT || "3001", () => {
  console.log(`server is running on ${process.env.PORT}`);
});