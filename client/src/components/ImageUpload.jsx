import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import useMutation from '../hooks/useMutation';
import useQuery from '../hooks/useQuery';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';


// Styled component for hiding the file input
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

// Array of valid file types for file validation
const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png']

// API endpoint for fetching and uploading images
const URL = "/images"

// Component to display error text with Typography
const ErrorText = ({ children, ...props }) => (
    <Typography>
        {children}
    </Typography>
)

const ImageUpload = () => {

    /*-------------------------- STATE -------------------------- */
    // State for triggering refetch
    const [refetch, setRefetch] = useState(0);
    // State for handling and displaying errors
    const [error, setError] = useState('')

    /*-------------------------- HOOKS -------------------------- */
    // Mutation hook for uploading images
    const {
        mutate: uploadImage,
        isLoading: uploading,
        error: uploadError,
    } = useMutation({ url: URL })

    // Query hook for fetching images
    const {
        data: imageUrls = [],
        isLoading: imagesLoading,
        error: fetchError,
    } = useQuery(URL, refetch);

    /*-------------------------- HANDLER -------------------------- */
    // Event handler for handling file upload
    const handleUpload = async (e) => {
        const file = e.target.files[0]
        if (!validFileTypes.find(type => type === file.type)) {
            setError("File must be JPG/PNG/JPEG format")
            return
        }

        // Create FormData for the file
        const form = new FormData()
        form.append('image', file)

        //Wait a second after uploading image before calling refetch so the image has time to post
        await uploadImage(form);
        setTimeout(() => {
            setRefetch(s => s + 1);
        }, 1000);
    };

    return (
        <>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleUpload} />
            </Button>
            {error && <ErrorText>{error}</ErrorText>}
            {uploadError && <ErrorText>{uploadError}</ErrorText>}
            {imagesLoading && <CircularProgress />}
            {fetchError && (
                <Typography>
                    Failed to load images
                </Typography>
            )}
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                {imageUrls?.length > 0 &&
                    imageUrls.map(url => (
                        <img src={url} alt="user pic" key={url} width="200px" />
                    ))}
            </Grid>
        </>
    );
}

export default ImageUpload