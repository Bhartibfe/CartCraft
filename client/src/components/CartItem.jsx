/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import {
  FaStar,
  IoHeartOutline,
  IoHeartSharp,
  AiOutlineDelete,
} from "../utils/constants";
import { CartContext } from "../context/CartContext";

const CartItem = ({ cartProduct }) => {
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    removeFromCart,
    addToCart,
  } = useContext(CartContext);

  const [isWishlisted, setIsWishlisted] = useState(() =>
    wishlist.some((item) => item.id === cartProduct.id),
  );

  const handleWishlistToggle = () => {
    setIsWishlisted((prev) => !prev);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(cartProduct?.id);
  };

  const increaseQty = () => {
    addToCart(cartProduct, 1);
  };

  const decreaseQty = () => {
    if (cartProduct.quantity > 1) {
      addToCart(cartProduct, -1);
    }
  };

  useEffect(() => {
    if (isWishlisted) {
      addToWishlist(cartProduct);
    } else {
      removeFromWishlist(cartProduct?.id);
    }
  }, [isWishlisted]);

  return (
    <div className="flex items-center gap-6 py-6 border-b border-gray-100 group">
      {/* IMAGE */}
      <div className="h-24 w-24 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden">
        <img
          src={cartProduct?.image}
          className="h-[70%] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* DETAILS */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-900">
          {cartProduct?.title?.slice(0, 60)}
        </h3>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
          <FaStar className="text-amber-400" />
          {cartProduct?.rating?.rate}
        </div>

        {/* QUANTITY SELECTOR */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
            <button
              onClick={decreaseQty}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
            >
              -
            </button>

            <span className="px-4 font-semibold text-gray-900">
              {cartProduct.quantity}
            </span>

            <button
              onClick={increaseQty}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* PRICE + ACTIONS */}
      <div className="flex flex-col items-end gap-3">
        <p className="text-lg font-bold text-gray-900">
          ${(cartProduct?.price * cartProduct?.quantity).toFixed(2)}
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleWishlistToggle}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition"
          >
            {isWishlisted ? (
              <IoHeartSharp className="text-pink-500" />
            ) : (
              <IoHeartOutline />
            )}
          </button>

          <button
            onClick={handleRemoveFromCart}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-red-50 transition"
          >
            <AiOutlineDelete className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
