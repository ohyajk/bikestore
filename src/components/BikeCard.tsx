import { FC } from "react"
import { Link } from "react-router-dom"

const BikeCard: FC = (b: any) => {
    return (
        <Link
            to={`/bike/${b.url}`}
            className="relative flex h-fit w-full  flex-col overflow-hidden rounded-lg border-2 border-bg2/30 bg-white shadow-lg cursor-pointer hover:border-primary "
        >
            <span className="relative mx-3 mt-3 flex h-60 justify-center overflow-hidden rounded-xl bg-white">
                <img className="object-contain " src={b.image} alt={b.name} />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-primary text-white px-2 text-center text-sm font-medium">
                    {b.discount}% OFF
                </span>
            </span>
            <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl tracking-tight font-medium">{b.name}</h5>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold">
                            &#8377;{b.price}
                        </span>
                        <span className="text-sm line-through">
                            {" "}
                            &#x20B9;
                            {b.originalPrice}
                        </span>
                    </p>
                    <div className="flex items-center">
                        {Array.from({
                            length: b.rating,
                        }).map((_, i: Number) => {
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
                        })}
                        <span className="mr-2 ml-3 rounded text-white bg-primary px-2.5 py-0.5 text-xs font-semibold">
                            {b.rating}.0
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BikeCard
