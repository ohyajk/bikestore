import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Spinner from "../components/Spinner"
import { Bike } from "../types/types"
import { convertToIST } from "../lib/time"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCancel, faCheck, faClock, faMoneyBill, faShip, faShippingFast, faTimes, faWarning } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
const Order = () => {

    const { ref } = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ["order", ref],
        queryFn: async () => {
            const fetcher = await axios.get(
                `/order/${ref}`,
                {
                    withCredentials: true,
                }
            )
            const d = fetcher.data
            console.log(d)
            return d
        },
    })

    return (
        <main className="screen-height  w-full">
            <section>
                <h1 className="text-3xl font-bold mb-4">Order Details</h1>
                {isLoading && <Spinner />}
                {data && data.length === 0 && (
                    <div className="h-full flex justify-center items-center">
                        <h1 className="text-2xl font-bold opacity-80">No Orders Found</h1>
                    </div>
                )}
                {
                    data && (
                        <div className="bg-white border rounded-xl p-8 flex flex-col gap-4">
                            <span className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold">Order Date :</h2>
                                <h2 className="text-xl font-semibold">{convertToIST(data.createdAt)}</h2>
                            </span>
                            <span className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold">Total Price :</h2>
                                <h2 className="text-xl font-semibold">${data.total}</h2>
                            </span>
                            <span className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold">Payment Status :</h2>
                                {
                                    data.paymentStatus === 'PENDING' && (
                                        <span className="flex items-center gap-2 px-4 py-1 rounded-xl border text-lg font-medium text-yellow-400 border-yellow-400">
                                            <FontAwesomeIcon icon={faWarning} />
                                            <h2>PENDING</h2>
                                        </span>
                                    )
                                }
                                {
                                    data.paymentStatus === 'PAID' && (
                                        <span className="flex items-center gap-2 px-4 py-1 rounded-xl border text-lg font-medium text-green-400 border-green-400">
                                            <FontAwesomeIcon icon={faCheck} />
                                            <h2>PAID</h2>
                                        </span>
                                    )
                                }
                                {
                                    data.paymentStatus === 'REFUNDED' && (
                                        <span className="flex items-center gap-2 px-4 py-1 rounded-xl border text-lg font-medium text-red-500 border-red-500">
                                            <FontAwesomeIcon icon={faMoneyBill} />
                                            <h2>REFUNDED</h2>
                                        </span>
                                    )
                                }
                            </span>
                            <span className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold">Delivery Status :</h2>
                                {
                                    data.deliveryStatus === 'YET_TO_SHIP' && (
                                        <span className="flex items-center gap-2 px-4 py-1 rounded-xl border text-lg font-medium text-yellow-400 border-yellow-400">
                                            <FontAwesomeIcon icon={faWarning} />
                                            <h2>SHIPPING PENDING</h2>
                                        </span>
                                    )
                                }
                                {
                                    data.deliveryStatus === 'SHIPPED' && (
                                        <span className="flex items-center gap-2 px-4 py-1 rounded-xl border text-lg font-medium text-blue-400 border-blue-400">
                                            <FontAwesomeIcon icon={faShip} />
                                            <h2>ORDER SHIPPED</h2>
                                        </span>
                                    )
                                }
                                {
                                    data.deliveryStatus === 'IN_TRANSIT' && (
                                        <span className="flex items-center gap-2 px-4 py-1 rounded-xl border text-lg font-medium text-orange-400 border-orange-400">
                                            <FontAwesomeIcon icon={faShippingFast} />
                                            <h2>ORDER IN TRANSIT</h2>
                                        </span>
                                    )
                                }
                                {
                                    data.deliveryStatus === 'DELIVERED' && (
                                        <span className="flex items-center gap-2 px-4 py-1 rounded-xl border text-lg font-medium text-green-400 border-green-400">
                                            <FontAwesomeIcon icon={faCheck} />
                                            <h2>ORDER DELIVERED</h2>
                                        </span>
                                    )
                                }
                                {
                                    data.deliveryStatus === 'UNDELIVERED' && (
                                        <span className="flex items-center gap-2 px-4 py-1 rounded-xl border text-lg font-medium text-amber-400 border-amber-400">
                                            <FontAwesomeIcon icon={faClock} />
                                            <h2>ORDER UNDELIVERED</h2>
                                        </span>
                                    )
                                }
                                {
                                    data.deliveryStatus === 'CANCELLED' && (
                                        <span className="flex items-center gap-2 px-4 py-1 rounded-xl border text-lg font-medium text-red-500 border-red-500">
                                            <FontAwesomeIcon icon={faTimes} />
                                            <h2>ORDER CANCELLED</h2>
                                        </span>
                                    )
                                }
                            </span>
                            <span className="flex gap-8 items-center">
                                {
                                    data.paymentStatus === 'PENDING' ? (
                                        <Link to={`/payment/${data.ref}`} className="px-4 py-2 rounded-xl text-xl font-medium text-white bg-green-700 hover:bg-white hover:text-green-700 border border-green-700 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faMoneyBill} />
                                            <h6>PAY NOW</h6>
                                        </Link>
                                    ) : (
                                        <button className="px-4 py-2 rounded-xl text-xl font-medium text-white bg-green-700 border border-green-700 flex items-center gap-2" disabled>
                                            <FontAwesomeIcon icon={faMoneyBill} />
                                            <h6>PAID</h6>
                                        </button>
                                    )
                                }
                                {
                                    data.deliveryStatus !== 'CANCELLED' || data.deliveryStatus !== 'DELIVERED'  && (
                                        <button className="px-4 py-2 rounded-xl text-xl font-medium text-white bg-red-700 hover:bg-white hover:text-red-700 border border-red-700 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faCancel} />
                                            <h6>CANCEL ORDER</h6>
                                        </button>
                                    )
                                }
                            </span>
                            <hr className="h-1 w-full " />
                            <h2 className="text-2xl font-semibold">Your Products</h2>
                            {
                                data.bikes.length > 0 ? data.bikes.map((bike: Bike, i: number) => {
                                    return (
                                        <Link to={`/bike/${bike.url}`} key={`key${i}`} className="bg-white border rounded-lg p-4 flex flex-col md:flex-row justify-between shadow-sm items-center ">
                                            <div className="flex items-center gap-4 h-full">
                                                <div className="border-2 rounded-xl h-full w-40 p-4 flex flex-grow items-center justify-center">
                                                    <img src={bike.image} alt={bike.name} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="flex flex-col gap-2">
                                                    <h4 className="text-3xl font-bold">
                                                        {bike.name}
                                                    </h4>
                                                    <h2 className="text-lg font-semibold">
                                                        ${bike.price}
                                                    </h2>
                                                </span>
                                            </div>
                                        </Link>
                                    )
                                }) : (
                                    <h1 className="text-2xl font-bold opacity-80">No Bikes Found</h1>
                                )
                            }
                        </div>
                    )
                }

            </section>
        </main>
    )
}

export default Order