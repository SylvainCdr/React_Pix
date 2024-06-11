import React, { useState, useEffect } from "react";
import "./style.scss";
import useCart from "../../../Components/useCart";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../url";

export default function Order() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const { cart, totalAmount } = useCart();

  // Définir les champs de l'adresse de facturation et du numéro de téléphone dans l'état local
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
      fee: "9.90",
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
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: cart.map((product) => ({
        product: product._id,
        name: product.name,
        ref: product.ref,
        quantity: product.quantity,
        priceAtOrderTime: product.price,
      })),
      totalAmount: totalAmount,
    }));
  }, [cart]);

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
      // Mettre à jour l'état local user avec le numéro de téléphone
      setUser((prevUser) => ({
        ...prevUser,
        phone: value,
      }));
    } else if (name === "company") {
      setCompany(value);
      // Mettre à jour l'état local user avec le nom de la société
      setUser((prevUser) => ({
        ...prevUser,
        company: value,
      }));

    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
      // Envoyer une requête PUT pour mettre à jour l'utilisateur sur le serveur
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
          // Gérer l'erreur, peut-être afficher un message à l'utilisateur
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

       // Validation des champs obligatoires
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
      // alet sweetalert pour afficher un message d'erreur
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez remplir tous les champs obligatoires",
        // confirmButtonText: "OK",
        timer: 2000,
      });

    }

      // Mettre à jour l'objet utilisateur avec l'adresse de facturation et le numéro de téléphone
      const updatedUser = {
        ...user,
        billingAddress: billingAddress,
        // Vérifiez si le numéro de téléphone est renseigné dans le formulaire, sinon gardez la valeur existante
        phone: phoneNumber || user.phone,
        // Vérifiez si le nom de la société est renseigné dans le formulaire, sinon gardez la valeur existante
        company: user.company || company,
        // Conserver les valeurs existantes pour les autres champs de l'utilisateur
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // Ajoutez d'autres champs de l'utilisateur si nécessaire
      };
  
      // Envoyer une requête pour mettre à jour l'utilisateur sur le serveur
      const updateUserResponse = await fetch(
        `${BASE_URL}/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (updateUserResponse.ok) {
        // Ensuite, envoyer la commande avec les détails mis à jour de l'utilisateur
        const response = await fetch(`${BASE_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });

        if (response.ok) {
          // Supprimer le panier de l'utilisateur une fois la commande soumise avec succès
          const resetCartResponse = await fetch(
            `${BASE_URL}/users/${user._id}/reset-cart`,
            {
              method: "PUT",
            }
          );

          // Envoi d'un email de confirmation de commande
          const emailResponse = await fetch(`${BASE_URL}/order-confirmation`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        clientEmail: user.email, // Utiliser user.email comme clientEmail
        orderDetails: order, // Utiliser order comme orderDetails
        userFirstName: user.firstName, // Utiliser user.firstName comme userFirstName
        userLastName: user.lastName, // Utiliser user.lastName comme userLastName
        

    }),
});



          if (resetCartResponse.ok) {
            // Afficher le message SweetAlert une fois la commande soumise et le panier réinitialisé avec succès
            Swal.fire({
              icon: "success",
              title: "Commande validée avec succès !",
              text: "Un email de confirmation de commande a été envoyé.",
              confirmButtonText: "OK",
            }).then(() => {
              // Rediriger vers la page de compte utilisateur
              window.location.href = "/mon-compte"; // Modifiez l'URL de redirection selon votre structure de routage
            });
          } else {
            throw new Error("Failed to reset cart");
          }
        } else {
          throw new Error("Failed to submit order");
        }
      } else {
        alert("Échec de la commande. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande :", error);
    }
  };

  return (
    <div className="order-container">

      <div className="order-page">
      <h1>Commande</h1>

      <form onSubmit={handleSubmit}>
        <h2>
          {" "}
          <i class="fa-solid fa-user"></i> ETAPE 1 : Informations personnelles
        </h2>
        <div className="customer-infos">
          <div className="details">
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

          <div className="contact">
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
              // si la valeur phone est "non renseigné" alors on affiche un placeholer à renseigner
              value={user.phone === "non renseigné" ? "" : user.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <h2>
          {" "}
          <i class="fa-solid fa-house"></i> ETAPE 2 : Adresses
        </h2>
        <div className="address-details">
          <div className="billing-address">
            <p>Adresse de facturation : </p>
            <input
              type="text"
              name="street"
              placeholder="Numéro et Rue"
              value={billingAddress.street}
              onChange={(e) =>
                setBillingAddress({ ...billingAddress, street: e.target.value })
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

<div className="same-address">
            <input
              type="checkbox"
              id="same-address"
              name="same-address"
              className="checkbox"
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
            <label htmlFor="same-address">Adresse de livraison identique</label>
            </div>

            {/* input de type checkbox pour permettre à l'utilisateur de remplir les champs égal a la billingaddress  */}
          </div>

          <div className="delivery-address">
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

        <div className="deliveryAndPayment">
          <div className="delivery-options">
            <h2>
              <i class="fa-solid fa-truck"></i> ETAPE 3 : Mode de livraison{" "}
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
            <img src="https://www.chronopost.fr/sites/chronopost/themes/custom/chronopost/images/chronopost_logo.png" className="chrono" alt="chronopost" />
            <img src="https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg" alt="DHL" />
            
          </div>

          <div className="payment-options">
            <h2>
              <i class="fa-regular fa-credit-card"></i> ETAPE 4 : Options de
              paiement
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



      </div>
    </div>
  );
}
