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
                        <Button variant="outlined" onClick={toggleSignupForm}>
                            {showSignupForm ? 'Existing User' : 'Create Account'}
                        </Button>
                    </div>
                </Box>
            </Box>
        </div>
    )











    // return (
    //     <>
    //         <Typography variant="h3">Welcome to Taste Buds</Typography>
    //         <Box
    //             gap="20px"
    //             sx={{
    //                 marginTop: 0,
    //                 display: "flex",
    //                 flexDirection: "row",
    //                 alignItems: "center"
    //             }}
    //         >
    //             <Link to="/login" style={{ textDecoration: "none" }}>
    //                 <Button
    //                     variant="contained"
    //                     type="button"
    //                 >
    //                     Login
    //                 </Button>
    //             </Link>

    //             <Link to="/signup" style={{ textDecoration: "none" }}>
    //                 <Button
    //                     variant="contained"
    //                     type="button"
    //                 >
    //                     Sign Up
    //                 </Button>
    //             </Link>
    //         </Box>
    //     </>
    // )
};

export default Index