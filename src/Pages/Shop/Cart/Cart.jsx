import React, { useState, useEffect } from 'react';
import './style.scss';
import useCart from '../../../Components/useCart';

export default function Cart() {
  const { fetchCart, cart } = useCart();
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState([]);

  // Fetch product prices
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        // Assuming data is an array of product prices, update prices state accordingly
        setPrices(data.map((product) => product.price));
      })
      .catch((error) => {
        console.error('Error fetching product prices:', error);
      });
  }, []);

  // Fetch cart when the component mounts
  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    const userId = userData._id;
    const total =
        cart.length > 0
            ? cart.reduce((acc, product, index) => {
                return acc + product.quantity * prices[index];
            }, 0)
            : 0;
    console.log('total', total);


    fetchCart(userId);
  }, []);

  return (
    <div className='cart-container'>
      <h1>Votre panier</h1>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Référence</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Prix total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.ref}</td>
              <td>{product.quantity}</td>
              <td>{prices[index]} €</td>
                <td>{product.quantity * prices[index]} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
