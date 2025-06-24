const express = require("express");
const app = express();
const stripe = require("stripe")("sk_test_YOUR_SECRET_KEY"); // Replace with your real Stripe Secret Key
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: "AirPods Pro 2 (1:1 Replica)",
          },
          unit_amount: 13000, // $130.00 AUD in cents
        },
        quantity: 1,
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["AU"],
    },
    success_url: "https://airpodresell.netlify.app/success.html",
    cancel_url: "https://airpodresell.netlify.app/cancel.html",
  });

  res.json({ url: session.url });
});

app.listen(4242, () => console.log("Server running on port 4242"));