import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const [product, setProduct] = useState({}); // Initialisez product en tant qu'objet
  const { id } = useParams();

  useEffect(() => {
    // Assurez-vous que l'id est défini avant d'effectuer la requête
    if (id) {
      fetch("http://localhost:3001/products/" + id)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]); // Inclure id dans la liste de dépendances

  console.log(product);

  return (
    <div className="main">
      <h2>{product.name}</h2>
      <p>{product.ref}</p>
      <p>{product.brand}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <p>{product.price} €</p>
    </div>
  );
}
