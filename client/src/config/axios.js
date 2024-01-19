import axios from 'axios';


const baseURL = process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://tastebuds-api.up.railway.app";

const USER_ID = 123;

const axiosClient = axios.create({
    baseURL,
    headers: {
        'x-user-id': USER_ID
    },
})

export default axiosClient
