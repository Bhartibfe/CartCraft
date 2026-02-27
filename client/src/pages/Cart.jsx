import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { CartItem, CartSummary } from "../components";
import EmptyCart from "../pages/EmptyCart";

const Cart = () => {
  const { cart } = useContext(CartContext);

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-6 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Shopping{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
          Cart
        </span>
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT SIDE */}
        <div className="w-full md:w-[65%] bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          {cart.map((cartProduct) => (
            <CartItem key={cartProduct.id} cartProduct={cartProduct} />
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-[35%]">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            <CartSummary />

            <div className="flex flex-col gap-3 mt-6">
              <Link to="/checkout">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-indigo-400 text-white font-semibold shadow-md hover:shadow-lg transition">
                  Proceed to Checkout
                </button>
              </Link>

              <button className="w-full py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition">
                Pay with Paypal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
