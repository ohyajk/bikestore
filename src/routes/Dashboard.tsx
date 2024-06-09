import { FC } from 'react'
import { Link } from 'react-router-dom'

const Dashboard: FC = () => {
    return (
        <section className='h-[calc(100vh-120px)] flex flex-col justify-between'>
            <div className='mt-8 grid grid-cols-2 gap-10'>
                <h1 className='text-4xl font-bold col-span-2'>Dashboard</h1>
                <button className='relative h-[250px] bg-black/50 p-4 border hover:scale-105 rounded-lg text-2xl font-bold shadow-2xl delay-75 duration-150 hover:shadow-white/20'>
                    Your Orders
                    <span className='absolute top-0 left-0 h-full w-full bg-[url(/yourOrderBg.jpg)] rounded-lg bg-cover bg-no-repeat bg-top  brightness-50 -z-10'></span>
                </button>
                <Link to='/profile' className='w-full'>
                    <button className='relative h-[250px] w-full bg-black/50 p-4 border hover:scale-105 rounded-lg text-2xl font-bold shadow-2xl delay-75 duration-150 hover:shadow-white/20'>
                        Your Profile
                        <span className='absolute top-0 left-0 h-full w-full bg-[url(/profileBg.jpg)] rounded-lg bg-cover bg-no-repeat bg-top  brightness-50 -z-10'></span>
                    </button>
                </Link>
            </div>
            <span className='text-center text-white/60'>
                Copyright 2024 BikeStore. Designed & Developed by <Link to='/' className='font-semibold text-primary hover:text-prime2'>Jitender Kumar</Link>
            </span>
        </section>
    )
}

export default Dashboard