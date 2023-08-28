import {
    Button,
    Box,
    Typography,
    useMediaQuery
} from "@mui/material";
import LoginForm from "../scenes/LoginForm";
import SignupForm from "../scenes/SignupForm";
import foodVid from "../assets/foodVid.mp4";
import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const api_base =
    process.env.REACT_APP_NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://tastebuds-api.up.railway.app";

function Index() {

    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const [showSignupForm, setShowSignupForm] = useState(false);

    const toggleSignupForm = () => {
        setShowSignupForm(!showSignupForm);
    };

    const isMobile = useMediaQuery("(max-width:600px)");

    //Handle Demo login
    const handleSubmitDemo = async (values) => {
        const req = await fetch(`${api_base}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: process.env.REACT_APP_DEMO_USER,
                password: process.env.REACT_APP_DEMO_PASS,
            }),
        })

        //Store JSON response and store userID in local storage
        const res = await req.json();

        if (res.token) {
            setCookies("access_token", res.token);
            window.localStorage.setItem("userID", res.userID);
            navigate("/home");
        } else {
            alert(res.message)
        }
    };

    return (
        <div className="landingMain">
            <div className="overlay"></div>
            <video src={foodVid} autoPlay loop muted />
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    position: "absolute",
                    padding: 4,
                    top: 0,
                }}
            >
                <Typography fontSize={isMobile ? "4.5rem" : "8vw"} fontFamily={"Lobster, cursive"}>
                    Taste Buds
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}
                >
                    {showSignupForm ? <SignupForm /> : <LoginForm />}
                    <Button onClick={toggleSignupForm} sx={{ fontSize: ".9rem", border: "2px solid black", fontWeight: "bold", width: 170, }}>
                        {showSignupForm ? 'Existing User' : 'Create Account'}
                    </Button>
                    <Button onClick={handleSubmitDemo} sx={{ fontSize: ".9rem", border: "2px solid black", fontWeight: "bold", width: 170, marginTop: ".7rem" }}>
                        Try Demo
                    </Button>
                </Box>
            </Box>
        </div>
    )
};

export default Index