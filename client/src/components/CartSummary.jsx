import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const CartSummary = () => {
  const { cart, total, setTotal } = useContext(CartContext);

  const [subtotal, setSubtotal] = useState(0);
  const [delivery, setDelivery] = useState(10);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      sum += element.price * element.quantity;
    }
    setSubtotal(Number(sum.toFixed(2)));

    setTax(Number((subtotal / 10).toFixed(2)));
    if (subtotal < 50) setTotal(Number(subtotal + delivery + tax));
    else {
      setDelivery("Free");
      setTotal(Number(subtotal + tax));
    }
  });

  return (
    <div className="w-full">
      <div>
        <div className="flex justify-between font-medium mb-2 text-zinc-600 text-xs md:text-sm">
          <p>Subtotal</p>
          <p>$ {subtotal}</p>
        </div>
        <div className="flex justify-between font-medium mb-2 text-zinc-600 text-xs md:text-sm">
          <p>Estimated Delivery & Handling</p>
          <p>{subtotal < 50 ? `$ ${delivery}` : "Free"}</p>
        </div>
        <div className="flex justify-between font-medium mb-2 text-zinc-600 text-xs md:text-sm">
          <p>Estimated Taxes</p>
          <p>$ {tax}</p>
        </div>
      </div>
      <div className="flex justify-between font-semibold text-xl md:text-base mt-4">
        <p>Total</p>
        <p>$ {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartSummary;
