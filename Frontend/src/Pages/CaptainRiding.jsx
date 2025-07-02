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
            <div className="pt-20 h-[64vh] md:h-[70vh]">
                <div className="relative h-full">
                    {/* Replace static image with LiveTracking component */}
                    <LiveTracking />
                </div>
            </div>

            {/* Enhanced Trip Control Panel - Moved upwards for better space management */}
            <div className="flex-1 flex flex-col justify-end">
                <div
                    className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 md:p-6 mx-4 mb-6 rounded-3xl shadow-2xl cursor-pointer transform transition-all duration-200 hover:scale-[1.01]"
                    onClick={() => setFinishRidePanel(true)}
                >
                    {/* Handle */}
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-1 bg-white/50 rounded-full"></div>
                    </div>

                    {/* Main Layout - Rearranged */}
                    <div className="space-y-4">
                        {/* Top Section: Passenger Info + Complete Button */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <img
                                    className='w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg'
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAjn0EsJc3E-9hgTU6GxsMuCioyJbeeRK4A&s"
                                    alt="Passenger"
                                />
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold mb-1">
                                        {rideData?.user?.fullname?.firstname} {rideData?.user?.fullname?.lastname}
                                    </h4>
                                    <p className="text-sm opacity-90 mb-2">Passenger • ⭐ 4.8</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm bg-white/25 px-3 py-1 rounded-full font-medium">
                                            💰 ₹{rideData?.fare || '85'}
                                        </span>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                            💵 Cash
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Complete Ride Button - Moved to right side */}
                            <div className="ml-4">
                                <button className='bg-white text-green-600 font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2'>
                                    <i className="ri-flag-line text-lg"></i>
                                    <span>Complete Ride</span>
                                </button>
                                <p className="text-xs opacity-75 mt-2 text-center">Tap when arrived</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/20"></div>

                        {/* Bottom Section: Quick Actions */}
                        <div className="flex gap-3">
                            <button className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                                <i className="ri-phone-line text-lg"></i>
                                <span>Call</span>
                            </button>
                            <button className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                                <i className="ri-message-2-line text-lg"></i>
                                <span>Message</span>
                            </button>
                            <button className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                                <i className="ri-customer-service-line text-lg"></i>
                                <span>Support</span>
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