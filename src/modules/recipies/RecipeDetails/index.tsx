import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecipe } from "../RecipeContext";
import { getMealById } from "../recipiesService";
import "./styles.css";
import { Meal, Recipe } from "../interfaces";

export const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  let { id } = useParams();
  const navigate = useNavigate();
  const { recipes } = useRecipe();
  const mapMealToRecipe = (meal: Meal): Recipe => {
    return {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal || "",
      strTags: meal.strTags || undefined,
      strInstructions: meal.strInstructions || "",
      strMealThumb: meal.strMealThumb || "",
      strCategory: meal.strCategory || "",
      strArea: meal.strArea || "",
      strYoutube: meal.strYoutube || "",
    };
  };
  useEffect(() => {
    if (id) {
      const existingRecipe = recipes.find((recipe) => recipe.idMeal === id);

      if (existingRecipe) {
        setRecipe(existingRecipe);
      } else {
        getMealById(id).then((recipie) => {
          setRecipe(mapMealToRecipe(recipie));
        });
      }
    }
  }, [id, recipes]);

  const handleBackButton = () => {
    if (recipe) {
      navigate(-1);
    }
  };

  return (
    <div className="main-details-container">
      <div className="button-container">
        <button onClick={handleBackButton} className="button back-btn">
          Back
        </button>
      </div>
      {recipe ? (
        <div className="recipe-details-container">
          <h1 className="recipe-title">{recipe.strMeal}</h1>
          <img
            className="recipe-img"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          />
          <p className="recipe-instructions">{recipe.strInstructions}</p>
        </div>
      ) : (
        <p className="memo loading">Loading...</p>
      )}
    </div>
  );
};
