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


function Index() {

    const [showSignupForm, setShowSignupForm] = useState(false);

    const toggleSignupForm = () => {
        setShowSignupForm(!showSignupForm);
    };

    const isMobile = useMediaQuery("(max-width:600px)");

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
                    left: 0,
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
                        marginBottom: "5rem"
                    }}
                >
                    <div>
                        {showSignupForm ? <SignupForm /> : <LoginForm />}
                        <Button onClick={toggleSignupForm} sx = {{ fontSize: ".9rem", border: "2px solid black", fontWeight: "bold", }}>
                            {showSignupForm ? 'Existing User' : 'Create Account'}
                        </Button>
                    </div>
                </Box>
            </Box>
        </div>
    )
};

export default Index