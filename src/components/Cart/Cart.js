import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const isCartVisible = useSelector((state) => state.ui);
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("cartItems", cartItems);
  return (
    isCartVisible.isCartVisible || (
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              return <CartItem item={{ ...item }} />;
            })
          ) : (
            <p className={classes.title}>No Cart Item Found.</p>
          )}
        </ul>
      </Card>
    )
  );
};

export default Cart;
