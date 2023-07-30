// utils/store.jsx
import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isButtonDisabled: {},
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      state.isButtonDisabled[action.payload.id] = true;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(product => product.id !== action.payload);
      state.isButtonDisabled[action.payload] = false;
    },
  },
});

// Create the Redux store and configure it with the cartSlice reducer
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

// Export actions for interacting with the cart state
export const { addToCart, setButtonDisabled, removeFromCart } = cartSlice.actions;
export default store;