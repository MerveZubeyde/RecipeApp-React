import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchMealsByCategory, listMealsByFirstLetter } from "../recipiesService";
import { Link } from "react-router-dom";
import "./styles.css";

export const RecipeList = () => {
  const [recipes, setRecipes] = useState(null);
  const location = useLocation();


  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const searchLetter = searchParams.get("search") || "A";

  useEffect(() => {
    if (category) {

      fetchMealsByCategory(category)
        .then((meals) => setRecipes(meals))
        .catch(() => setRecipes([]));
    } else {

      listMealsByFirstLetter(searchLetter)
        .then((meals) => setRecipes(meals))
        .catch(() => setRecipes([]));
    }
  }, [category, searchLetter]);

  if (recipes === null) {
    return <div className="no-recipe">No recipes found.</div>;
  }

  return (
    <div className="opening-container">
      <h2>
        {category ? `Recipes in "${category}"` : `Recipes starting with "${searchLetter}"`}
      </h2>
      {recipes.length > 0 && (
        <ul className="recipe-list-box">
          {recipes.map((recipe) => (
            <li className="items" key={recipe.idMeal}>
              <Link to={`/recipes/${recipe.idMeal}`}>{recipe.strMeal}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
