import React, { useState, useEffect, useCallback } from "react";
import "../../assets/css/orders.css";
import { db } from "../../firebase/firebaseConfig";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { useStateValue } from "../Provider/StateProvider";
import Order from "./order";
function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  const getUsers = useCallback(
    async (db) => {
      const userUid = doc(db, "users", user?.uid);
      const users = collection(userUid, "orders");
      const q = query(users, orderBy("created", "desc"));
      const data = await getDocs(q);
      return data.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
    },
    [user]
  );
  useEffect(() => {
    if (user) {
      getUsers(db).then((data) => setOrders(data));
      setOrders();
    } else {
      setOrders([]);
    }
  }, [getUsers, user]);
  return (
    <div className="orders">
      <h2>Orders</h2>
      <div className="orders_order">
        {orders?.map((order,index) => {
          return <Order order={order} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Orders;
