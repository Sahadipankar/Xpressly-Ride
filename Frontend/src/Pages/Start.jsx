// Start Page - Landing page with premium branding and user/captain login options
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import XpresslyLogo from '../Components/XpresslyLogo'

const Start = () => {
    // State for managing page load animation
    const [isLoaded, setIsLoaded] = useState(false)

    // Trigger load animation on component mount
    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
            {/* Premium gold overlay pattern for luxury branding */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255, 193, 7, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(255, 235, 59, 0.2) 0%, transparent 50%)
                    `
                }}>
                </div>
            </div>

            {/* Animated Gold Blobs */}
            <div className="absolute inset-0">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Golden Particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full opacity-30 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Luxury Icons */}
            <div className="absolute top-20 md:top-24 left-8 md:left-16 text-yellow-400/20 animate-float hidden sm:block">
                <svg className="w-8 h-8 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
            </div>
            <div className="absolute top-32 right-8 md:right-20 text-amber-400/20 animate-float-delay-1 hidden sm:block">
                <svg className="w-6 h-6 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22S19,14.25 19,9A7,7 0 0,0 12,2Z" />
                </svg>
            </div>
            <div className="absolute bottom-1/3 left-8 md:left-1/3 text-yellow-300/30 animate-float-delay-2 hidden sm:block">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z" />
                </svg>
            </div>

            <div className={`min-h-screen flex flex-col relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Header with Royal Logo */}
                <div className="pt-6 md:pt-8 px-4 md:px-6">
                    <div className="flex justify-center">
                        <div className="transform hover:scale-105 transition-transform duration-300 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
                            <div className="relative flex items-center space-x-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-green-400 rounded-full blur-md opacity-50 animate-ping"></div>
                                    <XpresslyLogo className="w-15 h-15 md:w-24 md:h-24 lg:w-28 lg:h-28 text-white drop-shadow-2xl relative z-10" />
                                </div>
                                <div className="text-white">
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent drop-shadow-lg">
                                        Xpressly
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Royal Main Content */}
                <div className="flex-1 flex flex-col justify-center mt-8 px-4 md:px-6 py-8">
                    <div className="max-w-4xl mx-auto w-full">
                        {/* Royal Hero Section */}
                        <div className="text-center mb-8 md:mb-12">
                            {/* Royal Headlines */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                                <span className="text-white">Welcome to the</span>
                                <span className="block bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent font-semibold">
                                    Premium Riding Experience
                                </span>
                            </h1>

                            <div className="space-y-2 md:space-y-3 mb-8 md:mb-10">
                                <p className="text-lg md:text-xl lg:text-2xl mt-6 font-semibold bg-gradient-to-r from-yellow-300 via-amber-400 to-gold-500 bg-clip-text text-transparent">
                                    "Ride Smart. On Time. Every Time."
                                </p>
                                <p className="text-base mt-2 -mb-2 md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
                                    Experience luxury transportation with premium riding experiences.
                                </p>
                            </div>
                        </div>

                        {/* Royal Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-10 md:mb-10 max-w-lg mx-auto">
                            <div className="text-center glassmorphism p-3 md:p-4 lg:p-6 rounded-xl lg:rounded-2xl transform hover:scale-105 transition-all duration-300 group border border-yellow-500/20">
                                <div className="text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white">2M+</div>
                                <div className="text-xs md:text-sm lg:text-base text-yellow-200">Elite Users</div>
                            </div>
                            <div className="text-center glassmorphism p-3 md:p-4 lg:p-6 rounded-xl lg:rounded-2xl transform hover:scale-105 transition-all duration-300 group border border-amber-500/20">
                                <div className="text-amber-400 mb-2 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" />
                                    </svg>
                                </div>
                                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white">50K+</div>
                                <div className="text-xs md:text-sm lg:text-base text-amber-200">Premium Drivers</div>
                            </div>
                            <div className="text-center glassmorphism p-3 md:p-4 lg:p-6 rounded-xl lg:rounded-2xl transform hover:scale-105 transition-all duration-300 group border border-yellow-400/20">
                                <div className="text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                                    <div className="flex justify-center space-x-1 mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white">4.9</div>
                                <div className="text-xs md:text-sm lg:text-base text-yellow-200">Royal Rating</div>
                            </div>
                        </div>

                        <div className="w-14 h-14 mt-4 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-amber-600 rounded-full animate-ping opacity-20"></div>
                            <svg className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-black relative z-10" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>
                            </svg>
                        </div>

                        {/* Premium Features - Desktop Only */}
                        <div className="hidden lg:flex justify-center space-x-8 mb-8">
                            <div className="flex items-center text-yellow-200/90 text-sm xl:text-base">
                                <svg className="w-4 h-4 xl:w-5 xl:h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                                </svg>
                                Royal Security
                            </div>
                            <div className="flex items-center text-amber-200/90 text-sm xl:text-base">
                                <svg className="w-4 h-4 xl:w-5 xl:h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
                                </svg>
                                24/7 Concierge
                            </div>
                            <div className="flex items-center text-yellow-200/90 text-sm xl:text-base">
                                <svg className="w-4 h-4 xl:w-5 xl:h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C21.83,8 22.54,8.5 22.84,9.24C23.03,9.64 23.05,10.11 22.91,10.54L20.86,18.27C20.56,19.37 19.54,20.16 18.38,20.16H9M9,19H18.38L20.43,11.31C20.5,11.13 20.5,10.94 20.43,10.76C20.35,10.58 20.22,10.5 20.1,10.5H16.38L17.96,3.93L10,11.93V19Z" />
                                </svg>
                                Premium Value
                            </div>
                        </div>
                    </div>
                </div>

                {/* Royal Bottom CTA */}
                <div className='glassmorphism mb-4 md:mb-6 lg:mb-8 p-4 md:p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-2xl border border-yellow-500/30 mx-4 md:mx-6 lg:mx-auto max-w-2xl bg-gradient-to-br from-black/40 via-gray-900/40 to-black/40'>
                    <div className="text-center mb-4 md:mb-6">
                        <h2 className='text-xl md:text-2xl lg:text-3xl font-bold mb-2'>
                            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                                Begin Your Journey
                            </span>
                        </h2>
                        <p className="text-yellow-200/80 text-sm md:text-base lg:text-lg">
                            Join the premium riding experience with Xpressly.
                        </p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <Link
                            className='group btn-click-effect pulse-on-click flex items-center justify-between w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 hover:via-amber-400 hover:to-yellow-500 text-black py-4 md:py-5 lg:py-6 px-6 md:px-8 rounded-xl lg:rounded-2xl font-bold text-base md:text-lg lg:text-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-lg relative overflow-hidden'
                            to="/login"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="flex items-center relative z-10">
                                <div className="w-6 h-6 md:w-7 md:h-7 mr-3 md:mr-4 bg-black/20 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                                <span>Continue as Elite User</span>
                            </div>
                            <div className="relative z-10">
                                <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </div>
                        </Link>

                        <Link
                            className='group btn-click-effect pulse-on-click flex items-center justify-between w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 text-yellow-400 border border-yellow-500/50 py-4 md:py-5 lg:py-6 px-6 md:px-8 rounded-xl lg:rounded-2xl font-bold text-base md:text-lg lg:text-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-lg relative overflow-hidden'
                            to="/captain-login"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="flex items-center relative z-10">
                                <div className="w-6 h-6 md:w-7 md:h-7 mr-3 md:mr-4 bg-yellow-400/20 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                    </svg>
                                </div>
                                <span>Continue as Premium Driver</span>
                            </div>
                            <div className="relative z-10">
                                <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    {/* Royal Trust Indicators */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-yellow-500/20">
                        <div className="flex items-center justify-center text-yellow-300/80 text-xs md:text-sm">
                            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                            </svg>
                            <span>Royal Certified</span>
                        </div>
                        <div className="flex items-center justify-center text-amber-300/80 text-xs md:text-sm">
                            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
                            </svg>
                            <span>Elite Support</span>
                        </div>
                        <div className="flex items-center justify-center text-yellow-300/80 text-xs md:text-sm col-span-2 md:col-span-1">
                            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5,16L3,14L9,8L21,20L19,22L9,12L5,16Z" />
                            </svg>
                            <span>Luxury Experience</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Start