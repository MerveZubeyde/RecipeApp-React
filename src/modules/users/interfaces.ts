export interface User {
  username: string;
  password: string;
  email: string;
}



export interface UserInternal extends User {
  id: number;
  role: string;
}

export interface UserContextData extends UserInternal{
  addedRecipes: { idMeal: string; strMeal: string }[];
}