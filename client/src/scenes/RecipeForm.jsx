import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, IconButton } from '@mui/material';
import { FieldArray, Formik } from 'formik';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const RecipeForm = () => {
    const api_base =
        process.env.REACT_APP_NODE_ENV === "development"
            ? "http://localhost:3001"
            : "https://tastebuds-api.up.railway.app";


    const userID = window.localStorage.getItem("userID");

    /*-------------------------- MANAGE STATE -------------------------- */
    const [buttonName, setButtonName] = useState("Add Ingredients");
    //page variable used to determine which text field to show
    const [page, setPage] = useState("name");

    /*-------------------------- SUBMIT RECIPE -------------------------- */
    const submitRecipe = async (values, onSubmitProps) => {

        const req = await fetch(`${api_base}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })

        //Store JSON response, reset the form, alert message
        const res = await req.json();
        onSubmitProps.resetForm();

        if (req.status === 400) {
            alert(res.message)
        } else {
            alert('Recipe Added!')
        }
    };

    /*----------------------------- HANDLERS ----------------------------- */
    const handleFormSubmit = async (values, onSubmitProps) => {
        await submitRecipe(values, onSubmitProps);
    };

    //set page to appropriate text field on clicking next button
    const handleNextBtn = () => {
        if (page === "name") {
            setPage("ingredients")
            setButtonName("Add Ingredients")
        }
        else if (page === "ingredients") {
            setPage("instructions")
            setButtonName("Add Instructions")
        }
        else if (page === "instructions") {
            setPage("image")
        }
    }

    //set page to appropriate text field on clicking back button
    const handleBackBtn = () => {
        if (page === "ingredients") {
            setPage("name")
        } else if (page === "instructions") {
            setPage("ingredients")
            setButtonName("Add Ingredients")
        }
        else if (page === "image") {
            setPage("instructions")
            setButtonName("Add Instructions")
        }
    }

    return (

        <Formik
            initialValues={{
                name: '',
                ingredients: [],
                instructions: [],
                imageUrl: '',
                userOwner: userID
            }}
            onSubmit={handleFormSubmit}
        >
            {({
                values,
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
                            padding: 1,
                            backgroundColor: "white",
                            width: 400,
                            mx: "auto",
                        }}>
                        {/*------------------- ADD RECIPE NAME TEXT FIELD -------------------*/}
                        {page === "name" &&
                            <TextField
                                id="name"
                                name="name"
                                label="Recipe Name"
                                variant="standard"
                                placeholder="ex. Chocolate Chip Cookies"
                                size="small"
                                onChange={handleChange}
                                value={values.name} />
                        }
                        {/*---------------- ADD INGREDIENTS TEXT FIELD ARRAY ----------------*/}
                        {page === "ingredients" && (
                            <FieldArray name="ingredients">

                                {({ push, remove }) => (
                                    <Box
                                        sx={{
                                            padding: 1,
                                            border: "1px solid black"
                                        }}>
                                        {values.ingredients.map((ingredient, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    padding: 1,
                                                }}>
                                                <TextField
                                                    id="ingredients"
                                                    name={`ingredients.${index}`}
                                                    label="Ingredient"
                                                    variant="standard"
                                                    placeholder="ex. 1 tsp salt"
                                                    size="small"
                                                    onChange={handleChange}
                                                    value={values.ingredients[index]}
                                                />
                                                <IconButton onClick={() => remove(index)}>
                                                    <RemoveCircleIcon />
                                                </IconButton>
                                            </Box>
                                        ))}
                                        <Button
                                            variant="contained"
                                            onClick={() => push('')}
                                            sx={{ my: 1 }}>
                                            {buttonName}
                                        </Button>
                                    </Box>
                                )}
                            </FieldArray>
                        )}
                        {/*---------------- ADD INSTRUCTIONS TEXT FIELD ARRAY ----------------*/}
                        {page === "instructions" && (
                            <FieldArray name="instructions">
                                {({ push, remove }) => (
                                    <Box
                                        sx={{
                                            padding: 1,
                                            border: "1px solid black"
                                        }}>
                                        {values.instructions.map((instructions, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    padding: 1,
                                                }}>
                                                <TextField
                                                    id="instructions"
                                                    name={`instructions.${index}`}
                                                    label="Instruction"
                                                    variant="standard"
                                                    placeholder="ex. Pre-heat oven to 350 degrees fahrenheit"
                                                    size="small"
                                                    onChange={handleChange}
                                                    value={values.instructions[index]}
                                                />
                                                <IconButton onClick={() => remove(index)}>
                                                    <RemoveCircleIcon />
                                                </IconButton>
                                            </Box>
                                        ))}
                                        <Button
                                            variant="contained"
                                            onClick={() => push('')}
                                            sx={{ my: 1 }}>
                                            {buttonName}
                                        </Button>
                                    </Box>
                                )}
                            </FieldArray>
                        )}
                        {/*-------------------- ADD RECIPE IMAGE FIELD --------------------*/}
                        {page === "image" &&
                            <TextField
                                id="imageUrl"
                                name="imageUrl"
                                label="Image URL"
                                variant="standard"
                                size="small"
                                onChange={handleChange}
                                value={values.imageUrl} />
                        }
                        {/*---------------- SHOW BACK, NEXT, SUBMIT BUTTONS ----------------*/}
                        {page !== "image" &&
                            <Button
                                variant="contained"
                                onClick={handleNextBtn}
                                sx={{ my: 1 }}>
                                Next
                            </Button>
                        }
                        {page !== "name" &&
                            <Button
                                variant="contained"
                                onClick={handleBackBtn}
                                sx={{ my: 1 }}>
                                Back
                            </Button>
                        }
                        {page === "image" &&
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ my: 1 }}>
                                Submit
                            </Button>
                        }
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default RecipeForm