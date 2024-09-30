import { FC } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useMenuState from "../state/menuState"
import { NavLink } from "react-router-dom"
import useUserState from "../state/userState"

const MobNav: FC = () => {
    const { menuStatus, menuClose } = useMenuState()

    return (
        <AnimatePresence>
            {menuStatus && (
                <motion.div
                    onClick={menuClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    exit={{ opacity: 0 }}
                    className="md:hidden fixed top-0 left-0 h-screen w-full bg-black/80 text-white backdrop-blur-lg p-4 z-50"
                >
                    <button
                        onClick={menuClose}
                        className="focus:animate-spin duration-300 delay-100 hover:text-primary right-8 top-6 absolute"
                    >
                        <i className="fa-solid fa-xmark fa-2x"></i>
                    </button>
                    <ul className="flex flex-col justify-center h-full items-center text-lg font-semibold gap-16">
                        <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary delay-75 duration-300 ease-in-out flex items-center gap-2"
                                        : " flex items-center gap-2"
                                }
                            >
                                <i className="fa-solid fa-house"></i>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                            <NavLink
                                to="/bikes"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary delay-75 duration-300 ease-in-out flex items-center gap-2"
                                        : " flex items-center gap-2"
                                }
                            >
                                <i className="fa-solid fa-person-biking"></i>
                                <span>Bikes</span>
                            </NavLink>
                        </li>
                        <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary delay-75 duration-300 ease-in-out flex items-center gap-2"
                                        : " flex items-center gap-2"
                                }
                            >
                                <i className="fa-solid fa-circle-info"></i>
                                <span>About</span>
                            </NavLink>
                        </li>
                        <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary delay-75 duration-300 ease-in-out flex items-center gap-2"
                                        : " flex items-center gap-2"
                                }
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                                <span>Contact</span>
                            </NavLink>
                        </li>
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MobNav
