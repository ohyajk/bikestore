import { FC } from "react"

const NotFound: FC = () => {
    return (
        <div className="screen-height p-4 flex flex-col gap-8 justify-center items-center">
            <img className="h-[300px] " src="/404.png" />
            <h6 className="text-2xl uppercase text-center">
                The page you are looking for is not available.
            </h6>
        </div>
    )
}

export default NotFound
