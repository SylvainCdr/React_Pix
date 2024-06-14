import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import AdminCartModal from "@/Components/AdminCartModal/AdminCartModal";
import { BASE_URL } from "@/url";
import { useRouter } from "next/router";

export default function AdminCarts() {
  const [allCarts, setAllCarts] = useState([]);
  const [selectedCart, setSelectedCart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter(); // Corrected here

  // Fetch all carts from the server
  useEffect(() => {
    fetch(`${BASE_URL}/all-carts`)
      .then((response) => response.json())
      .then((data) => {
        setAllCarts(data);
      })
      .catch((error) => {
        console.error("Error fetching carts:", error);
      });
  }, []);

  const handleViewClick = (cart) => {
    setSelectedCart(cart);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCart(null);
  };

  const handleEditClick = (cart) => {
    router.push(`/admin/paniers/modification/${cart.userId}`);
  };

  return (
    <div className={styles["adminCarts-container"]}>
      <h1>Paniers en cours </h1>
      <div className={styles["carts-list"]}>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Produit(s)</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Total</th>
              <th>Updated</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allCarts
              .filter((cart) => cart.cart.length > 0) // Filter out empty carts
              .map((cart) => (
                <tr key={cart.userId}>
                  <td>{cart.username}</td>
                  <td>{cart.cart.map((product) => product.name).join(", ")}</td>
                  <td>
                    {cart.cart.map((product) => product.quantity).join(" - ")}
                  </td>
                  <td>
                    {cart.cart.map((product) => product.price).join("€ - ")}€{" "}
                  </td>
                  <td>
                    {cart.cart
                      .map((product) => product.price * product.quantity)
                      .reduce((acc, curr) => acc + curr, 0)}
                    €
                  </td>
                  <td>
                    {cart.cart.length > 0
                      ? new Date(
                          cart.cart.reduce((latest, product) => {
                            const productDate = new Date(product.created);
                            return productDate > latest ? productDate : latest;
                          }, new Date(0))
                        ).toLocaleDateString("fr-FR")
                      : "Aucune date"}
                  </td>
                  <td>
                    <button onClick={() => handleViewClick(cart)}>Voir</button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditClick(cart)}
                      className={styles["modify-btn"]}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <AdminCartModal
          cart={selectedCart}
          user={{ username: selectedCart.username }}
          contact={{ contact: selectedCart.contact }}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
