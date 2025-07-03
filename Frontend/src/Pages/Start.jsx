import React from 'react'
import { Link } from 'react-router-dom'
import XpresslyLogo from '../Components/XpresslyLogo'

const Start = () => { // Start component serves as the landing page for the application
    // It displays a background image, a logo, and a button to navigate to the login
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300/20 rounded-full blur-lg animate-float-delay-1"></div>
                <div className="absolute bottom-40 left-20 w-40 h-40 bg-blue-300/15 rounded-full blur-xl animate-float-delay-2"></div>
                <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/10 rounded-full blur-lg animate-float"></div>
            </div>

            {/* Floating Icons */}
            <div className="absolute top-32 left-1/4 text-white/20 animate-float">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="absolute top-1/3 right-1/4 text-white/20 animate-float-delay-1">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1.05l.5 2H3a1 1 0 000 2h2.95l.5 2H5a1 1 0 000 2h2.05l.5 2H16a1 1 0 001-1v-1a1 1 0 00-1-1h-2.05l-.5-2H16a1 1 0 000-2h-3.95l-.5-2H14a1 1 0 000-2h-2.05l-.5-2H3z" />
                </svg>
            </div>
            <div className="absolute bottom-1/3 left-1/3 text-white/20 animate-float-delay-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
            </div>

            <div className='h-screen flex justify-between flex-col relative z-10'>
                {/* Header with Logo */}
                <div className="pt-8 pl-6">
                    <div className="w-fit">
                        <XpresslyLogo className="text-white" size="lg" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center px-6">
                    <div className="text-center text-white mb-8">
                        <h1 className="text-4xl font-bold mb-4 leading-tight">
                            Welcome to the Future of
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                                Transportation
                            </span>
                        </h1>
                        <p className="text-xl opacity-90 mb-2">Ride Smart. On Time. Every Time.</p>
                        <p className="text-lg opacity-75">Experience premium mobility with Xpressly</p>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center space-x-8 mb-8">
                        <div className="text-center text-white">
                            <div className="text-2xl font-bold">2M+</div>
                            <div className="text-sm opacity-75">Happy Users</div>
                        </div>
                        <div className="text-center text-white">
                            <div className="text-2xl font-bold">50K+</div>
                            <div className="text-sm opacity-75">Drivers</div>
                        </div>
                        <div className="text-center text-white">
                            <div className="text-2xl font-bold">4.9★</div>
                            <div className="text-sm opacity-75">Rating</div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className='glassmorphism mx-4 mb-6 p-6 rounded-2xl'>
                    <h2 className='text-2xl font-bold text-white mb-4 text-center'>Ready to Start Your Journey?</h2>
                    <div className="space-y-3">
                        <Link
                            className='flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl'
                            to="/login"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            Continue as User
                        </Link>
                        <Link
                            className='flex items-center justify-center w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl'
                            to="/captain-login"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1.05l.5 2H3a1 1 0 000 2h2.95l.5 2H5a1 1 0 000 2h2.05l.5 2H16a1 1 0 001-1v-1a1 1 0 00-1-1h-2.05l-.5-2H16a1 1 0 000-2h-3.95l-.5-2H14a1 1 0 000-2h-2.05l-.5-2H3z" />
                            </svg>
                            Drive with Xpressly
                        </Link>
                    </div>
                    <p className="text-center text-white/70 text-sm mt-4">
                        Join millions who trust Xpressly for their daily commute
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Start