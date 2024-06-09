import { FC, useState } from 'react'
import supabase from '../lib/supabase/client'
import { AnimatePresence, motion } from 'framer-motion'
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router';
import useEmailState from '../state/authMailState';
import { toast } from 'react-toastify';

const Verify: FC = () => {
    const { email, clearEmail } = useEmailState()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState('');

    const verifyOtp = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        // await supabase.auth.verifyOtp({
        //     email,
        //     token: otp,
        //     type: 'email',
        // }).then(async () => {
        //     // navigate('/dashboard')
        //     // toast.success("OTP Verified Successfully !", { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });

        //     const existingUser = await supabase.from('users')
        //         .select('*')
        //         .eq('email', email)
        //         .single();

        //     if (existingUser.data) {
        //         // Existing user, redirect to dashboard
        //         console.log('Existing user, redirect to dashboard');
        //         // navigate('/dashboard'); // Replace with your navigation logic
        //         toast.success("OTP Verified Successfully! Welcome back.", {
        //             style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' },
        //         });
        //     } else {
        //         // New user, handle registration or redirect to profile setup
        //         console.log('New user, handle registration or profile setup');
        //         // Handle new user registration logic here (e.g., create user record, prompt for profile details)
        //         toast.success("OTP Verified Successfully! Welcome aboard.", {
        //             style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' },
        //         });
        //     }

        // }).catch((error) => {
        //     toast.error(error.message, { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
        // })

        const { data: { session }, error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'email',
        })

        if (error) {
            console.log(error.message)
            toast.error(error.message, { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
            setLoading(false);
            return null
        }

        if (session) {
            console.log(session.user.user_metadata.phone)
            if (session.user.user_metadata.phone) {
                navigate('/dashboard')
                toast.success("OTP Verified Successfully ! Welcome Back", { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
            } else {
                navigate('/userDetails')
                toast.success("Welcome to BikeStore, Please update details.", { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
            }
        }

        clearEmail()
    }

    return (
        <div className='h-[calc(100vh-32px)] flex justify-center items-center p-4'>
            <AnimatePresence >
                <motion.form onSubmit={verifyOtp}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.7, type: 'spring', bounce: 0.4, ease: 'easeInOut' }}
                    key={2}
                    className='bg-white/20 min-h-[400px] w-[400px] rounded-2xl shadow-md p-4 sm:p-8 flex flex-col gap-4 relative'>
                    <i onClick={() => navigate('/auth')} className="absolute top-4 left-4 fa-solid fa-left-long fa-2x cursor-pointer hover:text-primary delay-75 duration-200 ease-in-out"></i>

                    <span className="flex flex-col items-center justify-center mb-4">
                        <img src="/logo.png" alt="logo" />
                        <h1 className="logo-font ">BikeStore</h1>
                    </span>

                    <h1 className=' text-2xl min-[350px]:text-3xl font-semibold'>Enter Your OTP</h1>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={'flex justify-between text-white'}
                        inputStyle={'bg-[#2a2a2a]/50 border border-primary rounded-md !h-8 !w-8'}
                    />
                    {
                        loading ?
                            <button className='bg-prime2 text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out ' disabled>
                                <i className="fa-solid fa-spinner animate-spin"></i>
                            </button>
                            :
                            <button type='submit' className='bg-primary text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out active:bg-primary/50 '>Verify OTP</button>
                    }
                    <div className='flex text-sm gap-2 text-white/80'>
                        <h6>Want to Change Email ? </h6>
                        <button onClick={() => { setLoading(false); navigate('/auth') }} className='text-primary text-sm flex gap-2 items-center  delay-75 ease-in-out duration-100 hover:animate-bounce'>
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