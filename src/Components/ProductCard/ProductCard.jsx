import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Swal from "sweetalert2";
import Aos from "aos";
import { logos } from "../../Pages/Shop/Product/LogosData";
import { BASE_URL } from "../../url";

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

  // on récupère l'id de l'utilisateur à partir du stockage local
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);

    if (userData && userData._id) {
      setUserId(userData._id);
      console.log("ID de l'utilisateur:", userData._id);
    }
  }, []);

  // on vérifie si le produit est dans les favoris de l'utilisateur
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

  // on crée une fonction pour gérer l'ajout et la suppression des favoris
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
        // Si l'user n'est pas authentifié alors afficher un message SweetAlert indiquant à l'utilisateur de se connecter ou de s'inscrire
        Swal.fire({
          icon: "info",
          title:
            "Pour ajouter un produit à vos favoris, veuillez vous connecter ou vous inscrire.",
          showConfirmButton: true,
        });
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

  // on crée une fonction pour calculer le prix après réduction si l'utilisateur authentifié possède une réduction
  const calculateDiscountedPrice = () => {
    if (userId && product.price && discount) {
      const discountedPrice = calculateDiscount(product.price, discount);
      return (
        <div className="card-prices">
          <p className="original-price">{product.price.toFixed(2)} € </p>
          <p className="discounted-price">
            {discountedPrice.toFixed(2)} € <span>HT</span>{" "}
          </p>
        </div>
      );
    } else {
      return (
        // Si l'utilisateur n'est pas authentifié ou si le produit n'a pas de prix remisé, afficher le prix normal
        <span className="card-price">
          {product.price ? product.price.toFixed(2) : "00.00"} €<span> HT</span>
        </span>
      );
    }
  };

// on crée une fonction pour ajouter un produit au panier
  const handleAddToCartClick = async () => {
    if (userId) {
      const added = await addToCart(
        userId,
        product._id,
        product.name,
        product.ref,
        (quantity = 1),
        product.price,
        product.image
      );
      if (added) {
        console.log("Produit ajouté au panier avec succès!");
      } else {
        console.error("Erreur lors de l'ajout du produit au panier");
      }
    } else {
      // Afficher un message SweetAlert indiquant à l'utilisateur de se connecter ou de s'inscrire
      Swal.fire({
        icon: "info",
        title:
          "Pour ajouter un produit au panier, veuillez vous connecter ou vous inscrire.",
        showConfirmButton: true,
      });
    }
  };

  //aos
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  console.log("Marque du produit:", product.brand);
  const brandLogo = logos.find(logo => logo.name.toLowerCase() === product.brand?.toLowerCase());
  console.log("Logo trouvé:", brandLogo);




  return (
    <div className="product-card">
      {discount !== 0 && <span className="discount-badge">-{discount}%</span>}
      {product.image.startsWith("http") ? (
                        <img src={product.image} alt="" className="product-img" />
                      ) : (
                        <img
                          src={`${BASE_URL}${product.image}`}
                          alt="" 
                          className="product-img"
                        />
                      )}

      <div className="card-title">
        <Link to={`/boutique/produit/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
      </div>
      <div className="card-brand">
      {/* <p className="card-brand">{product.brand}</p> */}
      {brandLogo && (
        <img
          src={brandLogo.logo}
          alt={brandLogo.name}
          className="brand-logo"
        />
      )}
</div>
     

     
      <div className="card-bottom">
        {calculateDiscountedPrice()}
        <div className="CTA">
          <p
            data-aos="zoom-in-down"
            className="heart"
            onClick={handleToggleFavoritesClick}
            style={{ cursor: "pointer" }}
          >
            <i
              className="fa-solid fa-heart"
              style={{ color: isInFavorites ? "#ed3f3f" : "#838485" }}
            ></i>
          </p>
          <p data-aos="zoom-in-down" className="cart">
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
