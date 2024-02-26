import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";


function ShopNav() {
  const [categories, setCategories] = useState([]);
  const [subcategoriesMap, setSubcategoriesMap] = useState({});
  

  useEffect(() => {
    // Charger toutes les catégories
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des catégories :", error)
      );
  }, []);

  useEffect(() => {
    // Charger les sous-catégories pour chaque catégorie
    const fetchSubcategories = async () => {
      const subcategoriesData = await Promise.all(
        categories.map((category) =>
          fetch(`http://localhost:3001/subcategories?category=${category}`)
            .then((res) => res.json())
            .catch((error) => {
              console.error(
                `Erreur lors de la récupération des sous-catégories pour ${category} :`,
                error
              );
              return [];
            })
        )
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

  

  return (
    <div className="shop-nav">
      <div className="dropdownmenu">
        <ul>
          {/* création d'une li pour chaque catégorie trouvée dans la base de données */}
          {categories.map((category) => (
            <li key={category}>
              <Link to={`/Catalogue/${category}`}>{category}</Link>

              <ul id="submenu">
                {subcategoriesMap[category]?.map((subcategory) => (
                  <li key={subcategory}>
                    <Link to={`/Catalogue/${category}/${subcategory}`}>
                      {subcategory}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

   
    </div>
  );
}

export default ShopNav;
