import React from 'react'
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

function Veggie() {
    //useState hook to initialize a state variable (veggie) and a function used for updating value of veggie state (setVeggie)
    const [veggie, setVeggie] = useState([]);

    //useEffect to run (getVeggie) after the component has been rendered  
    useEffect(() => {
        getVeggie();
    }, []);

    const getVeggie = async () => {

        //check if "veggie" is saved in local storage
        const check = localStorage.getItem("veggie");

        //if "veggie" is in local storage then don't fetch again, just take it back from string and parse again
        if (check) {
            setVeggie(JSON.parse(check));
            //else fetch api and set it
        } else {
            //fetch api for vegetarian dishes
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`)
            const data = await api.json();
            localStorage.setItem("veggie", JSON.stringify(data.recipes));
            setVeggie(data.recipes)
        }
    }

    return (
        <div>
            <Wrapper>
                <h3>Vegetarian Picks</h3>
                {/*Create a slider/carousel with Splide and customize with options*/}
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "4rem",
                }}>
                    {/* map through each recipe and return output (recipe title & image) */}
                    {veggie.map((recipe) => {
                        return (
                            //SplideSlide represent the individual slide(Card) within the slider/carousel
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    {/*Link to recipe/id to take you to recipe details when Card clicked on*/}
                                    <Link to={"/recipe/" + recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                        <Gradient />
                                    </Link>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div >
    )
}

const Wrapper = styled.div`
margin: 4rem 0rem;`

const Card = styled.div`
    min-height: 25rem;
    border-radius:2rem;
    overflow: hidden;
    position: relative;
    
    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    }
    `;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(grba(0,0,0,0), rgba(0,0,0,0.5));
    `;



export default Veggie