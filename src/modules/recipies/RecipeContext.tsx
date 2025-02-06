import { createContext, useContext, useState, ReactNode } from "react";
import { Recipe } from "./interfaces";

interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (newRecipe: Recipe) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipe = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe must be used within a RecipeProvider");
  }
  return context;
};

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const addRecipe = (newRecipe: Recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
