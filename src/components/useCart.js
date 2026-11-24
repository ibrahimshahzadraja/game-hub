"use client";
import { useEffect, useState } from "react";
const KEY = "gamehub-cart";
const readCart = () => {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
        return [];
    }
};
function saveCart(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdated"));
}
export function useCart() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const update = () => setItems(readCart());
        update();
        window.addEventListener("cartUpdated", update);
        window.addEventListener("storage", update);
        return () => {
            window.removeEventListener("cartUpdated", update);
            window.removeEventListener("storage", update);
        };
    }, []);
    function addToCart(game, platform) {
        const key = `${game.id}-${platform}`,
            cart = readCart(),
            found = cart.find((item) => item.key === key);
        const updated = found
            ? cart.map((item) => (item.key === key ? { ...item, quantity: item.quantity + 1 } : item))
            : [...cart, { key, game, platform, quantity: 1 }];
        saveCart(updated);
        setItems(updated);
        return key;
    }
    function changeQuantity(key, quantity) {
        if (quantity < 1) return removeFromCart(key);
        const updated = readCart().map((item) => (item.key === key ? { ...item, quantity } : item));
        saveCart(updated);
        setItems(updated);
    }
    function removeFromCart(key) {
        const updated = readCart().filter((item) => item.key !== key);
        saveCart(updated);
        setItems(updated);
    }
    function clearCart() {
        saveCart([]);
        setItems([]);
    }
    return {
        items,
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: items.reduce((sum, item) => sum + item.game.price * item.quantity, 0),
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
    };
}
