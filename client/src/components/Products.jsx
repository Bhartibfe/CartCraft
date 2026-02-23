/* eslint-disable react/prop-types */
import { RiFlashlightFill } from "../utils/constants";

import { ProductCard } from "./index";

const Products = ({ title, products }) => {
  return (
    <section className="flex flex-col px-5 md:px-12">
      <div className="w-full mx-auto flex items-center justify-between py-2 mb-5">
        <div className="h-full flex justify-center items-center">
          <span className="h-8 w-8 md:h-10 md:w-10 flex justify-center items-center bg-[#102a43] text-2xl text-white rounded-full">
            <RiFlashlightFill />
          </span>
          <h1 className="ml-2 text-xl md:text-2xl font-bold text-zinc-800">{title}</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products?.map((item) => (
          <div key={item?.id} className="min-h-[300px]">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
