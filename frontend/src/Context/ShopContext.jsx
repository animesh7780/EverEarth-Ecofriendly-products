import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 1; index <= 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('auth-token'));

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('auth-token'));
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/allproducts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (!Array.isArray(data)) {
                    if (data.success === false) {
                        throw new Error(data.error || 'Failed to fetch products');
                    }
                    throw new Error('Expected array of products');
                }
                setAll_Product(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setAll_Product([]); // Set empty array on error
            }
        };
        
        fetchProducts();
    }, []);

    const addToCart = (itemId) => {
        if (!isLoggedIn) {
            window.location.href = '/login';
            return;
        }
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text().then(text => text ? JSON.parse(text) : {});
                })
                .then((data) => console.log('Added to cart:', data))
                .catch((error) => {
                    console.error('Error adding to cart:', error);
                    // Cart state is already updated, so we don't need to revert it
                });
        }
    };

    const removeFromCart = (itemId) => {
        if (!isLoggedIn) {
            window.location.href = '/login';
            return;
        }
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text().then(text => text ? JSON.parse(text) : {});
                })
                .then((data) => console.log('Removed from cart:', data))
                .catch((error) => {
                    console.error('Error removing from cart:', error);
                    // Cart state is already updated, so we don't need to revert it
                });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
