import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"

const Orders: FC = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const response = await fetch(
                "http://localhost:9000/api/order/all",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            )
            const d = await response.json()
            console.log(d)
            return d
        },
    })

    return (
        <main className="screen-height  w-full">
            <section className="h-full flex flex-col gap-4 bg-white p-4 md:p-8 rounded-lg">
                <h1 className="text-3xl font-bold mb-4">All Orders</h1>
                {isLoading && <Spinner />}
                {data && (
                    <>
                        {data.map((o: any) => {
                            return (
                                <div className="border rounded-lg p-4 flex flex-col md:flex-row justify-between shadow-lg">
                                    <Link
                                        to={`/bike/${o.bike.url}`}
                                        className="flex items-center gap-4"
                                    >
                                        <img
                                            src={o.bike.image}
                                            alt=""
                                            className="h-24 w-24 object-contain border rounded-lg p-2"
                                        />
                                        <span className="flex flex-col gap-2">
                                            <h2 className="text-2xl font-bold">
                                                {o.bike.name}
                                            </h2>
                                            <h4 className="text-lg font-semibold">
                                                {o.bike.price}
                                            </h4>
                                        </span>
                                    </Link>
                                    <div className="flex md:items-center flex-col md:flex-row items-start gap-2 md:gap-12 mt-2 md:mt-0">
                                        <span className="flex flex-col justify-center gap-2 md:text-center">
                                            <h6 className="text-black/80 font-semibold text-sm">
                                                Delivery Status
                                            </h6>
                                            {o.deliveryStatus ==
                                                "DELIVERED" && (
                                                <span className="flex gap-2 items-center border  font-bold px-4 py-2 rounded-lg border-green-500 text-green-500 animate-pulse">
                                                    <i className="fa-regular fa-circle-dot"></i>
                                                    <h4 className="">
                                                        Delivered
                                                    </h4>
                                                </span>
                                            )}
                                            {o.deliveryStatus ==
                                                "YET_TO_SHIP" && (
                                                <span className="flex gap-2 items-center border  font-bold px-4 py-2 rounded-lg border-primary text-primary animate-pulse">
                                                    <i className="fa-regular fa-circle-dot"></i>
                                                    <h4 className="">
                                                        Yet To Ship
                                                    </h4>
                                                </span>
                                            )}
                                            {o.deliveryStatus ==
                                                "IN_TRANSIT" && (
                                                <span className="flex gap-2 justify-center items-center border  font-bold px-4 py-2 rounded-lg border-amber-500 text-amber-500 animate-puls">
                                                    <i className="fa-regular fa-circle-dot"></i>
                                                    <h4 className="">
                                                        In Transit
                                                    </h4>
                                                </span>
                                            )}
                                        </span>
                                        <span className="flex flex-col justify-center gap-2 md:text-center">
                                            <h6 className="text-black/80 font-semibold text-sm">
                                                Payment Status
                                            </h6>
                                            {o.paymentStatus == "PENDING" ? (
                                                <button className="flex gap-2 items-center border  font-bold px-4 py-2 rounded-lg border-primary text-primary hover:bg-primary hover:text-white">
                                                    <i className="fa-regular fa-credit-card"></i>
                                                    <h4 className="">
                                                        Pay Now
                                                    </h4>
                                                </button>
                                            ) : (
                                                <span className="flex gap-2 justify-center items-center border  font-bold px-4 py-2 rounded-lg border-green-600 text-green-600">
                                                    <i className="fa-solid fa-check"></i>
                                                    <h4 className="">Paid</h4>
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                )}
                {/* <div className="border rounded-lg p-4 flex justify-between">
                    <Link to={"#"} className="flex items-center gap-4">
                        <img
                            src="https://www.herocycles.com/dw/image/v2/BGQH_PRD/on/demandware.static/-/Sites-cycles-master/default/dwde87285d/Products/Hustle/BSHUS29BL00002/02.png"
                            alt=""
                            className="h-24 w-24 object-contain border rounded-lg p-2"
                        />
                        <span className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold">HUSTLE 27T</h2>
                            <h4 className="text-lg font-semibold">$20000</h4>
                        </span>
                    </Link>
                    <div className="flex items-center gap-12">
                        <span className="flex flex-col justify-center gap-2 text-center">
                            <h6 className="text-black/80 font-semibold text-sm">
                                Delivery Status
                            </h6>
                            
                        </span>
                        <span className="flex flex-col justify-center gap-2 text-center">
                            <h6 className="text-black/80 font-semibold text-sm">
                                Payment Status
                            </h6>
                            <button>
                                <span className="flex gap-2 items-center border  font-bold px-4 py-2 rounded-lg border-primary text-primary hover:bg-primary hover:text-white">
                                    <i className="fa-regular fa-credit-card"></i>
                                    <h4 className="">Pay Now</h4>
                                </span>
                            </button>
                        </span>
                    </div>
                </div>
                <div className="border rounded-lg p-4 flex justify-between">
                    <Link to={"#"} className="flex items-center gap-4">
                        <img
                            src="https://www.herocycles.com/dw/image/v2/BGQH_PRD/on/demandware.static/-/Sites-cycles-master/default/dwde87285d/Products/Hustle/BSHUS29BL00002/02.png"
                            alt=""
                            className="h-24 w-24 object-contain border rounded-lg p-2"
                        />
                        <span className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold">HUSTLE 27T</h2>
                            <h4 className="text-lg font-semibold">$20000</h4>
                        </span>
                    </Link>
                    <div className="flex items-center gap-12">
                        <span className="flex flex-col justify-center gap-2 text-center">
                            <h6 className="text-black/80 font-semibold text-sm">
                                Delivery Status
                            </h6>
                            <span>
                               
                            </span>
                        </span>
                        <span className="flex flex-col justify-center gap-2 text-center">
                            <h6 className="text-black/80 font-semibold text-sm">
                                Payment Status
                            </h6>
                            <span className="flex gap-2 items-center border  font-bold px-4 py-2 rounded-lg border-green-600 text-green-600 ">
                                <i className="fa-solid fa-check"></i>
                                <h4 className="">Paid</h4>
                            </span>
                        </span>
                    </div>
                </div> */}
            </section>
        </main>
    )
}

export default Orders
