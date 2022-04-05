import React, { useState, useEffect } from "react";
import { useStateValue } from "../Provider/StateProvider";
import CheckoutProduct from "../checkout/CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Provider/reducer";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "../../assets/css/payment.css";
import axios from "../config/axios";
import { db } from "../../firebase/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
function Payment() {
  const history = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [succeed, setSucceed] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      console.log("XIn lỗi");
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  console.log("clientSecret: ", clientSecret);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    //const payload =
    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(async ({ paymentIntent }) => {
        const user1 = doc(db, "users", user?.uid);
        const user2 = collection(user1, "orders");
        await setDoc(
          doc(user2, paymentIntent.id),
          {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          },
          { capital: true },
          { merge: true }
        );
        setSucceed(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        history("/orders", { replace: true });
      });
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout(
          <Link to="/checkout" className="link">
            {basket?.length} {basket?.length <= 1 ? "item" : "items"}
          </Link>
          )
        </h1>
        {/* payment address */}
        <div className="payment_section">
          <div className="payment_title">
            <h2>Delivery Address</h2>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>Việt Nam</p>
            <p>Bình Định</p>
          </div>
        </div>
        {/* payment item */}
        <div className="payment_section">
          <div className="payment_title">
            <h2>Review item and delivery</h2>
          </div>
          <div className="payment_item">
            {basket.map((item) => {
              const { id, image, price, rating, title } = item;
              return (
                <CheckoutProduct
                  key={id}
                  id={id}
                  image={image}
                  price={price}
                  rating={rating}
                  title={title}
                />
              );
            })}
          </div>
        </div>
        {/* payment method */}
        <div className="payment_section">
          <div className="payment_title">
            <h2>Payment mothod</h2>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  value={getBasketTotal(basket)}
                  // value={0}
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  displayType={"text"}
                  decimalScale={2}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  type="submit"
                  disabled={processing || disabled || succeed}
                  className="btn"
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
