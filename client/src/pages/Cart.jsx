import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { CartItem, CartSummary } from '../components';
import EmptyCart from '../pages/EmptyCart'

const Cart = () => {

    const { cart } = useContext(CartContext)
    // console.log(cart)
    if (cart.length === 0) return <EmptyCart />

    return (
        <div className='w-full min-h-[83vh] h-fit md:h-[89vh] flex flex-col md:flex-row p-4 pb-8 md:pb-10 md:p-10 bg-zinc-100'>
            <div className='w-full md:w-[60%] h-fit md:h-full px-4 md:px-8 pt-4 flex flex-col justify-start items-start bg-white'>
                <h1 className='font-semibold w-full text-lg text-center md:text-xl md:text-start mb-3 text-gray-800'>MY <span className='text-purple-700'>CART</span></h1>
                <div className='w-full h-fit md:max-h-[85%] md:overflow-y-scroll'>
                    {cart.map((cartProduct) => (
                        <div key={cartProduct.id} className='w-full'>
                            <CartItem cartProduct={cartProduct} />
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-full md:w-[40%] h-[40%] md:h-full pt-4 px-4 md:px-16'>
                <div>
                    <h1 className='font-semibold text-lg md:text-xl mb-6 text-gray-800'>Summary</h1>
                    <CartSummary />
                </div>

                <div className='flex flex-col mt-6'>
                    <Link to='/checkout'>
                        <button
                            className='bg-zinc-800 w-full text-white rounded-lg py-2 hover:bg-black duration-200 outline-none'
                        >
                            Checkout
                        </button>
                    </Link>
                    <button className='border-2 w-full border-zinc-800 rounded-lg py-2 outline-none mt-2'>Paypal</button>
                </div>
            </div>
        </div>
    )
}

export default Cart