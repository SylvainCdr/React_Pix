import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import Search from "../../../Components/Search/Search";
import Cart from "../../Shop/Cart/Cart";
import useFavorites from "../../../Components/useFavorites";
import useCart from "../../../Components/useCart";

export default function Product() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [suggestion, setSuggestion] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [isInFavorites, setIsInFavorites] = useState(false);

  // Utilisez le hook useFavorites
  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);


  // Retrieve user data from local storage
  const userDataString = localStorage.getItem("user");

  // Parse the user data string to a JSON object
  const userData = JSON.parse(userDataString);

  // Extraction de l'ID de l'utilisateur ou null si l'utilisateur n'est pas connecté
  const userId = userData ? userData._id : null;
  console.log("ID de l'utilisateur:", userId);

  // Créez un objet de correspondance pour mapper les clés de l'objet details à des libellés
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

    // Ajoutez d'autres mappages au besoin
  };

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setSuggestion(data));
  }, []);

  useEffect(() => {
    if (id) {
      fetch("http://localhost:3001/products/" + id)
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
        await addToFavorites(userId, id, product.name, product.price);
      }

      setIsInFavorites(!isInFavorites);
    } else {
      console.error("L'ID de l'utilisateur n'est pas disponible.");
    }
  };

  // ajout du panier en cliquant sur le bouton et en prenant compte de la quantité
  const handleAddToCartClick = async () => {
    if (userId) {
      const added = await addToCart(userId, id, product.name, product.ref, quantity);
      if (added) {
        console.log("Produit ajouté au panier avec succès!");
      } else {
        console.error("Erreur lors de l'ajout du produit au panier");
      }
    } else {
      console.error("L'ID de l'utilisateur n'est pas disponible.");
    }
  };

  return (
    <div className="product-container">
      <ShopNav />
      <Search setSearchResults={setSearchResults} />

      {searchResults.length === 0 && (
        <div className="product-page">
          <div className="product-section1">
            <div className="product-img">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-description">
              <div className="price-like">
                <p className="price">
                  {product.price} €<span>HT</span>
                </p>
                <p
                  className="like"
                  onClick={handleToggleFavoritesClick}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="fa-solid fa-heart"
                    style={{ color: isInFavorites ? "#ed3f3f" : "inherit" }}
                  ></i>
                </p>
              </div>
              <h2>{product.name}</h2>
              <p className="brand">{product.brand}</p>
              <p className="presentation">{product.presentation}</p>
              {/* TODO : Chercher l'etat du stock dans Axonaut */}
              <p className="stock">En stock</p>
              <p className="livraison">
                <i className="fa-solid fa-truck-fast"></i>Livraison en 72h
              </p>
              <div className="add-to-cart">
              {/* // bouton avec + - pour ajouter ou retirer des produits */}
            
              <div className="quantity">
                <button
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <p>{quantity}</p>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
          
                <button onClick={handleAddToCartClick} className="add">
                  Ajouter au panier
                </button>
              </div>
              <p className="ref">Référence : {product.ref}</p>
            </div>
          </div>

          <div className="product-section2">
            <div className="product-details">
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
                        )
                    )}
                </tbody>
              </table>
            </div>

            <div className="product-suggestions">
              <h3>Produits similaires</h3>
              <div className="suggestions-grid">
                {suggestion
                  .filter(
                    (item) =>
                      item.subcategory === product.subcategory &&
                      item.brand === product.brand
                  )
                  .slice(0, 4)
                  .map((item) => (
                    <Link to={`/product/${item._id}`} key={item._id}>
                      <div className="suggestions-products">
                        <p className="name">{item.name}</p>
                        <img src={item.image} alt={item.name} />
                        <p className="price">{item.price} € HT</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
