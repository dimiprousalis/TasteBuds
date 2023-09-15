import * as React from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";

const api_base =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://tastebuds-api.up.railway.app";


/* SCHEMAS */
const signupSchema = yup.object().shape({
  username: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});


/* INITIAL VALUES */
const initialValuesSignup = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};



/* FORM */
const SignupForm = () => {
  const navigate = useNavigate();


  /* SIGNUP LOGIC */
  const signup = async (values, onSubmitProps) => {

    //POST request to server with data from form and store response
    const req = await fetch(`${api_base}/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }


    );


    //Save user info and reset form
    const res = await req.json();
    onSubmitProps.resetForm();
    //Switch to login page
    if (req.status === 400) {
      alert(res.message)
    } else {
      navigate("/home");
    }
  };


  /* HANDLER */
  const handleFormSubmit = async (values, onSubmitProps) => {
    await signup(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesSignup}
      validationSchema={signupSchema}
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
              <h1>Welcome</h1>
              <TextField
                label="Username"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username.toLowerCase()}
                name="username"
                error={
                  Boolean(touched.username) && Boolean(errors.username)
                }
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2", background: "rgba(255,255,255,.9)", borderRadius: 1, }}
              />
              <TextField
                label="Email"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={
                  Boolean(touched.email) && Boolean(errors.email)
                }
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2", background: "rgba(255,255,255,.9)", borderRadius: 1, }}
              />
              <TextField
                label="Password"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                type="password"
                error={
                  Boolean(touched.password) && Boolean(errors.password)
                }
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2", background: "rgba(255,255,255,.9)", borderRadius: 1, }}
              />
              <TextField
                label="Re-enter Password"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                type="password"
                error={
                  Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2", background: "rgba(255,255,255,.9)", borderRadius: 1, }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ my: 1 }}
              >
                Sign Up
              </Button>
            </>
          </Box>

        </form>
      )}
    </Formik>
  );
};

export default SignupForm;