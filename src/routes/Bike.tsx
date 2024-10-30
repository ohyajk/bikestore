import { FC, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// import { Bike } from '../types/types';
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import NF404 from "../components/NF404"
import SE500 from "../components/SE500"
import Spinner from "../components/Spinner"
import { Accordion } from "flowbite-react"
import useCartItemState from "../state/cartItemState"
import type { Bike } from "../types/types"
import useCartState from "../state/cartState"
import { Swiper, SwiperSlide } from "swiper/react"
import { useRef } from "react"
import "swiper/css"
import axios from "axios"
import { toast } from "react-toastify"

const Bike: FC = () => {
    const { url } = useParams()
    const [itemAdded, setItemAdded] = useState(false)
    const { addItem, items } = useCartItemState()
    const { open } = useCartState()
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Bike"],
        queryFn: async () => {
            const res = await axios.get(`/bike/${url}`)
            return res.data
        },
    })

    useEffect(() => {
        if (data) {
            const itemExists = items.some(item => item.id === data.id)
            setItemAdded(itemExists)
        }
    }, [data, items])

    const addItemToCart = (data: Bike) => {
        if(items.length > 2) {
            toast.error("You can only add 3 Bikes per order")
            return
        } 
        addItem(data)
        open()
    }

    const swiperRef = useRef(null)

    const [activeThumb, setActiveThumb] = useState(0)

    const handleThumbnailClick = (index: number) => {
        if (swiperRef.current) {
            ;(swiperRef.current as any).swiper.slideTo(index)
            setActiveThumb(index)
        }
    }

    if (isLoading) return <Spinner />

    if (isError) return <SE500 />

    if (!data) return <NF404 />

    if (data) {
        return (
            <main className="screen-height h-full flex items-center w-full">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.7,
                            type: "spring",
                            bounce: 0.4,
                            ease: "easeInOut",
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0,
                            animation: "ease-in-out",
                            type: "spring",
                            transition: { duration: 0.3, delay: 0.2 },
                        }}
                        className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 h-fit w-full  p-4 "
                    >
                        <div className="swiper-container  ">
                            <Swiper
                                ref={swiperRef}
                                spaceBetween={0}
                                slidesPerView={1}
                                className="main-swiper bg-white rounded-lg"
                                onSlideChange={(swiper) =>
                                    setActiveThumb(swiper.activeIndex)
                                }
                            >
                                {data.images.map(
                                    (image: string, index: number) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={image}
                                                alt={index + "image"}
                                                className="rounded-lg w-full"
                                            />
                                        </SwiperSlide>
                                    )
                                )}
                            </Swiper>
                            <div className="pt-4 flex items-center justify-center gap-4">
                                {data.images.map(
                                    (image: string, index: number) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={index + "image"}
                                            className={`bg-white rounded-lg h-10 w-10 min-[410px]:h-12  min-[410px]:w-16 sm:h-16 sm:w-20 cursor-pointer bg-cover sm:p-2 border shadow-lg ${
                                                activeThumb == index
                                                    ? " border-primary"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleThumbnailClick(index)
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="w-fit rounded-full bg-primary px-2 text-center text-sm font-semibold text-white">
                                {data.discount}% OFF
                            </span>
                            <h5 className="text-4xl tracking-tight font-bold ">
                                {data.name}
                            </h5>
                            <div>
                                <span className="text-3xl font-bold ">
                                    ${data.price}
                                </span>
                                <span className="text-sm  line-through">
                                    {" "}
                                    ${data.originalPrice}
                                </span>
                            </div>
                            <div className="flex items-center">
                                {Array.from({ length: data.rating }).map(
                                    (_, i: Number) => {
                                        return (
                                            <svg
                                                key={`key${i}`}
                                                aria-hidden="true"
                                                className="h-5 w-5 text-primary"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        )
                                    }
                                )}
                                <span className="mr-2 ml-3 rounded text-white bg-primary px-2.5 py-0.5 text-xs font-semibold">
                                    {data.rating}.0
                                </span>
                            </div>
                            {itemAdded === false ? (
                                <button
                                    onClick={() => addItemToCart(data)}
                                    className="w-fit flex gap-2 items-center justify-center rounded-md bg-primary text-white px-5 py-2.5 text-center text-sm font-medium  hover:bg-prime2 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                >
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <h6>Add to cart</h6>
                                </button>
                            ) : (
                                <span className="w-fit flex gap-2 items-center justify-center rounded-md text-white  px-5 py-2.5 text-center text-sm font-medium  bg-prime2 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                    <i className="fa-solid fa-check"></i>
                                    <h6>Added to cart</h6>
                                </span>
                            )}
                            <hr className=" border-none bg-white/50 h-[2px]" />

                            <div className="flex flex-col gap-2">
                                <p className="/80">{data.description}</p>
                            </div>
                        </div>
                        <hr className="lg:col-span-2 border-none bg-black/50 h-[2px]" />
                        <div className="lg:col-span-2">
                            <Accordion
                                className="border-none flex flex-col gap-2"
                                collapseAll
                            >
                                {data.faq.map((f: any, i: number) => {
                                    return (
                                        <Accordion.Panel key={i}>
                                            <Accordion.Title className="text-black bg-transparent rounded-lg py-2 px-4 hover:bg-primary/10">
                                                {f.q}
                                            </Accordion.Title>
                                            <Accordion.Content>
                                                <p className="/70 px-4 py-2">
                                                    {f.a}
                                                </p>
                                            </Accordion.Content>
                                        </Accordion.Panel>
                                    )
                                })}
                            </Accordion>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
        )
    }
}

export default Bike
