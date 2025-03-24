/* eslint-disable react/prop-types */
// import React, { useState } from 'react'
import { FaMinus, FaPlus } from "../utils/constants";

const Counter = ({ padding, prodQuantity }) => {
  // by default padding will be 4, else it will be the value provided in the prop
  const new_padding = padding || 4;

  // eslint-disable-next-line no-undef
  const { count, setCount } = useCart();

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex items-center justify-start mt-5">
      <button
        onClick={handleDecrement}
        className={`p-${new_padding} border-zinc-800 outline-none border`}
      >
        <FaMinus />
      </button>
      <span className="w-12 text-center">
        {prodQuantity > 1 ? prodQuantity : count}
      </span>
      <button
        onClick={handleIncrement}
        className={`p-${new_padding} border-zinc-800 outline-none border`}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default Counter;
