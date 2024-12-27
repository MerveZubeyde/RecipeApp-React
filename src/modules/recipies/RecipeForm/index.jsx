import React from "react";
import { useForm } from "react-hook-form";
import { useRecipe } from "../RecipeContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export const RecipeForm = () => {
    const { addRecipe } = useRecipe();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();


    const onSubmit = (data) => {
        const formattedRecipe = {
            idMeal: new Date().getTime().toString(),
            strMeal: data.strMeal,
            strInstructions: data.strInstructions,
            strMealThumb: data.strMealThumb || "default-image.jpg",
            strCategory: data.strCategory || "Uncategorized",
        };

        addRecipe(formattedRecipe);
        reset();
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
                        {...register("strInstructions", { required: true })}
                    />
                    <input
                        className="form-element"
                        type="text"
                        placeholder="Image URL"
                        {...register("strMealThumb")}
                    />
                    <input
                        className="form-element"
                        type="text"
                        placeholder="Category"
                        {...register("strCategory")}
                    />
                    <button className="button form-element" type="submit">
                        Add Recipe
                    </button>
                </form>
            </div>
        </>
    );
};