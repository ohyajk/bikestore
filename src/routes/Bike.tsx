import { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
// import { Bike } from '../types/types';
import { useQuery } from '@tanstack/react-query';
import supabase from '../lib/supabase/client';
import { useParams } from 'react-router';
import NF404 from '../components/NF404';
import SE500 from '../components/SE500';
import Spinner from '../components/Spinner';
import { Accordion } from "flowbite-react";
import useCartItemState from '../state/cartItemState';
import type { Bike } from '../types/types';
import useCartState from '../state/cartState';


const Bike: FC = () => {

    const { url } = useParams()
    const { addItem, items } = useCartItemState()
    const { open } = useCartState()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['Bike'],
        queryFn: async () => {
            const result = await supabase
                .from('bikes')
                .select('*')
                .eq('url', url)
                .single();
            return result.data
        }
    })

    const addItemToCart = (data: Bike) => {
        addItem(data)
        open()
    }

    console.log(data, isLoading, isError)


    if (isLoading) return <Spinner />

    if (isError) return <SE500 />

    if (!data) return <NF404 />

    if (data) {
        return (
            <main className=' flex items-center'>
                <AnimatePresence >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.7, type: 'spring', bounce: 0.4, ease: 'easeInOut' }}
                        exit={{ opacity: 0, scale: 0, animation: 'ease-in-out', type: 'spring', transition: { duration: 0.3, delay: 0.2 } }}
                        className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 h-fit w-full rounded-lg  bg-white shadow-xl p-4 mx-4">
                        <div className="flex flex-col gap-4" >
                            <img className="object-cover " src={data.image} alt="product image" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="w-fit rounded-full bg-black px-2 text-center text-sm font-medium text-white">{data.discount}% OFF</span>
                            <h5 className="text-4xl tracking-tight font-medium text-black">{data.name}</h5>
                            <div>
                                <span className="text-3xl font-bold text-black">&#8377;{data.price}</span>
                                <span className="text-sm text-black line-through"> &#x20B9;{data.originalPrice}</span>
                            </div>
                            <div className="flex items-center">
                                {
                                    Array.from({ length: data.rating }).map((_, i: Number) => {
                                        return (
                                            <svg key={`key${i}`} aria-hidden="true" className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        )
                                    })
                                }
                                <span className="mr-2 ml-3 rounded bg-primary px-2.5 py-0.5 text-xs font-semibold">{data.rating}.0</span>
                            </div>
                            {items.includes(data) === false ?
                                <button onClick={() => addItemToCart(data)} className="w-fit flex gap-2 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-prime2 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <h6>Add to cart</h6>
                                </button> :
                                <span className="w-fit flex gap-2 items-center justify-center rounded-md  px-5 py-2.5 text-center text-sm font-medium text-white bg-prime2 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                    <i className="fa-solid fa-check"></i>
                                    <h6>Added to cart</h6>
                                </span>}

                            <div className='flex flex-col gap-2'>
                                <p className='text-black'>
                                    Get ready to conquer any terrain with the COLT MTB (27.5T), now available at an unbeatable price of ₹8000, down from ₹10000. This versatile mountain bike is designed for riders who crave adventure and performance. With its perfect balance of speed and stability provided by 27.5-inch wheels, the COLT MTB ensures smooth rides on both trails and rugged paths.
                                </p>
                            </div>
                            <hr className='bg-secondary/20 h-[2px]' />
                            <div className='flex flex-col gap-2'>
                                <Accordion arrowIcon={() => <i className="fa-solid fa-plus"></i>} className='border-none' collapseAll>
                                    {
                                        data.faq.map((f: any, i: number) => {
                                            return (
                                                <Accordion.Panel key={i}>
                                                    <Accordion.Title className='text-black py-1'>{f.q}</Accordion.Title>
                                                    <Accordion.Content>
                                                        <p className="text-black">
                                                            {f.a}
                                                        </p>
                                                    </Accordion.Content>
                                                </Accordion.Panel>
                                            )
                                        })
                                    }
                                </Accordion>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
        )
    }

}

export default Bike