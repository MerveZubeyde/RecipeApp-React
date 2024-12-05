import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMealById } from "../recipiesService";
import { useUser } from "../../../UserContext";
import './styles.css';

export const RecipeDetails = () => {
  const [recipie, setRecipie] = useState(null);
  let { id } = useParams();
  const { addFavoriteRecipe } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getMealById(id).then((recipie) => setRecipie(recipie));
    }
  }, [id]);

  const handleFavorite = () => {
    if (recipie) {
      addFavoriteRecipe(recipie);
    }
  };

  const handleBackButton = () => {
    if (recipie) {
      navigate(-1);
    }
  };

  return (
    <div className="main-details-container">
      <div className="button-container">
        <button onClick={handleFavorite} className="button fav-btn">
          Love
        </button>
        <button onClick={handleBackButton} className="button back-btn">
          Back
        </button>
      </div>
      {recipie ? (
        <div className="recipe-details-container">
          <h1 className="recipe-title">{recipie.strMeal}</h1>
          <img className="recipe-img" src={recipie.strMealThumb} alt={recipie.strMeal} />
          <p className="recipe-instructions">{recipie.strInstructions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
