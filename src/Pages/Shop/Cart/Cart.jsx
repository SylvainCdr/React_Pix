import React, {useState, useEffect } from 'react';
import './style.scss';


// Création de la fonction Cart pour affichier le panier d'un user

export default function Cart() {
    
// routes pour les fonctions de la page Cart
// router.get('/cart', getCart);
// router.post('/add-cart', addToCart);

const [cart, setCart] = useState([]);
const [total, setTotal] = useState(0);
const [user, setUser] = useState(null);

// fonction pour récupérer le panier d'un user
const getCart = async () => {
    try {
      const response = await fetch('http://localhost:3001/cart', {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      setCart(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

// fonction pour ajouter un produit au panier

const addToCart = async (id) => {
    try {
      const response = await fetch('http://localhost:3001/add-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token
        },
        body: JSON.stringify({ id })
      });

      const parseRes = await response.json();
      setCart([...cart, parseRes]);
    } catch (err) {
      console.error(err.message);
    }
  };

// fonction pour supprimer un produit du panier
const removeFromCart = async (id) => {
    try {
        const response = await fetch(`http://localhost:3001/cart/${id}`, {
            method: 'DELETE',
            headers: {
                token: localStorage.token
            }
        });

        setCart(cart.filter(item => item.product_id !== id));
    } catch (err) {
        console.error(err.message);
    }
}

// fonction pour vider le panier
const emptyCart = async () => {
    try {
        const response = await fetch('http://localhost:3001/cart', {
            method: 'DELETE',
            headers: {
                token: localStorage.token
            }
        });

        setCart([]);
    } catch (err) {
        console.error(err.message);
    }
}

// fonction pour calculer le total du panier
useEffect(() => {
    let price = 0;
    cart.forEach(item => {
        price += item.price;
    });
    setTotal(price);
}, [cart]);

// fonction pour récupérer l'utilisateur qui est connecté dans le local storage
useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        // Effectuer une requête pour récupérer les informations de l'utilisateur
        // setUser(result);
    }
}, []);


// fonction pour afficher le panier
useEffect(() => {
    getCart();
}, []);

return (
    <div className="cart-container">
        <h2>Panier</h2>
        <div className="cart-items">
            {cart.map(item => (
                <div key={item.product_id} className="cart-item">
                    <h3>{item.name}</h3>
                    <p>{item.price}€</p>
                    <button onClick={() => removeFromCart(item.product_id)}>Supprimer</button>
                </div>
            ))}
        </div>
        <p>Total: {total}€</p>
        <button onClick={emptyCart}>Vider le panier</button>
    </div>
);
}


