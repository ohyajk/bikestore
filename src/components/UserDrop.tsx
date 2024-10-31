import { FC, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import useUserState from "../state/userState"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faRightFromBracket, faTruckFast, faUserPen } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { toast } from "react-toastify"
type Props = {
    user: string
}

const UserDrop: FC<Props> = ({ user }: Props) => {
    const navigate = useNavigate()
    const dropdownRef = useRef<HTMLDivElement>(null)

    const [open, setOpen] = useState(false)
    const { clearUserStore } = useUserState()

    const signOut = async () => {
        const reqLogout = await axios.post("/logout", {}, { withCredentials: true })
        if (reqLogout.status !== 200) {
            toast.error("Failed to logout")
            return
        }
        toast.success("Logged out successfully")
        clearUserStore()
        navigate("/")
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
            onClick={() => { if (open == false) setOpen(true) }}
            ref={dropdownRef}
        >
            <button className="hover:text-primary delay-100 duration-300 ease-in-out flex items-center gap-2 ">
                <FontAwesomeIcon icon={faCircleUser} className="hidden md:block fa-2x lg:fa-lg" />
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
                        <FontAwesomeIcon icon={faTruckFast} size="lg" />
                        <span className="capitalize whitespace-nowrap">
                            Your Orders
                        </span>
                    </Link>
                    <Link
                        onClick={() => setOpen(false)}
                        to="/profile"
                        className=" delay-100 duration-300 ease-in-out flex items-center gap-2 relative px-4 py-2 hover:text-white hover:bg-primary"
                    >
                        <FontAwesomeIcon icon={faUserPen} size="lg" />
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
                        <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                        <span className="capitalize">Logout</span>
                    </button>
                </ul>
            )}
        </div>
    )
}

export default UserDrop
