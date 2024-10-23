import { FC, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import OtpInput from "react-otp-input"
import { useNavigate } from "react-router"
import useEmailState from "../state/authMailState"
import { toast } from "react-toastify"
import useUserState from "../state/userState"

const Verify: FC = () => {
    useEffect(() => {
        if (!email) {
            navigate("/auth")
        }
    }, [])

    const { email, clearEmailStore } = useEmailState()
    const { setUserStore } = useUserState()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const fetcher = await fetch("http://localhost:9000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, otp }),
            credentials: "include",
        })

        const data = await fetcher.json()

        setUserStore(data)

        if (fetcher.status == 400) {
            toast.error("Invalid OTP", {
                style: {
                    background: "#2a2a2a",
                    borderWidth: 1,
                    borderColor: "#FFF",
                    boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
                },
            })
            setLoading(false)
        }

        if (fetcher.status == 404) {
            toast.error("Invalid Email, Please Signup First.", {
                style: {
                    background: "#2a2a2a",
                    borderWidth: 1,
                    borderColor: "#FFF",
                    boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
                },
            })
            setLoading(false)
        }

        if (fetcher.status == 500) {
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

        if (data.isOnboardingComplete == true) {
            navigate("/profile")
            toast.success("Successfully Logged In !", {
                style: {
                    background: "#2a2a2a",
                    borderWidth: 1,
                    borderColor: "#FFF",
                    boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
                },
            })
            clearEmailStore()
        } else if (data.isOnboardingComplete == false) {
            navigate("/details")
            toast.success("Account Verified Successfully !", {
                style: {
                    background: "#2a2a2a",
                    borderWidth: 1,
                    borderColor: "#FFF",
                    boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
                },
            })
            clearEmailStore()
        }

        // if (fetcher.status == 200) {
        // } else if (fetcher.status == 201) {
        //     navigate("/details")
        //     toast.success("Account Verified Successfully !", {
        //         style: {
        //             background: "#2a2a2a",
        //             borderWidth: 1,
        //             borderColor: "#FFF",
        //             boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
        //         },
        //     })
        // } else {
        //     toast.error("Something went wrong !", {
        //         style: {
        //             background: "#2a2a2a",
        //             borderWidth: 1,
        //             borderColor: "#FFF",
        //             boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
        //         },
        //     })
        setLoading(false)
        // }
    }

    return (
        <div className="h-[calc(100vh-32px)] flex justify-center items-center ">
            <AnimatePresence>
                <motion.form
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
                    onSubmit={handleSubmit}
                    className="bg-white min-h-[400px] w-[400px] rounded-2xl shadow-md p-4 sm:p-8 flex flex-col gap-4 relative"
                >
                    <i
                        onClick={() => navigate("/auth")}
                        className="absolute top-4 left-4 fa-solid fa-left-long fa-2x cursor-pointer hover:text-primary delay-75 duration-200 ease-in-out"
                    ></i>

                    <span className="flex flex-col items-center justify-center mb-4 text-primary">
                        <i className="fa-solid fa-person-biking fa-4x"></i>
                        <h1 className="logo-font text-2xl">BikeStore</h1>
                    </span>

                    <h1 className=" text-2xl min-[350px]:text-3xl font-semibold">
                        Enter Your OTP
                    </h1>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={"flex justify-between text-black"}
                        inputStyle={
                            " border border-primary rounded-md !h-12 !w-12"
                        }
                    />
                    {loading ? (
                        <button
                            className="bg-prime2 text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out "
                            disabled
                        >
                            <i className="fa-solid fa-spinner animate-spin"></i>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-primary text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out active:bg-primary/50 "
                        >
                            Verify OTP
                        </button>
                    )}
                    <div className="flex text-sm gap-2 text-black/80">
                        <h6>Want to Change Email ? </h6>
                        <button
                            onClick={() => {
                                setLoading(false)
                                navigate("/auth")
                            }}
                            className="text-primary text-sm flex gap-2 items-center  delay-75 ease-in-out duration-100 hover:scale-110"
                        >
                            <span>{email}</span>
                            <i className="fa-solid fa-pencil"></i>
                        </button>
                    </div>
                </motion.form>
            </AnimatePresence>
        </div>
    )
}

export default Verify
