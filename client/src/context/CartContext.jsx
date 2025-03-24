import React, { createContext, useState, useEffect } from 'react';

// Create a CartContext
export const CartContext = createContext();

// Create a CartProvider component
export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    useEffect(() => {
        // Save cart to localStorage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Add item to cart
    const addToCart = (product, quantity) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
            if (existingItemIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += quantity;
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    // Clear the cart
    const clearCart = () => {
        setCart([]);
    };

    const [wishlist, setWishlist] = useState(() => {
        // Load cart from localStorage
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    })
    useEffect(() => {
        // Save cart to localStorage whenever it changes
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist((prevWishlist) => {
            const existingItemIndex = prevWishlist.findIndex((item) => item.id === product.id)
            if (existingItemIndex !== -1) {
                return prevWishlist
            } else {
                return [...prevWishlist, { ...product }]
            }
        })
    }

    const removeFromWishlist = (productId) => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId))
    }

    const [total, setTotal] = useState(0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, wishlist, addToWishlist, removeFromWishlist, total, setTotal }}>
            {children}
        </CartContext.Provider>
    );
};
