import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import Card from '../components/Card'

function Searched() {

    //useState hook to initialize a state variable (searchedRecipes) and a function used for updating value of searchedRecipesstate (setSearchedRecipes)
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    //fetch api by searched recipe
    const getSearched = async (name) => {
        //---------------- CHANGE BACK from 3 to remove number----------------//
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=3`)
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
        ;
    };

    //useEffect to run (getSearched) after the component has been rendered, runs on change in params.type 
    useEffect(() => {
        getSearched(params.search)
    }, [params.search]);


    return (
        <Grid>
            {searchedRecipes.map((item) => {
                return (
                    <Card imageUrl={item.image} title={item.title} recipeURL ={"/recipe/" + item.id} />
                )
            })}
        </Grid>
    )
}

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
grid-gap:2rem;
`;


export default Searched