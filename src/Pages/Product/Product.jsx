import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.scss";
import { useHistory } from "react-router-dom";

export default function Product() {
  const [product, setProduct] = useState({}); // Initialisez product en tant qu'objet
  const { id } = useParams();
  const [suggestion, setSuggestion] = useState([]); // Initialisez suggestions en tant que tableau

  // Utilisez useEffect pour effectuer une requête à l'API
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setSuggestion(data));
  }, []); // Utilisez une liste de dépendances vide pour exécuter cette requête une seule fois

  useEffect(() => {
    // Assurez-vous que l'id est défini avant d'effectuer la requête
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

  console.log(product);

  return (
    <div className="product-container">
      <div className="product-section1">
        <div className="product-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-description">
          <div className="price-like">
            <p className="price">
              {product.price} €<span>TTC</span>
            </p>
            <p className="like">
              <a href="#">
                <i class="fa-solid fa-heart"></i>
              </a>
            </p>
          </div>
          <h2>{product.name}</h2>
          <p className="brand">{product.brand}</p>
          <p className="presentation">{product.presentation}</p>

          {/* TODO : Chercher l'etat du stock dans Axonaut */}
          <p className="stock">En stock</p>

          <p className="livraison">
            <i class="fa-solid fa-truck-fast"></i>Livraison en 72h
          </p>

          <div className="add-to-cart">
            <div className="quantity">
              <button>
                <i class="fa-solid fa-minus"></i>
              </button>
              <span>1</span>
              <button>
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <button className="add">Ajouter au panier</button>
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
  );
}
