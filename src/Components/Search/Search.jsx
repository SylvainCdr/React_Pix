import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function Search({ setSearchResults }) {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResultsLocal, setSearchResultsLocal] = useState([]);

  // créer une fonction pour gérer la recherche
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission

    if (search.length > 0) {
      setSearching(true);

      // Rechercher des produits correspondant à la requête
      fetch(`http://localhost:3001/search?query=${search}`)
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
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="search-bar">
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


<div className="search-msg">
        {/* // si résultats de recherche locaux n'est pas vide, afficher les résultats */}
        {searchResultsLocal.length > 0 && (
          <p>Résultats de recherche ({searchResultsLocal.length} produits) :</p> 
        )}
        </div>
    

      <div className="search-results">
        {searchResultsLocal.map((result) => (
          
          <div className="product-card" key={result.id}>
            <div className="card-title">
              <h2>{result.name}</h2>
            </div>
            <img src={result.image} alt={result.name} className="card-img" />
            <p className="card-price">
              {result.price} € <span>TTC</span>
            </p>
            <p>{result.brand}</p>
            <div className="buttons">
          <Link to={`/product/${result._id}`}> <button className="button-see">
               Voir
              </button> </Link>
             
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Search;
