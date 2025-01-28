const LETTER_URL = 'https://www.themealdb.com/api/json/v1/1';
const CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const CATEGORY_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

export const listMealsByFirstLetter = async (firstLetter) => {
  const response = await fetch(`${LETTER_URL}/search.php?f=${firstLetter}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data from the server');
  }

  const data = await response.json();
  return data.meals;
};

export const getMealById = async (id) => {
  const response = await fetch(`${LETTER_URL}/lookup.php?i=${id}`);
  if (!response.ok) throw new Error('Failed to fetching recipes detail from the server');
  const data = await response.json();
  return data.meals[0];
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(CATEGORY_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
export const fetchMealsByCategory = async (categoryName) => {
  try {
    const response = await fetch(`${CATEGORY_MEAL_URL}${categoryName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch meals by category');
    }
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    return [];
  }
};