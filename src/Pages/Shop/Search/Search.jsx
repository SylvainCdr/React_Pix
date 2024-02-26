import React, { useState } from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";

const Search = ({ searchResults }) => {
  return (
    <div className="search-results">
      {searchResults.length > 0 ? (
        searchResults.map((product) => (
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
        ))
      ) : (
        <p>Aucun résultat trouvé</p>
      )}
    </div>
  );
};

export default Search;
