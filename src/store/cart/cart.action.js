import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

/*** Exported selector fucntions ***/
export const addItemToCart = (cartItems, productToAdd) => {
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    addCartItem(cartItems, productToAdd)
  );
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    removeCartItem(cartItems, productToRemove)
  );
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    clearCartItem(cartItems, cartItemToClear)
  );
};

export const setIsCartOpen = (isOpen) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen);
};

// const updateCartItemsReducer = (_cartItems) => {
//   const newCartCount = _cartItems.reduce((total, cartItem) => {
//     return total + cartItem.quantity;
//   }, 0);

//   const newCartTotal = _cartItems.reduce(
//     (total, cartItem) => total + cartItem.quantity * cartItem.price,
//     0
//   );

//   createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
//     cartCount: newCartCount,
//     cartTotal: newCartTotal,
//     cartItems: _cartItems,
//   });
// };
