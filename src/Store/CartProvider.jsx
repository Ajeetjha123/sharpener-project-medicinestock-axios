import React, { useEffect } from "react";
import { useReducer } from "react";
import CartContext from "./cart-context";
import axios from "axios";
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    if (!existingCartItem) {
      return state; // If the item doesn't exist, simply return the current state
    }

    let updatedItems;
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateitem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updateitem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dsipatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const storageKey = "cartData";
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://crudcrud.com/api/fe916c174d8d4f1b9bf9e5f4845119bf"
      );
      const cartData = response.data;
      dsipatchCartAction({ type: "SET", cart: cartData });
    } catch (error) {
      console.error("Error fetching cart data:", error);
      // If API call fails, try to use data from local storage
      const storedCart = JSON.parse(localStorage.getItem(storageKey));
      if (storedCart && typeof storedCart === "object") {
        dsipatchCartAction({ type: "SET", cart: storedCart });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const saveCartData = async () => {
      try {
        await axios.put(
          "https://crudcrud.com/api/fe916c174d8d4f1b9bf9e5f4845119bf",
          cartState
        );
        localStorage.setItem(storageKey, JSON.stringify(cartState));
      } catch (error) {
        console.error("Error saving cart data:", error);
      }
    };

    saveCartData();
  }, [cartState]);

  const addItemsTOCartHandler = (item) => {
    dsipatchCartAction({ type: "ADD", item: item });
  };
  const removeItemsTOCartHandler = (id) => {
    dsipatchCartAction({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemsTOCartHandler,
    removeItem: removeItemsTOCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
