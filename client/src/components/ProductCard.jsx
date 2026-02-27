/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product?.id}`} className="block h-full w-full">
      <motion.article
        className="group relative h-full w-full rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm transition-all duration-300"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        {/* Soft Glow on Hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-200 via-indigo-200 to-transparent opacity-0 group-hover:opacity-20 blur-2xl transition duration-500 pointer-events-none"></div>

        {/* Image Section */}
        <div className="relative h-[220px] md:h-[250px] flex items-center justify-center bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] overflow-hidden">
          {(product?.discountPercentage || 0) > 0 && (
            <span className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full bg-gradient-to-r from-pink-300 to-indigo-300 text-white font-semibold shadow-md">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}

          <motion.img
            src={product?.image}
            alt={product?.title}
            className="w-[75%] h-[75%] object-contain drop-shadow-xl"
            whileHover={{ scale: 1.08, y: -5 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <p className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
            {product?.category}
          </p>

          {/* Title */}
          <h2 className="mt-2 text-base font-semibold text-gray-900 leading-snug min-h-[44px]">
            {(product?.title || "").slice(0, 60)}
          </h2>

          {/* Price + Rating */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-xl font-extrabold text-gray-900">
                ${product?.price}
              </p>
              {(product?.discountPercentage || 0) > 0 && (
                <p className="text-sm text-gray-400 line-through">
                  $
                  {(
                    product?.price /
                    (1 - product?.discountPercentage / 100)
                  ).toFixed(0)}
                </p>
              )}
            </div>

            <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-600 text-sm font-semibold">
              ⭐ {Number(product?.rating?.rate || 0).toFixed(1)}
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default ProductCard;
