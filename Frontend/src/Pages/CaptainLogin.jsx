/**
 * CaptainLogin Component
 * 
 * Captain/Driver authentication page for Xpressly ride-sharing app.
 * Provides secure login portal for drivers with specialized captain theming.
 * Handles captain authentication and redirects to driver dashboard upon success.
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../Context/CaptainContext'
import XpresslyLogo from '../Components/XpresslyLogo'

const CaptainLogin = () => {
    // Form state management for captain credentials
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    // useState hook to manage password visibility toggle

    const { captain, setCaptain } = React.useContext(CaptainDataContext) // Global captain state
    const navigate = useNavigate() // Navigation hook for route management

    /**
     * Captain login form submission handler
     * Authenticates captain credentials and manages login flow
     * @param {Event} e - Form submission event
     */
    const submitHandler = async (e) => {
        e.preventDefault() // Prevent default form submission

        // Prepare captain login credentials
        const captain = {
            email: email,
            password: password
        }

        // Send captain authentication request to backend
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

        if (response.status === 200) {
            const data = response.data
            setCaptain(data.captain) // Update global captain context
            localStorage.setItem('token', data.token) // Store authentication token
            navigate('/captain-dashboard') // Redirect to captain dashboard
        }

        // Reset form fields after submission
        setEmail('')
        setPassword('')
        setShowPassword(false)
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 relative overflow-hidden'>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Floating Car Icons */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-white/10 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${4 + Math.random() * 2}s`
                        }}
                    >
                        <i className="ri-car-line text-2xl"></i>
                    </div>
                ))}
            </div>

            <div className='relative z-10 flex flex-col justify-center min-h-screen px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    {/* Enhanced Captain Branding Section */}
                    <div className='flex flex-col items-center mb-10'>
                        <div className='relative mb-6'>
                            <div className='absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full blur-lg opacity-75 animate-pulse'></div>
                            <div className='relative flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20'>
                                <div className='relative'>
                                    <XpresslyLogo className="w-14 h-14 md:w-16 md:h-16 drop-shadow-lg" />
                                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse flex items-center justify-center'>
                                        <i className="ri-steering-2-line text-white text-xs"></i>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-sm">
                                        Xpressly
                                    </h1>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                                        <span className='text-white/80 text-sm font-medium'>Captain Portal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-center'>
                            <p className="text-lg md:text-xl font-semibold text-white/90 italic tracking-wide">
                                "Ride Smart. On Time. Every Time."
                            </p>
                            <div className='flex items-center justify-center gap-4 mt-4'>
                                <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1'>
                                    <i className="ri-group-line text-green-400"></i>
                                    <span className='text-white/80 text-sm'>50K+ Captains</span>
                                </div>
                                <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1'>
                                    <i className="ri-wallet-3-line text-emerald-400"></i>
                                    <span className='text-white/80 text-sm'>Earn Daily</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Captain Login Form */}
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur-xl'></div>
                        <div className='relative bg-white/95 backdrop-blur-xl py-10 px-8 shadow-2xl rounded-3xl border border-white/20'>
                            <div className='mb-8'>
                                <div className='flex items-center justify-center gap-3 mb-4'>
                                    <div className='p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl'>
                                        <i className="ri-shield-check-line text-white text-2xl"></i>
                                    </div>
                                    <div>
                                        <h2 className='text-2xl font-bold text-gray-900'>
                                            Captain Access
                                        </h2>
                                        <p className='text-green-600 font-semibold text-sm'>
                                            Secure Portal
                                        </p>
                                    </div>
                                </div>
                                <p className='text-center text-gray-600 text-lg'>
                                    Sign in to your captain dashboard
                                </p>
                            </div>

                            <form onSubmit={(e) => submitHandler(e)} className='space-y-6'>
                                <div className='relative'>
                                    <label className='block text-sm font-bold text-gray-800 mb-3'>
                                        <i className="ri-mail-line mr-2 text-green-600"></i>
                                        Captain Email
                                    </label>
                                    <div className='relative'>
                                        <input
                                            className='w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-base bg-gray-50/50 hover:bg-white hover:shadow-lg placeholder-gray-400'
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder='Enter your captain email'
                                        />
                                        <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                                            <i className="ri-verified-badge-line text-green-500 text-lg opacity-0 transition-opacity duration-200"></i>
                                        </div>
                                    </div>
                                </div>

                                <div className='relative'>
                                    <label className='block text-sm font-bold text-gray-800 mb-3'>
                                        <i className="ri-lock-2-line mr-2 text-emerald-600"></i>
                                        Secure Password
                                    </label>
                                    <div className='relative'>
                                        <input
                                            className='w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-base bg-gray-50/50 hover:bg-white hover:shadow-lg placeholder-gray-400'
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type={showPassword ? "text" : "password"}
                                            placeholder='Enter your secure password'
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

                                <div className='flex items-center justify-between text-sm'>
                                    <label className='flex items-center gap-2 cursor-pointer'>
                                        <input type="checkbox" className='rounded border-gray-300 text-green-600 focus:ring-green-500' />
                                        <span className='text-gray-600'>Keep me signed in</span>
                                    </label>
                                    <a href="#" className='text-green-600 hover:text-green-500 font-semibold transition-colors'>
                                        Need help?
                                    </a>
                                </div>

                                <button
                                    type='submit'
                                    className='relative w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl group overflow-hidden'
                                >
                                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
                                    <div className='relative flex items-center justify-center gap-3'>
                                        <div className='p-1 bg-white/20 rounded-lg'>
                                            <i className="ri-steering-2-line text-xl"></i>
                                        </div>
                                        <span className='text-lg'>Access Captain Dashboard</span>
                                    </div>
                                </button>
                            </form>

                            <div className='mt-8'>
                                <div className='relative'>
                                    <div className='absolute inset-0 flex items-center'>
                                        <div className='w-full border-t border-gray-300'></div>
                                    </div>
                                    <div className='relative flex justify-center text-sm'>
                                        <span className='px-4 bg-white text-gray-500 font-medium'>New Captain?</span>
                                    </div>
                                </div>
                                <div className='mt-6'>
                                    <Link to='/captain-signup' className='w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-2xl text-gray-700 bg-white hover:bg-gray-50 hover:border-green-400 hover:text-green-600 transition-all duration-200 font-semibold group'>
                                        <i className="ri-user-add-line text-lg group-hover:scale-110 transition-transform"></i>
                                        Join as Captain
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced User Login Link */}
                    <div className='mt-8'>
                        <div className='relative'>
                            <div className='absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl'></div>
                            <Link
                                to='/login'
                                className='relative w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl group overflow-hidden'
                            >
                                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
                                <div className='relative flex items-center gap-3'>
                                    <div className='p-2 bg-white/20 rounded-lg'>
                                        <i className="ri-user-line text-xl"></i>
                                    </div>
                                    <div className='text-left'>
                                        <div className='font-bold text-lg'>Continue as User</div>
                                        <div className='text-sm opacity-90'>Book your ride</div>
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

export default CaptainLogin