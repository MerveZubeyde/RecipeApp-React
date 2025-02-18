import React, { useState } from "react";
import { useUser } from "../../users/UserContext";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export const RecipeForm = () => {
  const { addAddedRecipe } = useUser();
  const [newRecipe, setNewRecipe] = useState({
    strMeal: "",
    strInstructions: "",
    strMealThumb: ""
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAddedRecipe(newRecipe);
  };

  const handleBackButton = () => {
    navigate(-1);
  }

  return (
    <>
      <button onClick={handleBackButton} className="button back-btn">
        Back
      </button>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Add a New Recipe</h2>
          <input className="form-element"
            type="text"
            placeholder="Recipe Name"
            value={newRecipe.strMeal}
            onChange={(e) => setNewRecipe({ ...newRecipe, strMeal: e.target.value })}
          />
          <textarea className="textarea form-element"
            placeholder="Instructions"
            value={newRecipe.strInstructions}
            onChange={(e) => setNewRecipe({ ...newRecipe, strInstructions: e.target.value })}
          />
          <input className="form-element"
            type="text"
            placeholder="Image URL"
            value={newRecipe.strMealThumb}
            onChange={(e) => setNewRecipe({ ...newRecipe, strMealThumb: e.target.value })}
          />
          <button className="button form-element" type="submit">Add Recipe</button>
        </form>
      </div>
    </>
  );
};
