import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  billing: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      let id = action.payload.product.id;
      const existItem = state.cart.find((item) => item.id === id);
      if (existItem) {
            state.cart = state.cart.filter((item) => item.id !== id);
            state.cart.push({ ...existItem, quantity: existItem.quantity + 1 });
        } else {
          state.cart.push({ ...action.payload.product, quantity: 1 });
      }
    },
    updateCart: (state, action) => {
        let id = action.payload.product.id;
        const existItem = state.cart.find((item) => item.id === id);
        if ((existItem.quantity + action.payload.quantity) > 0 ) {
              state.cart = state.cart.filter((item) => item.id !== id);
              state.cart.push({ ...existItem, quantity: existItem.quantity + action.payload.quantity });
          } else {
            state.cart = state.cart.filter((item) => item.id !== id);
        }
    },
    removeCart: (state, action) => {
        let id = action.payload.id;
        state.cart = state.cart.filter((item) => item.id !== id);
    },
    addBilling: (state, action) => {
      state.billing = [...action.payload.product];
    },
    cleartCart: (state) => {
      state.cart = [];
    }
  },
});

export const { addCart, updateCart, removeCart, addBilling, cleartCart } = cartSlice.actions;

export default cartSlice.reducer;
