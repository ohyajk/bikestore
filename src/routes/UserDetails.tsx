import { FC, useState } from 'react'
import supabase from '../lib/supabase/client'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const UserDetails: FC = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const updateDetails = async () => {
        setLoading(true)
        if (!name || !phone || !address) {
            toast.warn("Please Fill All Fields !", { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
            setLoading(false)
            return null
        }
        await supabase.auth.updateUser({
            data: { name, phone, address }
        }).then(() => {
            toast.success("Details Updated Successfully !", { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
            navigate('/dashboard')
        }).catch((error) => {
            console.log(error.message)
            toast.error(error.message, { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className='h-[calc(100vh-32px)] flex justify-center items-center p-4'>
            <AnimatePresence >
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.7, type: 'spring', bounce: 0.4, ease: 'easeInOut' }}
                    key={2}
                    className='bg-white/20 min-h-[400px] w-[400px] rounded-2xl shadow-md p-4 sm:p-8 flex flex-col gap-4 relative'>
                    <span className="flex flex-col items-center justify-center mb-4">
                        <img src="/logo.png" alt="logo" />
                        <h1 className="logo-font ">BikeStore</h1>
                    </span>
                    <h1 className=' text-2xl min-[350px]:text-3xl font-semibold'>Enter Your Details</h1>
                    <div className='relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary '>
                        <i className="absolute fa-solid fa-user left-4"></i>
                        <input autoComplete="cc-csc" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Your Name' className=' bg-[#2a2a2a]/50 border border-primary outline-none text-white  w-full py-2 pl-10 pr-4 rounded-lg' />
                    </div>
                    <div className='relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary '>
                        <i className="absolute fa-solid fa-phone left-4"></i>
                        <input autoComplete="cc-csc" onChange={(e) => setPhone(e.target.value)} value={phone} type="tel" placeholder='Your Phone' className=' bg-[#2a2a2a]/50 border border-primary outline-none text-white  w-full py-2 pl-10 pr-4 rounded-lg' />
                    </div>
                    <div className='relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary '>
                        <i className="absolute fa-solid fa-building left-4 top-3"></i>
                        <textarea autoComplete="cc-csc" rows={4} onChange={(e) => setAddress(e.target.value)} value={address} placeholder='Your Address' className=' bg-[#2a2a2a]/50 border border-primary outline-none text-white  w-full py-2 pl-10 pr-4 rounded-lg' />
                    </div>
                    {
                        loading ?
                            <button className='bg-prime2 text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out '>
                                <i className="fa-solid fa-spinner animate-spin"></i>
                            </button>
                            :
                            <button onClick={updateDetails} className='bg-primary text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out active:bg-primary/50 '>Save Details</button>
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default UserDetails