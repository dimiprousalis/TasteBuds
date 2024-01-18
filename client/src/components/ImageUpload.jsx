import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';

// const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png']


//this is good code to use
// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// });


// const URL = "/images"

const ImageUpload = () => {

    //--------------------------------------

    axios.defaults.baseURL = "http://localhost:3001"

    const [file, setFile] = useState()

    const submit = async event => {
        console.log('on submit ' + file)
        event.preventDefault()
        const formData = new FormData();
        formData.append("image", file)
        await axios.post("/create/api/posts", formData, { headers: { 'Content-Type': 'multipart/form-data' } })

    }



    const fileSelected = event => {
        console.log('on changed ' + event.target.files[0])
        const file = event.target.files[0]
        setFile(file)
        // submit(event)
    }

    ///-----------------------------------
    // const { 
    //     mutate: uploadImage, 
    //     isLoading: uploading, 
    //     error: uploadError, 
    // } = useMutation({ url: URL })

    // const [error, setError] = useState('')
    // const handleUpload = async (e) => {
    //     const file = e.target.files[0]
    //     console.log(file)

    //     if (!validFileTypes.find(type => type === file.type)) {
    //         setError("File must be JPG/PNG format")
    //         return
    //     }

    //     const form = new FormData()
    //     form.append('image', file)

    //     await uploadImage(form)

    // }

    return (
        //this is good code to use
        // <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        //     Upload file
        //     <VisuallyHiddenInput type="file" onChange={fileSelected} />
        // </Button>
        <div>

            <form onSubmit={submit} >
                <input onChange={fileSelected} type="file" accept="image/*"></input>
                <button type="submit">Submit</button>
            </form>

        </div>

    );
}


export default ImageUpload