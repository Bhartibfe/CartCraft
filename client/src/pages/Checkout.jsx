import { useContext } from "react";
import { ShippingForm, CartItem, CartSummary } from "../components";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Checkout = () => {
  const { cart, total } = useContext(CartContext);
  const amount = Math.round(total * 100);
  const currency = "INR";
  const receiptId = Date.now().toString();
  const apiUrl = "https://yash-cartcraft-server.vercel.app";

  const navigate = useNavigate();

  const handlePayment = async (e) => {
    const orderData = JSON.parse(localStorage.getItem("billingData"));
    console.log(orderData);
    const response = await fetch(`${apiUrl}/order`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const order = await response.json();
    // console.log(order)

    var options = {
      key: "rzp_test_17aSfgMAWKHlN5", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Cart Craft",
      description: "Test Transaction",
      image: logo,
      order_id: order.id,
      handler: async function (response) {
        const paymentId = response.razorpay_payment_id;
        try {
          await fetch(`${apiUrl}/api/send-email`, {
            method: "POST",
            body: JSON.stringify({
              email: orderData.email || "sharmasandhya95185@gmail.com",
              name: orderData.name || "Customer",
              paymentId: paymentId,
              amount: amount / 100,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          navigate("/payment-success", { state: { paymentId } });
        } catch (error) {
          console.error("Error sending confirmation email:", error);
          alert("Payment successful, but failed to send confirmation email.");
        }
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    let paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    paymentObject.open();
    e.preventDefault();
  };

  return (
    <div className="w-full min-h-[83vh] h-fit md:h-[89vh] flex flex-col md:flex-row justify-center gap-6 p-4 pb-8 md:pb-10 md:p-10 bg-zinc-100">
      <div className="w-full md:w-[55%] h-fit md:h-full px-4 md:px-8 pt-4 flex flex-col justify-start items-start bg-white">
        <h1 className="font-semibold text-lg md:text-xl text-gray-700 md:mb-6">
          Delivery <span className="text-purple-700">Address</span>
        </h1>
        <div className="w-full py-5 md:pt-3">
          <ShippingForm />
        </div>
      </div>
      <div className="w-full h-full md:w-[35%] p-4 bg-white flex flex-col">
        <h1 className="font-semibold text-lg md:text-xl text-gray-700 md:mb-2">
          Order <span className="text-purple-700">Summary</span>
        </h1>
        <div className="h-[60%] overflow-y-auto">
          {cart.map((cartProduct) => (
            <div key={cartProduct?.id} className="w-full">
              <CartItem cartProduct={cartProduct} />
            </div>
          ))}
        </div>
        <div className="h-[40%] pt-4 md:px-5 border-t-[1px] border-t-zinc-400">
          <CartSummary />
          <button
            onClick={handlePayment}
            className="bg-zinc-800 mt-2 w-full text-white rounded-lg py-2 hover:bg-black duration-200 outline-none"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
