import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Recipes from "../components/Recipes";

function SearchResult() {
      const APP_KEY = import.meta.env.VITE_APP_SPOONACULAR_KEY;
      const navigate = useNavigate();
      const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const query = queryParams.get("q");

    
      const [recipes, setRecipes] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);

      const searchRecipe = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=15&tags=vegetarian,lacto-vegetarian,ovo-vegetarian&apiKey=${APP_KEY}`
            );
            if (!response.ok) {
                throw new Error("Search failed!");
            }
            const data = await response.json();
            setRecipes(data.results);
            } catch (error) {
            setError(error.message || "Something went wrong!");
            } finally {
            setIsLoading(false);
            }
        };

        useEffect(() => {
            searchRecipe();
        }, [query]);

        useEffect(() => {
          if (query) {
            document.title = `Search results for "${query}"`;
          } else {
            document.title = "Search";
          }
        }, [query]);

        return (
            <div className="main">
              <button className="info-button" onClick={() => navigate("/")}>
              Back Home
              </button>
              <h2>Search Results for: "{query}"</h2>
        
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Errore: {error}</p>
              ) : recipes.length === 0 ? (
                <p>No recipes found.</p>
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
              <button className="info-button" onClick={() => navigate("/")}>
              Back Home
              </button>
            </div>
          );

}

export default SearchResult;