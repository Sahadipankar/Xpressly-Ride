/**
 * UserSignUp Component
 * 
 * User registration page with enhanced UI/UX for Xpressly ride-sharing app.
 * Features animated backgrounds, form validation, and seamless user onboarding.
 * Handles user account creation and automatic authentication upon successful registration.
 */

import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../Context/UserContext'
import XpresslyLogo from '../Components/XpresslyLogo'

const UserSignUp = () => {
    // Form state management for user input fields
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    // useState hook to manage password visibility toggle
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false) // Loading state for async actions

    const navigate = useNavigate() // Navigation hook for programmatic routing
    const { user, setUser } = useContext(UserDataContext) // Global user state management

    /**
     * Form submission handler
     * Processes user registration, validates data, and handles authentication
     * @param {Event} e - Form submission event
     */
    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Prepare user data object for API request
            const newUser = {
                fullname: {
                    firstname: firstName,
                    lastname: lastName
                },
                email: email,
                password: password
            }
            // Send registration request to backend API
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
            if (response.status === 201) {
                const data = response.data
                setUser(data.user) // Update global user context
                localStorage.setItem('token', data.token) // Store authentication token
                navigate('/home') // Redirect to home page
            }
        } finally {
            setLoading(false)
            // Reset form fields after successful submission
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setShowPassword(false)
        }
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
                    {/* Enhanced Branding Section - Company logo and tagline */}
                    <div className='flex flex-col items-center mb-8'>
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
                                        <span className='text-white/80 text-sm font-medium'>Join Us</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Company tagline and trust indicators */}
                        <div className='text-center'>
                            <p className="text-lg md:text-xl font-semibold text-white/90 italic tracking-wide">
                                "Ride Smart. On Time. Every Time."
                            </p>
                            <div className='flex items-center justify-center gap-4 mt-4'>
                                <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1'>
                                    <i className="ri-user-3-line text-blue-400"></i>
                                    <span className='text-white/80 text-sm'>2M+ Users</span>
                                </div>
                                <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1'>
                                    <i className="ri-shield-check-line text-green-400"></i>
                                    <span className='text-white/80 text-sm'>Safe & Secure</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Signup Form - Main registration form */}
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur-xl'></div>
                        <div className='relative bg-white/95 backdrop-blur-xl py-8 px-8 shadow-2xl rounded-3xl border border-white/20'>
                            <div className='mb-6'>
                                <h2 className='text-center text-3xl font-bold text-gray-900 mb-2'>
                                    Join Xpressly
                                </h2>
                                <p className='text-center text-gray-600 text-lg'>
                                    Create your account to get started
                                </p>
                            </div>

                            <form onSubmit={(e) => submitHandler(e)} className='space-y-5'>
                                {/* Name Fields - First and Last name inputs */}
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='relative'>
                                        <label className='block text-sm font-bold text-gray-800 mb-2'>
                                            <i className="ri-user-line mr-2 text-blue-600"></i>
                                            First Name
                                        </label>
                                        <input
                                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50/50 hover:bg-white hover:shadow-md placeholder-gray-400'
                                            required
                                            type="text"
                                            placeholder='John'
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className='relative'>
                                        <label className='block text-sm font-bold text-gray-800 mb-2'>
                                            Last Name
                                        </label>
                                        <input
                                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50/50 hover:bg-white hover:shadow-md placeholder-gray-400'
                                            required
                                            type="text"
                                            placeholder='Doe'
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Email Field - User email input with validation */}
                                <div className='relative'>
                                    <label className='block text-sm font-bold text-gray-800 mb-2'>
                                        <i className="ri-mail-line mr-2 text-purple-600"></i>
                                        Email Address
                                    </label>
                                    <div className='relative'>
                                        <input
                                            className='w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-base bg-gray-50/50 hover:bg-white hover:shadow-lg placeholder-gray-400'
                                            required
                                            type="email"
                                            placeholder='Enter your email address'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                                            <i className="ri-check-line text-green-500 text-lg opacity-0 transition-opacity duration-200"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Password Field - Secure password input */}
                                <div className='relative'>
                                    <label className='block text-sm font-bold text-gray-800 mb-2'>
                                        <i className="ri-lock-line mr-2 text-green-600"></i>
                                        Password
                                    </label>
                                    <div className='relative'>
                                        <input
                                            className='w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-base bg-gray-50/50 hover:bg-white hover:shadow-lg placeholder-gray-400'
                                            required
                                            type={showPassword ? "text" : "password"}
                                            placeholder='Create a strong password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <i className={`ri-eye-${showPassword ? 'off' : 'line'} text-lg`}></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Terms and Conditions - Legal compliance checkbox */}
                                <div className='flex items-center gap-2 text-sm'>
                                    <input type="checkbox" className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' required />
                                    <span className='text-gray-600'>
                                        I agree to the
                                        <a href="#" className='text-blue-600 hover:text-blue-500 font-semibold mx-1'>Terms of Service</a>
                                        and
                                        <a href="#" className='text-blue-600 hover:text-blue-500 font-semibold ml-1'>Privacy Policy</a>
                                    </span>
                                </div>

                                {/* Submit Button - Account creation button */}
                                <button
                                    type='submit'
                                    className='relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl group overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed'
                                    disabled={loading}
                                >
                                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
                                    <div className='relative flex items-center justify-center gap-3'>
                                        <i className="ri-user-add-line text-xl"></i>
                                        <span className='text-lg'>{loading ? 'Creating Account...' : 'Create Account'}</span>
                                        {loading && <span className="ml-2 animate-spin ri-loader-4-line text-xl"></span>}
                                    </div>
                                </button>
                            </form>

                            {/* Login Link Section - Alternative login option */}
                            <div className='mt-6'>
                                <div className='relative'>
                                    <div className='absolute inset-0 flex items-center'>
                                        <div className='w-full border-t border-gray-300'></div>
                                    </div>
                                    <div className='relative flex justify-center text-sm'>
                                        <span className='px-4 bg-white text-gray-500 font-medium'>Already have an account?</span>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <Link
                                        to='/login'
                                        className='w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-2xl text-gray-700 bg-white hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-all duration-200 font-semibold group relative'
                                        onClick={e => { if (loading) e.preventDefault(); }}
                                        style={loading ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                                    >
                                        <i className="ri-login-circle-line text-lg group-hover:scale-110 transition-transform"></i>
                                        <span>{loading ? 'Loading...' : 'Sign In Instead'}</span>
                                        {loading && <span className="ml-2 animate-spin ri-loader-4-line text-xl"></span>}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Notice - Legal compliance footer */}
                    <div className='mt-6 text-center'>
                        <p className='text-xs text-white/60 leading-relaxed'>
                            This site is protected by reCAPTCHA and the Google
                            <a href="#" className='underline hover:text-white/80 transition-colors mx-1'>Privacy Policy</a>
                            and
                            <a href="#" className='underline hover:text-white/80 transition-colors ml-1'>Terms of Service</a>
                            apply.
                        </p>
                    </div>

                    {/* Back to Start Button - Bottom positioned */}
                    <div className='mt-8 text-center'>
                        <Link
                            to='/'
                            className='inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 group shadow-lg'
                        >
                            <i className="ri-arrow-left-line text-lg group-hover:-translate-x-1 transition-transform duration-300"></i>
                            <span className='font-medium'>Back to Start</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSignUp