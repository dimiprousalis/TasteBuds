import { FaHamburger, FaPizzaSlice } from "react-icons/fa";
import { GiTacos, GiFastNoodles } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";



import React from 'react'

function Category() {
    return (
        <List>
            <Slink to={'/cuisine/American'}>
                <FaHamburger />
                <h4>American</h4>
            </Slink>
            <Slink to = {'/cuisine/Italian'}>
                <FaPizzaSlice />
                <h4>Italian</h4>
            </Slink>
            <Slink to ={'/cuisine/Mexican'}>
                <GiTacos />
                <h4>Mexican</h4>
            </Slink>
            <Slink to={'/cuisine/Asian'}>
                <GiFastNoodles />
                <h4>Asian</h4>
            </Slink>
        </List>
    )
}

const List = styled.div`
display: flex;
justify-content: center;
margin: 1rem 0rem;
`;

const Slink = styled(NavLink)`
display: flex;
flex-firection: column;
justify-content: center;
align-items: center;
border-radius: 50%;
margin-right:1rem;
text-decoration: nonw;
background: linear-gradient(35deg, #494949, #313131);
width: 5rem;
height: 5rem;
cursor: pointer;
transform: scale(0.8);

h4 {
    color: white;
    font-size: 0.8rem;
}
svg {
    color: white;
    font-size: 1.5rem;
}
&.active {
    background: linear-gradient(to right, #f27121, #e94097);

    svg {
        color: white;
    }
    h4 {
        color: white
    }
}
`;

export default Category
