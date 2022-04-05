import { getProduct } from "./getProduct";
import { useState, useEffect } from "react";
function useProduct(db, position) {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getProduct(db, position).then((data) => setProduct(data));
  }, [db, position]);

  return product;
}

export { useProduct };
