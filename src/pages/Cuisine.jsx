import { useEffect, useState } from "react";
import styled from 'styled-components'
import { Link, useParams } from "react-router-dom"
import Card from '../components/Card'


function Cuisine() {

    //useState hook to initialize a state variable (cuisine) and a function used for updating value of cuisine state (setCuisine)
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    //fetch api by cuisine type (mexican, italian, etc)
    const getCuisine = async (name) => {
        //---------------- CHANGE BACK from 3 to remove number----------------//
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=3`)
        const recipes = await data.json();
        setCuisine(recipes.results);
    }

    //useEffect to run (getCuisine) after the component has been rendered, runs on change in params.type 
    useEffect(() => {
        getCuisine(params.type)
    }, [params.type]);

    return (
        <Grid>
            {cuisine.map((item) => {
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
grid-gap:3rem;
padding: 1rem;
`;


export default Cuisine