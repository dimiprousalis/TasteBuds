import { useEffect, useState } from "react";
import styled from 'styled-components'
import { useParams } from "react-router-dom"
import Card from '../components/Card'
import { Navbar } from "../components/Navbar";
import Search from "../components/Search";
import Category from "../components/Category";


function Cuisine() {

    //useState hook to initialize a state variable (cuisine) and a function used for updating value of cuisine state (setCuisine)
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    //fetch api by cuisine type (mexican, italian, etc)
    const getCuisine = async (name) => {
        //---------------- CHANGE BACK from 3 to remove number----------------//
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=10`)
        const recipes = await data.json();
        setCuisine(recipes.results);
    }

    //useEffect to run (getCuisine) after the component has been rendered, runs on change in params.type 
    useEffect(() => {
        getCuisine(params.type)
    }, [params.type]);

    return (
        <div className="cuisineMain">
            <Navbar />
            <div class="main">
                <Search />
                <Category />
                <Grid>
                    {cuisine.map((item) => {
                        return (
                            <Card imageUrl={item.image} title={item.title} recipeURL={"/recipe/" + item.id} />
                        )
                    })}
                </Grid>
            </div>
        </div>
    )
}

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(10rem, 100fr));
grid-gap:3rem;
padding: 0 15%;
width:100%;
`;


export default Cuisine