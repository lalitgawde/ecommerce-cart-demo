import classes from "./CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsActions } from "../../Store/CartSlice";

const CartItem = (props) => {
  console.log("props", props);
  const { id, title, quantity, totalPrice, price } = props.item;
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("cartItems", cartItems);
  const dispatch = useDispatch();

  const onAddCarteHandler = () => {
    dispatch(cartItemsActions.addItem(props.item));
  };

  const onRemovedCarteHandler = (id) => {
    dispatch(cartItemsActions.removeItem(id));
  };

  return (
    <li className={classes.item} key={id}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => onRemovedCarteHandler(id)}>-</button>
          <button onClick={onAddCarteHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
