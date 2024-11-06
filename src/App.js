import "./App.css";
import { useState } from "react";
import { listMealsByFirstLetter, getMealById } from './modules/recipies/recipiesService';
import { SearchBar } from "./modules/recipies/SearchBar";
import { RecipeList } from "./modules/recipies/RecipeList";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = (query) => {
    listMealsByFirstLetter(query)
      .then((recipes) => {
        setRecipes(recipes || []);
        setSelectedRecipe(null);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  };

  const handleRecipeClick = (id) => {
    getMealById(id)
      .then((recipe) => {
        setSelectedRecipe(recipe);
        setRecipes([]);
      })
      .catch((error) => console.error("Error fetching recipe detail:", error));
  };
  const handleBackToList = () => {
    setSelectedRecipe(null);
    handleSearch('a');
  };

  return (
    <div className="App">
      <div className="container box">
        <SearchBar onSearch={handleSearch} />

        {selectedRecipe ? (
          <div className="recipe-detail full-page">
            <button onClick={handleBackToList} className="back-button">Back</button>
            <h1 className="selected-recipe">{selectedRecipe.strMeal}</h1>
            <img className="selected-img box" src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
            <p className="selected-recipe-index">{selectedRecipe.strInstructions}</p>
          </div>
        ) : (
          <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
        )}
      </div>
    </div>
  );
}

export default App;