import { FC, useState } from 'react'
import supabase from '../lib/supabase/client'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router';
import validator from "validator";

import useEmailState from '../state/authMailState';
import { toast } from 'react-toastify';

const Auth: FC = () => {
    const navigate = useNavigate()
    const { email, setEmail } = useEmailState()
    const [loading, setLoading] = useState(false)


    const sendOtp = async (e: any) => {
        e.preventDefault()
        setLoading(true);
        if (!validator.isEmail(email)) {
            toast.warn("Please Enter Valid Email Address !", { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
            setLoading(false);
            return null
        }
        // await supabase.auth.signInWithOtp({
        //     email,
        //     options: {
        //         shouldCreateUser: true
        //     },
        // }).then(() => {
        // }).catch((error) => {
        //     toast.error(error.message, { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
        // })
        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true,
            },
        })

        if (error) {
            console.log(error.message)
            toast.error(error.message, { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
            setLoading(false);
            return null
        }
        if (data) {
            console.log(data)
            navigate('/verify')
            toast.success("OTP Sent Successfully !", { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
        }
    }

    return (
        <div className='h-[calc(100vh-32px)] flex justify-center items-center p-4'>
            <AnimatePresence>
                <motion.form onSubmit={sendOtp}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.7, type: 'spring', bounce: 0.4, ease: 'easeInOut' }}
                    key={1}
                    className='bg-white/20 min-h-[400px] w-[400px] rounded-2xl shadow-md p-4 sm:p-8 flex flex-col gap-4'>
                    <span className="flex flex-col items-center justify-center mb-4">
                        <img src="/logo.png" alt="logo" />
                        <h1 className="logo-font ">BikeStore</h1>
                    </span>
                    <h1 className=' text-2xl min-[350px]:text-3xl font-semibold'>Enter Your Email</h1>
                    <div className='relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary '>
                        <i className="absolute fa-solid fa-envelope left-4"></i>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='example@email.com' className=' bg-[#2a2a2a]/50 border border-primary outline-none text-white  w-full py-2 pl-10 pr-4 rounded-lg' />
                    </div>
                    {
                        loading ?
                            <button className='bg-prime2 text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out '>
                                <i className="fa-solid fa-spinner animate-spin"></i>
                            </button>
                            :
                            <button type='submit' className='bg-primary text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out active:bg-primary/50 '>Send OTP</button>
                    }
                    <h6 className='text-xs  text-justify text-white/50'>Please check your spam folder for the verification code (OTP) if it doesn't arrive in your inbox shortly.</h6>
                </motion.form>

            </AnimatePresence>
        </div >
    )
}

export default Auth