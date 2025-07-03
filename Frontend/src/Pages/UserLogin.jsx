/**
 * UserLogin Component
 * 
 * User authentication page with modern UI/UX for Xpressly ride-sharing app.
 * Handles user login with email/password validation and automatic redirection.
 * Features animated backgrounds and responsive design for optimal user experience.
 */

import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' // Importing axios for making HTTP requests.
import XpresslyLogo from '../Components/XpresslyLogo'


const UserLogin = () => {
    // This component renders a login form for users to log in to their accounts.

    // Form state management for user credentials
    const [email, setEmail] = useState('')
    // useState hook is used to manage the email state of the input field.
    const [password, setPassword] = useState('')
    // useState hook is used to manage the password state of the input field.
    const [userData, setUserData] = useState({})


    const { user, setUser } = useContext(UserDataContext) // Using the UserDataContext to get and set user data.
    const navigate = useNavigate() // Hook to programmatically navigate to different routes.


    /**
     * Form submission handler
     * Authenticates user credentials and manages login flow
     * @param {Event} e - Form submission event
     */
    const submitHandler = async (e) => { // This function handles the form submission.
        e.preventDefault() // Prevents the default form submission behavior.

        // Prepare login credentials for API request
        const userData = {
            email: email,
            password: password
        }

        // Send authentication request to backend API
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData) // Sending a POST request to the server to log in the user.

        if (response.status === 200) { // If the response is successful
            const data = response.data // Extracting user data from the response.
            setUser(data.user) // Updating the user context with the new user data.
            localStorage.setItem('token', data.token) // Storing the token in local storage for authentication.
            navigate('/home') // Navigating to the home page after successful login.
        }

        // Resetting the input fields after submission
        setEmail('')
        setPassword('')
    }
    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'>
            {/* Animated Background Elements - Creates visual depth with floating gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Floating Particles - Adds subtle movement and visual interest */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Main Content Container */}
            <div className='relative z-10 flex flex-col justify-center min-h-screen px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    {/* Enhanced Branding Section - Company logo and branding */}
                    <div className='flex flex-col items-center mb-10'>
                        <div className='relative mb-6'>
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 rounded-full blur-lg opacity-75 animate-pulse'></div>
                            <div className='relative flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20'>
                                <XpresslyLogo className="w-14 h-14 md:w-16 md:h-16 drop-shadow-lg" />
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent drop-shadow-sm">
                                        Xpressly
                                    </h1>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                                        <span className='text-white/80 text-sm font-medium'>Live Service</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Company tagline and rating display */}
                        <div className='text-center'>
                            <p className="text-lg md:text-xl font-semibold text-white/90 italic tracking-wide">
                                "Ride Smart. On Time. Every Time."
                            </p>
                            <div className='flex items-center justify-center gap-2 mt-3'>
                                <div className='flex gap-1'>
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                                    ))}
                                </div>
                                <span className='text-white/70 text-sm'>4.9/5 Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Login Form - Main authentication form */}
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur-xl'></div>
                        <div className='relative bg-white/95 backdrop-blur-xl py-10 px-8 shadow-2xl rounded-3xl border border-white/20'>
                            <div className='mb-8'>
                                <h2 className='text-center text-3xl font-bold text-gray-900 mb-2'>
                                    Welcome Back
                                </h2>
                                <p className='text-center text-gray-600 text-lg'>
                                    Sign in to continue your journey
                                </p>
                            </div>

                            <form onSubmit={(e) => submitHandler(e)} className='space-y-6'>
                                {/* Email Field - User email input with validation */}
                                <div className='relative'>
                                    <label className='block text-sm font-bold text-gray-800 mb-3'>
                                        <i className="ri-mail-line mr-2 text-blue-600"></i>
                                        Email Address
                                    </label>
                                    <div className='relative'>
                                        <input
                                            className='w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base bg-gray-50/50 hover:bg-white hover:shadow-lg placeholder-gray-400'
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder='Enter your email address'
                                        />
                                        <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                                            <i className="ri-check-line text-green-500 text-lg opacity-0 transition-opacity duration-200"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Password Field - Secure password input */}
                                <div className='relative'>
                                    <label className='block text-sm font-bold text-gray-800 mb-3'>
                                        <i className="ri-lock-line mr-2 text-purple-600"></i>
                                        Password
                                    </label>
                                    <div className='relative'>
                                        <input
                                            className='w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-base bg-gray-50/50 hover:bg-white hover:shadow-lg placeholder-gray-400'
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            placeholder='Enter your password'
                                        />
                                        <button type="button" className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'>
                                            <i className="ri-eye-line text-lg"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Form Options - Remember me and forgot password */}
                                <div className='flex items-center justify-between text-sm'>
                                    <label className='flex items-center gap-2 cursor-pointer'>
                                        <input type="checkbox" className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                                        <span className='text-gray-600'>Remember me</span>
                                    </label>
                                    <a href="#" className='text-blue-600 hover:text-blue-500 font-semibold transition-colors'>
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit Button - Login action button */}
                                <button
                                    type='submit'
                                    className='relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl group overflow-hidden'
                                >
                                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
                                    <div className='relative flex items-center justify-center gap-3'>
                                        <i className="ri-login-circle-line text-xl"></i>
                                        <span className='text-lg'>Sign In</span>
                                    </div>
                                </button>
                            </form>

                            {/* Registration Link Section - Alternative signup option */}
                            <div className='mt-8'>
                                <div className='relative'>
                                    <div className='absolute inset-0 flex items-center'>
                                        <div className='w-full border-t border-gray-300'></div>
                                    </div>
                                    <div className='relative flex justify-center text-sm'>
                                        <span className='px-4 bg-white text-gray-500 font-medium'>New to Xpressly?</span>
                                    </div>
                                </div>
                                <div className='mt-6'>
                                    <Link to='/signup' className='w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-2xl text-gray-700 bg-white hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-all duration-200 font-semibold group'>
                                        <i className="ri-user-add-line text-lg group-hover:scale-110 transition-transform"></i>
                                        Create New Account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Captain Login Link - Driver access point */}
                    <div className='mt-8'>
                        <div className='relative'>
                            <div className='absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl blur-xl'></div>
                            <Link
                                to='/captain-login'
                                className='relative w-full flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl group overflow-hidden'
                            >
                                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
                                <div className='relative flex items-center gap-3'>
                                    <div className='p-2 bg-white/20 rounded-lg'>
                                        <i className="ri-steering-2-line text-xl"></i>
                                    </div>
                                    <div>
                                        <span className='block text-lg font-bold'>Join as Captain</span>
                                        <span className='block text-sm text-green-100'>Start earning today</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin