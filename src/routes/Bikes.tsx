import { FC, useState } from 'react'
import MultiRangeSlider from "multi-range-slider-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Bike } from '../types/types';
import { useQuery } from '@tanstack/react-query';
import supabase from '../lib/supabase/client';
import { Link } from 'react-router-dom';

const Bikes: FC = () => {
    const [minValue, set_minValue] = useState(5000);
    const [maxValue, set_maxValue] = useState(25000);
    const [ratingFilter, setRatingFilter] = useState(3);
    const [sortByA2Z, setSortByA2Z] = useState(false);
    const [sortByZ2A, setSortByZ2A] = useState(false);
    const [ratingByL2H, setRatingByL2H] = useState(false);
    const [ratingByH2L, setRatingByH2L] = useState(false);
    const [priceByL2H, setPriceByL2H] = useState(false);
    const [priceByH2L, setPriceByH2L] = useState(false);




    const { data, isLoading, isError } = useQuery({
        queryKey: ['allBikes'],
        queryFn: async () => {
            const result = await supabase
                .from('bikes')
                .select('*')
            return result.data
        }
    })

    console.log(data, isLoading, isError)


    const handleInput = (e: any) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

    const MotionLink = motion(Link);



    return (
        <main className='grid grid-cols-[300px_1fr] gap-4'>
            <section className='bg-white p-4 rounded-lg text-black h-fit'>
                <h2 className='text-2xl '>Filter Results</h2>
                <hr className='h-1 w-full my-2 bg-primary' />
                <h3 className='mt-6 text-lg flex items-center gap-2'><i className="fa-solid fa-indian-rupee-sign fa-sm"></i><span>Price</span></h3>
                <MultiRangeSlider
                    min={5000}
                    max={25000}
                    step={1000}
                    minCaption='Min Price'
                    maxCaption='Max Price'
                    minValue={minValue}
                    maxValue={maxValue}
                    stepOnly={true}
                    onInput={(e) => {
                        handleInput(e);
                    }}
                />
                <span className='flex items-center justify-between'>
                    <h6 className='font-medium bg-primary px-2 py-1 rounded-lg text-white text-sm'>{minValue}</h6>
                    <h6 className='font-medium bg-primary px-2 py-1 rounded-lg text-white text-sm'>{maxValue}</h6>
                </span>
                <h3 className='mt-6 text-lg flex items-center gap-2'><i className="fa-solid fa-star fa-sm"></i><span>Ratings</span></h3>
                <div className='mt-2 flex items-center gap-2'>
                    <button onClick={() => setRatingFilter(1)} className='hover:scale-105 active:scale-125 text-primary'><i className={`fa-${ratingFilter >= 1 ? 'solid' : 'regular'} fa-star fa-2x`}></i></button>
                    <button onClick={() => setRatingFilter(2)} className='hover:scale-105 active:scale-125 text-primary'><i className={`fa-${ratingFilter >= 2 ? 'solid' : 'regular'} fa-star fa-2x`}></i></button>
                    <button onClick={() => setRatingFilter(3)} className='hover:scale-105 active:scale-125 text-primary'><i className={`fa-${ratingFilter >= 3 ? 'solid' : 'regular'} fa-star fa-2x`}></i></button>
                    <button onClick={() => setRatingFilter(4)} className='hover:scale-105 active:scale-125 text-primary'><i className={`fa-${ratingFilter >= 4 ? 'solid' : 'regular'} fa-star fa-2x`}></i></button>
                    <button onClick={() => setRatingFilter(5)} className='hover:scale-105 active:scale-125 text-primary'><i className={`fa-${ratingFilter === 5 ? 'solid' : 'regular'} fa-star fa-2x`}></i></button>
                    <span>& Up</span>
                </div>
                <h3 className='mt-6 text-lg flex items-center gap-2'><i className="fa-solid fa-sort fa-sm"></i><span>Sort</span></h3>
                <ul className='flex flex-col gap-2 mt-2 select-none'>
                    <li className='flex gap-2 items-center'>
                        <input checked={priceByL2H} onChange={() => { setPriceByL2H(!priceByL2H); setPriceByH2L(false) }} id='pl2h' type="checkbox" />
                        <label htmlFor='pl2h' className='font-medium'>Price: Low to High </label>
                    </li>
                    <li className='flex gap-2 items-center'>
                        <input checked={priceByH2L} onChange={() => { setPriceByH2L(!priceByH2L); setPriceByL2H(false) }} id='ph2l' type="checkbox" />
                        <label htmlFor='ph2l' className='font-medium'>Price: High to Low</label>
                    </li>
                    <li className='flex gap-2 items-center'>
                        <input checked={ratingByL2H} onChange={() => { setRatingByL2H(!ratingByL2H); setRatingByH2L(false) }} id='rl2h' type="checkbox" />
                        <label htmlFor='rl2h' className='font-medium'>Rating: Low to High </label>
                    </li>
                    <li className='flex gap-2 items-center'>
                        <input checked={ratingByH2L} onChange={() => { setRatingByH2L(!ratingByH2L); setRatingByL2H(false) }} id='rh2l' type="checkbox" />
                        <label htmlFor='rh2l' className='font-medium'>Rating: High to Low</label>
                    </li>
                    <li className='flex gap-2 items-center'>
                        <input checked={sortByA2Z} onChange={() => { setSortByA2Z(!sortByA2Z); setSortByZ2A(false) }} id='a2z' type="checkbox" />
                        <label htmlFor='a2z' className='font-medium'>Alphabet: A to Z</label>
                    </li>
                    <li className='flex gap-2 items-center'>
                        <input checked={sortByZ2A} onChange={() => { setSortByZ2A(!sortByZ2A); setSortByA2Z(false) }} id='z2a' type="checkbox" />
                        <label htmlFor='z2a' className='font-medium'>Alphabet: Z to A</label>
                    </li>
                </ul>
            </section>
            {isLoading &&
                <div className='flex justify-center items-center h-full'>
                    <i className="fa-solid fa-spinner animate-spin fa-2x text-primary"></i>
                </div>}
            {isError || !data &&
                <div className='flex flex-col justify-center items-center h-full'>
                    <img className='h-[200px] ' src='/404.png' />
                    <h2 className='mt-2 text-xl'>No Bikes Available...</h2>
                </div>}
            <section className='grid grid-cols-3 justify-start gap-4'>
                <AnimatePresence >
                    {
                        data?.filter((p: Bike) => p.price > minValue && p.price < maxValue)
                            .filter((p: Bike) => p.rating >= ratingFilter)
                            .sort(priceByL2H ? (a: Bike, b: Bike) => a.price - b.price : undefined)
                            .sort(priceByH2L ? (a: Bike, b: Bike) => b.price - a.price : undefined)
                            .sort(ratingByL2H ? (a: Bike, b: Bike) => a.rating - b.rating : undefined)
                            .sort(ratingByH2L ? (a: Bike, b: Bike) => b.rating - a.rating : undefined)
                            .sort(sortByA2Z ? (a: Bike, b: Bike) => (a.name?.toLowerCase() || "").localeCompare(b.name?.toLowerCase() || "") : undefined)
                            .sort(sortByZ2A ? (a: Bike, b: Bike) => (b.name?.toLowerCase() || "").localeCompare(a.name?.toLowerCase() || "") : undefined)
                            .map((p: Bike, i: Number) => {
                                return (
                                    <MotionLink to={`/bike/${p.url}`}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2, duration: 0.7, type: 'spring', bounce: 0.4, ease: 'easeInOut' }}
                                        exit={{ opacity: 0, scale: 0, animation: 'ease-in-out', type: 'spring', transition: { duration: 0.3, delay: 0.2 } }}
                                        className="relative flex h-fit w-full max-w-xs flex-col overflow-hidden rounded-lg border-4 border-gray-100 bg-white shadow-xl cursor-pointer hover:border-primary"
                                        key={`key${i}`}>
                                        <span className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" >
                                            <img className="object-cover " src={p.image} alt="product image" />
                                            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{p.discount}% OFF</span>
                                        </span>
                                        <div className="mt-4 px-5 pb-5">
                                            <h5 className="text-xl tracking-tight font-medium text-black">{p.name}</h5>
                                            <div className="mt-2 mb-5 flex items-center justify-between">
                                                <p>
                                                    <span className="text-3xl font-bold text-black">&#8377;{p.price}</span>
                                                    <span className="text-sm text-black line-through"> &#x20B9;{p.originalPrice}</span>
                                                </p>
                                                <div className="flex items-center">
                                                    {
                                                        Array.from({ length: p.rating }).map((_, i: Number) => {
                                                            return (
                                                                <svg key={`key${i}`} aria-hidden="true" className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                                </svg>
                                                            )
                                                        })
                                                    }
                                                    <span className="mr-2 ml-3 rounded bg-primary px-2.5 py-0.5 text-xs font-semibold">{p.rating}.0</span>
                                                </div>
                                            </div>
                                            {/* <a href="#" className="flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-prime2 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                Add to cart</a> */}
                                        </div>
                                    </MotionLink>
                                )
                            })
                    }
                </AnimatePresence>
            </section>
        </main>
    )
}

export default Bikes