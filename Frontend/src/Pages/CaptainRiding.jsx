import React, { useRef, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FinishRide from '../Components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../Components/LiveTracking';


const CaptainRiding = () => {
    const navigate = useNavigate()
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [tripDuration, setTripDuration] = useState(0) // in seconds
    const [distanceRemaining, setDistanceRemaining] = useState('4 km')
    const [estimatedTime, setEstimatedTime] = useState('12 min')
    const [rideStatus, setRideStatus] = useState('in-progress') // 'in-progress', 'near-destination'

    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    // Update current time and trip duration
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
            setTripDuration(prev => prev + 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    // Format trip duration
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    useGSAP(() => {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)',
            })
        }
        else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel]);

    return (
        <div className='min-h-screen bg-gray-100 relative flex flex-col'>
            {/* Enhanced Header */}
            <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between p-4">
                    {/* Logo and Status */}
                    <div className="flex items-center gap-3">
                        <img
                            className='w-10 h-10 object-contain'
                            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                            alt="Xpressly Logo"
                        />
                        <div className="hidden md:block">
                            <h2 className="text-lg font-bold text-gray-800">Ride in Progress</h2>
                            <p className="text-xs text-gray-600">
                                Started at {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>

                    {/* Trip Timer */}
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="flex items-center gap-1 text-green-600">
                                <i className="ri-time-line"></i>
                                <span className="font-mono text-lg font-bold">
                                    {formatDuration(tripDuration)}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500">Trip Duration</p>
                        </div>

                        {/* Back to Dashboard */}
                        <button
                            onClick={() => navigate('/captain-dashboard')}
                            className="w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors duration-200"
                        >
                            <i className="ri-close-line text-lg"></i>
                        </button>
                    </div>
                </div>
            </header>

            {/* Map Section - Increased size */}
            <div className="pt-20 h-[47vh] md:h-[70vh]">
                <div className="relative h-full">
                    {/* Replace static image with LiveTracking component */}
                    <LiveTracking />
                </div>
            </div>

            {/* Enhanced Trip Control Panel - Fixed and properly arranged */}
            <div className="flex-1 flex flex-col justify-end">
                <div
                    className="bg-gradient-to-r from-blue-300 to-green-300 text-blue-950 p-4 md:p-6 mx-3 md:mx-4 mb-4 md:mb-6 rounded-3xl shadow-2xl cursor-pointer transform transition-all duration-200 hover:scale-[1.01] font-semibold text-m"
                    onClick={() => setFinishRidePanel(true)}
                >
                    {/* Handle */}
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-1 bg-white/50 rounded-full"></div>
                    </div>

                    {/* Main Layout - Improved Structure */}
                    <div className="space-y-5">
                        {/* User Details Section - Fixed and Reorganized */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-4">
                            {/* User Info Header */}
                            <div className="flex items-start gap-4">
                                <div className="relative">
                                    <img
                                        className='w-16 h-16 md:w-18 md:h-18 rounded-full object-cover border-3 border-white shadow-lg'
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAjn0EsJc3E-9hgTU6GxsMuCioyJbeeRK4A&s"
                                        alt="Passenger"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                                        <i className="ri-check-line text-xs text-white"></i>
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-lg md:text-xl font-bold truncate">
                                            {rideData?.user?.fullname?.firstname} {rideData?.user?.fullname?.lastname}
                                        </h4>
                                        <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-full">
                                            <i className="ri-star-fill text-yellow-300 text-sm"></i>
                                            <span className="text-sm font-medium">4.8</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-sm opacity-90">Passenger</span>
                                        <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                                        <span className="text-sm opacity-90">
                                            {rideData?.user?.email?.substring(0, 20)}...
                                        </span>
                                    </div>

                                    {/* Fare and Payment Info */}
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <div className="flex items-center gap-2 bg-green-500/20 px-3 py-2 rounded-xl">
                                            <i className="ri-money-rupee-circle-line text-lg"></i>
                                            <span className="font-bold text-lg">₹{rideData?.fare || '85'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-xl">
                                            <i className="ri-wallet-line"></i>
                                            <span className="text-sm font-medium">Cash Payment</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trip Status Info */}
                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <i className="ri-map-pin-line text-sm"></i>
                                        <span className="text-xs opacity-75">Distance Left</span>
                                    </div>
                                    <span className="font-bold text-sm">{distanceRemaining}</span>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <i className="ri-time-line text-sm"></i>
                                        <span className="text-xs opacity-75">ETA</span>
                                    </div>
                                    <span className="font-bold text-sm">{estimatedTime}</span>
                                </div>
                            </div>
                        </div>

                        {/* Complete Ride Button - Full Width */}
                        <button className='w-full bg-white text-green-600 font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3'>
                            <i className="ri-flag-line text-xl"></i>
                            <span className="text-lg">Complete Ride</span>
                        </button>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-3 gap-3">
                            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl py-3 px-2 text-sm font-medium transition-all duration-200 flex flex-col items-center gap-2">
                                <i className="ri-phone-line text-xl"></i>
                                <span>Call</span>
                            </button>
                            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl py-3 px-2 text-sm font-medium transition-all duration-200 flex flex-col items-center gap-2">
                                <i className="ri-message-2-line text-xl"></i>
                                <span>Message</span>
                            </button>
                            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl py-3 px-2 text-sm font-medium transition-all duration-200 flex flex-col items-center gap-2">
                                <i className="ri-navigation-line text-xl"></i>
                                <span>Navigate</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Finish Ride Panel - Full Screen */}
            <div ref={finishRidePanelRef} className='fixed w-full h-screen z-20 bottom-0 translate-y-full bg-white'>
                <div className="h-full overflow-y-auto">
                    <FinishRide
                        ride={rideData}
                        setFinishRidePanel={setFinishRidePanel}
                        tripDuration={formatDuration(tripDuration)}
                    />
                </div>
            </div>

            {/* Live Tracking Background */}
            <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <LiveTracking />
            </div>
        </div>
    )
}

export default CaptainRiding