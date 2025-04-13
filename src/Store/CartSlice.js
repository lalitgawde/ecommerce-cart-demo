import { createSlice } from "@reduxjs/toolkit";

const CartItemsSlice = createSlice({
  name: "cartItems",
  initialState: { cartItems: [], cartChanged: false },
  reducers: {
    addItem: (state, item) => {
      const newItem = item.payload;
      console.log("newItem", item);
      const exitingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.cartChanged = true;
      if (!exitingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        exitingItem.quantity++;
        exitingItem.totalPrice += newItem.price;
      }
    },
    removeItem: (state, id) => {
      const removeItemId = id.payload;
      console.log("id", id);
      const removeItem = state.cartItems.find(
        (item) => item.id === removeItemId
      );
      state.cartChanged = true;
      if (removeItem.quantity === 1) {
        const removeItem = state.cartItems.filter(
          (item) => item.id !== removeItemId
        );
        state.cartItems = removeItem;
      } else {
        removeItem.quantity--;
        removeItem.totalPrice -= removeItem.price;
      }
    },
    replaceCart: (state, actions) => {
      state.cartItems = actions.payload.cartItems;
    },
  },
});

export const cartItemsActions = CartItemsSlice.actions;
export default CartItemsSlice;
