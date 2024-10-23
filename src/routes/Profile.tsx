import { FC, useEffect, useState } from "react"
import DialogBox from "../components/DialogBox"
import useUserState from "../state/userState"
import { useNavigate } from "react-router"
const Profile: FC = () => {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const navigate = useNavigate()
    const { user } = useUserState()
    console.log(user, "my user data")
    useEffect(() => {
        if (user.email === undefined) {
            navigate("/")
        }
    }, [])

    const colors: string[] = [
        "#FFA500", // Orange
        "#87CEEB", // Skyblue
        "#008000", // Green
        "#800080", // Purple
        "#FF0000", // Red
        "#FFC0CB", // Pink
        "#008080", // Teal
        "#00FFFF", // Aqua
        "#FF00FF", // Fuchsia
        "#00FF00", // Lime
        "#000080", // Navy
        "#800000", // Maroon
        "#808000", // Olive
    ]
    const randomColor: string =
        colors[Math.floor(Math.random() * colors.length)]

    return (
        <>
            <div className="screen-height flex flex-col justify-center items-center ">
                <div className="relative md:min-w-[420px] bg-white rounded-2xl shadow-md p-4 sm:p-8 flex flex-col justify-center items-center gap-4 border-2 border-primary">
                    <div
                        className="h-[150px] w-[150px] rounded-full flex justify-center items-center text-white uppercase text-6xl font-bold [text-shadow:_2px_2px_0_rgb(0_0_0_/_80%)]"
                        style={{ backgroundColor: randomColor }}
                    >
                        {user.name.charAt(0)}
                    </div>
                    <h1 className="text-4xl font-bold capitalize">
                        {user.name}
                    </h1>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="flex gap-2 items-center">
                            <i className=" fa-solid fa-envelope fa-xl basis-8"></i>
                            <h2 className="text-lg sm:text-xl font-medium capitalize">
                                {user.email}
                            </h2>
                        </span>
                        <hr className="" />
                        <span className="flex gap-2 items-center">
                            <i className=" fa-solid fa-phone fa-xl basis-8"></i>
                            <h2 className=" text-xl font-medium capitalize">
                                {user.phone}
                            </h2>
                        </span>
                        <hr className="" />
                        <span className="flex gap-2 items-center">
                            <i className=" fa-solid fa-house fa-xl basis-8"></i>
                            <h2 className=" text-xl font-medium capitalize">
                                {user.locality}
                            </h2>
                        </span>
                        <hr className="" />
                        <span className="flex gap-2 items-center">
                            <i className=" fa-solid fa-city fa-xl basis-8"></i>
                            <h2 className=" text-xl font-medium capitalize">
                                {user.city}
                            </h2>
                        </span>
                        <hr className="" />
                        <span className="flex gap-2 items-center">
                            <i className=" fa-solid fa-location-dot fa-xl basis-8"></i>
                            <h2 className=" text-xl font-medium capitalize">
                                {user.state}
                            </h2>
                        </span>
                        <hr className="" />
                        <span className="flex gap-2 items-center">
                            <i className=" fa-solid fa-earth-europe fa-xl basis-8"></i>
                            <h2 className=" text-xl font-medium capitalize">
                                {user.country}
                            </h2>
                        </span>
                        <hr className="" />
                        <span className="flex gap-2 items-center">
                            <i className=" fa-solid fa-hashtag fa-xl basis-8"></i>
                            <h2 className=" text-xl font-medium capitalize">
                                {user.zip}
                            </h2>
                        </span>
                        <hr className="" />
                    </div>
                    <button
                        onClick={() => setShowDialog(true)}
                        className="absolute top-4 right-4 flex gap-2 items-center border-2 border-primary p-2 rounded-xl hover:text-white hover:bg-primary"
                    >
                        <i className=" fa-solid fa-pencil"></i>
                        <h6 className="hidden sm:block">Edit</h6>
                    </button>
                </div>
            </div>
            {showDialog && <DialogBox setShowDialog={setShowDialog} />}
        </>
    )
}

export default Profile
