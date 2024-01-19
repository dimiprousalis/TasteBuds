import { useEffect, useState } from 'react';
import axiosClient from '../config/axios';

// Custom hook for handling queries (e.g., fetching data from an API)
const useQuery = (url, refetch) => {
    // State to manage query result, loading state, and error handling
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        error: '',
    });

    // useEffect to handle side effects (e.g., fetching data) when URL or refetch changes
    useEffect(() => {
        // Function to fetch data from the API
        const fetch = async () => {
            axiosClient
                .get(url)
                .then(({ data }) => setState({ data, isLoading: false, error: '' }))
                .catch(error =>
                    setState({ data: null, isLoading: false, error: error.message })
                );
        };
        // Call the fetch function when the component mounts or when the URL or refetch changes
        fetch();
    }, [url, refetch]);

    return state;
};

export default useQuery;