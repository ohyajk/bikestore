import { FC, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from "react-router"
import useEmailState from "../state/authMailState"
import { toast } from "react-toastify"
import axios from "axios"

const Auth: FC = () => {
    const navigate = useNavigate()
    const { setEmailStore } = useEmailState()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setEmailStore(email)
        const fetcher = await axios.post("/signup", { email })

        if (fetcher.status == 201 || fetcher.status == 200) {
            navigate("/verify")
            toast.success("OTP Sent Successfully !", {
                style: {
                    background: "#2a2a2a",
                    borderWidth: 1,
                    borderColor: "#FFF",
                    boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
                },
            })
        } else {
            toast.error("Something went wrong !", {
                style: {
                    background: "#2a2a2a",
                    borderWidth: 1,
                    borderColor: "#FFF",
                    boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
                },
            })
            setLoading(false)
        }

        // if (error) {
        //     console.log(error.message)
        //     toast.error(error.message, {
        //         style: {
        //             background: "#2a2a2a",
        //             borderWidth: 1,
        //             borderColor: "#FFF",
        //             boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
        //         },
        //     })
        //     setLoading(false)
        //     return null
        // }
        // if (data) {
        //     console.log(data)
        //     navigate("/verify")
        //     toast.success("OTP Sent Successfully !", {
        //         style: {
        //             background: "#2a2a2a",
        //             borderWidth: 1,
        //             borderColor: "#FFF",
        //             boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
        //         },
        //     })
    }

    return (
        <div className="h-[calc(100vh-32px)] flex justify-center items-center ">
            <AnimatePresence>
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.7,
                        type: "spring",
                        bounce: 0.4,
                        ease: "easeInOut",
                    }}
                    key={1}
                    className="bg-white min-h-[400px] w-[400px] rounded-2xl shadow-md p-4 sm:p-8 flex flex-col gap-4"
                >
                    <span className="flex flex-col items-center justify-center mb-4 text-primary">
                        <i className="fa-solid fa-person-biking fa-4x"></i>
                        <h1 className="logo-font text-2xl">BikeStore</h1>
                    </span>
                    <h1 className=" text-2xl min-[350px]:text-3xl font-semibold">
                        Enter Your Email
                    </h1>
                    <div className="relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary ">
                        <i className="absolute fa-solid fa-envelope left-4"></i>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="example@email.com"
                            className="  border border-primary outline-none   w-full py-2 pl-10 pr-4 rounded-lg"
                            required
                        />
                    </div>
                    {loading ? (
                        <button className="bg-prime2 text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out ">
                            <i className="fa-solid fa-spinner animate-spin"></i>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-primary text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out active:bg-primary/50 "
                        >
                            Send OTP
                        </button>
                    )}
                    <h6 className="text-xs  text-left text-black/80">
                        Please check your spam folder for the verification code
                        (OTP) if it doesn't arrive in your inbox shortly.
                    </h6>
                </motion.form>
            </AnimatePresence>
        </div>
    )
}

export default Auth
