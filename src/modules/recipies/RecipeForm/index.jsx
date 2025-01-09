import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecipe } from "../RecipeContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export const RecipeForm = () => {
    const { addRecipe } = useRecipe();
    const { register, handleSubmit, reset } = useForm();
    const [ingredients, setIngredients] = useState([{ ingredient: "", measure: "" }]);
    const [categories, setCategories] = useState([]); 
    const [areas, setAreas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.meals.map((item) => item.strCategory));
            });

        fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
            .then((response) => response.json())
            .then((data) => {
                setAreas(data.meals.map((item) => item.strArea));
            });
    }, []);

    const handleAddIngredient = () => {
        const isAnyEmpty = ingredients.some(
            (item) => item.ingredient.trim() === "" || item.measure.trim() === ""
        );
        if (isAnyEmpty) {
            return;
        }
        setIngredients([...ingredients, { ingredient: "", measure: "" }]);
    };

    const handleRemoveIngredients = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        setIngredients(updatedIngredients);
    };


    const onSubmit = (data) => {
        const formattedIngredients = ingredients.reduce((acc, item, index) => {
            if (item.ingredient && item.measure) {
                acc[`strIngredient${index + 1}`] = item.ingredient;
                acc[`strMeasure${index + 1}`] = item.measure;
            }
            return acc;
        }, {});

        const formattedRecipe = {
            idMeal: new Date().getTime().toString(),
            strMeal: data.strMeal,
            strInstructions: data.strInstructions,
            strMealThumb: data.strMealThumb || "default-image.jpg",
            strCategory: data.strCategory,
            strArea: data.strArea,
            strTags: data.strTags,
            strYoutube: data.strYoutube,
            strSource: data.strSource,
            strImageSource: data.strImageSource,
            strCreativeCommonsConfirmed: data.strCreativeCommonsConfirmed || false,
            ...formattedIngredients,
            dateModified: new Date().toISOString(),
        };

        addRecipe(formattedRecipe);
        reset();
        setIngredients([{ ingredient: "", measure: "" }]);
        navigate("/recipes");
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <>
            <button onClick={handleBackButton} className="button back-btn">
                Back
            </button>
            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Add a New Recipe</h2>
                    <input
                        className="form-element"
                        type="text"
                        placeholder="Recipe Name"
                        {...register("strMeal", { required: true })}
                    />
                    <textarea
                        className="textarea form-element"
                        placeholder="Instructions"
                        {...register("strInstructions", { required: true, minLength: 10 })}
                    />
                    <input
                        className="form-element"
                        type="url"
                        placeholder="Image URL"
                        {...register("strMealThumb", {
                            required: true,
                            pattern: {
                                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/,
                                message: "Please enter a valid image URL",
                            },
                        })}
                    />
                    <select
                        className="form-element"
                        {...register("strCategory", { required: true })}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <select
                        className="form-element"
                        {...register("strArea", { required: true })}
                    >
                        <option value="">Select Area</option>
                        {areas.map((area) => (
                            <option key={area} value={area}>
                                {area}
                            </option>
                        ))}
                    </select>
                    <input
                        className="form-element"
                        type="text"
                        placeholder="Tags (comma-separated)"
                        {...register("strTags")}
                    />
                    <input
                        className="form-element"
                        type="url"
                        placeholder="YouTube URL (optional)"
                        {...register("strYoutube", {
                            pattern: {
                                value: /^(https?:\/\/(?:www\.)?youtube\.com\/.*|https?:\/\/youtu\.be\/.*)$/,
                                message: "Please enter a valid YouTube URL",
                            },
                        })}
                    />
                    <input
                        className="form-element"
                        type="url"
                        placeholder="Source URL (optional)"
                        {...register("strSource")}
                    />
                    <input
                        className="form-element"
                        type="url"
                        placeholder="Image Source URL (optional)"
                        {...register("strImageSource")}
                    />
                    <label className="checkbox">
                        <input className="c-box" type="checkbox" {...register("strCreativeCommonsConfirmed")} />
                        <p className="c-box">Creative Commons Confirmed</p>
                    </label>
                    <h3>Ingredients</h3>
                    {ingredients.map((ing, index) => (
                        <div key={index} className="ingredient-row">
                            <input
                                type="text"
                                placeholder={`Ingredient ${index + 1}`}
                                value={ing.ingredient}
                                onChange={(e) =>
                                    handleIngredientChange(index, "ingredient", e.target.value)
                                }
                                className="ingredient_form-element"
                            />
                            <input
                                type="text"
                                placeholder={`Measure ${index + 1}`}
                                value={ing.measure}
                                onChange={(e) =>
                                    handleIngredientChange(index, "measure", e.target.value)
                                }
                                className="ingredient_form-element"
                            />
                            <div className="btn-box">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveIngredients(index)}
                                    className="button remove-btn"
                                >
                                    Remove
                                </button>
                                <button type="button" onClick={handleAddIngredient} className="button add-btn">
                                    Add Ingredient
                                </button></div>
                        </div>
                    ))}
                    <button className="button form-element" type="submit">
                        Add Recipe
                    </button>
                </form>
            </div>
        </>
    );
};