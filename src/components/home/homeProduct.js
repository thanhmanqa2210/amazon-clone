import React from 'react';
import Product from "../Product";
import { useProduct } from "./useProduct";
function HomeProduct({db,position}) {
  return (
    <div className="home__row">
      {useProduct(db, position).map((products) => {
        const { id, data } = products;
        return (
          <Product
            key={id}
            id={id}
            title={data.title}
            price={data.price}
            image={data.image}
            rating={data.rating}
          />
        );
      })}
    </div>
  );
}

export default HomeProduct;