/* eslint-disable no-unused-vars */
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const Razorpay = require("razorpay");

// 🔐 Replace with your real Razorpay Key ID and Secret
const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY_ID",
  key_secret: "YOUR_RAZORPAY_SECRET",
});

// 📦 Create a Razorpay Order
exports.createOrder = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  const options = {
    amount: amount * 100, // amount in paise (₹500 = 50000)
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
