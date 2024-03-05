import React, { useState, useEffect } from 'react';

// ce hook permet de gérer le panier

const useCart = () => {

    const [cart, setCart] = useState([]);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    // const [quantity, setQuantity] = useState(1);

    const addToCart = async (userId, productId, productName, productRef, quantity) => {
        try {
            setIsAddingToCart(true);

            const response = await fetch(`http://localhost:3001/users/${userId}/add-cart/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: productId,
                    name: productName,
                    ref : productRef,
                    quantity: quantity
                })
            });

            if (response.ok) {
                console.log('Produit ajouté au panier avec succès!');
                return true;
            } else {
                console.error('Erreur lors de l\'ajout du produit au panier');
                return false;
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            return false;
        } finally {
            setIsAddingToCart(false);
        }
    };

    const getCart = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}/cart`);

            if (response.ok) {
                const data = await response.json();
                setCart(data.cart);
            } else {
                console.error('Erreur lors de la récupération du panier:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
        }
    };

    useEffect(() => {
        getCart(1);
    }, []);

    return { cart, isAddingToCart, addToCart };
    
}

export default useCart;