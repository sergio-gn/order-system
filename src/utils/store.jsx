// utils/store.jsx

import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a new slice for managing the cart state
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [], // An array to store products in the cart
    isButtonDisabled: false, // A flag to track the button's disabled status
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload); // Add the product to the cartItems array
    },
    setButtonDisabled: (state, action) => {
      state.isButtonDisabled = action.payload; // Set the button's disabled status
    },
  },
});

// Create the Redux store and configure it with the cartSlice reducer
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    // Add other reducers as needed
    // ...
  },
});

// Export actions for interacting with the cart state
export const { addToCart, setButtonDisabled } = cartSlice.actions;

export default store;
