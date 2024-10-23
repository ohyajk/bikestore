import { FC, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import useUserState from "../state/userState"
import Cookies from "universal-cookie"

type Props = {
    user: string
}

const UserDrop: FC<Props> = ({ user }: Props) => {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const dropdownRef = useRef<HTMLDivElement>(null)

    const [open, setOpen] = useState(false)
    const { clearUserStore } = useUserState()

    const signOut = async () => {
        cookies.remove("session", { path: "/" })
        clearUserStore()
        navigate("/")
        console.log("logged out")
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropdownRef])

    return (
        <div
            className="relative flex flex-col items-center justify-center"
            onClick={() => {if(open == false) setOpen(true)}}
            ref={dropdownRef}
        >
            <button className="hover:text-primary delay-100 duration-300 ease-in-out flex items-center gap-2 ">
                <i className="hidden md:block fa-solid fa-circle-user fa-2x lg:fa-lg"></i>
                    <span className="h-[32px] w-[32px] p-1 text-white bg-primary rounded-full flex items-center justify-center md:hidden">
                        {user.charAt(0)}
                    </span>
                <span className="capitalize hidden md:block">{user}</span>
            </button>
            {open && (
                <ul className="z-10 absolute top-10 right-0  bg-white rounded-lg  flex flex-col border-2 border-primary shadow-lg">
                    <Link
                        onClick={() => setOpen(false)}
                        to="/orders"
                        className=" delay-100 duration-300 ease-in-out flex items-center gap-2 relative px-4 py-2 hover:text-white hover:bg-primary"
                    >
                        <i className="fa-solid fa-truck-fast fa-lg"></i>
                        <span className="capitalize whitespace-nowrap">
                            Your Orders
                        </span>
                    </Link>
                    <Link
                        onClick={() => setOpen(false)}
                        to="/profile"
                        className=" delay-100 duration-300 ease-in-out flex items-center gap-2 relative px-4 py-2 hover:text-white hover:bg-primary"
                    >
                        <i className="fa-solid fa-user-pen fa-lg"></i>
                        <span className="capitalize whitespace-nowrap">
                            Your Profile
                        </span>
                    </Link>
                    <button
                        onClick={() => {
                            signOut()
                            setOpen(false)
                        }}
                        className=" delay-100 duration-300 ease-in-out flex items-center gap-2 relative px-4 py-2 hover:text-white hover:bg-primary"
                    >
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                        <span className="capitalize">Logout</span>
                    </button>
                </ul>
            )}
        </div>
    )
}

export default UserDrop
