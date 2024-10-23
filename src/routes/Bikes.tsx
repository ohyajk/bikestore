import { FC, useState } from "react"
import MultiRangeSlider from "multi-range-slider-react"
import { AnimatePresence } from "framer-motion"
import { Bike } from "../types/types"
import useBikes from "../lib/bikeFetcher"
import BikeCard from "../components/BikeCard"

const Bikes: FC = () => {
    const [minValue, set_minValue] = useState(5000)
    const [maxValue, set_maxValue] = useState(25000)
    const [ratingFilter, setRatingFilter] = useState(3)
    const [sortByA2Z, setSortByA2Z] = useState(false)
    const [sortByZ2A, setSortByZ2A] = useState(false)
    const [ratingByL2H, setRatingByL2H] = useState(false)
    const [ratingByH2L, setRatingByH2L] = useState(false)
    const [priceByL2H, setPriceByL2H] = useState(false)
    const [priceByH2L, setPriceByH2L] = useState(false)

    const { data, isLoading, isError } = useBikes()


    console.log(data, isLoading, isError)

    const handleInput = (e: any) => {
        set_minValue(e.minValue)
        set_maxValue(e.maxValue)
    }


    return (
        <main className=" grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 screen-height">
            <section className="flex flex-col gap-4 sm:grid grid-cols-2 lg:grid-cols-1 sm:gap-8 lg:gap-4 bg-white shadow-lg p-4 rounded-lg  h-fit">
                <div className="col-span-2 lg:col-span-1">
                    <h2 className="text-2xl ">Filter Results</h2>
                    <hr className="h-1 w-full my-2 bg-primary" />
                </div>
                <div className="col-span-1">
                    <h3 className=" text-lg flex items-center gap-2">
                        <i className="fa-solid fa-indian-rupee-sign fa-sm"></i>
                        <span>Price</span>
                    </h3>
                    <MultiRangeSlider
                        min={5000}
                        max={25000}
                        step={1000}
                        minCaption="Min Price"
                        maxCaption="Max Price"
                        minValue={minValue}
                        maxValue={maxValue}
                        stepOnly={true}
                        onInput={(e) => {
                            handleInput(e)
                        }}
                    />
                    <span className="flex items-center justify-between">
                        <h6 className="font-medium bg-primary px-2 py-1 rounded-lg text-sm">
                            {minValue}
                        </h6>
                        <h6 className="font-medium bg-primary px-2 py-1 rounded-lg text-sm">
                            {maxValue}
                        </h6>
                    </span>
                </div>
                <div className="col-span-1">
                    <h3 className=" text-lg flex items-center gap-2">
                        <i className="fa-solid fa-star fa-sm"></i>
                        <span>Ratings</span>
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                        <button
                            onClick={() => setRatingFilter(1)}
                            className="hover:scale-105 active:scale-125 text-primary"
                        >
                            <i
                                className={`fa-${
                                    ratingFilter >= 1 ? "solid" : "regular"
                                } fa-star fa-2x`}
                            ></i>
                        </button>
                        <button
                            onClick={() => setRatingFilter(2)}
                            className="hover:scale-105 active:scale-125 text-primary"
                        >
                            <i
                                className={`fa-${
                                    ratingFilter >= 2 ? "solid" : "regular"
                                } fa-star fa-2x`}
                            ></i>
                        </button>
                        <button
                            onClick={() => setRatingFilter(3)}
                            className="hover:scale-105 active:scale-125 text-primary"
                        >
                            <i
                                className={`fa-${
                                    ratingFilter >= 3 ? "solid" : "regular"
                                } fa-star fa-2x`}
                            ></i>
                        </button>
                        <button
                            onClick={() => setRatingFilter(4)}
                            className="hover:scale-105 active:scale-125 text-primary"
                        >
                            <i
                                className={`fa-${
                                    ratingFilter >= 4 ? "solid" : "regular"
                                } fa-star fa-2x`}
                            ></i>
                        </button>
                        <button
                            onClick={() => setRatingFilter(5)}
                            className="hover:scale-105 active:scale-125 text-primary"
                        >
                            <i
                                className={`fa-${
                                    ratingFilter === 5 ? "solid" : "regular"
                                } fa-star fa-2x`}
                            ></i>
                        </button>
                        <span>& Up</span>
                    </div>
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <h3 className=" text-lg flex items-center gap-2">
                        <i className="fa-solid fa-sort fa-sm"></i>
                        <span>Sort</span>
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1  gap-2 mt-2 select-none">
                        <li className="flex gap-2 items-center">
                            <input
                                checked={priceByL2H}
                                onChange={() => {
                                    setPriceByL2H(!priceByL2H)
                                    setPriceByH2L(false)
                                }}
                                id="pl2h"
                                type="checkbox"
                            />
                            <label htmlFor="pl2h" className="font-medium">
                                Price: Low to High{" "}
                            </label>
                        </li>
                        <li className="flex gap-2 items-center">
                            <input
                                checked={priceByH2L}
                                onChange={() => {
                                    setPriceByH2L(!priceByH2L)
                                    setPriceByL2H(false)
                                }}
                                id="ph2l"
                                type="checkbox"
                            />
                            <label htmlFor="ph2l" className="font-medium">
                                Price: High to Low
                            </label>
                        </li>
                        <li className="flex gap-2 items-center">
                            <input
                                checked={ratingByL2H}
                                onChange={() => {
                                    setRatingByL2H(!ratingByL2H)
                                    setRatingByH2L(false)
                                }}
                                id="rl2h"
                                type="checkbox"
                            />
                            <label htmlFor="rl2h" className="font-medium">
                                Rating: Low to High{" "}
                            </label>
                        </li>
                        <li className="flex gap-2 items-center">
                            <input
                                checked={ratingByH2L}
                                onChange={() => {
                                    setRatingByH2L(!ratingByH2L)
                                    setRatingByL2H(false)
                                }}
                                id="rh2l"
                                type="checkbox"
                            />
                            <label htmlFor="rh2l" className="font-medium">
                                Rating: High to Low
                            </label>
                        </li>
                        <li className="flex gap-2 items-center">
                            <input
                                checked={sortByA2Z}
                                onChange={() => {
                                    setSortByA2Z(!sortByA2Z)
                                    setSortByZ2A(false)
                                }}
                                id="a2z"
                                type="checkbox"
                            />
                            <label htmlFor="a2z" className="font-medium">
                                Alphabet: A to Z
                            </label>
                        </li>
                        <li className="flex gap-2 items-center">
                            <input
                                checked={sortByZ2A}
                                onChange={() => {
                                    setSortByZ2A(!sortByZ2A)
                                    setSortByA2Z(false)
                                }}
                                id="z2a"
                                type="checkbox"
                            />
                            <label htmlFor="z2a" className="font-medium">
                                Alphabet: Z to A
                            </label>
                        </li>
                    </ul>
                </div>
            </section>
            {isLoading && (
                <div className="flex justify-center items-center h-full">
                    <i className="fa-solid fa-spinner animate-spin fa-2x text-primary"></i>
                </div>
            )}
            {isError ||
                (!isLoading && !data && (
                    <div className="flex flex-col justify-center items-center h-full">
                        <img className="h-[200px] " src="/404.png" />
                        <h2 className="mt-2 text-xl">No Bikes Available...</h2>
                    </div>
                ))}
            <section className="grid grid-cols-1  sm:grid-cols-2  min-[1336px]:grid-cols-3 justify-start gap-4 ">
                <AnimatePresence>
                    {data
                        ?.filter(
                            (p: Bike) =>
                                p.price > minValue && p.price < maxValue
                        )
                        .filter((p: Bike) => p.rating >= ratingFilter)
                        .sort(
                            priceByL2H
                                ? (a: Bike, b: Bike) => a.price - b.price
                                : undefined
                        )
                        .sort(
                            priceByH2L
                                ? (a: Bike, b: Bike) => b.price - a.price
                                : undefined
                        )
                        .sort(
                            ratingByL2H
                                ? (a: Bike, b: Bike) => a.rating - b.rating
                                : undefined
                        )
                        .sort(
                            ratingByH2L
                                ? (a: Bike, b: Bike) => b.rating - a.rating
                                : undefined
                        )
                        .sort(
                            sortByA2Z
                                ? (a: Bike, b: Bike) =>
                                      (
                                          a.name?.toLowerCase() || ""
                                      ).localeCompare(
                                          b.name?.toLowerCase() || ""
                                      )
                                : undefined
                        )
                        .sort(
                            sortByZ2A
                                ? (a: Bike, b: Bike) =>
                                      (
                                          b.name?.toLowerCase() || ""
                                      ).localeCompare(
                                          a.name?.toLowerCase() || ""
                                      )
                                : undefined
                        )
                        .map((p: Bike, i: Number) => {
                            return (
                                <BikeCard key={`card-${i}`} {...p} />
                            )
                        })}
                </AnimatePresence>
            </section>
        </main>
    )
}

export default Bikes
