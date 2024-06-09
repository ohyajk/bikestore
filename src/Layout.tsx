import { FC, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './routes/Home'
import About from './routes/About';
import Nav from './components/Nav';
import Cart from './components/Cart';
import MobNav from './components/MobNav';
import Auth from './routes/Auth';
import Dashboard from './routes/Dashboard';
import NotFound from './routes/NotFound';
import Verify from './routes/Verify';
import supabase from './lib/supabase/client';
import UserDetails from './routes/UserDetails';
import Profile from './routes/Profile';
import Bikes from './routes/Bikes';

const Layout: FC = () => {
    const [session, setSession] = useState<any>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])





    return (
        <>
            <BrowserRouter>
                <Nav />
                <MobNav />
                <Cart />
                <main className='max-w-7xl mx-auto  pt-8'>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/bikes" element={<Bikes />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/verify" element={<Verify />} />
                        <Route path="/userDetails" element={<UserDetails />} />
                        <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to='/auth' />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    )
}

export default Layout