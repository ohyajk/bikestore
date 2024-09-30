import { FC } from "react"
import { useLocation } from "react-router"

const Footer: FC = () => {
    const location = useLocation()
    const hiddenRoutes = ["/auth", "/verify", "/userDetails"]

    if (hiddenRoutes.includes(location.pathname)) {
        return null
    }
    return (
        <footer className="mt-8 bg-white p-4 md:p-8 flex flex-col justify-center items-center gap-4 shadow-lg text-center">
            <p className="font-medium">© 2021 - All rights reserved</p>
            <h6 className=" font-semibold">
                <span> Made with </span>
                <i className="fa-solid fa-heart text-primary"></i>
                <span> by </span>
                <a className="text-primary" href="https://jkweb.in">
                    JkWeb(Jitender Kumar)
                </a>
            </h6>
        </footer>
    )
}

export default Footer
