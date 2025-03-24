/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // console.log(product)

  return (
    // eslint-disable-next-line react/prop-types
    <Link to={`/products/${product?.id}`} className="h-full w-full">
      <Card className="h-full w-full">
        <img
          src={product?.image}
          className="p-2 mx-auto w-[25vw] h-[50%] md:w-[20vw] md:h-[60%] bg-transparent md:p-10 hover:scale-90 transition duration-300 object-contain"
        />
        <div className="p-2 md:p-5 h-[50%] relative bg-zinc-900 w-full md:h-[40%] rounded-b-lg overflow-hidden">
          <h1 className="h-[60%] md:h-[50%] font-semibold text-xs text-zinc-400 md:text-base">
            {product?.title.slice(0, 50) + "..."}
          </h1>
          <h1 className="font-medium text-base md:font-bold md:text-xl mt-2 text-white">
            $ {product?.price}
          </h1>
          <div className="w-full px-5 flex justify-between absolute bottom-4 left-0 right-0 text-gray-500">
            <h1 className="hidden md:block md:text-base">
              Rating: {product?.rating?.rate}
            </h1>
            <h1 className="hidden md:block md:text-base">
              {product?.rating?.count} Sales
            </h1>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
