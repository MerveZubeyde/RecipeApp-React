import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategories } from "../recipiesService";
import "./styles.css";
import { CategoryDetails } from "../interfaces";
import { Category } from "../enum";

export const RecipeCategories = () => {
  const [categories, setCategories] = useState<CategoryDetails[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    getCategories();
  }, []);

  const handleCategoryClick = (categoryName: Category) => {
    navigate(`/recipes?category=${categoryName}`);
  };
  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <>
      <button onClick={handleBackButton} className="button back-btn">
        Back
      </button>
      <div className="category container">
        <h1 className="category-heading">Categories</h1>
        <div className="category-grid">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.idCategory} className="category-card">
                <button
                  onClick={() => handleCategoryClick(category.strCategory)}
                  className="category-btn"
                >
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className="category-img"
                  />
                  <span>{category.strCategory}</span>
                </button>
              </div>
            ))
          ) : (
            <p className="memo loading">Loading categories...</p>
          )}
        </div>
      </div>
    </>
  );
};
