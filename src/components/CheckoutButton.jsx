import React from "react";
import API from "../services/api";

export default function CheckoutButton({ ebook }) {
  const startPayment = async () => {
    try {
      const res = await API.post("/orders/create", {
        ebookId: ebook._id,
      });

      const { orderId, razorpayOrder, key } = res.data;

      const options = {
        key,
        order_id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Ebook Store",
        description: ebook.title,
        handler: async (response) => {
          await API.post("/payments/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          });
          alert("Payment successful! You can now download your ebook.");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Error creating order");
    }
  };

  return <button onClick={startPayment}>Buy Now for ₹{ebook.price}</button>;
}
