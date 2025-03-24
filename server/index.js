const express = require("express");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Bad Request");
    }

    res.json(order);
    // console.log(options)
  } catch (err) {
    console.log(err);
    res.status(500).send("Bad Request");
  }
});

// sending email after payment is successful
app.post("/api/send-email", async (req, res) => {
  const { email, name, paymentId, amount } = req.body;
  console.log("Email:", email); // Add this line for debugging
  console.log("Request Body:", req.body); // Log entire request body
  try {
    await sendConfirmationEmail(email, name, paymentId, amount);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const sendConfirmationEmail = async (email, name, paymentId, amount) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sharmasandhya95185@gmail.com",
      pass: "heou kvgn zmgl lskr",
    },
  });

  const mailOptions = {
    from: "sharmasandhya95185@gmail.com",
    to: email,
    subject: "Order Confirmation",
    text: `Hello ${name},

Thank you for your order!

Payment ID: ${paymentId}
Amount: ₹${amount}

Your order will be processed shortly.

Best regards,
CartCraft`,
  };

  return transporter.sendMail(mailOptions);
};

// Serve the React app
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
