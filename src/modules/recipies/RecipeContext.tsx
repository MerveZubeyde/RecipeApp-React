import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

interface Recipe {
    id: string;
    name: string;
    ingredients: { name: string; measure: string }[];
    instructions: string;
    image: string;
    category: string;
    area: string;
    tags: string[];
    youtube: string;
    source: string;
    imageSource: string;
    creativeCommonsConfirmed: boolean;
    dateModified: string;
    idMeal: string;
    strMeal: string;
  }

interface RecipeContextType {
    recipes: Recipe[];
    addRecipe: (newRecipe: Recipe) => void;
  }
const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  addRecipe: () => {},
});
export const useRecipe = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const addRecipe = (newRecipe: Recipe) => {
    setRecipes((prevRecipes: Recipe[]) => [...prevRecipes, newRecipe]);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
