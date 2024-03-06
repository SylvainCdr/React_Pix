import React, { useEffect } from 'react';
import './style.scss';
import useCart from '../../../Components/useCart';

export default function Cart() {
  const { fetchCart, cart, prices, images } = useCart();

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    const userId = userData._id;
    fetchCart(userId);
  }, []);

  return (
    <div className='cart-container'>
      <h1>Panier</h1>

      <div className='shopping-cart'>
        <div className='column-labels'>
          <label className='product-image'>Image</label>
          <label className='product-details'>Produit</label>
          <label className='product-price'>Prix HT</label>
          <label className='product-quantity'>Quantité</label>
          <label className='product-removal'>Supprimer</label>
          <label className='product-line-price'>Total HT</label>
        </div>

        {cart.map((product, index) => (
          <div className='product' key={index}>
            <div className='product-image'>
              <img src={images[index]} alt="" />
            </div>
            <div className='product-details'>
              <div className='product-title'>{product.name}
              <p>Réf : {product.ref}</p></div>
              <p className='product-description'>{product.description}</p>
            </div>
            <div className='product-price'>{prices[index]} €</div>
            <div className='product-quantity'>
              <input type='number' value={product.quantity} min='1' readOnly />
            </div>
            <div className='product-removal'>
              <button className='remove-product'>Supprimer</button>
            </div>
            <div className='product-line-price'>{product.quantity * prices[index]} €</div>
          </div>
        ))}

        <div className='totals'>
          <div className='totals-item'>
            <label>Sous-total</label>
            <div className='totals-value' id='cart-subtotal'>
              {cart.reduce((acc, product, index) => acc + product.quantity * prices[index], 0)} €
            </div>
          </div>
          <div className='totals-item'>
            <label>TVA (20%)</label>
            <div className='totals-value' id='cart-tax'>
              {(cart.reduce((acc, product, index) => acc + product.quantity * prices[index], 0) * 0.20).toFixed(2)} €
            </div>
          </div>
          <div className='totals-item'>
            <label>Frais de livraison</label>
            <div className='totals-value' id='cart-shipping'>9.90 €</div>
          </div>
          <div className='totals-item totals-item-total'>
            <label>Total</label>
            <div className='totals-value' id='cart-total'>
              {(
                cart.reduce((acc, product, index) => acc + product.quantity * prices[index], 0) +
                cart.reduce((acc, product, index) => acc + product.quantity * prices[index], 0) * 0.20 +
                9.90
              ).toFixed(2)} €
            </div>
          </div>
        </div>

        <button className='checkout'>Commander</button>
      </div>
    </div>
  );
}