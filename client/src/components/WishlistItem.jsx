import React, { useContext } from 'react'
import { FaCartShopping, IoMdClose } from '../utils/constants'
import { CartContext } from '../context/CartContext'
import { toast, ToastContainer } from 'react-toastify'

const WishlistItem = ({ item }) => {

    const { addToCart, removeFromWishlist } = useContext(CartContext)

    const add = (e) => {
        addToCart(item, 1)
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
        });
    }

    const remove = (e) => {
        removeFromWishlist(item.id)
    }

    return (
        <div className='flex items-center justify-between text-sm h-[15vh] py-3 w-full border-b-[1px] border-b-zinc-200'>
            <div className='w-[20%] md:w-[15%] h-full pl-3 md:pl-12 flex items-center justify-center md:justify-start'>
                <img src={item.image} className='h-[40%] w-[70%] md:h-[70%] md:w-[45%]' alt="" />
            </div>
            <p className='w-[33%] md:w-[35%] pl-3 pr-0 md:pl-4 md:pr-4 text-xs md:text-sm text-start'>{item.title.slice(0, 40)}</p>
            <p className='w-[22%] md:w-[15%] text-center text-xs md:text-sm'>$ {item.price}</p>
            <div className='w-[25%] md:w-[35%] flex items-center md:justify-center justify-end gap-2 md:gap-8 md:pl-8'>
                <button
                    // className='px-6 flex items-center justify-center gap-5 py-3 bg-zinc-800 text-white outline-none hover:bg-black duration-300'
                    className='p-2 md:px-6 md:py-3 flex items-center justify-center gap-5 border-[1px] font-semibold border-zinc-800 outline-none hover:bg-black hover:text-white duration-300 '
                    onClick={add}
                >
                    <FaCartShopping />
                    <p className='hidden md:block text-xs'>ADD TO CART</p>
                </button>
                <button
                    className='outline-none p-2 rounded-full hover:bg-zinc-800 hover:text-white duration-300'
                    onClick={remove}
                >
                    <IoMdClose />
                </button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default WishlistItem