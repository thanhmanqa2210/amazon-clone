import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../Provider/StateProvider";
function CheckoutProduct({ id, image, price, rating, title, hideButton }) {
  const [, dispatch] = useStateValue();
  const removeBasket = () => {
    console.log(id);
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkout_product" key={id}>
      <img src={image} alt="" className="checkoutProduct_image" />
      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct_rating">
          {Array(rating)
            .fill(1)
            .map((_, index) => {
              return <StarIcon key={index} className="product__star" />;
            })}
        </div>
        {!hideButton && (
          <button className="btn btn-remove-product" onClick={removeBasket}>
            Remove from basket
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
