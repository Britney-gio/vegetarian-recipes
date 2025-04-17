import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/App.scss";

function RecipeId() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const APP_KEY = import.meta.env.VITE_APP_SPOONACULAR_KEY;

    useEffect(() => {
        const fetchRecipeById = async () => {
            try {
                const response = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${APP_KEY}`
                );
                if (!response.ok) {
                throw new Error("Failed to fetch recipe details");
                }
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

    fetchRecipeById();
    }, [id]);

    useEffect(() => {
      if (recipe?.title) {
        document.title = recipe.title;
        } else {
        document.title = "Recipe Details";
        }
    }, [recipe]);

    if (isLoading) return <p>Loading recipe details...</p>;

    if (error) {
        return (
            <div className="main">            
            <h1 className="main">Error: {error}</h1>
            <button className="info-button" onClick={() => navigate("/")}>
              Back Home
            </button>
          </div>
        );
      }

    if (!recipe) {
        return (
          <div className="main">
            <h1>Recipe not found</h1>
            <button className="info-button" onClick={() => navigate("/")}>
              Back Home
            </button>
          </div>
        );
      }

    if (!recipe) return null;
  
    return (
        <>
        <div className="main">
            <button className="info-button" onClick={() => navigate(-1)}>
            Back Home
            </button>
            <h1>{recipe.title}</h1> 
            <img src={recipe.image} alt={recipe.title} style={{width:"40%"}}/>
            <h3>Ingredients:</h3>
            <ul>
                {recipe.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                ))}
            </ul>

            <h3>Instructions:</h3>
            <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

            <p>Ready in {recipe.readyInMinutes} minutes</p>


            <h3>Servings: {recipe.servings}</h3>

            
            <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            <button className="info-button" onClick={() => navigate(-1)}>
            Back Home
            </button>
        </div>
    </>
  );
}

export default RecipeId;