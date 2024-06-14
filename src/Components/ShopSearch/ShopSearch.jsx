import React, { useState } from "react";
import styles from "./style.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import useFavorites from "../useFavorites";
import useCart from "../useCart";
import { BASE_URL } from "../../url";

function ShopSearch({ setSearchResults }) {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResultsLocal, setSearchResultsLocal] = useState([]);

  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCart();

  // créer une fonction pour gérer la recherche
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission

    if (search.length > 0) {
      setSearching(true);

      // Rechercher des produits correspondant à la requête
      fetch(`${BASE_URL}/search?query=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResultsLocal(data);
          setSearching(false);
          // Pass search results to the parent component
          setSearchResults(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la recherche de produits :", error);
          setSearching(false);
        });
    } else {
      setSearchResultsLocal([]);
      // Pass an empty array to the parent component when search is cleared
      setSearchResults([]);
    }
  };

  return (
    <div className={styles["search-container"]}>
      <form onSubmit={handleSearch}>
        <div className={styles["search-bar"]}>
          <input
            type="text"
            placeholder="Rechercher un produit"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </div>
      </form>

      {searching && <p>Recherche en cours...</p>}

      {/* si résultats de recherche locaux n'est pas vide, afficher les résultats */}
      {searchResultsLocal.length > 0 && (
        <div className={styles["search-msg"]}>
          <p>Résultats de recherche ({searchResultsLocal.length} produits) :</p>
        </div>
      )}

      <div className={styles["search-grid"]}>
        {searchResultsLocal.map((result) => (
          <ProductCard
            key={result._id}
            product={result}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            checkFavorite={checkFavorite}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopSearch;
