import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    product: [],
    total: 0,
  },
  billing: {
    product: [],
    total: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      let id = action.payload.product.id;
      const existItem = state.cart.product.find((item) => item.id === id);
      if (existItem) {
        state.cart.product = state.cart.product.filter(
          (item) => item.id !== id
        );
        state.cart.product.push({
          ...existItem,
          quantity: existItem.quantity + 1,
          netAmount: parseInt(existItem.price) * (existItem.quantity + 1),
        });
        
      } else {
        state.cart.product.push({
          ...action.payload.product,
          quantity: 1,
          netAmount: action.payload.product.price,
        });
        // state.cart.total = state.cart.product.reduce((total, item) => total + parseInt(item.price), 0);
      }
      state.cart.total = state.cart.product.reduce((total, item) => total + parseInt(item.netAmount), 0);
    },
    updateCart: (state, action) => {
      let id = action.payload.product.id;
      const existItem = state.cart.product.find((item) => item.id === id);
      if (existItem.quantity + action.payload.quantity > 0) {
        state.cart.product = state.cart.product.filter(
          (item) => item.id !== id
        );
        state.cart.product.push({
          ...existItem,
          quantity: existItem.quantity + action.payload.quantity,
          netAmount:
            parseInt(existItem.price) *
            (existItem.quantity + action.payload.quantity),
        });
      } else {
        state.cart.product = state.cart.product.filter(
          (item) => item.id !== id
        );
      }
      state.cart.total = state.cart.product.reduce((total, item) => total + parseInt(item.netAmount), 0);
    },
    removeCart: (state, action) => {
      let id = action.payload.id;
      state.cart.product = state.cart.product.filter((item) => item.id !== id);
    },
    addBilling: (state, action) => {
      state.billing.product = [...action.payload.product];
      state.billing.total = action.payload.total;
    },
    cleartCart: (state) => {
      state.cart.product = [];
      state.cart.total = 0;
    },
  },
});

export const { addCart, updateCart, removeCart, addBilling, cleartCart } =
  cartSlice.actions;

export default cartSlice.reducer;
