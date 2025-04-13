import { configureStore } from "@reduxjs/toolkit";
import CartItemsSlice from "./CartSlice";
import CartSlice from "./CartUISlice";

const store = configureStore({
  reducer: {
    ui: CartSlice.reducer,
    cart: CartItemsSlice.reducer,
  },
});

export default store;
