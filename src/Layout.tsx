import { FC } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./routes/Home"
import About from "./routes/About"
import Nav from "./components/Nav"
import Cart from "./components/Cart"
import MobNav from "./components/MobNav"
import Auth from "./routes/Auth"
import NotFound from "./routes/NotFound"
import Verify from "./routes/Verify"
import UserDetails from "./routes/UserDetails"
import Profile from "./routes/Profile"
import Bikes from "./routes/Bikes"
import Bike from "./routes/Bike"
import Contact from "./routes/Contact"
import Footer from "./components/Footer"
import Orders from "./routes/Orders"
import Order from "./routes/Order"
import Checkout from "./routes/Checkout"
import ProtectedRoute from "./lib/ProtectedRoute"
import Lottie from "lottie-react"
import wip from "./json/workinprog.json";
import axios from "axios"
import useUserState from "./state/userState"
import { toast } from "react-toastify"
import Payment from "./routes/Payment"
import Success from "./routes/Success"
import Cancel from "./routes/Cancel"
const Layout: FC = () => {

    const { clearUserStore } = useUserState()
    const navigate = useNavigate()
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                toast.error('Session expired, please login again')
                clearUserStore()
                navigate('/')
                return Promise.reject(new Error('Session expireddd'));
            }
            return Promise.reject(error);
        }
    );

    return (
        <>
            <Nav />
            <MobNav />
            <Cart />
            <main className="max-w-7xl mx-auto px-4 pt-8">
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/bikes" element={<Bikes />} />
                    <Route path="/bike/:url" element={<Bike />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/details" element={<UserDetails />} />
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                    <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
                    <Route path="/order/:ref" element={<ProtectedRoute element={<Order />} />} />
                    <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
                    <Route path="/payment/:ref" element={<ProtectedRoute element={<Payment />} />} />
                    <Route path="/success" element={<Success/>} />
                    <Route path="/cancel" element={<Cancel />} />
                </Routes>
            </main>
            <Footer />
            <div className="fixed lg:hidden top-0 left-0 z-50 h-screen w-full bg-white/70 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white/80 p-8 rounded-xl border border-primary shadow-xl flex flex-col items-center justify-center">
                    <Lottie className='h-[200px] bg-cover' animationData={wip} loop={true} />
                    <h2 className="text-xl sm:text-2xl font-bold text-center ">Mobile Version under development</h2>
                    <h3 className="text-lg sm:text-xl font-semibold text-center ">Please use a pc instead</h3>
                </div>
            </div>
        </>
    )
}

export default Layout
