import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import useCartState from "../state/cartState";
import useMenuState from "../state/menuState";
import { useLocation } from 'react-router-dom';
import UserDrop from "./UserDrop";
import useUserState from "../state/userState";

const Nav: FC = () => {
    const location = useLocation();
    const hiddenRoutes = ['/auth', '/verify', '/userDetails'];

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
                    <i className="fa-solid fa-person-biking fa-2x"></i>
                    <h1 className="logo-font ">BikeStore</h1>
                </span>
                <ul className="hidden md:flex items-center text-lg font-semibold gap-8">
                    <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary delay-75 duration-300 ease-in-out flex items-center gap-2' : ' flex items-center gap-2'}>
                            <i className="fa-solid fa-house"></i>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                        <NavLink to="/bikes" className={({ isActive }) => isActive ? 'text-primary delay-75 duration-300 ease-in-out flex items-center gap-2' : ' flex items-center gap-2'}>
                            <i className="fa-solid fa-person-biking"></i>
                            <span>Bikes</span>
                        </NavLink>
                    </li>
                    <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                        <NavLink to="/about" className={({ isActive }) => isActive ? 'text-primary delay-75 duration-300 ease-in-out flex items-center gap-2' : ' flex items-center gap-2'}>
                            <i className="fa-solid fa-circle-info"></i>
                            <span>About</span>
                        </NavLink>
                    </li>
                    <li className=" hover:text-primary delay-100 duration-300 ease-in-out">
                        <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-primary delay-75 duration-300 ease-in-out flex items-center gap-2' : ' flex items-center gap-2'}>
                            <i className="fa-solid fa-paper-plane"></i>
                            <span>Contact</span>
                        </NavLink>
                    </li>
                </ul>
                <ul className="hidden lg:flex items-center text-lg font-semibold gap-8 ">
                    <button onClick={open} className="hover:text-primary delay-100 duration-300 ease-in-out flex items-center gap-2">
                        <i className="fa-solid fa-bag-shopping fa-lg"></i>
                        <span>Cart</span>
                    </button>
                    {
                        user?.name ?
                            <UserDrop user={user.name} /> :
                            <Link to={'/auth'} className="hover:text-primary delay-100 duration-300 ease-in-out flex items-center gap-2">
                                <i className="fa-solid fa-circle-user fa-lg"></i>
                                <span>Login/Register</span>
                            </Link>
                    }
                </ul>
                <button onClick={menuOpen} className="md:hidden focus:text-primary delay-100 duration-300 ease-in-out">
                    <i className="fa-solid fa-bars fa-2x"></i>
                </button>
            </nav>

        </header>
    )
}

export default Nav