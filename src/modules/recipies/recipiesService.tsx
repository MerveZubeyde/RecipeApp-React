import { Meal } from "./interfaces";

const LETTER_URL = "https://www.themealdb.com/api/json/v1/1";
const CATEGORY_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";
const CATEGORY_MEAL_URL =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

interface MealResponse {
  meals: Meal[];
}

export const listMealsByFirstLetter = async (
  firstLetter: string
): Promise<Meal[]> => {
  const response = await fetch(`${LETTER_URL}/search.php?f=${firstLetter}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data from the server");
  }

  const data: MealResponse = await response.json();
  return data.meals;
};

interface MealDetailResponse {
  meals: Meal[];
}

export const getMealById = async (id: string): Promise<Meal> => {
  const response = await fetch(`${LETTER_URL}/lookup.php?i=${id}`);
  if (!response.ok)
    throw new Error("Failed to fetching recipes detail from the server");
  const data: MealDetailResponse = await response.json();
  return data.meals[0];
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(CATEGORY_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
interface CategoryMealResponse {
  meals: Meal[];
}

export const fetchMealsByCategory = async (
  categoryName: string
): Promise<Meal[]> => {
  try {
    const response = await fetch(`${CATEGORY_MEAL_URL}${categoryName}`);
    if (!response.ok) {
      throw new Error("Failed to fetch meals by category");
    }
    const data: CategoryMealResponse = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    return [];
  }
};
