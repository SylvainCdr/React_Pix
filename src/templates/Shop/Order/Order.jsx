import React, { useState, useEffect } from "react";
import useCart from "@/Components/useCart";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";
import styles from "./style.module.scss";
import { useGetUser } from "@/Components/useGetUser";

export default function Order() {
  const user = useGetUser();
  const { cart } = useCart();
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingCost, setShippingCost] = useState(20);
  const [totalAmount, setTotalAmount] = useState(0);
  const [billingAddress, setBillingAddress] = useState({
    street: "",
    zip: "",
    city: "",
    country: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (user) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        user: user._id,
      }));
    }
  }, [user]);

  const [order, setOrder] = useState({
    user: "",
    deliveryAddress: { street: "", city: "", zip: "", country: "" },
    items: [],
    delivery: {
      method: "",
      fee: "20",
    },
    orderDate: new Date().toLocaleDateString(),
    status: "pending",
    payment: {
      method: "",
      paid: false,
    },
    totalAmount: "",
  });

  useEffect(() => {
    const calculatedSubTotal = cart.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0);
    setSubTotal(calculatedSubTotal);
    const calculatedTax = calculatedSubTotal * 0.2;
    setTax(calculatedTax);
    const calculatedTotalAmount = calculatedSubTotal + calculatedTax + shippingCost;
    setTotalAmount(calculatedTotalAmount);
    setOrder((prevOrder) => ({
      ...prevOrder,
      totalAmount: calculatedTotalAmount,
    }));
  }, [cart, shippingCost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "zip", "country"].includes(name)) {
      setOrder((prev) => ({
        ...prev,
        deliveryAddress: {
          ...prev.deliveryAddress,
          [name]: value,
        },
      }));
    } else if (name === "deliveryMethod") {
      setOrder((prev) => ({
        ...prev,
        delivery: {
          ...prev.delivery,
          method: value,
        },
      }));
    } else if (name === "phone") {
      setPhoneNumber(value);
    } else if (name === "company") {
      setCompany(value);
    } else {
      // Mise à jour des informations de l'utilisateur
      const updatedUser = { ...user, [name]: value };
      fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update user");
          }
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  const handleOrderSubmission = async (e) => {
    e.preventDefault();
    if (
      !user?._id ||
      !user?.firstName ||
      !user?.lastName ||
      !user?.email ||
      !phoneNumber ||
      !billingAddress.street ||
      !billingAddress.zip ||
      !billingAddress.city ||
      !billingAddress.country ||
      !order.deliveryAddress.street ||
      !order.deliveryAddress.zip ||
      !order.deliveryAddress.city ||
      !order.deliveryAddress.country ||
      !order.delivery.method 
    ) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez remplir tous les champs obligatoires",
        timer: 2000,
      });
      return;
    }

    const response = await fetch(`${BASE_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        amount: order.totalAmount, // Pass the total amount to the backend
        currency: "eur",
      }),
    });

    const session = await response.json();

    if (response.ok) {
      // Rediriger vers la page de paiement Stripe
      window.location.href = session.url;
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la création de la session de paiement",
      });
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={styles["order-container"]}>
      <div className={styles["order-page"]}>
        <h1>Commande</h1>

        <form onSubmit={handleOrderSubmission}>
          <h2>
            <i className="fa-solid fa-user"></i> ETAPE 1 : Informations personnelles
          </h2>
          <div className={styles["customer-infos"]}>
            <div className={styles.details}>
              Prénom :{" "}
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={user.firstName || ""}
                onChange={handleChange}
              />
              Nom :{" "}
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={user.lastName || ""}
                onChange={handleChange}
              />
              Entreprise:{" "}
              <input
                type="text"
                name="company"
                placeholder="Entreprise"
                value={company || ""}
                onChange={handleChange}
              />
            </div>

            <div className={styles.contact}>
              Email :{" "}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email || ""}
                onChange={handleChange}
              />
              Téléphone :{" "}
              <input
                type="text"
                name="phone"
                placeholder="A renseigner"
                value={phoneNumber || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <h2>
            <i className="fa-solid fa-house"></i> ETAPE 2 : Adresses
          </h2>
          <div className={styles["address-details"]}>
            <div className={styles["billing-address"]}>
              <p>Adresse de facturation : </p>
              <input
                type="text"
                name="street"
                placeholder="Numéro et Rue"
                value={billingAddress.street}
                onChange={(e) =>
                  setBillingAddress({
                    ...billingAddress,
                    street: e.target.value,
                  })
                }
              />
              <input
                type="text"
                name="zip"
                placeholder="Code Postal"
                value={billingAddress.zip}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, zip: e.target.value })
                }
              />
              <input
                type="text"
                name="city"
                placeholder="Ville"
                value={billingAddress.city}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, city: e.target.value })
                }
              />

              <select
                name="country"
                value={billingAddress.country}
                onChange={(e) =>
                  setBillingAddress({
                    ...billingAddress,
                    country: e.target.value,
                  })
                }
              >
                <option value="">Sélectionnez votre pays</option>
                <option value="france">France</option>
                <option value="belgique">Belgique</option>
                <option value="suisse">Suisse</option>
                <option value="luxembourg">Luxembourg</option>
              </select>

              <div className={styles["same-address"]}>
                <input
                  type="checkbox"
                  id="same-address"
                  name="same-address"
                  className={styles.checkbox}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setOrder((prev) => ({
                        ...prev,
                        deliveryAddress: { ...billingAddress },
                      }));
                    } else {
                      setOrder((prev) => ({
                        ...prev,
                        deliveryAddress: {
                          street: "",
                          city: "",
                          zip: "",
                          country: "",
                        },
                      }));
                    }
                  }}
                />
                <label htmlFor="same-address">
                  Adresse de livraison identique
                </label>
              </div>
            </div>

            <div className={styles["delivery-address"]}>
              <p>Adresse de livraison : </p>
              <input
                type="text"
                name="street"
                placeholder="Numéro et Rue"
                value={order.deliveryAddress.street}
                onChange={handleChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="Code Postal"
                value={order.deliveryAddress.zip}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="Ville"
                value={order.deliveryAddress.city}
                onChange={handleChange}
              />

              <select
                name="country"
                value={order.deliveryAddress.country}
                onChange={handleChange}
              >
                <option value="">Sélectionnez votre pays</option>
                <option value="france">France</option>
                <option value="belgique">Belgique</option>
                <option value="suisse">Suisse</option>
                <option value="luxembourg">Luxembourg</option>
              </select>
            </div>
          </div>

          <div className={styles.deliveryAndPayment}>
            <div className={styles["delivery-options"]}>
              <h2>
                <i className="fa-solid fa-truck"></i> ETAPE 3 : Mode de livraison
              </h2>
              <select
                name="deliveryMethod"
                value={order.delivery.method}
                onChange={handleChange}
              >
                <option value="">Sélectionnez le mode de livraison</option>
                <option value="dhl">DHL</option>
                <option value="chronopost">Chronopost</option>
              </select>
              <img
                src="https://www.chronopost.fr/sites/chronopost/themes/custom/chronopost/images/chronopost_logo.png"
                className={styles.chrono}
                alt="chronopost"
              />
              <img
                src="https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg"
                alt="DHL"
              />
            </div>

            {/* <div className={styles["payment-options"]}>
              <h2>
                <i className="fa-regular fa-credit-card"></i> ETAPE 4 : Options de paiement
              </h2>

              <select
                name="paymentMethod"
                value={order.payment.method}
                onChange={handleChange}
              >
                <option value="">Sélectionnez le mode de paiement</option>
                <option value="carte">Carte</option>
                <option value="virement">Virement</option>
              </select>
            </div> */}
          </div>

          <button type="submit">Passer au paiement</button>
        </form>
      </div>
    </div>
  );
}
