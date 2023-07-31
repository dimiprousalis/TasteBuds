
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Card from './Card'


function Popular() {

    ////useState hook to initialize a state variable (popular) and a function used for updating value of popular state (setPopular)
    const [popular, setPopular] = useState([]);

    //useEffect to run (getPopular) after the component has been rendered  
    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {

        //check if "popular" is saved in local storage
        const check = localStorage.getItem("popular");

        //if "popular" is in local storage then don't fetch again, just take it back from string and parse again
        if (check) {
            setPopular(JSON.parse(check));
            //else fetch api and set it
        } else {
            //fetch api for random popular dishes
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
            const data = await api.json();
            localStorage.setItem("popular", JSON.stringify(data.recipes));
            setPopular(data.recipes)
        }
    }

    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                {/*Create a slider/carousel with Splide and customize with options*/}
                <Splide options={{
                    perPage: 4,
                    arrows: true,
                    pagination: false,
                    drag: "free",
                    gap: "2%",
                    height: '100%',
                    breakpoints: {
                        600: {
                            perPage: 3,

                        },
                    },
                }}>
                    {/* map through each recipe and return output (recipe title & image) */}
                    {popular.map((recipe) => {
                        return (
                            //SplideSlide represent the individual slide(Card) within the slider/carousel
                            <SplideSlide key={recipe.id}>
                                 <Card imageUrl={recipe.image} title={recipe.title} recipeURL ={"/recipe/" + recipe.id} />
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

export default Popular

