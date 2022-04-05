const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KicbOHO7BIuxFeuOW6wh855d4kKhWyROnhxOIBZ4JdZtwWD3cBEW5eX6wIzAVPG3C78RgQD2jzwnHG6jPOky8Pv00I8x0u8Hz"
);
//API config
const app = express();
//middlewares

app.use(
  cors({
    origin: true,
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//API Routes
app.get("/", (req, res) => res.status(200).send("Hello world"));
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request received", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
exports.api = functions.https.onRequest(app);
