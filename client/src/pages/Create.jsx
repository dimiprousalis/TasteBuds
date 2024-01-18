import React from 'react'
import { Navbar } from "../components/Navbar";
import RecipeForm from '../scenes/RecipeForm';
import ImageUpload from '../components/ImageUpload';


function Create() {

    return (
        <div className="createMain">
            <Navbar />
            <div className="main">
                <RecipeForm/>
                <ImageUpload/>
            </div>
        </div>
    )
}

export default Create



