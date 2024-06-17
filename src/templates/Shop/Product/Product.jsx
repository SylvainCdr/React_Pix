import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import useFavorites from "@/Components/useFavorites";
import useCart from "@/Components/useCart";
import ProductCard from "@/Components/ProductCard/ProductCard";
import Swal from "sweetalert2";
import AOS from "aos";
import { logos } from "@/templates/Shop/Product/LogosData";
import { BASE_URL } from "@/url";
import { useGetUser } from "@/Components/useGetUser";

export default function Product({ product, id, suggestions }) {
  const { addToFavorites, removeFromFavorites, checkFavorite, getFavorites } =
    useFavorites();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Get the user and discount from the context
  const user = useGetUser();
  // Destructure the user object to get the user ID and discount
  const userId = user?._id;
  const discount = user?.discount ?? 0;

  const calculateDiscount = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const brandLogo = logos.find(
    (logo) => logo.name.toLowerCase() === product.brand?.toLowerCase()
  );

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

  const [isInFavorites, setIsInFavorites] = useState(false);
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
          product.image
        );
      }

      setIsInFavorites(!isInFavorites);
    } else {
      Swal.fire({
        icon: "info",
        title:
          "Pour ajouter un produit à vos favoris, veuillez vous connecter ou vous inscrire.",
        showConfirmButton: true,
      });
    }
  };

  const handleAddToCartClick = async () => {
    if (userId) {
      const added = await addToCart(
        userId,
        id,
        product.name,
        product.ref,
        quantity,
        product.price,
        product.image
      );
      if (added) {
        console.log("Produit ajouté au panier avec succès!");
      } else {
        console.error("Erreur lors de l'ajout du produit au panier");
      }
    } else {
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

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className={styles["product-container"]}>
      <ShopNav />
      <ShopSearch />

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

            <p className={styles.presentation}>{product.presentation}</p>

            <p className={styles.stock}>
              <i className="fa-solid fa-check"></i> Disponible sur commande
            </p>
            <div className={styles.delivery}>
              <p>
                <i className="fa-solid fa-truck-fast"></i> Livraison sous 2 à 3
                semaines
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
              <div className={styles.price}>
                <p className={styles.prices}>{calculateDiscountedPrice()}</p>
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

              <button onClick={handleAddToCartClick}>Ajouter au panier</button>
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
                      product.details[key] !== "" && (
                        <tr key={key}>
                          <td>{labelsMapping[key] || key}</td>
                          <td>{product.details[key]}</td>
                        </tr>
                      )
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
              {suggestions.map((item) => (
                <ProductCard
                  key={item._id}
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
    </div>
  );
}
