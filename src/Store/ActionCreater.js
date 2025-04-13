import { cartActions } from "./CartUISlice";
import { cartItemsActions } from "./CartSlice";

export const fetchCartData = () => {
  return (dispatch) => {
    dispatch(
      cartActions.showNotification({
        status: "pending",
        title: "Fetching...",
        message: "Fetching cart data!",
      })
    );
    const sendCartData = async () => {
      const cartData = await fetch(
        "https://clone-6de65-default-rtdb.firebaseio.com/cart.json"
      );
      if (!cartData.ok) {
        throw new Error("Fetching cart data failed.");
      }
      dispatch(
        cartActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Fetch cart data successfully!",
        })
      );
      return cartData.json();
    };
    sendCartData()
      .then((data) => {
        console.log("data", data);
        dispatch(cartItemsActions.replaceCart(data));
      })
      .catch(() => {
        dispatch(
          cartActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Fetching cart data failed!",
          })
        );
      });
  };
};
