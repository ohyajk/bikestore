import { FC, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuilding, faBuildingColumns, faGlobe, faListNumeric, faLocationDot, faMapPin, faPhone } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import useUserState from "../state/userState"
import { z } from "zod"

const schema = z.object({
    name: z.string().toLowerCase().min(1, { message: "Name cannot be empty" }),
    phone: z
        .string()
        .min(1, { message: "Please provide valid phone number" })
        .max(15)
        .regex(/^\d+$/, { message: "Phone number must contain only numbers" }),
    city: z.string().min(1, { message: "City cannot be empty" }),
    country: z.string().min(1, { message: "Country cannot be empty" }),
    zip: z.string().min(1, { message: "Zip cannot be empty" }),
    state: z.string().min(1, { message: "State cannot be empty" }),
    locality: z.string().min(1, { message: "Locality cannot be empty" }),
})

const UserDetails: FC = () => {
    const navigate = useNavigate()
    const {setUserStore} = useUserState()
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
            await axios.put("/user/update",
                {
                    name,
                    phone,
                    city,
                    country,
                    zip,
                    state,
                    locality,
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            const fetcher = await axios.get("/user",
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            const data = await fetcher.data
            setUserStore(data)
        },
        onSuccess: () => {
            toast.success("Welcome to BikeStore !", {
                style: {
                    background: "#2a2a2a",
                    borderWidth: 1,
                    borderColor: "#FFF",
                    boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
                },
            })
            navigate("/")
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
    })

    return (
        <div className="h-[calc(100vh-32px)] flex justify-center items-center p-4">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.7,
                        type: "spring",
                        bounce: 0.4,
                        ease: "easeInOut",
                    }}
                    key={2}
                    className="bg-white min-h-[400px] w-[400px] rounded-2xl shadow-md p-4 sm:p-8 flex flex-col gap-4 relative"
                >
                    <span className="flex flex-col items-center justify-center mb-4 text-primary">
                        <i className="fa-solid fa-person-biking fa-4x"></i>
                        <h1 className="logo-font text-2xl">BikeStore</h1>
                    </span>
                    <h1 className=" text-2xl min-[350px]:text-3xl font-semibold">
                        Enter Your Details
                    </h1>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <i className="absolute fa-solid fa-user left-4"></i>
                        <input
                            autoComplete="cc-csc"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Your Name"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <FontAwesomeIcon icon={faPhone} className="absolute left-4" />
                        <input
                            maxLength={10}
                            autoComplete="cc-csc"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            type="tel"
                            placeholder="Your Phone"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <FontAwesomeIcon icon={faBuilding} className="absolute left-4 top-3" />
                        <input
                            autoComplete="cc-csc"
                            onChange={(e) => setLocality(e.target.value)}
                            value={locality}
                            type="text"
                            placeholder="Your Locality"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <FontAwesomeIcon icon={faBuildingColumns} className="absolute left-4 top-3" />
                        <input
                            autoComplete="cc-csc"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            type="text"
                            placeholder="Your City"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <FontAwesomeIcon icon={faLocationDot} className="absolute left-4 top-3" />
                        <input
                            autoComplete="cc-csc"
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                            type="text"
                            placeholder="Your State"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <FontAwesomeIcon icon={faGlobe} className="absolute left-4 top-3" />
                        <input
                            autoComplete="cc-csc"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            type="text"
                            placeholder="Your Country"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <FontAwesomeIcon icon={faMapPin} className="absolute left-4 top-3" />
                        <input
                            autoComplete="cc-csc"
                            onChange={(e) => setZip(e.target.value)}
                            value={zip}
                            type="text"
                            placeholder="Your Pincode/Zip"
                            className="  border border-primary outline-none  w-full py-2 pl-10 pr-4 rounded-lg"
                        />
                    </div>
                    {isPending ? (
                        <button className="bg-prime2 text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out ">
                            <i className="fa-solid fa-spinner animate-spin"></i>
                        </button>
                    ) : (
                        <button
                            onClick={() => mutateAsync()}
                            className="bg-primary text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out active:bg-primary/50 "
                        >
                            Save Details
                        </button>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default UserDetails
