import { useEffect, useState } from "react";
import styled from 'styled-components'
import { Link, useParams } from "react-router-dom"


function Cuisine() {

    //useState hook to initialize a state variable (cuisine) and a function used for updating value of cuisine state (setCuisine)
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    //fetch api by cuisine type (mexican, italian, etc)
    const getCuisine = async (name) => {
        //---------------- CHANGE BACK from 1 to remove number----------------//
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=1`)
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

export default Cuisine