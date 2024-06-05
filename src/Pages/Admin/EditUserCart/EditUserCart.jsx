import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.scss";

export default function EditUserCart() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [userCart, setUserCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user's cart from the server
    fetch(`http://localhost:3001/users/${userId}/cart`)
      .then((response) => response.json())
      .then((data) => {
        setUserCart(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user cart:", error);
        setError("Erreur lors de la récupération du panier");
        setLoading(false);
      });
  }, [userId]);

  const handleInputChange = (index, field, value) => {
    const newCart = [...userCart];
    newCart[index][field] = value;
    setUserCart(newCart);
  };

  const handleSaveChanges = () => {
    fetch(`http://localhost:3001/users/${userId}/edit-user-cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCart),
    })
      .then((response) => {
        if (response.ok) {
          alert("Panier mis à jour avec succès !");
          navigate('/admin/paniers');  // Redirigez vers la liste des paniers après la mise à jour
        } else {
          alert("Erreur lors de la mise à jour du panier");
        }
      })
      .catch((error) => {
        console.error("Error updating user cart:", error);
        alert("Erreur lors de la mise à jour du panier");
      });
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="editUserCart">
      <h1>Modification du panier de  </h1>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {userCart.map((product, index) => (
            <tr key={product.product_id}>
              <td><img src={product.image} alt="" /> </td>
              <td>{product.name}</td>
        
              <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleInputChange(index, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSaveChanges}>Enregistrer les modifications</button>
    </div>
  );
}
