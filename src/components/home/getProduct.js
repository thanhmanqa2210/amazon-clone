
import { collection, getDocs, doc } from "firebase/firestore";
async function getProduct(db,position) {
  const products = doc(db, "products",'Z0eSkRMaBMCtAbCU1sk2');
  const pro2=collection(products,`products_${position}`);
  const data= await getDocs(pro2);
 return data.docs.map((dt)=>({id:dt.id,data:dt.data()}));

}
export { getProduct };
