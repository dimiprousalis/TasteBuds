import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Card from './Card'


function Dessert() {

    ////useState hook to initialize a state variable (dessert) and a function used for updating value of dessert state (setDessert)
    const [dessert, setDessert] = useState([]);

    //useEffect to run (getDessert) after the component has been rendered  
    useEffect(() => {
        getDessert();
    }, []);

    const getDessert = async () => {

        //check if "Dessert" is saved in local storage
        const check = localStorage.getItem("dessert");

        //if "dessert" is in local storage then don't fetch again, just take it back from string and parse again
        if (check) {
            setDessert(JSON.parse(check));
            //else fetch api and set it
        } else {
            //fetch api for random dessert dishes
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=dessert`)
            const data = await api.json();
            localStorage.setItem("dessert", JSON.stringify(data.recipes));
            setDessert(data.recipes)
        }
    }

    return (
        <div>
            <h3>Dessert Picks</h3>
            <Wrapper>
                {/*Create a slider/carousel with Splide and customize with options*/}
                <Splide options={{
                    perPage: 3,
                    padding: "20px",
                    arrows: true,
                    pagination: false,
                    drag: "free",
                    gap: "3%",
                    height: '100%',
                    width: '100%',
                    breakpoints: {
                        600: {
                            perPage: 2,

                        },
                    },
                }}>
                    {/* map through each recipe and return output (recipe title & image) */}
                    {dessert.map((recipe) => {
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
margin: 1rem 0rem;
background: rgba(0,0,0,.1);
display: flex;
justify-content: center;
border-radius: 10px;`

export default Dessert
