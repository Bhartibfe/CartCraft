import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/fetchFromApi";
import {
  FaCartShopping,
  FaTags,
  IoHeartSharp,
  TbTruckDelivery,
} from "../utils/constants";
import { CartContext } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, addToWishlist } = useContext(CartContext);

  useEffect(() => {
    fetchFromApi(`products/${id}`).then((data) => {
      setProduct(data);
      setSelectedImage(data?.images?.[0] || data?.image);
    });
  }, [id]);

  const gallery = product?.images?.length
    ? product.images.slice(0, 4)
    : [product?.image, product?.image, product?.image, product?.image];

  const add = () => {
    addToCart(product, quantity);
    toast("✅ Product added to cart!", {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

  const wishlist = () => {
    addToWishlist(product);
    toast("❤️ Added to wishlist!", {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] flex flex-col md:flex-row gap-12 py-10 px-6 md:px-16">
      {/* LEFT IMAGE SECTION */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="h-[420px] bg-white rounded-3xl border border-gray-200 shadow-sm flex items-center justify-center">
          <img
            src={selectedImage}
            alt={product?.title}
            className="w-[75%] h-[75%] object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="flex gap-4">
          {gallery.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`cursor-pointer h-24 w-24 rounded-xl bg-white border transition duration-300 flex items-center justify-center ${
                selectedImage === image
                  ? "border-indigo-500"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <img src={image} className="h-[80%] w-[80%] object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <FaTags />
          {product?.category?.toUpperCase()}
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mt-3 text-gray-900">
          {product?.title}
        </h1>

        <p className="mt-3 text-gray-600">{product?.description}</p>

        <p className="mt-6 text-3xl font-bold text-gray-900">
          ${product?.price}
        </p>

        {/* QUANTITY SELECTOR */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
            >
              -
            </button>

            <span className="px-6 font-semibold">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={add}
            className="flex items-center gap-3 px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-md hover:shadow-lg transition"
          >
            <FaCartShopping />
            Add To Cart
          </button>

          <button
            onClick={wishlist}
            className="flex items-center gap-3 px-8 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition"
          >
            <IoHeartSharp />
            Wishlist
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
          <TbTruckDelivery />
          Free delivery on orders above $50
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
