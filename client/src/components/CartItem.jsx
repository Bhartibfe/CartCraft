/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import {
  FaStar,
  IoHeartOutline,
  IoHeartSharp,
  AiOutlineDelete,
} from "../utils/constants";
import { CartContext } from "../context/CartContext";

// eslint-disable-next-line react/prop-types
const CartItem = ({ cartProduct }) => {
  const { wishlist, addToWishlist, removeFromWishlist, removeFromCart } =
    useContext(CartContext);

  const [isWishlishted, setIsWishlishted] = useState(() => {
    const index = wishlist.findIndex((item) => item.id === cartProduct.id);
    if (index === -1) return false;
    else return true;
  });

  const handleAddToWishlist = () => {
    setIsWishlishted(!isWishlishted);
  };
  const handleRemoveFromCart = () => {
    // eslint-disable-next-line react/prop-types
    removeFromCart(cartProduct?.id);
  };
  useEffect(() => {
    if (isWishlishted) {
      addToWishlist(cartProduct);
    } else {
      // eslint-disable-next-line react/prop-types
      removeFromWishlist(cartProduct?.id);
    }
  }, [isWishlishted]);

  return (
    <div className="flex justify-center items-center h-[15vh] text-sm py-4 w-full border-b-[1px] border-b-zinc-200 overflow-x-hidden">
      <div className="w-[16%] h-full flex items-center justify-center ">
        <img
          // eslint-disable-next-line react/prop-types
          src={cartProduct?.image}
          className="h-[60%] w-full md:h-[70%] md:w-[50%]"
        />
      </div>
      <div className="w-[62%] h-full pl-6 pr-10 flex flex-col justify-center md:justify-start">
        <h1 className="font-medium text-xs md:text-sm md:leading-4">
          {cartProduct?.title?.slice(0, 43)}
        </h1>
        <span className="hidden md:flex items-center gap-2 mt-3">
          <FaStar className="text-zinc-400" />
          <p className="font-semibold text-xs text-zinc-400 [word-spacing:3px]">
            Rating: {cartProduct?.rating?.rate}
          </p>
        </span>
        {/* <span className='hidden md:flex items-center gap-2 mt-1'>
                    <FaTags className='rotate-90 text-zinc-400' />
                    <p className='font-semibold text-xs text-zinc-400 [word-spacing:3px]'>{cartProduct.category.toUpperCase()}</p>
                </span> */}
      </div>
      <div className="w-[20%] h-full flex flex-col items-center justify-around md:justify-between">
        <h1 className="font-semibold text-xs md:text-sm">
          $ {cartProduct?.price * cartProduct?.quantity}
        </h1>
        <div className="flex items-center justify-center gap-2">
          <button
            className="rounded-full w-8 h-8 p-[7px] border bg-zinc-100 hover:bg-zinc-200"
            onClick={handleAddToWishlist}
          >
            {isWishlishted ? (
              <IoHeartSharp className="w-full h-full text-purple-800" />
            ) : (
              <IoHeartOutline className="w-full h-full" />
            )}
          </button>

          <button
            className="rounded-full w-8 h-8 p-[7px] border bg-zinc-100 hover:bg-zinc-200"
            onClick={handleRemoveFromCart}
          >
            <AiOutlineDelete className="h-full w-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
