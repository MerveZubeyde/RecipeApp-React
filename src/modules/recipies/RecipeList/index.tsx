import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchMealsByCategory, listMealsByFirstLetter } from "../recipiesService";
import { useRecipe } from "../RecipeContext";
import "./styles.css";

export const RecipeList = () => {
    const { recipes: contextRecipes } = useRecipe();
    const [apiRecipes, setApiRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
  const location = useLocation();


  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const searchLetter = searchParams.get("search") || "A";

  useEffect(() => {
    const fetchRecipes = async () => {
        setLoading(true);
        try {
          let fetchedRecipes = [];
          if (category) {
            fetchedRecipes = await fetchMealsByCategory(category);
          } else {
            fetchedRecipes = await listMealsByFirstLetter(searchLetter);
          }
          setApiRecipes(fetchedRecipes || []);
        } catch (error) {
          console.error("Error fetching recipes:", error);
          setApiRecipes([]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRecipes();
    }, [category, searchLetter]);

    const allRecipes = [...apiRecipes, ...contextRecipes];

    if(loading) {
        return <div className="memo loading">Loading recipes...</div>
    }

  if (!allRecipes.length) {
    return <div className="memo no-recipe">No recipes found.</div>;
  }

  return (
    <div className="opening-container">
      <h2>
        {category
          ? `Recipes in "${category}"`
          : `Recipes starting with "${searchLetter}"`}
      </h2>
      <ul className="recipe-list-box">
        {allRecipes.map((recipe) => (
          <li className="items" key={recipe.idMeal || recipe.id}>
            <Link to={`/recipes/${recipe.idMeal || recipe.id}`}>{recipe.strMeal}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};