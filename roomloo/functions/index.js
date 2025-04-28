/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();


// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// Handle CORS
const handleCors = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Preflight request
  if (req.method === "OPTIONS") {
    res.status(204).send(""); // No content
    return true;
  }
  return false;
};

// 📦 Create a Razorpay Order
exports.createOrder = onRequest(async (req, res) => {
  if (handleCors(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  const options = {
    amount: amount * 100, // amount in paise
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    logger.info("Order created", order);
    return res.status(200).json(order);
  } catch (err) {
    logger.error("Error creating Razorpay order", err);
    return res.status(500).json({ error: "Razorpay order creation failed" });
  }
});

// ✅ Verify Payment
exports.verifyPayment = onRequest((req, res) => {
  if (handleCors(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", razorpay.key_secret)
    .update(body.toString())
    .digest("hex");

  const isValid = expectedSignature === razorpay_signature;

  if (isValid) {
    return res.status(200).json({ valid: true });
  } else {
    return res.status(400).json({ valid: false });
  }
});
