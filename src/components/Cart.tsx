import { FC, useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Lottie from "lottie-react";
import emptyBox from "../json/emptyBox.json";
import useCartState from '../state/cartState';
import useCartItemState from '../state/cartItemState';
import CardCart from './CardCart';
import { toast } from 'react-toastify';
import useUserState from '../state/userState';
import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';



const Cart: FC = () => {
    const navigate = useNavigate()

    const { status, close } = useCartState()
    const { items } = useCartItemState()
    const {user} = useUserState()

    const [subtotal, setSubtotal] = useState(0)


    useEffect(() => {
        const totalprice = items.reduce((t, i) => t + i.price, 0);
        setSubtotal(totalprice)
    }, [items])

    const goCheckout = () => {
        if(!user.email){
            toast.error('Please login to continue')
            return
        }
        close()
        navigate('/checkout')
    }

    return (
        <AnimatePresence>
            {
                status &&
                <motion.div
                    initial={{ x: 700, }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    exit={{ x: 700 }}
                    className='fixed top-0 right-0 h-screen sm:w-[70%] md:w-[576px] border-l border-black bg-secondary p-4 z-50 flex flex-col justify-between'
                >
                    <div>
                        <div className='flex items-center justify-between pb-10'>
                            <button onClick={close} className='focus:animate-spin duration-300 delay-100 hover:text-primary'>
                                <i className="fa-solid fa-xmark fa-2x"></i>
                            </button>
                            <h2 className='text-3xl font-semibold border-b-2 border-primary'>Cart</h2>
                            <span className='opacity-0'>op</span>
                        </div>
                        {
                            items.length === 0 ?
                                <EmptyCart /> :
                                <div className='flex flex-col gap-4'>
                                    {items.map((item) => <CardCart id={item.id} name={item.name} image={item.image} price={item.price} />)}
                                </div>
                        }
                    </div>
                    {subtotal > 0 &&
                        <div className='flex flex-col gap-2'>
                            <span className='flex justify-between items-center'>
                                <h2 className='text-2xl font-semibold'>Sub Total :</h2>
                                <h2 className='text-2xl font-semibold'>${subtotal}</h2>
                            </span>
                            <hr className='h-[2px] bg-black w-full opacity-0' />
                            <button onClick={goCheckout} className='w-full bg-primary text-white rounded-lg py-2 font-semibold'>Checkout</button>
                        </div>
                    }
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Cart

const EmptyCart: FC = () => {
    return (
        <div className='h-full flex flex-col justify-center items-center pb-20'>
            <Lottie className='h-[300px] bg-cover' animationData={emptyBox} loop={true} />
            <h2 className='text-2xl font-semibold'>Your cart is empty</h2>
        </div>
    )
}

