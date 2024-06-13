import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const BASE_URL = "http://localhost:3002"; // Assurez-vous que le port est correct

function ShopNav() {
  const [categories, setCategories] = useState([]);
  const [subcategoriesMap, setSubcategoriesMap] = useState({});
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(null);

  useEffect(() => {
    // Charger toutes les catégories
    fetch(`${BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des catégories :", error)
      );
  }, []);

  console.log(categories);

  useEffect(() => {
    // Charger les sous-catégories pour chaque catégorie
    const fetchSubcategories = async () => {
      const subcategoriesData = await Promise.all(
        categories.map((category) =>
          fetch(`${BASE_URL}/subcategories?categoryId=${category.id}`)
            .then((res) => res.json())
            .catch((error) => {
              console.error(
                `Erreur lors de la récupération des sous-catégories pour ${category.name} :`,
                error
              );
              return [];
            })
        )
      );

      // Construire un objet associant chaque catégorie à ses sous-catégories
      const subcategoriesObj = {};
      categories.forEach((category, index) => {
        subcategoriesObj[category.name] = subcategoriesData[index];
      });

      setSubcategoriesMap(subcategoriesObj);
    };

    if (categories.length > 0) {
      fetchSubcategories();
    }
  }, [categories]);

  // Fonction pour ouvrir ou fermer le menu déroulant d'une catégorie
  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenSubcategory(null); // Fermer le dropdown de la sous-catégorie lorsqu'on ouvre une nouvelle catégorie
  };

  // Fonction pour ouvrir ou fermer le menu déroulant d'une sous-catégorie
  const toggleSubcategory = (subcategory) => {
    setOpenSubcategory(openSubcategory === subcategory ? null : subcategory);
    setOpenCategory(null); // Fermer le dropdown de la catégorie lorsqu'on clique sur une sous-catégorie
  };

  return (
    <div className={styles["shopNav-container"]}>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className={styles.dropdown}>
            <label
              htmlFor={category.name}
              data-toggle="dropdown"
              onClick={() => toggleCategory(category.name)}
            >
              {category.name}
            </label>
            <input
              type="checkbox"
              id={category.name}
              style={{ display: "none" }}
            />
            <ul
              className={styles["dropdown-menu"]}
              style={{
                display: openCategory === category.name ? "block" : "none",
              }}
            >
              {subcategoriesMap[category.name]?.map((subcategory) => (
                <li key={subcategory.id}>
                  <Link
                    to={`/boutique/${category.name}/${subcategory.name}`}
                    onClick={() => toggleSubcategory(subcategory.name)}
                    className={
                      openSubcategory === subcategory.name ? styles.active : ""
                    }
                  >
                    {subcategory.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={`/boutique/${category.name}`}>Tous les produits</Link>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShopNav;
