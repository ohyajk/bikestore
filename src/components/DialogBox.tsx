import { useMutation } from "@tanstack/react-query"
import { FC, useState } from "react"
import { toast } from "react-toastify"
import z from "zod"
import useUserState from "../state/userState"

const schema = z.object({
    name: z.string().toLowerCase().min(1, { message: "Name cannot be empty" }),
    phone: z
        .string()
        .min(1, { message: "Please provide valid phone number" })
        .max(15),
    city: z.string().min(1, { message: "City cannot be empty" }),
    country: z.string().min(1, { message: "Country cannot be empty" }),
    zip: z.string().min(1, { message: "Zip cannot be empty" }),
    state: z.string().min(1, { message: "State cannot be empty" }),
    locality: z.string().min(1, { message: "Locality cannot be empty" }),
})
type DialogBoxProps = {
    setShowDialog: (value: boolean) => void
}

const DialogBox: FC<DialogBoxProps> = ({ setShowDialog }) => {
    const { setUserStore } = useUserState()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [zip, setZip] = useState("")
    const [state, setState] = useState("")
    const [locality, setLocality] = useState("")

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async () => {
            if (
                !name ||
                !phone ||
                !city ||
                !country ||
                !zip ||
                !state ||
                !locality
            )
                throw new Error("All fields are required")
            await schema
                .parseAsync({
                    name,
                    phone,
                    city,
                    country,
                    zip,
                    state,
                    locality,
                })
                .catch((error) => {
                    throw new Error(error.errors[0].message)
                })
            await fetch("http://localhost:3000/api/user/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    phone,
                    city,
                    country,
                    zip,
                    state,
                    locality,
                }),
                credentials: "include",
            })
            const fetcher = await fetch("http://localhost:3000/api/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            const data = await fetcher.json()
            setUserStore(data)
        },
        onError: (error) => {
            toast.error(error.message, {
                style: {
                    background: "#2a2a2a",
                    borderWidth: 1,
                    borderColor: "#FFF",
                    boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
                },
            })
        },
        onSuccess: () => {
            toast.success("Profile Data Saved Successfully !", {
                style: {
                    background: "#2a2a2a",
                    borderWidth: 1,
                    borderColor: "#FFF",
                    boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
                },
            })
            setShowDialog(false)
        },
    })

    return (
        <div className="h-screen w-full fixed top-0 left-0 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-white min-h-[400px] w-[400px] border-primary border-2 rounded-2xl shadow-md p-4 sm:p-8 flex flex-col justify-between items-center gap-4">
                <h1 className="text-center text-2xl uppercase font-bold">
                    EDIT PROFILE
                </h1>
                <div className="flex flex-col gap-4 w-full">
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <i className="absolute fa-solid fa-user left-4"></i>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <i className="absolute fa-solid fa-phone left-4"></i>
                        <input
                            type="tel"
                            maxLength={10}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="1234512345"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <i className="absolute fa-solid fa-house left-4"></i>
                        <input
                            type="text"
                            onChange={(e) => setLocality(e.target.value)}
                            placeholder="your locality"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <i className="absolute fa-solid fa-city left-4"></i>
                        <input
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="your city"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <i className="absolute fa-solid fa-location-dot left-4"></i>
                        <input
                            type="text"
                            onChange={(e) => setState(e.target.value)}
                            placeholder="your state"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <i className="absolute fa-solid fa-earth-europe left-4"></i>
                        <input
                            type="text"
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="your country"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <i className="absolute fa-solid fa-hashtag left-4"></i>
                        <input
                            type="text"
                            onChange={(e) => setZip(e.target.value)}
                            placeholder="your zip/pincode"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                </div>
                {isPending ? (
                    <button className="bg-prime2 p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out w-full">
                        <i className="fa-solid fa-spinner animate-spin"></i>
                    </button>
                ) : (
                    <button
                        onClick={() => mutateAsync()}
                        type="submit"
                        className="bg-primary text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out active:bg-primary/50 w-full"
                    >
                        Save Data
                    </button>
                )}
                <button onClick={() => setShowDialog(false)}>
                    <i className="absolute top-4 right-4 fa-solid fa-xmark hover:text-primary text-2xl hover:scale-125 delay-75 duration-200 ease-in-out active:text-primary/50"></i>
                </button>
            </div>
        </div>
    )
}

export default DialogBox
