import React from "react";
import "../../assets/css/checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../Provider/StateProvider";
function Checkout() {
  const [{ basket, user }] = useStateValue();
  return (
    <>
      <div className="checkout">
        <div className="checkout_left">
          <img
            src="https://www.pngitem.com/pimgs/m/502-5029517_amazon-kindle-png-png-kindle-logo-transparent-background.png"
            alt=""
            className="checkout_left__ad"
          />
          <div>
            <h2 className="checkout_title">Your shopping basket</h2>
            <h3>{user?.email}</h3>
          </div>
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
        <div className="checkout_right">
          <Subtotal />
        </div>
      </div>
    </>
  );
}

export default Checkout;
