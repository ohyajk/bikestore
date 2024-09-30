import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
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

const Layout: FC = () => {
    return (
        <>
            <BrowserRouter>
                <Nav />
                <MobNav />
                <Cart />
                <main className="max-w-7xl mx-auto px-4 pt-8 screen-height screen-height">
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
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/orders" element={<Orders />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </>
    )
}

{
    /* <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to='/auth' />} /> */
}

export default Layout
