import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";


const ProductCard = ({
    product,
    addToFavorites,
    removeFromFavorites,
    checkFavorite,
    addToCart,
    id,
    quantity,
  }) => {
    const [isInFavorites, setIsInFavorites] = useState(false);

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
      console.log("Trying to remove product with ID:", product._id);
      try {
        if (userId) {
          if (isInFavorites) {
            await removeFromFavorites(userId, product._id);
          } else {
            await addToFavorites(
              userId,
              product._id,
              product.name,
              product.price,
              product.ref,
              product.image
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
            <p className="original-price">{product.price.toFixed(2)} € </p>
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

    const handleAddToCartClick = async () => {
      if (userId) {
        const added = await addToCart(
          userId,
          product._id,
          product.name,
          product.ref,
          quantity = 1,
          product.price,
          product.image
        );
        if (added) {
          console.log("Produit ajouté au panier avec succès!");
        } else {
          console.error("Erreur lors de l'ajout du produit au panier");
        }
      } else {
        console.error("L'ID de l'utilisateur n'est pas disponible.");
      }
    }




    
  
    return (
      <div className="product-card">
        {discount !== 0 && <span className="discount-badge">-{discount}%</span>}  
        <img src={product.image} alt={product.name} className="card-img" />
        
        <div className="card-title">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
        </div>
        <p className="card-brand">{product.brand} 
       
        </p>
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
              {/* <a href="#">
                <i className="fa-solid fa-cart-plus"></i>
              </a> */}
              <i
                className="fa-solid fa-cart-plus"
                onClick={handleAddToCartClick}
                style={{ cursor: "pointer" }}
              ></i>
            </p>
          </div>
        </div>
      </div>
    );
  };

    export default ProductCard;