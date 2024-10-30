import { FC } from "react"

type SkeletonCardProps = {
    i : Number
}

const SkeletonCard: FC<SkeletonCardProps> = ({i}) => {
    return (
        <figure key={`skeleton-key-${i}`}
            className="relative flex h-fit w-full  flex-col overflow-hidden rounded-lg border-2 border-bg2/30 bg-white shadow-lg  hover:border-primary "
        >
            <span className="relative mx-3 mt-3 flex h-60 justify-center overflow-hidden rounded-xl bg-white">
                <div className="h-full w-full text-white/70 skeleton-grad flex items-center justify-center">
                <i className="fa-solid fa-person-biking fa-4x opacity-70"></i>
                </div>
                <span className="absolute top-0 left-0 m-2 rounded-full bg-primary/0 text-white/0 px-2 text-center text-sm font-medium skeleton-grad opacity-30">
                    00% OFF
                </span>
            </span>
            <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl tracking-tight font-medium text-white/0 skeleton-grad w-fit rounded-xl">NANANANAA</h5>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p className="text-white/0 skeleton-grad w-fit rounded-xl">
                        <span className="text-3xl font-bold ">
                            &#8377;000
                        </span>
                        <span className="text-sm line-through ">
                            {" "}
                            &#x20B9;
                            0000
                        </span>
                    </p>
                    <div className="flex items-center text-white/0 skeleton-grad w-fit rounded-xl">
                        {Array.from({
                            length: 3,
                        }).map((_, i: Number) => {
                            return (
                                <svg
                                    key={`key${i}`}
                                    aria-hidden="true"
                                    className="h-5 w-5 text-primary/0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            )
                        })}
                        <span className="mr-2 ml-3 rounded text-white/0 bg-primary/0 px-2.5 py-0.5 text-xs font-semibold">
                            0.0
                        </span>
                    </div>
                </div>
            </div>
        </figure>
    )
}

export default SkeletonCard
