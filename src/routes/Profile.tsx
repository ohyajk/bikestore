import { FC, useEffect, useState } from "react"
import supabase from "../lib/supabase/client";
import DialogBox from "../components/DialogBox";
const Profile: FC = () => {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [user, setUser] = useState<any>(null)

    const colors: string[] = [
        "#FFA500", // Orange
        "#87CEEB", // Skyblue
        "#008000", // Green
        "#800080", // Purple
        "#FF0000", // Red
        "#FFFF00", // Yellow
        "#FFC0CB", // Pink
        "#008080", // Teal
        "#00FFFF", // Aqua
        "#FF00FF", // Fuchsia
        "#00FF00", // Lime
        "#000080", // Navy
        "#800000", // Maroon
        "#808000", // Olive
    ];
    const randomColor: string = colors[Math.floor(Math.random() * colors.length)];

    const getUserData = async () => {

        const session = await supabase.auth.getSession()
        const userId = session.data.session?.user.id
        const { data } = await supabase.from('customers').select('*').eq('id', userId).single()
        setUser(data)
    }
    console.log(user)
    useEffect(() => {
        getUserData()
    }, [])



    return (
        <>
            <div className="screen-height flex flex-col justify-center items-center">
                <div className='relative bg-white/20 min-h-[400px] w-[400px] rounded-2xl shadow-md p-4 sm:p-8 flex flex-col justify-center items-center gap-4'>
                    <div className="h-[150px] w-[150px] rounded-full flex justify-center items-center text-white uppercase text-6xl font-bold [text-shadow:_2px_2px_0_rgb(0_0_0_/_80%)]" style={{ backgroundColor: randomColor }} >
                        {user?.name ? user.name.charAt(0) : '...'}
                    </div>
                    <h1 className="text-4xl font-bold capitalize">{user?.name ? user.name : '...'}</h1>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="flex gap-2 items-center">
                            <i className="text-white/80 fa-solid fa-envelope fa-xl basis-8"></i>
                            <h2 className="text-white/80 text-xl font-medium capitalize">{user?.email ? user.email : '...'}</h2>
                        </span>
                        <hr className="opacity-50" />
                        <span className="flex gap-2 items-center">
                            <i className="text-white/80 fa-solid fa-phone fa-xl basis-8"></i>
                            <h2 className="text-white/80 text-xl font-medium capitalize">+91 {user?.phone ? user.phone : '...'}</h2>
                        </span>
                        <hr className="opacity-50" />
                        <span className="flex gap-2 items-center">
                            <i className="text-white/80 fa-solid fa-location-crosshairs fa-xl basis-8"></i>
                            <h2 className="text-white/80 text-xl font-medium capitalize">{user?.address ? user.address : '...'}</h2>
                        </span>

                    </div>
                    <button onClick={() => setShowDialog(true)} className="absolute top-4 right-4 flex gap-2 items-center border-2 p-2 rounded-xl hover:bg-primary">
                        <i className="text-white/80 fa-solid fa-pencil"></i>
                        <h6>Edit</h6>
                    </button>
                </div>
            </div>
            {showDialog && <DialogBox setShowDialog={setShowDialog} />}
        </>
    )
}

export default Profile