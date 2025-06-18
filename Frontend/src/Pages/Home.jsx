import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => { // Home component serves as the landing page for the application
    // It displays a background image, a logo, and a button to navigate to the login
    return (
        <div>
            <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 w-full flex justify-between flex-col'>
                <img className='w-17 ml-6' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
                <div className='bg-white px-4 pb-7 py-4'>
                    <h2 className='text-[28px] font-bold'>Get Started with Uber</h2>
                    <Link className='flex items-center justify-center w-full bg-black text-white py-3 mt-5 rounded' to="/login">Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Home