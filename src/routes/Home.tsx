import { FC } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"
import { useQuery } from "@tanstack/react-query"
import BikeCard from "../components/BikeCard"

const Home: FC = () => {
    // const notify = () =>
    //     toast.success("Wow so easy!", {
    //         style: {
    //             background: "#2a2a2a",
    //             borderWidth: 1,
    //             borderColor: "#FFF",
    //             boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
    //         },
    //     })

    const { data, isLoading, isError } = useQuery({
        queryKey: ["allBikesHome"],
        queryFn: async () => {
            const fetcher = await fetch("http://localhost:3000/api/bike/all")
            const data = await fetcher.json()
            return data
        },
    })

    return (
        <main className="flex flex-col gap-4 sm:gap-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                }}
                className="bg-white p-8 rounded-lg shadow-lg grid lg:grid-cols-2 gap-4 sm:gap-8"
            >
                <div className=" flex flex-col gap-4 sm:gap-8 justify-center">
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.5,
                            ease: "easeInOut",
                        }}
                        className="bg-primary px-4 py-2 rounded-lg text-white w-fit"
                    >
                        <h6 className="font-bold text-sm sm:text-base">
                            Latest Arrival
                        </h6>
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.4,
                            duration: 0.5,
                            ease: "easeInOut",
                        }}
                        className="text-3xl sm:text-5xl font-bold"
                    >
                        Conquer the streets
                        <br /> with the HUSTLE 26T
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.7,
                            duration: 0.5,
                            ease: "easeInOut",
                        }}
                        className="text-sm sm:text-base text-black/80 font-medium text-justify"
                    >
                        The HUSTLE (26T) is ideal for city commuting and light
                        off-road riding. With 26-inch wheels and a durable
                        frame, it offers a smooth, controlled ride. Its
                        efficient gear system and ergonomic design ensure
                        comfort. Now available at ₹20000, down from ₹23000.
                    </motion.p>
                    <Link to="/bike/hustle-26t">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: 0.9,
                                duration: 0.5,
                                ease: "linear",
                            }}
                            className="px-4 py-2 bg-primary rounded-lg text-lg font-bold text-white w-fit hover:bg-prime2 transform transition-transform duration-300"
                        >
                            View More
                        </motion.button>
                    </Link>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.5,
                        ease: "easeInOut",
                    }}
                    className="flex justify-center"
                >
                    <img
                        className="hover:scale-105 transform transition-transform duration-300"
                        src="https://www.herocycles.com/dw/image/v2/BGQH_PRD/on/demandware.static/-/Sites-cycles-master/default/dwde87285d/Products/Hustle/BSHUS29BL00002/02.png"
                        alt=""
                    />
                </motion.div>
            </motion.div>
            <section className="bg-white px-4 py-2 rounded-lg shadow-lg">
                <span className="text-lg sm:text-2xl font-bold text-primary flex items-center gap-2">
                    <h2>Mountain Bikes</h2>
                    <i className="fa-solid fa-angles-right"></i>
                </span>
            </section>
            <section>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={3}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: true,
                    }}
                    loop={true}
                >
                    {isLoading &&
                        Array.from({
                            length: 3,
                        }).map((_, i: Number) => {
                            return (
                                <SwiperSlide>
                                    <div
                                        role="status"
                                        key={`skeleton+${i}`}
                                        className="h-[390px] w-full gradient-background rounded-lg shadow-lg"
                                    ></div>
                                </SwiperSlide>
                            )
                        })}

                    {data
                        ?.filter((b: any) => b.category == "MTB")
                        .map((b: any) => {
                            return (
                                <SwiperSlide>
                                    <BikeCard {...b} />
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
            </section>
            <section className="bg-white px-4 py-2 rounded-lg shadow-lg">
                <span className="text-lg sm:text-2xl font-bold text-primary flex items-center gap-2">
                    <h2>City Bikes</h2>
                    <i className="fa-solid fa-angles-right"></i>
                </span>
            </section>
            <section>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={3}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                    }}
                    loop={true}
                >
                    {isLoading &&
                        Array.from({
                            length: 3,
                        }).map((_, i: Number) => {
                            return (
                                <SwiperSlide>
                                    <div
                                        role="status"
                                        key={`skeleton+${i}`}
                                        className="h-[390px] w-full gradient-background rounded-lg shadow-lg"
                                    ></div>
                                </SwiperSlide>
                            )
                        })}
                    {data
                        ?.filter((b: any) => b.category == "ROAD")
                        .map((b: any) => {
                            return (
                                <SwiperSlide>
                                    <BikeCard {...b} />
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
            </section>
            <section className="bg-white px-4 py-2 rounded-lg shadow-lg">
                <span className="text-lg sm:text-2xl font-bold text-primary flex items-center gap-2">
                    <h2>Commuter Bikes</h2>
                    <i className="fa-solid fa-angles-right"></i>
                </span>
            </section>
            <section>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={3}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: true,
                    }}
                    loop={true}
                >
                    {isLoading &&
                        Array.from({
                            length: 3,
                        }).map((_, i: Number) => {
                            return (
                                <SwiperSlide>
                                    <div
                                        role="status"
                                        key={`skeleton+${i}`}
                                        className="h-[390px] w-full gradient-background rounded-lg shadow-lg"
                                    ></div>
                                </SwiperSlide>
                            )
                        })}
                    {data
                        ?.filter((b: any) => b.category == "COMMUTER")
                        .map((b: any) => {
                            return (
                                <SwiperSlide>
                                    <BikeCard {...b} />
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
            </section>
        </main>
    )
}

export default Home
