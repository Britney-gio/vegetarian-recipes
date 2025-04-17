import React from "react";
import { useNavigate } from "react-router-dom";

function Recipes({id, title,image, readyInMinutes, diets}) {

    let navigate = useNavigate();

    return (
    <>
        <div className="main">
            <h1>{title}</h1> 
            <img src={image} alt={title}/>
            <p>Ready in {readyInMinutes} minutes</p>
            {diets && diets.length > 0 && (
            <p>Diets: {diets.join(", ")}</p>
            )}
            <button className="info-button" 
            onClick={() => navigate(`/recipe/${id}`)}>
                More Info
            </button>     
        </div>
    </>     
)};

export default Recipes;