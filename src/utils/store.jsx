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
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      state.isButtonDisabled[action.payload.id] = true;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((product) => product.id !== action.payload);
      state.isButtonDisabled[action.payload] = false;
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