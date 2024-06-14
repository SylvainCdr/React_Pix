import React, { useState, useEffect } from "react";
import useCart from "../../../Components/useCart";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../url";
import styles from "./style.module.scss";
import StripeWrapper from "../../../Components/ShopPaymentForm/ShopPaymentForm";

export default function Order() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
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

  const [order, setOrder] = useState({
    user: user._id,
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

  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

  useEffect(() => {
    const calculatedSubTotal = cart.reduce((acc, product) => {
      const discountedPrice = product.price;
      return acc + product.quantity * discountedPrice;
    }, 0);
    setSubTotal(calculatedSubTotal);
    const calculatedTax = calculatedSubTotal * 0.2;
    setTax(calculatedTax);
    const calculatedTotalAmount = calculatedSubTotal + calculatedTax + shippingCost;
    setTotalAmount(calculatedTotalAmount);
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: cart.map((product) => ({
        product: product._id,
        name: product.name,
        ref: product.ref,
        quantity: product.quantity,
        priceAtOrderTime: product.price,
      })),
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
    } else if (name === "paymentMethod") {
      setOrder((prev) => ({
        ...prev,
        payment: {
          ...prev.payment,
          method: value,
        },
      }));
    } else if (name === "phone") {
      setPhoneNumber(value);
      setUser((prevUser) => ({
        ...prevUser,
        phone: value,
      }));
    } else if (name === "company") {
      setCompany(value);
      setUser((prevUser) => ({
        ...prevUser,
        company: value,
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
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

  const handleOrderSubmission = (e) => {
    e.preventDefault();
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.phone ||
      !billingAddress.street ||
      !billingAddress.zip ||
      !billingAddress.city ||
      !billingAddress.country ||
      !order.deliveryAddress.street ||
      !order.deliveryAddress.zip ||
      !order.deliveryAddress.city ||
      !order.deliveryAddress.country ||
      !order.delivery.method ||
      !order.payment.method
    ) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez remplir tous les champs obligatoires",
        timer: 2000,
      });
      return;
    }
    setIsPaymentVisible(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      const updatedUser = {
        ...user,
        billingAddress: billingAddress,
        phone: phoneNumber || user.phone,
        company: user.company || company,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      const updateUserResponse = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (updateUserResponse.ok) {
        const response = await fetch(`${BASE_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });

        if (response.ok) {
          const resetCartResponse = await fetch(
            `${BASE_URL}/users/${user._id}/reset-cart`,
            {
              method: "PUT",
            }
          );

          const emailResponse = await fetch(`${BASE_URL}/order-confirmation`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clientEmail: user.email,
              orderDetails: order,
              userFirstName: user.firstName,
              userLastName: user.lastName,
            }),
          });

          if (emailResponse.ok && resetCartResponse.ok) {
            Swal.fire({
              icon: "success",
              title: "Commande validée",
              text: "Un email de confirmation vous a été envoyé",
              timer: 2000,
            }).then(() => {
              
              window.location.href = "/mon-compte";
            });
          }
        }
      }
    } catch (error) {
      console.error("Error validating order:", error);
    }
  };

  return (
    <div className={styles["order-container"]}>
      <div className={styles["order-page"]}>
        <h1>Commande</h1>

        {!isPaymentVisible && (
          <form onSubmit={handleOrderSubmission}>
            <h2>
              <i className="fa-solid fa-user"></i> ETAPE 1 : Informations
              personnelles
            </h2>
            <div className={styles["customer-infos"]}>
              <div className={styles.details}>
                Prénom :{" "}
                <input
                  type="text"
                  name="firstName"
                  placeholder="Prénom"
                  value={user.firstName}
                />
                Nom :{" "}
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nom"
                  value={user.lastName}
                />
                Entreprise:{" "}
                <input
                  type="text"
                  name="company"
                  placeholder="Entreprise"
                  value={user.company}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.contact}>
                Email :{" "}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={user.email}
                />
                Téléphone :{" "}
                <input
                  type="text"
                  name="phone"
                  placeholder="A renseigner"
                  value={user.phone === "non renseigné" ? "" : user.phone}
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
                  <i className="fa-solid fa-truck"></i> ETAPE 3 : Mode de
                  livraison
                </h2>
                <select
                  name="deliveryMethod"
                  value={order.delivery.method}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez le mode de livraison</option>
                  <option value="dhl">DHL</option>
                  <option value="chronopost">chronopost</option>
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

              <div className={styles["payment-options"]}>
                <h2>
                  <i className="fa-regular fa-credit-card"></i> ETAPE 4 : Options
                  de paiement
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
              </div>
            </div>

            <button type="submit">Passer au paiement</button>
          </form>
        )}

        {isPaymentVisible && (
          <>
            <h2>Etape finale : paiement </h2>
            <StripeWrapper totalAmount={totalAmount} onPaymentSuccess={handlePaymentSuccess} />
          </>
        )}
      </div>
    </div>
  );
}
