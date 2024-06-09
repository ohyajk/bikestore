import { FC, useState } from "react"
import supabase from "../lib/supabase/client";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

type Props = {
    user: string
};


const UserDrop: FC<Props> = ({ user }: Props) => {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.log('Error logging out:', error.message)
        navigate('/')
        console.log('logged out')
    }

    return (
        <div className="relative flex flex-col items-center justify-center" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button className="hover:text-primary delay-100 duration-300 ease-in-out flex items-center gap-2 ">
                <i className="fa-solid fa-circle-user fa-lg"></i>
                <span className="capitalize">{user}</span>
            </button>
            {open &&
                <ul className="z-10 absolute top-7 bg-bg2 rounded-lg p-4 flex flex-col gap-2 border-primary border-2" >
                    <Link onClick={() => setOpen(false)} to='/orders' className="hover:text-primary delay-100 duration-300 ease-in-out flex items-center gap-2 relative">
                        <i className="fa-solid fa-truck-fast fa-lg"></i>
                        <span className="capitalize whitespace-nowrap">Your Orders</span>
                    </Link>
                    <Link onClick={() => setOpen(false)} to='/profile' className="hover:text-primary delay-100 duration-300 ease-in-out flex items-center gap-2 relative">
                        <i className="fa-solid fa-user-pen fa-lg"></i>
                        <span className="capitalize whitespace-nowrap">Your Profile</span>
                    </Link>
                    <button onClick={() => { signOut; setOpen(false) }} className="hover:text-primary delay-100 duration-300 ease-in-out flex items-center gap-2 relative">
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                        <span className="capitalize">Logout</span>
                    </button>
                </ul>}
        </div >
    )
}

export default UserDrop