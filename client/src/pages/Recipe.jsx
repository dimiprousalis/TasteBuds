import { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { Navbar } from "../components/Navbar";

function Recipe() {

    let params = useParams();

    //useState hook to initialize a state variable (details) and a function used for updating value of details state (setDetails)
    const [details, setDetails] = useState({});

    //useState hook to initialize a state variable (activeTab) with initial value of "instructions" and a function used for updating value of activeTab state (setActiveTab)
    const [activeTab, setActiveTab] = useState("instructions");

    //fetch api by specific recipe id information
    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json();
        setDetails(detailData);
    }

    //useEffect to run (fetchDetails) after the component has been rendered, runs on change in params.name 
    useEffect(() => {
        fetchDetails()
    }, [params.name]);

    return (
        <div>
            <Navbar />
            <div class="main">
                <DetailWrapper>
                    <div>
                        <h1>{details.title}</h1>
                        <img src={details.image} alt="food" />
                    </div>
                    <Info>
                        {/* when button clicked on setActiveTab to instructions and if activeTab is instructions then add the "active" class, else don't add a class  */}
                        <Button
                            className={activeTab === "instructions" ? "active" : ""}
                            onClick={() => setActiveTab("instructions")}
                        >
                            Instructions
                        </Button>
                        {/* when button clicked on setActiveTab to ingredients and if activeTab is ingredients then add the "active" class, else don't add a class  */}
                        <Button
                            className={activeTab === "ingredients" ? "active" : ""}
                            onClick={() => setActiveTab("ingredients")}
                        >
                            Ingredients
                        </Button>
                        {activeTab === "instructions" && (
                            <div>
                                {/* since details.summary has html, use dangerouslySetInnerHTML to render out the html data from the api*/}
                                <h4 dangerouslySetInnerHTML={{ __html: details.summary }}></h4>
                                <h4 dangerouslySetInnerHTML={{ __html: details.instructions }}></h4>
                            </div>
                        )}
                        {activeTab === "ingredients" && (
                            <ul>
                                {/* since details.extendedIngredients is an array of ingredients, map over each ingredient and return a li*/}
                                {details.extendedIngredients.map((ingredient) => (
                                    <li key={ingredient.id}>{ingredient.original}</li>
                                ))}
                            </ul>
                        )}
                    </Info>
                </DetailWrapper>
            </div>
        </div>
    )
}

const DetailWrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h1 {
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }
    li {
        font-size: 1.2 rem;
        line-height: 1.8rem;
    }
    ul {
        margin-top: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 1rem;
`;

export default Recipe