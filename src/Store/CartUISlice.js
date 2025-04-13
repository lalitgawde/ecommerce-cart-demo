import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cartUI",
  initialState: { isCartVisible: false, notification: null },
  reducers: {
    toggleCartVisible: (store) => {
      store.isCartVisible = !store.isCartVisible;
    },
    showNotification: (state, actions) => {
      console.log("paylod", actions.payload);
      if (actions.payload) {
        state.notification = {
          status: actions.payload.status,
          message: actions.payload.message,
          title: actions.payload.title,
        };
      } else {
        state.notification = null;
      }
    },
  },
});

export const cartActions = CartSlice.actions;
export default CartSlice;
