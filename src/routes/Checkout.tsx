import { useEffect, useState } from "react"
import useUserState from "../state/userState"
import useCartItemState from "../state/cartItemState"
import CardCart from "../components/CardCart"
import { z } from "zod"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router"

const Checkout = () => {

  const navigate = useNavigate()

  const schema = z.object({
    name: z.string().toLowerCase().min(1, { message: "Name cannot be empty" }),
    phone: z
      .string()
      .min(1, { message: "Please provide valid phone number" })
      .max(15),
    city: z.string().min(1, { message: "City cannot be empty" }),
    country: z.string().min(1, { message: "Country cannot be empty" }),
    zip: z.string().min(1, { message: "Zip cannot be empty" }),
    state: z.string().min(1, { message: "State cannot be empty" }),
    locality: z.string().min(1, { message: "Locality cannot be empty" }),
  })

  const { user, setUserStore } = useUserState()
  const { items, clearCart } = useCartItemState()
  const [customAdd, setCustomAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [locality, setLocality] = useState('')
  const [zip, setZip] = useState('')

  useEffect(() => {
    const totalprice = items.reduce((t, i) => t + i.price, 0);
    const tax = totalprice * 8 / 100
    setTax(tax)
    setSubtotal(totalprice)
  }, [items])

  const handlePlace = async () => {
    setLoading(true)
    if (customAdd == true) {
      await schema
        .parseAsync({
          name,
          phone,
          city,
          country,
          zip,
          state,
          locality,
        })
        .catch((error) => {
          toast.error(error.errors[0].message)
          throw new Error('Please fill the form')
        })
        const updateUserAdd = await axios.put('/user/update', {
          name,
          phone,
          city,
          country,
          zip,
          state,
          locality,
        }, {
          withCredentials: true
        })
        setUserStore(updateUserAdd.data)
    }

    const order = await axios.post('/order', {
      bikeIds: items.map((i) => i.id),
    }, {
      withCredentials: true
    })

    if (order.status === 201) {
      clearCart()
      toast.success('Order Placed Successfully')
      setLoading(false)
      navigate('/payment/' + order.data.ref)
    }else{
      toast.error('Something went wrong, Please try again')
      setLoading(false)
    }
    console.log('placed...')
  }

  return (
    <main className="screen-height">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col min-[520px]:grid min-[520px]:grid-cols-2 gap-4 h-fit">
          <h2 className="col-span-2 text-2xl font-bold ">Address</h2>
          <div className={`col-span-2 flex flex-col gap-2 border-2 border-black p-4 rounded-xl ${customAdd && 'opacity-50'}`}>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <h4>{user.phone}</h4>
            <p>{user.locality}, {user.city}, {user.state}, {user.country}</p>
            <p>{user.zip}</p>
          </div>
          <span className="col-span-2 flex items-center gap-2 sm:text-xl font-semibold">
            <input onChange={() => setCustomAdd(!customAdd)} type="checkbox" name="addresscustom" />
            <p>Please tick this box if you want to use different address.</p>
          </span>
          {
            customAdd &&
            <>
              <p className="col-span-2 text-lg font-medium">Please Enter your Address and proceed to checkout</p>
              <span className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input onChange={(e) => setName(e.target.value)} type="text" className="w-full py-2 px-4 rounded-xl border-2 border-black focus:!border-primary " placeholder="Your Name" />
                <p></p>
              </span>
              <span className="flex flex-col gap-2">
                <label htmlFor="phone">Phone</label>
                <input onChange={(e) => setPhone(e.target.value)} type="tel" className="w-full py-2 px-4 rounded-xl border-2 border-black focus:!border-primary " placeholder="Your Phone" />
              </span>
              <span className="flex flex-col gap-2">
                <label htmlFor="locality">Locality</label>
                <input onChange={(e) => setLocality(e.target.value)} type="text" className="w-full py-2 px-4 rounded-xl border-2 border-black focus:!border-primary " placeholder="Your Locality" />
              </span>
              <span className="flex flex-col gap-2">
                <label htmlFor="city">City</label>
                <input onChange={(e) => setCity(e.target.value)} type="text" className="w-full py-2 px-4 rounded-xl border-2 border-black focus:!border-primary " placeholder="Your City" />
              </span>
              <span className="flex flex-col gap-2">
                <label htmlFor="state">State</label>
                <input onChange={(e) => setState(e.target.value)} type="text" className="w-full y-2 px-4 rounded-xl border-2 border-black focus:!border-primary " placeholder="Your State" />
              </span>
              <span className="flex flex-col gap-2">
                <label htmlFor="country">Country</label>
                <input onChange={(e) => setCountry(e.target.value)} type="text" className="w-full py-2 px-4 rounded-xl border-2 border-black focus:!border-primary " placeholder="Your Country" />
              </span>
              <span className="flex flex-col gap-2">
                <label htmlFor="zip/pincode">Zip/Pincode</label>
                <input onChange={(e) => setZip(e.target.value)} type="text" className="w-full py-2 px-4 rounded-xl border-2 border-black focus:!border-primary " placeholder="Your Zip/Pincode" />
              </span>
            </>
          }
        </div>
        <div>
          <h2 className="text-2xl font-bold">Order Summary</h2>
          {subtotal > 0 ?
            <div className="mt-4 flex flex-col gap-2">
              <div className='flex flex-col gap-4'>
                {items.map((item) => <CardCart id={item.id} name={item.name} image={item.image} price={item.price} />)}
              </div>
              <span className='mt-2 flex justify-between items-center'>
                <h2 className='text-lg sm:text-2xl font-semibold'>Sub Total :</h2>
                <h2 className='text-lg sm:text-2xl font-semibold'>${subtotal}</h2>
              </span>
              <span className='flex justify-between items-center'>
                <h2 className='text-lg sm:text-2xl font-semibold'>Tax (8%) :</h2>
                <h2 className='text-lg sm:text-2xl font-semibold'>${tax}</h2>
              </span>
              <span className='flex justify-between items-center'>
                <h2 className='text-lg sm:text-2xl font-semibold'>Delivery Charges :</h2>
                <h2 className='text-lg sm:text-2xl font-semibold'>$15</h2>
              </span>
              <hr className='h-[2px] bg-black w-full' />
              <span className='flex justify-between items-center'>
                <h2 className='text-lg sm:text-2xl font-semibold'>Total :</h2>
                <h2 className='text-lg sm:text-2xl font-semibold'>${subtotal + tax + 15}</h2>
              </span>
              <hr className="h-[2px] bg-black w-full opacity-0" />
              <button onClick={handlePlace} className="w-full bg-primary text-white rounded-lg py-2 font-semibold flex justify-center items-center" disabled={loading} >{loading ? <i className="fa-solid fa-spinner animate-spin text-white"></i> : 'Proceed to pay'}</button>
            </div>
            : <h2 className="mt-4">No Items in Cart, Please add some in Cart</h2>}
        </div>
      </section>
    </main>
  )
}

export default Checkout