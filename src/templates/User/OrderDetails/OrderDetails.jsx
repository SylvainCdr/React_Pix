import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import DeliveryTimeline from "@/Components/DeliveryTimeline/DeliveryTimeline";
import Aos from "aos";
import { BASE_URL } from "@/url";
import { useParams } from "next/navigation";

export default function OrderDetails() {
  const params = useParams();
  const orderId = params?.id;

  const [, setOrder] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [, setDelivery] = useState({});
  const [, setPayment] = useState({});
  const [items, setItems] = useState([]);
  const [, setUser] = useState({});
  const [status, setStatus] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
        setTotalAmount(data.totalAmount);
        setDelivery(data.delivery);
        setPayment(data.payment);
        setItems(data.items);
        setUser(data.user);
        setStatus(data.status);
        setOrderDate(data.orderDate);
        setDeliveryAddress(data.deliveryAddress ?? {});
        setDeliveryMethod(data.delivery.method);
        setDeliveryFee(data.delivery.fee);
        setPaymentMethod(data.payment.method);
        setPaid(data.payment.paid);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la commande :", error);
      });
  }, [orderId]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div data-aos="flip-down" className={styles["order-details-container"]}>
      <h2>DETAILS DE COMMANDE </h2>
      <div className={styles["order-details"]}>
        <div className={styles["order-details-header"]}>
          <h3>Commande N° {orderId}</h3>
          <p>
            Date de la commande : {new Date(orderDate).toLocaleDateString()}
          </p>
          {/* Intégration de la timeline */}
          <DeliveryTimeline status={status} />
        </div>
        <div className={styles["order-details-content"]}>
          <div className={styles["order-details-delivery"]}>
            <h4>Livraison</h4>
            <p>Méthode de livraison : {deliveryMethod}</p>
            <p>Frais de livraison : {deliveryFee?.toFixed(2)} €</p>
            <p>
              Adresse de livraison : {deliveryAddress.street},{" "}
              {deliveryAddress.zip} {deliveryAddress.city},{" "}
              {deliveryAddress.country}
            </p>
          </div>
          <div className={styles["order-details-payment"]}>
            <h4>Paiement</h4>
            <p>Méthode de paiement : {paymentMethod}</p>
            <p>Statut du paiement : {paid ? "Payé" : "Non payé"}</p>
          </div>
          <div className={styles["order-details-items"]}>
            <h4>Produits</h4>
            <ul>
              {items?.map((item) => (
                <li key={item._id}>
                  <p>
                    {item.name} - {item.quantity} x{" "}
                    {item?.priceAtOrderTime?.toFixed(2)} €
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles["order-details-total"]}>
            <h4>Total</h4>
            <p>Total de la commande : {totalAmount?.toFixed(2)} €</p>
          </div>
        </div>
      </div>
    </div>
  );
}
