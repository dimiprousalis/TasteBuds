import * as React from "react";
import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { useCookies } from "react-cookie";
const api_base = "http://localhost:3001"

/* SCHEMAS */
const loginSchema = yup.object().shape({
    // email: yup.string().email("invalid email").required("required"),
    username: yup.string().required("required"),
    password: yup.string().required("required"),
});

/* INITIAL VALUES */
const initialValuesLogin = {
    username: "",
    password: "",
};

/* FORM */
const LoginForm = () => {
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    /* LOGIN LOGIC */
    const login = async (values, onSubmitProps) => {

        const req = await fetch(`${api_base}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })

        //Store JSON response, reset the form, store userID in local storage
        const res = await req.json();
        onSubmitProps.resetForm();

        if (res.token) {
            setCookies("access_token", res.token);
            window.localStorage.setItem("userID", res.userID);
            navigate("/home");
        } else {
            alert(res.message)
        }
    };

    /* HANDLER */
    const handleFormSubmit = async (values, onSubmitProps) => {
        await login(values, onSubmitProps);

    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>

                    <Box
                        gap="10px"
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 2,
                            justifyContent: "center",
                        }}
                    >
                        <>
                            <h1>Welcome Back</h1>
                            <TextField
                                label="Username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={
                                    Boolean(touched.username) && Boolean(errors.username)
                                }
                                helperText={touched.username && errors.username}
                                sx={{ gridColumn: "span 4", borderRadius: 1, background: "rgba(255,255,255,.5)", }}
                            />
                            <TextField
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                type="password"
                                error={
                                    Boolean(touched.password) && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4", borderRadius: 1, background: "rgba(255,255,255,.5)", }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ my: 1 }}
                            >
                                Login
                            </Button>
                        </>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;