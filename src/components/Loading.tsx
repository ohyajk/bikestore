import { FC } from 'react'
import Lottie from 'lottie-react'
import cycleLoading from '../json/cycleLoading.json'

const Loading: FC = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <Lottie className='h-[300px] bg-cover' animationData={cycleLoading} loop={true} />
        </div>
    )
}

export default Loading