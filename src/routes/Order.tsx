import { useParams } from "react-router"

const Order = () => {

    const {ref} = useParams()

  return (
    <main className="screen-height  w-full">
    <section>
        <h1 className="text-3xl font-bold mb-4">Order Details</h1>
        {ref}
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
                                        123
    </section>
    </main>
  )
}

export default Order