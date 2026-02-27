/* eslint-disable react/prop-types */
import { RiFlashlightFill } from "../utils/constants";
import { ProductCard } from "./index";

const Products = ({ title, products }) => {
  return (
    <section className="px-5 md:px-12 py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white text-xl">
          <RiFlashlightFill />
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((item) => (
          <ProductCard key={item?.id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default Products;
