import { FC } from "react"
import { useLocation } from "react-router"

const Footer: FC = () => {
    const location = useLocation()
    const hiddenRoutes = ["/auth", "/verify", "/details"]

    if (hiddenRoutes.includes(location.pathname)) {
        return null
    }
    return (
        <footer className=" bg-white p-4 flex flex-col justify-center items-center gap-4 shadow-lg text-center">
            <p className="font-medium">© 2024 - All rights reserved</p>
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
