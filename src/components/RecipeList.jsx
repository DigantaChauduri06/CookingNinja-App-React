import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import trash from "../Assets/del_key.svg";
import "./RecipieList.css";
import { projectFirestore } from "../firebase/config";

function RecipeList({ recipes }) {
  const { mode } = useTheme();
  const handleDelete = (id) => {
    projectFirestore
      .collection("recipes")
      .doc(id)
      .delete()
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {}, [recipes]);
  return (
    <div className={`recipe-list ${mode}`}>
      {recipes.map((recipe) => {
        return (
          <div key={recipe.id} className="card">
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make</p>
            <div>{recipe.method?.substr(0, 100)}...</div>
            <Link to={`/recipe/${recipe.id.toString()}`}>Cook this</Link>
            <div style={{ height: 0, textAlign: "end" }}>
              <img
                src={trash}
                alt=""
                onClick={() => handleDelete(recipe.id)}
                style={{ width: "10%", fill: "InfoText", cursor: "pointer" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecipeList;
