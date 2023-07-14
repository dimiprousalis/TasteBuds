import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

function Searched() {

    //useState hook to initialize a state variable (searchedRecipes) and a function used for updating value of searchedRecipesstate (setSearchedRecipes)
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    //fetch api by searched recipe
    const getSearched = async (name) => {
        //---------------- CHANGE BACK from 1 to remove number----------------//
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=1`)
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
                    <Card key={item.id}>
                        {/*Link to recipe/id to take you to recipe details when Card clicked on*/}
                        <Link to={"/recipe/" + item.id}>
                            <img src={item.image} alt="" />
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                )
            })}
        </Grid>
    )
}

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
grid-gap:3rem;
`;

const Card = styled.div`
img {
    width: 100%;
    border-radius: 2rem
}
a {
    text-decoration: non;
}
h4 {
    text-align: center;
    padding: 1rem;
}
`;

export default Searched