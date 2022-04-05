
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import Home from "./components/home/Home";
import Header from "./components/Header";
import Checkout from "./components/checkout/Checkout";
import Payment from "./components/payments/payment";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer/Footer";
import Orders from "./components/orders/Orders";
import { auth } from "./firebase/firebaseConfig";
import { useStateValue } from "./components/Provider/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const promise = loadStripe(
  "pk_test_51KicbOHO7BIuxFeuzVumdi9rWafeU7jfe9gimx8aX0BX73nb1OoQdhlwBOlRuUUlLYFKzcCnVFiG0tSrdrTHcHwa00vfuAnacd"
);
function App() {
  const [, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({ type: "SET_USER", user: authUser });
      } else {
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, [dispatch]);
  return (
    <Router>
      <div className="app">
        <Header />
        <HeaderNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
