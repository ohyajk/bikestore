import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"
import axios from "axios"
import { convertToIST } from "../lib/time"

const Orders: FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const fetcher = await axios.get(
                '/order/all',
                {
                    withCredentials: true,
                }
            )
            const d = fetcher.data
            return d
        },
    })

    return (
        <main className="screen-height w-full">
            <section className="h-full flex flex-col gap-4 p-4 md:p-8 rounded-lg">
                <h1 className="text-3xl font-bold mb-4">All Orders</h1>
                {isLoading && <Spinner />}
                {data && data.length === 0 && (
                    <div className="h-full flex justify-center items-center">
                        <h1 className="text-2xl font-bold opacity-80">No Orders Found</h1>
                    </div>
                )}
                {data && data.length > 0 && (
                    <>
                        {data.map((o: any, i: number) => {
                            return (
                                <div key={`key${i}`} className="bg-white border rounded-lg p-4 flex flex-col md:flex-row justify-between shadow-lg items-center ">
                                    <div className="flex items-center gap-4 h-full">
                                        <div className="border-2 rounded-xl h-full w-20 p-4 flex flex-grow items-center justify-center">
                                            <i className="fa-solid fa-person-biking fa-2x"></i>
                                        </div>
                                        <span className="flex flex-col gap-2">
                                            <h4 className="text-lg font-semibold">
                                                {convertToIST(o.createdAt)}
                                            </h4>
                                            <h2 className="text-3xl font-bold">
                                                {o.bikeIds.length > 1 ? o.bikeIds.length + ' Bikes' : '1 Bike'}
                                            </h2>
                                            <h4 className="text-lg font-semibold">
                                                Total : {o.total}
                                            </h4>
                                        </span>
                                    </div>
                                    <Link to={`/order/${o.ref}`} className="border-2 border-primary px-4 py-2 font-semibold rounded-xl">
                                        View Details
                                    </Link>
                                </div>
                            )
                        })}
                    </>
                )}

            </section>
        </main>
    )
}

export default Orders
