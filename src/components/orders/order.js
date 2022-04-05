import React from "react";
import moment from "moment";
import CheckoutProduct from "../checkout/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
function Order({ order }) {
  return (
    <div className="order">
      <h2>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</h2>
      <p className="order_id">{order.id}</p>
      <h5>
        {order.data.basket?.map((item) => {
          const { id, image, price, rating, title } = item;
          return (
            <CheckoutProduct
              key={id}
              id={id}
              image={image}
              price={price}
              rating={rating}
              title={title}
              hideButton
            />
          );
        })}
      </h5>
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order_total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
