import "./App.css";
import { useEffect, useState } from "react";
import { listMealsByFirstLetter, getMealById } from './modules/recipies/recipiesService';
import { SearchBar } from "./modules/recipies/SearchBar";
import { RecipeList } from "./modules/recipies/RecipeList";


function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = (letter) => {
    listMealsByFirstLetter(letter)
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

  useEffect(() => {
    handleSearch('a');

    const handleClear = () => {
      setRecipes([]);
    }
    const intervalId = setInterval(() => {
      handleClear();
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);


  // Example of how to use async/await syntax inside useEffect
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=");
  //     const data = await response.json();
  //     setRecipies(data.meals);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="App">
      <div className="container">
        <SearchBar onSearch={handleSearch} />

        {selectedRecipe ? (
          <div className="recipe-detail full-page">
            <button onClick={handleBackToList} className="back-button">Back</button>
            <h1 className="selected-recipe">{selectedRecipe.strMeal}</h1>
            <img className="selected-img" src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
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