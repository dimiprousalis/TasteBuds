import React from 'react'
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Card from './Card'

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
                    arrows: true,
                    pagination: false,
                    drag: "free",
                    gap: "3%",
                    height: '100%',
                    breakpoints: {
                        600: {
                            perPage: 2,
                        },
                    },
                }}>
                    {/* map through each recipe and return output (recipe title & image) */}
                    {veggie.map((recipe) => {
                        return (
                            //SplideSlide represent the individual slide(Card) within the slider/carousel
                            <SplideSlide key={recipe.id}>
                                <Card imageUrl={recipe.image} title={recipe.title} recipeURL={"/recipe/" + recipe.id} />
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div >
    )
}

const Wrapper = styled.div`
 margin: 1rem 0rem;`

export default Veggie