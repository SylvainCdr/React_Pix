import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function Categories ({ categories }) {

    // on affiche tous les produits de la catégorie sélectionnée

    const productsByCategory = (category) => {
        console.log(category)
    }
    




  return (
    <div className="categories">
      <h2>Catégories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/catalogue/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}