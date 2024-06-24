import { useMutation } from '@tanstack/react-query'
import { FC, useState } from 'react'
import supabase from "../lib/supabase/client";
import { toast } from 'react-toastify';
import z from 'zod'

const schema = z.object({
    name: z.string().toLowerCase().min(1, { message: "Name cannot be empty" }),
    email: z.string().email().toLowerCase().min(1, { message: "Email cannot be empty" }),
    phone: z.number().min(10, { message: "Phone Number should be 10 digits" }).max(10),
    address: z.string().toLowerCase().min(1, { message: "Address cannot be empty" })
})
type DialogBoxProps = {
    setShowDialog: (value: boolean) => void
}

const DialogBox: FC<DialogBoxProps> = ({ setShowDialog }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async () => {
            if (!name || !email || !phone || !address) throw new Error("All fields are required")
            await schema.parseAsync({ name, email, phone, address }).catch((error) => {
                throw new Error(error.errors[0].message)
            })
            await supabase.from('customers').update({ email, name, phone, address })

        },
        onError: (error) => {
            toast.error(error.message, { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });

        },
        onSuccess: () => {
            toast.success("Profile Data Saved Successfully !", { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });
            setShowDialog(false)
        }
    })

    return (
        <div className='h-screen w-full fixed top-0 left-0 bg-black/50 backdrop-blur-xl flex items-center justify-center '>
            <div className='relative bg-bg2 min-h-[400px] w-[400px] border-primary border-2 rounded-2xl shadow-md p-4 sm:p-8 flex flex-col justify-between items-center gap-4'>
                <h1 className='text-center text-2xl uppercase font-bold'>EDIT PROFILE</h1>
                <div className="flex flex-col gap-4 w-full">
                    <div className='relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary '>
                        <i className="absolute fa-solid fa-user left-4"></i>
                        <input type="text" onChange={(e) => setName(e.target.value)} placeholder='John Doe' className=' bg-secondary border border-primary outline-none text-white  w-full py-2 pl-10 pr-4 rounded-lg' />
                    </div>
                    <div className='relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary '>
                        <i className="absolute fa-solid fa-envelope left-4"></i>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='example@email.com' className=' bg-secondary border border-primary outline-none text-white  w-full py-2 pl-10 pr-4 rounded-lg' />
                    </div>
                    <div className='relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary '>
                        <i className="absolute fa-solid fa-phone left-4"></i>
                        <input type="tel" maxLength={10} onChange={(e) => setPhone(e.target.value)} placeholder='1234512345' className=' bg-secondary border border-primary outline-none text-white  w-full py-2 pl-10 pr-4 rounded-lg' />
                    </div>
                    <div className='relative flex  items-center hover:scale-105 delay-75 duration-200 ease-in-out hover:text-primary '>
                        <i className="absolute fa-solid fa-location-crosshairs left-4"></i>
                        <input type="text" onChange={(e) => setAddress(e.target.value)} placeholder='xyz avenue, new city' className=' bg-secondary border border-primary outline-none text-white  w-full py-2 pl-10 pr-4 rounded-lg' />
                    </div>
                </div>
                {
                    isPending ?
                        <button className='bg-prime2 text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out w-full'>
                            <i className="fa-solid fa-spinner animate-spin"></i>
                        </button>
                        :
                        <button onClick={() => mutateAsync()} type='submit' className='bg-primary text-white p-2 rounded-md hover:scale-105 delay-75 duration-200 ease-in-out active:bg-primary/50 w-full'>Save Data</button>
                }
                <button onClick={() => setShowDialog(false)}>
                    <i className="absolute top-4 right-4 fa-solid fa-xmark text-white hover:text-primary text-2xl hover:scale-125 delay-75 duration-200 ease-in-out active:text-primary/50"></i>
                </button>
            </div>
        </div>
    )
}

export default DialogBox