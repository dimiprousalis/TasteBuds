
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

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
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "4rem",
                }}>
                    {/* map through each recipe and return output (recipe title & image) */}
                    {popular.map((recipe) => {
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


export default Popular

