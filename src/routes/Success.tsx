import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Success = () => {
    return (
        <div className='screen-height flex items-center justify-center flex-col gap-4'>
            <FontAwesomeIcon icon={faCheckCircle} size='5x' className='animate-pulse text-primary' />
            <h1 className='text-2xl font-semibold'>Payment Successful</h1>
            <p>Click below to Go to Orders Page</p>
            <Link to='/orders' className='bg-primary text-white px-4 py-2 rounded-xl'>Go to Orders</Link>
        </div>
    )
}

export default Success