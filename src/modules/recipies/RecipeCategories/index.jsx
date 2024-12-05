import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategories } from "../recipiesService";
import "./styles.css";

export const RecipeCategories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async () => {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData);
        };
        getCategories();
    }, []);

    const handleCategoryClick = (categoryName) => {
        navigate(`/recipes?category=${categoryName}`);
    };
    const handleBackButton = () => {
        navigate(-1);
    }

    return (
        <>
            <button onClick={handleBackButton} className="back-btn">Back</button>
            <div className="category container">
                <h1 className="category-heading">Categories</h1>
                <ul className="category-list">
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <li key={category.idCategory}>
                                <button onClick={() => handleCategoryClick(category.strCategory)} className=" category-a">
                                    {category.strCategory}
                                </button>
                                {index < categories.length - 1 && (
                                    <div className="category-separator"> ** </div>
                                )}
                            </li>
                        ))
                    ) : (
                        <p>Loading categories...</p>
                    )}
                </ul>
            </div>
        </>
    );
};
