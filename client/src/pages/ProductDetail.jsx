import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromApi } from '../utils/fetchFromApi'
import { FaCartShopping, FaTags, IoHeartSharp, TbTruckDelivery } from "../utils/constants";
import { CartContext } from '../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';

const ProductDetail = () => {

    const { id } = useParams()
    const [product, setProduct] = useState({})
    useEffect(() => {
        fetchFromApi(`products/${id}`)
            .then((data) => setProduct(data))
    }, [id])
    // console.log(product)

    const { cart, addToCart, addToWishlist } = useContext(CartContext)

    const add = (e) => {
        e.preventDefault()
        addToCart(product, 1)
        toast('✅ Product added to cart!', {
            position: "bottom-center",
            autoClose: 1499,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            limit: 1,
            hideProgressBar: true,
            style: { width: "250px" }
            // transition: Bounce,
        });
    }

    const wishlist = (e) => {
        e.preventDefault()
        addToWishlist(product)
        toast('✅ Product added to wishlist!', {
            position: "bottom-center",
            autoClose: 1499,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            limit: 1,
            hideProgressBar: true,
            style: { width: "280px" }
            // transition: Bounce,
        });
    }

    return (
        <div className='min-h-[83vh] h-fit md:h-[89vh] w-full bg-zinc-200 flex flex-col md:flex-row gap-8 py-6 px-8 md:py-12 md:px-16'>
            <div className='w-full h-[43vh] md:w-1/2 md:h-full flex flex-col items-center justify-between'>
                <div className='h-[70%] md:h-[78%] w-full rounded-xl bg-white p-4 md:p-8 flex items-center justify-center'>
                    <img src={product.image} className='h-full w-[70%] hover:scale-105 transition duration-300' />
                </div>
                <div className='flex gap-3 md:gap-5 h-[22%] md:h-[18%] w-full md:px-8'>
                    <span className='h-full w-1/4 rounded-lg p-2 md:p-4 bg-white hover:scale-105 transition duration-300'><img src={product.image} className='h-full w-full' /></span>
                    <span className='h-full w-1/4 rounded-lg p-2 md:p-4 bg-white hover:scale-105 transition duration-300'><img src={product.image} className='h-full w-full' /></span>
                    <span className='h-full w-1/4 rounded-lg p-2 md:p-4 bg-white hover:scale-105 transition duration-300'><img src={product.image} className='h-full w-full' /></span>
                    <span className='h-full w-1/4 rounded-lg p-2 md:p-4 bg-white hover:scale-105 transition duration-300'><img src={product.image} className='h-full w-full' /></span>
                </div>
            </div>
            <div className='w-full md:w-1/2 md:px-12 flex flex-col justify-center'>
                <span className='flex items-center gap-2'>
                    <FaTags className='rotate-90 text-zinc-500' />
                    <p className='font-semibold text-xs md:text-sm text-zinc-600 [word-spacing:5px]'>{product?.category?.toUpperCase()}</p>
                </span>
                <h1 className='text-lg md:text-2xl font-semibold md:font-bold mt-2 md:mt-3'>{product?.title}</h1>
                <p className='text-xs mt-2'>Rating: {product?.rating?.rate}</p>
                <p className='mt-3 text-sm md:text-base'>{product?.description}</p>
                <h1 className='font-bold text-xl mt-4 md:text-3xl md:mt-8'>$ {product?.price}</h1>
                <div>
                    {/* <Counter /> */}
                </div>

                <div className='flex flex-row mt-4 md:mt-0 gap-2 md:gap-4'>
                    <button
                        className='md:mt-8 w-[45%] md:w-52 flex items-center justify-center gap-3 py-3 rounded-lg bg-zinc-800 text-white outline-none hover:bg-black hover:-translate-y-1 duration-300'
                        onClick={add}
                    >
                        <FaCartShopping />
                        <p className='font-medium text-xs md:text-base'>Add To Cart</p>
                    </button>

                    <button
                        className='md:mt-8 w-[50%] md:w-52 flex items-center justify-center gap-3 py-3 border-2 border-gray-800 rounded-lg outline-none hover:bg-zinc-300 hover:-translate-y-1 duration-300'
                        onClick={wishlist}
                    >
                        <IoHeartSharp />
                        <p className='font-semibold text-xs md:text-base'>Add To Wishlist</p>
                    </button>
                </div>

                <span className='mt-2 flex items-center gap-2'>
                    <TbTruckDelivery />
                    <p className='text-xs font-semibold'>Free delivery on orders above $50</p>
                </span>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProductDetail