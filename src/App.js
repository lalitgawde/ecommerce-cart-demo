import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData } from "./Store/ActionCreater";
import { cartActions } from "./Store/CartUISlice";

let isInitial = true;

function App() {
  const [education, setEducation] = useState("");
  const [college, setCollege] = useState("");
  const [jobPositon, setJobPositon] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState({ error: [] });
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const [user1, setUser1] = useState({});
  const [user2, setUser2] = useState({});
  const [user3, setUser3] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.cartItems) {
      dispatch(
        cartActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      const sendCartData = async () => {
        const cartData = await fetch(
          "https://clone-6de65-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify({ cartItems: cart.cartItems }),
          }
        );
        if (!cartData.ok) {
          throw new Error("Sending cart data failed.");
        }
        dispatch(
          cartActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Sent cart data successfully!",
          })
        );
      };
      sendCartData().catch(() => {
        dispatch(
          cartActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Sending cart data failed!",
          })
        );
      });
    }
  }, [cart]);

  useEffect(() => {
    if (
      notification &&
      (notification.status === "success" || notification.status === "error")
    ) {
      setTimeout(() => {
        dispatch(cartActions.showNotification(null));
      }, 3000);
    }
  }, [notification]);

  // const onChangeHandler = (event) => {
  //   setResult("");
  //   if (event.target.name === "education") {
  //     setEducation(event.target.value);
  //   } else if (event.target.name === "college") {
  //     setCollege(event.target.value);
  //   } else if (event.target.name === "jobPositon") {
  //     setJobPositon(event.target.value);
  //   }
  // };

  // const onSubmitHandler = (event) => {
  //   setError({ error: [] });
  //   event.preventDefault();
  //   if (education === "") {
  //     setError((error) => ({
  //       error: [...error.error, "education"],
  //       errrorMsg: "Please enter education",
  //     }));
  //   }
  //   if (college === "") {
  //     setError((error) => ({
  //       error: [...error.error, "college"],
  //       errrorMsg: "Please enter college",
  //     }));
  //   }
  //   if (jobPositon === "") {
  //     setError((error) => ({
  //       error: [...error.error, "jobPositon"],
  //       errrorMsg: "Please enter job positon",
  //     }));
  //   }
  //   if (education !== "" && college !== "" && jobPositon !== "") {
  //     setResult(
  //       `I have completed my ${education} from ${college} and I am working as a ${jobPositon}`
  //     );
  //   }
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("https://jsonplaceholder.typicode.com/todos/1")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("data", data);
  //       setUser1(data);
  //     });
  //   fetch("https://jsonplaceholder.typicode.com/todos/2")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("data", data);
  //       setUser2(data);
  //     });
  //   fetch("https://jsonplaceholder.typicode.com/todos/0")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("data", data);
  //       setUser3(data);
  //     });
  //   setLoading(false);
  // }, []);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        <Cart />
        <Products />
      </Layout>
      {/* <div>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label>Education: </label>
            <input
              value={education}
              onChange={onChangeHandler}
              name="education"
            />
            {error.error.filter((field) => field === "education").length > 0 ? (
              <p style={{ color: "red" }}>{"Please enter education"}</p>
            ) : null}
          </div>
          <div>
            <label>College: </label>
            <input value={college} onChange={onChangeHandler} name="college" />
            {error.error.filter((field) => field === "college").length > 0 ? (
              <p style={{ color: "red" }}>{"Please enter college"}</p>
            ) : null}
          </div>
          <div>
            <label>Job Position: </label>
            <input
              value={jobPositon}
              onChange={onChangeHandler}
              name="jobPositon"
            />
            {error.error.filter((field) => field === "jobPositon").length >
            0 ? (
              <p style={{ color: "red" }}>{"Please enter jobPositon"}</p>
            ) : null}
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
      <div>
        <p>Ouput:{result}</p>
      </div> */}
      {/* {loading && <p style={{ color: "black" }}>Loading...</p>}
      {!loading && (
        <div>
          <div>User 1 :{user1?.userId ? user1.userId : "No Data"}</div>
          <div>User 2 :{user2?.userId ? user2.userId : "No Data"}</div>
          <div>User 0 : {user3?.userId ? user3.userId : "No Data"}</div>
        </div>
      )} */}
    </>
  );
}

export default App;
