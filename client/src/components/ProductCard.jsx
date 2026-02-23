/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product?.id}`} className="h-full w-full block">
      <article className="h-full w-full rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">
        <div className="relative h-[180px] md:h-[220px] bg-gradient-to-br from-[#eff6ff] to-[#fff7ed]">
          {(product?.discountPercentage || 0) > 0 && (
            <span className="absolute top-3 left-3 text-[11px] md:text-xs px-2 py-1 rounded-full bg-[#f15b2a] text-white font-semibold">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full p-5 object-contain hover:scale-105 transition duration-300"
          />
        </div>

        <div className="p-4">
          <p className="text-[11px] md:text-xs uppercase tracking-wide text-[#1f4e79] font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
            {product?.category}
          </p>
          <h1 className="mt-1 text-sm md:text-base font-semibold text-zinc-800 min-h-[42px] overflow-hidden">
            {(product?.title || "").slice(0, 56)}
          </h1>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-lg md:text-xl font-extrabold text-[#102a43]">
              ${product?.price}
            </p>
            <p className="text-xs md:text-sm text-amber-600 font-semibold">
              ⭐ {Number(product?.rating?.rate || 0).toFixed(1)}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
