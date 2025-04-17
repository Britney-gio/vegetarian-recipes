import React, { useEffect, useState } from "react";
import Recipes from "../components/Recipes";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const APP_KEY = import.meta.env.VITE_APP_SPOONACULAR_KEY;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const fetchRecipe = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=15&tags=vegetarian,lacto-vegetarian,ovo-vegetarian&apiKey=${APP_KEY}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <>
      <div className="main">
        <h1>Welcome to Veg4yoU</h1>

        <form onSubmit={handleSearch}>
          <p>What are you craving today? <br/> 
          Write your favorite recipe or ingredient and let’s get cooking something delicious!</p>
          <input 
            className="search-bar" 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="tofu, tomato..."
          />
          <button className="search-button" type="submit">Search</button>
        </form>
        
        <div>
        <p>Alternatively, feel free to navigate through a variety of random recipes:</p>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Errore: {error}</p>
          ) : (
            <div className="recipe-list">
              {recipes.map((recipe) => (
                <Recipes
                  key={recipe.id}
                  id={recipe.id}                  
                  title={recipe.title}
                  image={recipe.image}
                  readyInMinutes={recipe.readyInMinutes}
                  diets={recipe.diets}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
