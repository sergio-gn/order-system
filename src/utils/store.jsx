import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDataFromFirebase } from "./firebaseUtils";

// Create an async thunk for fetching data from Firebase
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const data = await fetchDataFromFirebase();
    return data;
  } catch (error) {
    throw error;
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isButtonDisabled: {},
    quantities: {}, // Add this property to track quantities
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      state.cartItems.push(product);
      state.isButtonDisabled[product.id] = true;
      state.quantities[product.id] = quantity; // Save the quantity
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((product) => product.id !== productId);
      state.isButtonDisabled[productId] = false;
      delete state.quantities[productId]; // Remove quantity when removing from cart
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      state.quantities[productId] = quantity;
    },
  },
});


const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
  },
});

export const { setProducts } = productsSlice.actions;
export const { addToCart, removeFromCart } = cartSlice.actions;
export default store;