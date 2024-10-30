import { FC } from "react"
import useCartItemState from "../state/cartItemState";

interface CardCartProps {
    id: string;
    name: string;
    image: string;
    price: number;
}

const CardCart: FC<CardCartProps> = ({ id, name, image, price }) => {

    const { removeItem } = useCartItemState()

    return (
        <div className='flex gap-4 justify-start items-center w-full border p-4 rounded-xl '>
            <img src={image} className='h-20 w-32 bg-white rounded-xl' />
            <div className='flex flex-col gap-2'>
                <h1 className='text-lg sm:text-2xl font-semibold duration-300 delay-100 hover:text-primary'>{name}</h1>
                <div className='flex items-center gap-2'>
                    <h2 className='text-xs sm:text-base rounded-full font-semibold text-white bg-primary w-fit px-2 sm:px-4 py-1'>{price}$</h2>
                </div>
            </div>
            <button onClick={() => removeItem(id)} className='ml-auto'>
                <i className="fa-solid fa-trash-can fa-xl duration-300 delay-100 hover:text-primary hidden sm:block"></i>
                <i className="fa-solid fa-trash-can fa-lg duration-300 delay-100 hover:text-primary sm:hidden"></i>
            </button>
        </div>
    )
}

export default CardCart