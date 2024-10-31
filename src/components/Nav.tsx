import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import useCartState from "../state/cartState";
import useMenuState from "../state/menuState";
import { useLocation } from 'react-router-dom';
import UserDrop from "./UserDrop";
import useUserState from "../state/userState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping, faBars, faBiking, faCircleInfo, faCircleUser, faHouse, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
const Nav: FC = () => {
    const location = useLocation();
    const hiddenRoutes = ['/auth', '/verify', '/details'];

    if (hiddenRoutes.includes(location.pathname)) {
        return null;
    }
    const { open } = useCartState()
    const { menuOpen } = useMenuState()
    const { user } = useUserState()

    return (
        <header className="border-b shadow-sm bg-white  h-[80px] px-8">
            <nav className="mx-auto h-full max-w-7xl  flex justify-between items-center " >
                <span className="flex flex-col items-center justify-center ">
                    <FontAwesomeIcon icon={faBiking} className="fa-2x " />
                    <h1 className="logo-font ">BikeStore</h1>
                </span>
                <ul className="hidden md:flex items-center text-lg font-semibold gap-8">
                    <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary delay-75 duration-300 ease-in-out flex items-center gap-2' : ' flex items-center gap-2'}>
                            <FontAwesomeIcon icon={faHouse} />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                        <NavLink to="/bikes" className={({ isActive }) => isActive ? 'text-primary delay-75 duration-300 ease-in-out flex items-center gap-2' : ' flex items-center gap-2'}>
                            <FontAwesomeIcon icon={faBiking} />
                            <span>Bikes</span>
                        </NavLink>
                    </li>
                    <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                        <NavLink to="/about" className={({ isActive }) => isActive ? 'text-primary delay-75 duration-300 ease-in-out flex items-center gap-2' : ' flex items-center gap-2'}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            <span>About</span>
                        </NavLink>
                    </li>
                    <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                        <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-primary delay-75 duration-300 ease-in-out flex items-center gap-2' : ' flex items-center gap-2'}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <span>Contact</span>
                        </NavLink>
                    </li>
                </ul>
                <ul className="hidden lg:flex items-center text-lg font-semibold gap-8 ">
                    <button onClick={open} className="hover:text-primary delay-100 duration-300 ease-in-out flex items-center gap-2">
                        <FontAwesomeIcon icon={faBagShopping} size="xl" />
                        <span>Cart</span>
                    </button>
                    {
                        user?.name ?
                            <UserDrop user={user.name} /> :
                            <Link to={'/auth'} className="hover:text-primary delay-100 duration-300 ease-in-out flex items-center gap-2">
                                <FontAwesomeIcon icon={faCircleUser} size="xl" />
                                <span>Login/Register</span>
                            </Link>
                    }
                </ul>
                <button onClick={menuOpen} className="md:hidden focus:text-primary delay-100 duration-300 ease-in-out">
                    <FontAwesomeIcon icon={faBars} size="2x" />
                </button>
            </nav>

        </header>
    )
}

export default Nav