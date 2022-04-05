import React from "react";
import StarIcon from "@mui/icons-material/Star";
import "../assets/css/product.css";
import { useStateValue } from "../components/Provider/StateProvider";
function Product({ id, title, image, rating, price }) {
  const [, dispatch] = useStateValue();
  const addBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      items: {
        id: id,
        title: title,
        image: image,
        rating: rating,
        price: price,
      },
    });
  };
  return (
    <>
      <div className="product" key={id}>
        <div className="product__info">
          <p>{title || "No title"}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{price || 12.99}</strong>
          </p>
          <div className="product__rating">
            {Array(rating)
              .fill(1)
              .map((_, index) => {
                return <StarIcon key={index} className="product__star" />;
              })}
          </div>
        </div>
        <div className="product__img">
          <img
            src={
              image ||
              "https://m.media-amazon.com/images/I/71Jzo9mVSdL._AC_UL480_FMwebp_QL65_.jpg"
            }
            alt="lego"
          />
        </div>
        <div className="product__add">
          <button className="btn" onClick={addBasket}>
            Add to basket
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;
