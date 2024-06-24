import { FC, useState } from 'react'
import supabase from '../lib/supabase/client'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import z from 'zod'

const schema = z.object({
    name: z.string().toLowerCase().min(1, { message: "Name cannot be empty" }),
    phone: z.string().min(10, { message: "Phone Number should be 10 digits" }).max(10),
    address: z.string().toLowerCase().min(1, { message: "Address cannot be empty" })
})

const UserDetails: FC = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async () => {
            const user = (await supabase.auth.getSession()).data.session?.user
            if (!user) throw new Error("User not found, Please login again")
            if (!name || !phone || !address) throw new Error("All fields are required")
            await schema.parseAsync({ name, phone, address }).catch((error) => {
                throw new Error(error.errors[0].message)

            })
            const number = parseInt(phone)
            await supabase.from('customers').insert({ id: user.id, email: user.email, name, phone: number, address })
        },
        onSuccess: () => {
            toast.success("Welcome to BikeStore !", { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
            navigate('/')
        },
        onError: (error) => {
            toast.error(error.message, { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });

        }
    })

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
                        <input maxLength={10} autoComplete="cc-csc" onChange={(e) => setPhone(e.target.value)} value={phone} type="tel" placeholder='Your Phone' className=' bg-[#2a2a2a]/50 border border-primary outline-none text-white  w-full py-2 pl-10 pr-4 rounded-lg' />
                    </div>
                    <div className='relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary '>
                        <i className="absolute fa-solid fa-building left-4 top-3"></i>
                        <textarea autoComplete="cc-csc" rows={4} onChange={(e) => setAddress(e.target.value)} value={address} placeholder='Your Address' className=' bg-[#2a2a2a]/50 border border-primary outline-none text-white  w-full py-2 pl-10 pr-4 rounded-lg' />
                    </div>
                    {
                        isPending ?
                            <button className='bg-prime2 text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out '>
                                <i className="fa-solid fa-spinner animate-spin"></i>
                            </button>
                            :
                            <button onClick={() => mutateAsync()} className='bg-primary text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out active:bg-primary/50 '>Save Details</button>
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default UserDetails