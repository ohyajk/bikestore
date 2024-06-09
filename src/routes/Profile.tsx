import { FC, useEffect, useState } from "react"
import supabase from "../lib/supabase/client";
const Profile: FC = () => {

    const [user, setUser] = useState<any>(null)

    const colors: String[] = [
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
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const getUserData = async () => {

        const { data: { user } } = await supabase.auth.getUser()
        setUser(user?.user_metadata)
    }
    console.log(user)
    useEffect(() => {
        getUserData()
    }, [])



    return (
        <div className="h-full">
            <h1 className="text-4xl font-bold uppercase ">Your Profile</h1>
            <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                <div className="h-[150px] w-[150px] rounded-full flex justify-center items-center text-white uppercase text-6xl font-bold [text-shadow:_2px_2px_0_rgb(0_0_0_/_80%)]" style={{ backgroundColor: randomColor }} >
                    {user?.name ? user.name.charAt(0) : '...'}
                </div>
                <h1 className="text-4xl font-bold capitalize">{user?.name ? user.name : '...'}</h1>
                <h2 className="text-2xl font-bold capitalize">{user?.phone ? user.phone : '...'}</h2>
            </div>
        </div>
    )
}

export default Profile