import { createContext, useState, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const item = cartItems.find((item) => item.id === productToAdd.id);

  if (item) {
    return cartItems.map((item) => {
      return item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
    // return [...cartItems, { ...item, quantity: item.quantity + 1 }];
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, itemToRemove) => {
  const item = cartItems.find((item) => item.id === itemToRemove.id);
  if (item) {
    if (item.quantity === 1) {
      return cartItems.filter((item) => item.id !== itemToRemove.id);
    }
    return cartItems.map((item) => {
      return item.id === itemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });
  }
  return cartItems;
};

const clearCartItem = (cartItems, product) => {
  return cartItems.filter((item) => item.id !== product.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

const REDUCER_ACTIONS = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_CART: "TOGGLE_CART",
};

const INITIAL_STATE = {
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case REDUCER_ACTIONS.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case REDUCER_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type of {type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, cartCount, cartTotal, isCartOpen } = state;

  const updateCartItemsReducer = (_cartItems) => {
    const newCartCount = _cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    const newCartTotal = _cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(REDUCER_ACTIONS.SET_CART_ITEMS, {
        cartCount: newCartCount,
        cartTotal: newCartTotal,
        cartItems: _cartItems,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    updateCartItemsReducer(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    updateCartItemsReducer(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    updateCartItemsReducer(clearCartItem(cartItems, cartItemToClear));
  };

  const setIsCartOpen = (isOpen) => {
    dispatch(createAction(REDUCER_ACTIONS.TOGGLE_CART, isOpen));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
