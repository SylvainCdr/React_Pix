import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import slugify from "slugify";

function ShopNav() {
  const [categories, setCategories] = useState([]);
  const [subcategoriesMap, setSubcategoriesMap] = useState({});

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

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

  // créer une fonction pour gérer la recherche
  const handleSearch = (e) => {
    setSearch(e.target.value);

    if (e.target.value.length > 0) {
      setSearching(true);

      // Rechercher des produits correspondant à la requête
      fetch(`http://localhost:3001/search?query=${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          setSearching(false);
        })
        .catch((error) => {
          console.error("Erreur lors de la recherche de produits :", error);
          setSearching(false);
        });
    } else {
      setSearchResults([]);
    }
  };

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

      <div className="search">
        {/* barre de recherche pour rechercher des produits par nom ou marque et les afficher sous forme de carte*/}

        {/* <input
          type="text"
          placeholder="Rechercher un produit"
          value={search}
          onChange={handleSearch}
        />
        {searching && <p>Recherche en cours...</p>}
        <div className="search-results">
          {searchResults.map((product) => (
            <Link
              to={`/Catalogue/${slugify(product.category)}/${slugify(
                product.subcategory
              )}/${product._id}`}
              key={product._id}
            >
              <div className="search-result">
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
              </div>
            </Link>
          ))}
        </div> */}

        
      </div>


    </div>
  );
}

export default ShopNav;
