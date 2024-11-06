import './styles.css';

export const RecipeList = ({ recipes, onRecipeClick }) => {
    return (
        <ul className="recipes-list box">
            {recipes.map((recipe) => (
                <li
                    className="items"
                    key={recipe.idMeal}
                    onClick={() => onRecipeClick(recipe.idMeal)}
                >
                    {recipe.strMeal}
                </li>
            ))}
        </ul>
    );
};