import React, { useState, useEffect } from "react";
import Link  from "next/link";
import styles from "./style.module.scss";
import { BASE_URL } from "../../url";

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
        console.error("Erreur lors de la récupération des catégories :", error),
      );
  }, []);

  useEffect(() => {
    // Charger les sous-catégories pour chaque catégorie
    const fetchSubcategories = async () => {
      const subcategoriesData = await Promise.all(
        categories.map((category) =>
          fetch(`${BASE_URL}/subcategories?category=${category}`)
            .then((res) => res.json())
            .catch((error) => {
              console.error(
                `Erreur lors de la récupération des sous-catégories pour ${category} :`,
                error,
              );
              return [];
            }),
        ),
      );

      // Construire un objet associant chaque catégorie à ses sous-catégories
      const subcategoriesObj = {};
      categories.forEach((category, index) => {
        subcategoriesObj[category] = subcategoriesData[index];
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

  // Modification de l'ordre des catégories
  const order = ["Caméras", "Réseau", "Logiciels", "Autres"];

  // Trier les catégories selon l'ordre spécifié
  const sortedCategories = categories.sort(
    (a, b) => order.indexOf(a) - order.indexOf(b),
  );

  return (
    <div className={styles["shopNav-container"]}>
      <ul>
        {/* création d'une li pour chaque catégorie trouvée dans la base de données */}
        {sortedCategories.map((category) => (
          <li key={category} className={styles.dropdown}>
            <label
              htmlFor={category}
              data-toggle="dropdown"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </label>
            <input type="checkbox" id={category} style={{ display: "none" }} />
            <ul
              className={styles["dropdown-menu"]}
              style={{ display: openCategory === category ? "block" : "none" }}
            >
              {subcategoriesMap[category]?.map((subcategory) => (
                <li key={subcategory}>
                  <Link
                    href={`/boutique/${category}/${subcategory}`}
                    onClick={() => toggleSubcategory(subcategory)}
                    className={
                      openSubcategory === subcategory ? styles.active : ""
                    }
                  >
                    {subcategory}
                  </Link>
                </li>
              ))}
              {/* création d'une li pour tous les produits de chaque catégorie */}
              <li>
                <Link href={`/boutique/${category}`}>Tous les produits</Link>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShopNav;
