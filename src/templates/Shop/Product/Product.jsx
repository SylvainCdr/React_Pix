// Product.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./style.module.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import ShopSearch from "../../../Components/ShopSearch/ShopSearch";
import useFavorites from "../../../Components/useFavorites";
import useCart from "../../../Components/useCart";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import Swal from "sweetalert2";
import AOS from "aos";
import { logos } from "../../Shop/Product/LogosData";
import { BASE_URL } from "../../../url";

export default function Product() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [suggestion, setSuggestion] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isInFavorites, setIsInFavorites] = useState(false);

  // Utilisez le hook useFavorites
  const { addToFavorites, removeFromFavorites, checkFavorite, getFavorites } =
    useFavorites();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Retrieve user data from local storage
  const userDataString = localStorage.getItem("user");

  // Parse the user data string to a JSON object
  const userData = JSON.parse(userDataString) ? JSON.parse(userDataString) : "";
  const userId = userData ? userData._id : null;
  console.log("ID de l'utilisateur:", userId);

  // Retrieve discount from user data
  const discount = userData.discount ? userData.discount : 0;
  console.log("Discount:", discount);
  const calculateDiscount = (price, discount) => {
    return price - (price * discount) / 100;
  };

  console.log("Marque du produit:", product.brand);
  const brandLogo = logos.find(
    (logo) => logo.name.toLowerCase() === product.brand?.toLowerCase(),
  );
  console.log("Logo trouvé:", brandLogo);

  // Create a mapping object to map the product details keys to their corresponding labels
  const labelsMapping = {
    dimensions: "Dimensions",
    poids: "Poids",
    temp: "Température",
    megapixels: "Mégapixels",
    distanceFocale: "Distance focale",
    ouverture: "Ouverture",
    angleVue: "Angle de vue",
    imgSec: "Images par seconde",
    capteur: "Capteur",
    resolution: "Résolution",
    couleur: "Couleur",
    infrarouge: "Infrarouge",
    distanceInfrarouge: "Distance infrarouge",
    indiceProtection: "Indice de protection",
    puissance: "Puissance",
    installationExt: "Installation extérieure",
    nbrePorts: "Nombre de ports",
    rackable: "Rackable",
    manageable: "Manageable",
    poe: "PoE",
    poePlus: "PoE+",
    poePlusPlus: "PoE++",
    consommation: "Consommation",
    garantie: "Garantie",
    vitesse: "Vitesse",
    typeWifi: "Type de WiFi",
    antenne: "Antenne",
    lan: "LAN",
    nebula: "Nebula",
  };

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setSuggestion(data));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`${BASE_URL}/products/` + id)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (userId && id) {
        try {
          const isInFavs = await checkFavorite(userId, id);
          setIsInFavorites(isInFavs);
        } catch (error) {
          console.error("Error in fetchFavoriteStatus:", error);
        }
      }
    };

    fetchFavoriteStatus();
  }, [userId, id, checkFavorite]);

  const handleToggleFavoritesClick = async () => {
    if (userId) {
      if (isInFavorites) {
        await removeFromFavorites(userId, id);
      } else {
        await addToFavorites(
          userId,
          id,
          product.name,
          product.price,
          product.ref,
          product.image,
        );
      }

      setIsInFavorites(!isInFavorites);
    } else {
      // Afficher un message SweetAlert indiquant à l'utilisateur de se connecter ou de s'inscrire
      Swal.fire({
        icon: "info",
        title:
          "Pour ajouter un produit à vos favoris, veuillez vous connecter ou vous inscrire.",
        showConfirmButton: true,
      });
    }
  };

  // ajout du panier en cliquant sur le bouton et en prenant compte de la quantité
  const handleAddToCartClick = async () => {
    if (userId) {
      const added = await addToCart(
        userId,
        id,
        product.name,
        product.ref,
        quantity,
        product.price,
        product.image,
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

  const calculateDiscountedPrice = () => {
    if (userId && product.price && discount) {
      const discountedPrice = calculateDiscount(product.price, discount);
      return (
        <p className={styles.prices}>
          <span className={styles["original-price"]}>
            {product.price.toFixed(2)} €
          </span>
          <span className={styles["discounted-price"]}>
            {discountedPrice.toFixed(2)} € <span> HT</span>
          </span>
        </p>
      );
    } else {
      return (
        <p className={styles.price}>
          {product.price ? product.price.toFixed(2) : "00.00"} €<span>HT</span>
        </p>
      );
    }
  };

  // Initialiser AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className={styles["product-container"]}>
      <ShopNav />
      <ShopSearch setSearchResults={setSearchResults} />

      {searchResults.length === 0 && (
        <div className={styles["product-page"]}>
          <div className={styles["product-section1"]}>
            <div data-aos="zoom-in-right" className={styles["product-img"]}>
              {discount !== 0 && (
                <span className={styles["discount-badge"]}>-{discount}%</span>
              )}

              <img
                src={
                  product.image && product.image.startsWith("http")
                    ? product.image
                    : `${BASE_URL}${product.image}`
                }
                alt={product.name}
              />
              <p
                className={styles.like}
                data-aos="zoom-in-left"
                onClick={handleToggleFavoritesClick}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="fa-solid fa-heart"
                  style={{ color: isInFavorites ? "#ed3f3f" : "inherit" }}
                ></i>
              </p>
            </div>
            <div className={styles["product-description"]}>
              <h1>{product.name}</h1>

              {brandLogo ? (
                <img
                  src={brandLogo.logo}
                  alt={product.brand}
                  className={styles["brand-logo"]}
                />
              ) : (
                <p className={styles["brand-logo"]}>{product.brand}</p>
              )}

              <p className={styles.presentation}>{product.presentation} </p>

              {/* TODO : Chercher l'etat du stock dans Axonaut */}
              <p className={styles.stock}>
                <i className="fa-solid fa-check"></i> Disponible sur commande
              </p>
              <div className={styles.delivery}>
                <p>
                  <i className="fa-solid fa-truck-fast"></i> Livraison sous 2 à
                  3 semaines
                </p>
                <img
                  src="https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg"
                  alt="DHL"
                />
                <img
                  src="https://www.chronopost.fr/sites/chronopost/themes/custom/chronopost/images/chronopost_logo.png"
                  className={styles.chrono}
                  alt="chronopost"
                />
              </div>
              <div className={styles["price-addToCart"]}>
                {/* // bouton avec + - pour ajouter ou retirer des produits */}
                <div className={styles.price}>
                  <p className={styles.prices}>{calculateDiscountedPrice()} </p>
                </div>
                <div className={styles.quantity}>
                  <button
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity === 1}
                    className={styles["qty-input"]}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={styles["qty-input"]}
                  >
                    +
                  </button>
                </div>

                <button onClick={handleAddToCartClick}>
                  Ajouter au panier
                </button>
              </div>
              <p className={styles.ref}>Référence : {product.ref}</p>
            </div>
          </div>

          <div className={styles["product-section2"]}>
            <div className={styles["product-details"]}>
              <h3>Détails du produit</h3>
              <p>{product.description}</p>
              <table>
                <tbody>
                  {product.details &&
                    Object.keys(product.details).map(
                      (key) =>
                        // Vérifiez si la valeur n'est pas une chaîne vide avant d'afficher la ligne
                        product.details[key] !== "" && (
                          <tr key={key}>
                            {/* Utilisez l'objet de correspondance pour obtenir le libellé correspondant à la clé */}
                            <td>{labelsMapping[key] || key}</td>
                            {/* Affichez la valeur */}
                            <td>{product.details[key]}</td>
                          </tr>
                        ),
                    )}
                </tbody>
              </table>

              {product.pdf && (
                <a
                  href={product.pdf}
                  download
                  target="_blank"
                  className={styles["pdf-link"]}
                >
                  Fiche technique <i className="fa-solid fa-file-pdf"></i>
                </a>
              )}
            </div>

            <div className={styles["product-suggestions"]}>
              <h3>Produits similaires</h3>
              <div className={styles["suggestions-grid"]}>
                {suggestion
                  .filter(
                    (item) =>
                      item.subcategory === product.subcategory &&
                      item.brand === product.brand,
                  )
                  .slice(0, 4)
                  .map((item) => (
                    <ProductCard
                      key={item.id}
                      product={item}
                      isInFavorites={isInFavorites}
                      addToFavorites={addToFavorites}
                      removeFromFavorites={removeFromFavorites}
                      checkFavorite={checkFavorite}
                      getFavorites={getFavorites}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
