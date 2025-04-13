import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Store/CartUISlice";

const CartButton = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalCartItems = cartItems?.reduce((prevTotal, item, index) => {
    return prevTotal + item.quantity;
  }, 0);
  console.log("cartItems", cartItems);
  const dispatch = useDispatch();
  const onCartToggleHandler = () => {
    dispatch(cartActions.toggleCartVisible());
  };

  return (
    <button className={classes.button} onClick={onCartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalCartItems}</span>
    </button>
  );
};

export default CartButton;
