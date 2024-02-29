import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import Search from "../../../Components/Search/Search";
import Cart from "../../Shop/Cart/Cart";
import useFavorites from "../../../Components/useFavorites";  

export default function Product() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [suggestion, setSuggestion] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]); // Nouvel état local pour le panier


  // Utilisez la fonction useFavorites pour obtenir les fonctions addToFavorites
  const { addToFavorites, isAddingToFavorites } = useFavorites();
  const [isInFavorites, setIsInFavorites] = useState(false); // Nouvel état pour suivre si le produit est dans les favoris



// on récupère l'ID de l'utilisateur depuis le stockage local
const userId = localStorage.getItem("userId");
console.log("ID de l'utilisateur:", userId);



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
  }, [id]); // Inclure id dans la liste de dépendances

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
    // Vérifier si le produit est déjà dans les favoris
    // Utiliser userId et product._id pour vérifier
    // Mettre à jour l'état isInFavorites en conséquence
    // Cette logique pourrait varier en fonction de la structure de vos données côté serveur
    const checkIfInFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}/favorites`);
        if (response.ok) {
          const favoritesData = await response.json();
          const isInFavorites = favoritesData.favorites.some(favorite => favorite.product_id === product._id);
          setIsInFavorites(isInFavorites);
        } else {
          console.error('Erreur lors de la récupération des favoris de l\'utilisateur');
        }
      } catch (error) {
        console.error('Erreur réseau:', error);
      }
    };

    if (userId) {
      checkIfInFavorites();
    }
  }, [userId, product._id]);


   // Modifiez la fonction handleAddToCartClick pour appeler addToFavorites
   const handleAddToCartClick = () => {
    // Ajoutez ici la logique pour ajouter le produit au panier
    // Utilisez l'état local et la fonction setCart pour mettre à jour le panier
    setCart([...cart, product]);
    console.log('Produit ajouté au panier :', product);
  };

  // Nouvelle fonction pour ajouter le produit aux favoris
  const handleAddToFavoritesClick = () => {
    if (userId) {
      addToFavorites(
        userId,
        product._id,
        product.name,
        product.price
      );
    } else {
      console.error("L'ID de l'utilisateur n'est pas disponible.");
      // Vous pouvez ajouter une logique pour gérer le cas où l'ID de l'utilisateur n'est pas disponible.
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
                    {product.price} €<span>TTC</span>
                  </p>
                  <p className="like" onClick={handleAddToFavoritesClick} style={{ cursor: 'pointer' }}>
                    <i className={`fa-solid fa-heart${isInFavorites ? "-filled" : ""}`}></i>
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
  {/* <div className="quantity">
    <button>
      <i className="fa-solid fa-minus"></i>
    </button>
    <span>1</span>
    <button>
      <i className="fa-solid fa-plus"></i>
    </button>
  </div> */}
  <button onClick={handleAddToCartClick} className="add">Ajouter au panier</button>
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
          <p className="price">{item.price} €</p>
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