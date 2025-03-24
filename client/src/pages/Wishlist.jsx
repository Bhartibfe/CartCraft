import { CartContext } from '../context/CartContext'
import { useContext } from 'react'
import { WishlistItem } from '../components/index'
import EmptyWishlist from '../pages/EmptyWishlist'

const Wishlist = () => {

    const { wishlist } = useContext(CartContext)
    if (wishlist.length === 0) return <EmptyWishlist />

    return (
        <div className='h-[83vh] md:h-[89vh] w-full p-4 md:py-7 md:px-20 bg-zinc-100'>
            <div className='h-fit max-h-[78vh] overflow-y-hidden md:max-h-[81vh] w-full md:w-[90%] md:mx-auto bg-white pt-4 md:px-8 md:pb-10 md:pt-5'>
                <h1 className='font-semibold text-lg md:text-xl text-gray-700 md:mb-6 text-center'>
                    MY <span className='text-purple-700'>WISHLIST</span>
                </h1>
                <div className='flex w-full text-xs md:text-base border-b-[1px] border-b-gray-300 items-center justify-between md:justify-around py-4 font-medium'>
                    <p className='w-[20%] md:w-[15%] md:pr-3 text-center'>Image</p>
                    <p className='w-[33%] md:w-[35%] md:pr-20 text-center '>Title</p>
                    <p className='w-[22%] md:w-[15%] text-center'>Price</p>
                    <p className='w-[25%] md:w-[35%] text-center'>Actions</p>
                </div>
                <div className='w-full max-h-[calc(78vh-88px)] md:max-h-[calc(81vh-130px)] overflow-y-scroll'>
                    {wishlist.map((item) => (
                        <div key={item.id} className=''>
                            <WishlistItem item={item} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Wishlist