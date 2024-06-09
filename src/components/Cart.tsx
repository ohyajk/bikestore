import { FC } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Lottie from "lottie-react";
import emptyBox from "../json/emptyBox.json";
import useCartState from '../state/cartState';
// import { Link } from 'react-router-dom';



const Cart: FC = () => {

    const { status, close } = useCartState()

    return (
        <AnimatePresence>
            {
                status &&
                <motion.div
                    initial={{ x: 700, }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    exit={{ x: 700 }}
                    className='fixed top-0 right-0 h-screen sm:w-[70%] md:w-[576px] border-l border-primary bg-secondary text-white p-4 z-50'
                >
                    <div className='flex items-center justify-between pb-10'>
                        <button onClick={close} className='focus:animate-spin duration-300 delay-100 hover:text-primary'>
                            <i className="fa-solid fa-xmark fa-2x"></i>
                        </button>
                        <h2 className='text-2xl font-semibold border-b-2'>Cart</h2>
                        <span className='opacity-0'>op</span>
                    </div>
                    <EmptyCart />
                    {/* <CardCart price={90} size={19} name='Magma 9x' image='http/' id={1} /> */}
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

// interface CardCartProps {
//     id: number;
//     price: number;
//     size: number;
//     name: string;
//     image: string;
// }

// const CardCart: FC<CardCartProps> = ({ id, price, size, name, image }) => {

//     const removeProduct = (id: number) => {
//         console.log('remove', id)
//     }

//     return (
//         <div className='flex gap-4 justify-start items-center w-full border p-4 rounded-xl bg-gray-900'>
//             <span className='h-20 w-32 bg-gray-700'></span>
//             <div className='flex flex-col gap-2'>
//                 <Link to={'/product'} className='text-2xl font-semibold duration-300 delay-100 hover:text-primary'>{name}</Link>
//                 <div className='flex items-center gap-2'>
//                     <h2 className=' rounded-full font-semibold bg-primary w-fit px-4 py-1'>{price}$</h2>
//                     <h2 className=' rounded-full font-semibold bg-prime2 w-fit px-4 py-1'>{size} Inch</h2>
//                 </div>
//             </div>
//             <button onClick={() => removeProduct(id)} className='ml-auto'>
//                 <i className="fa-solid fa-trash-can fa-2x duration-300 delay-100 hover:text-primary"></i>
//             </button>
//         </div>
//     )
// }

