import { CartSummary } from '../components';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {

    const orderData = JSON.parse(localStorage.getItem('billingData'));
    const location = useLocation()
    const { paymentId } = location.state || {}  // Fallback to {} if state is undefined

    return (
        <div className='px-10 py-5 md:p-5 w-full md:w-[50%] flex flex-col justify-start my-4 mx-auto'>
            <div className='w-full'>
                <div className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] p-8 rounded-full mx-auto flex items-center justify-center shadow-[rgba(22,_199,_46)_0px_0px_10px]'>
                    <lord-icon
                        src="https://cdn.lordicon.com/cgzlioyf.json"
                        trigger="loop"
                        delay="500"
                        stroke="bold"
                        colors="primary:#16c72e"
                        style={{ width: "250px", height: "250px" }}>
                    </lord-icon>
                </div>
                <h1 className='text-center text-lg font-semibold text-zinc-700 mt-4'>Thanks for your order!</h1>
                <p className='text-sm text-center mt-2'>The order confirmation has been sent to
                    <span className='italic font-medium ml-1'> {orderData.email}</span>
                </p>
            </div>
            <div className='flex flex-col md:flex-row justify-between mt-10'>
                <div className='flex flex-col justify-start gap-3 w-full md:w-1/2'>
                    <div>
                        <h1 className='font-semibold'>Transaction ID</h1>
                        <p className='text-sm'>{paymentId}</p>
                    </div>
                    <div>
                        <h1 className='font-semibold'>Transaction Date</h1>
                        <p className='text-sm'>{Date(orderData.created_at).toString().split(' GMT')[0]}</p>
                    </div>
                    <div>
                        <h1 className='font-semibold'>Shipping Method</h1>
                        <p className='text-sm'>Express Delivery: 1-3 business days</p>
                    </div>
                </div>
                <div className='flex flex-col w-full md:w-1/2 mt-8 md:mt-0'>
                    <h1 className='font-semibold mb-4'>Your Order</h1>
                    <CartSummary />
                </div>
            </div>
            <Link to='/'>
                <button className='w-full mt-[30px] py-2 border-[1px] font-semibold border-zinc-800 outline-none hover:bg-zinc-800 hover:text-white duration-300'>
                    Continue Shopping
                </button>
                {/* <button className='bg-zinc-800 mt-[30px] text-base w-full text-white rounded-lg py-2 hover:bg-black duration-200 outline-none'>
                    Continue Shopping
                </button> */}
            </Link>
        </div>
    )
}

export default PaymentSuccess