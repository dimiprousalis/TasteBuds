import React from 'react'
import { Navbar } from "../components/Navbar";
import RecipeForm from '../scenes/RecipeForm';


function Create() {

    return (
        <div className="createMain">
            <Navbar />
            <div className="main">
                <RecipeForm/>
            </div>
        </div>
    )
}

export default Create



