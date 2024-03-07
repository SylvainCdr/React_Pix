import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import Search from "../../../Components/Search/Search";
import useFavorites from "../../../Components/useFavorites";



const Products = () => {

  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);

    if (userData && userData._id) {
      setUserId(userData._id);
      console.log("ID de l'utilisateur:", userData._id);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = subcategory
        ? `http://localhost:3001/products?category=${encodeURIComponent(
            category
          )}&subcategory=${encodeURIComponent(subcategory)}`
        : `http://localhost:3001/products?category=${encodeURIComponent(
            category
          )}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProducts();
  }, [location.pathname, category, subcategory]);

  return (
    <div className="products-container">
      <ShopNav />
      <Search setSearchResults={setSearchResults} />

      {searchResults.length === 0 && (
        <div className="products">
          <div className="products-title">
            <h1>{category} </h1>
          </div>

          <div className="products-grid">
            {products.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                userId={userId}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                checkFavorite={checkFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({
  product,
  userId,
  addToFavorites,
  removeFromFavorites,
  checkFavorite,
}) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (userId) {
        try {
          const isInFavs = await checkFavorite(userId, product._id);
          setIsInFavorites(isInFavs);
        } catch (error) {
          console.error("Error in fetchFavoriteStatus:", error);
        }
      }
    };

    fetchFavoriteStatus();
  }, [userId, product._id, checkFavorite]);

  const handleToggleFavoritesClick = async () => {
    try {
      if (userId) {
        if (isInFavorites) {
          await removeFromFavorites(userId, product._id);
        } else {
          await addToFavorites(
            userId,
            product._id,
            product.name,
            product.price
          );
        }

        // Mettez à jour isInFavorites après le succès de l'opération
        setIsInFavorites(!isInFavorites);
      } else {
        console.error("L'ID de l'utilisateur n'est pas disponible.");
      }
    } catch (error) {
      console.error("Erreur lors de la gestion des favoris :", error);
    }
  };

    // on récupère les données de l'utilisateur à partir du stockage local et on récupère la valeur discount
const userDataString = localStorage.getItem("user");
const userData = JSON.parse(userDataString) ? JSON.parse(userDataString) : "";
const discount = userData.discount ? userData.discount : 0;
console.log("Discount:", discount);

// on crée une fonction pour calculer le prix après réduction
const calculateDiscount = (price, discount) => {
  return price - (price * discount) / 100;
};

  const calculateDiscountedPrice = () => {
    if (userId && product.price && discount) {
      const discountedPrice = calculateDiscount(product.price, discount);
      return (
        <div className="card-prices">
          <p className="original-price">{product.price} € </p>
          <p className="discounted-price">
            {discountedPrice.toFixed(2)} € <span>TTC</span>{" "}
          </p>
        </div>
      );
    } else {
      return (
        <span className="card-price">
          {product.price ? product.price.toFixed(2) : "00.00"} €
          <span>TTC</span>
        </span>
      );
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="card-img" />
      <div className="card-title">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
      </div>
      <p className="card-brand">{product.brand}</p>
      <div className="card-bottom">
        {calculateDiscountedPrice()}
        <div className="CTA">
          <p
            className="heart"
            onClick={handleToggleFavoritesClick}
            style={{ cursor: "pointer" }}
          >
            <i
              className="fa-solid fa-heart"
              style={{ color: isInFavorites ? "#ed3f3f" : "#838485" }}
            ></i>
          </p>
          <p className="cart">
            <a href="#">
              <i className="fa-solid fa-cart-plus"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;
