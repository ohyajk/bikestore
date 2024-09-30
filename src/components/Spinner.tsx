import { FC } from "react"

const Spinner: FC = () => {
    return (
        <div className=" h-full w-full flex justify-center items-center">
            {" "}
            <i className="fa-solid fa-spinner animate-spin fa-2x text-primary"></i>
        </div>
    )
}

export default Spinner
