import { useState } from 'react'
import axiosClient from '../config/axios'

// Custom hook for handling mutations 
const useMutation = ({ url, method = "POST" }) => {

    // State to manage loading state and error handling
    const [state, setState] = useState({
        isLoading: false,
        error: '',
    });

    const fn = async data => {
        // Set loading state to true when the mutation starts
        setState(prev => ({
            ...prev,
            isLoading: true,
        }))

        // Make an API request using axiosClient with provided URL, method, and data
        axiosClient({ url, method, data })
            .then(() => {
                // If successful, update state and display an alert
                setState({ isLoading: false, error: '' })
                alert("image uploaded")
            })
            .catch(error => {
                // If there's an error, update state with the error message
                setState({ isLoading: false, error: error.message })
            });
    };

    // Return an object with the mutation function (mutate) and the current state
    return (
        { mutate: fn, ...state }
    )
}

export default useMutation