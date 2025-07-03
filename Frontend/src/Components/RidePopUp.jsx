/**
 * RidePopUp Component
 * 
 * Modal popup that displays incoming ride requests to captains.
 * Features countdown timer for response, ride details, and action buttons.
 * Auto-closes when timer expires and provides accept/decline functionality.
 */

import React, { useState, useEffect, useRef } from 'react'

const RidePopUp = (props) => {
    // Component state management
    const [timeLeft, setTimeLeft] = useState(30) // Countdown timer: 30 seconds to respond
    const [estimatedTime, setEstimatedTime] = useState('5-8 min') // Estimated pickup time
    const rideIdRef = useRef(null) // Ref to track current ride ID for timer reset

    // Effect to reset timer when new ride request arrives
    useEffect(() => {
        // Check if this is a new ride by comparing IDs
        const currentRideId = props.ride?._id;
        if (currentRideId && currentRideId !== rideIdRef.current) {
            // New ride detected, reset timer to 30 seconds
            rideIdRef.current = currentRideId;
            setTimeLeft(30);
        }
    }, [props.ride?._id]);

    // Effect to handle countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // Auto-close popup when timer expires
                    setTimeout(() => {
                        props.setRidePopUpPanel(false);
                    }, 0);
                    return 0;
                }
                return prev - 1; // Decrement timer
            });
        }, 1000);

        // Cleanup timer on component unmount
        return () => clearInterval(timer);
    }, []); // Remove props dependency to prevent timer reset

    return (
        <div className="relative">
            {/* Header with close button */}
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => props.setRidePopUpPanel(false)}
                    className="w-12 h-1 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"
                ></button>
            </div>

            {/* Animated Header with Timer */}
            <div className="text-center mb-6">
                <div className="relative inline-block">
                    <h2 className='text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent'>
                        🚗 New Ride Request!
                    </h2>
                    <div className="absolute -top-2 -right-8 animate-bounce">
                        <span className="text-2xl">⚡</span>
                    </div>
                </div>

                {/* Enhanced Timer */}
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className={`relative w-16 h-16 rounded-full border-4 ${timeLeft > 15 ? 'border-green-500 bg-green-50' :
                        timeLeft > 5 ? 'border-yellow-500 bg-yellow-50' :
                            'border-red-500 bg-red-50'
                        } flex items-center justify-center transition-all duration-300`}>
                        <span className={`text-xl font-bold ${timeLeft > 15 ? 'text-green-600' :
                            timeLeft > 5 ? 'text-yellow-600' :
                                'text-red-600'
                            }`}>
                            {timeLeft}
                        </span>
                        <div className={`absolute inset-0 rounded-full ${timeLeft > 15 ? 'border-green-400' :
                            timeLeft > 5 ? 'border-yellow-400' :
                                'border-red-400'
                            } border-2 animate-pulse`}></div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">Respond in</p>
                        <p className="text-xs text-gray-500">
                            {timeLeft > 15 ? '🟢 Good time' :
                                timeLeft > 5 ? '🟡 Hurry up' :
                                    '🔴 Almost expired'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Enhanced Passenger Info Card */}
            <div className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 rounded-2xl p-5 mb-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                className='h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-4 border-white shadow-lg'
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAjn0EsJc3E-9hgTU6GxsMuCioyJbeeRK4A&s"
                                alt="Passenger"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <i className="ri-check-line text-white text-xs"></i>
                            </div>
                        </div>
                        <div>
                            <h3 className='text-xl md:text-2xl font-bold capitalize text-gray-800'>
                                {props.ride?.user?.fullname?.firstname} {props.ride?.user?.fullname?.lastname}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-500 flex">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className={`ri-star-${i < 4 ? 'fill' : 'line'} text-sm`}></i>
                                        ))}
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">4.8</span>
                                </div>
                                <span className="text-gray-400">•</span>
                                <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                                    👑 Premium
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                <i className="ri-smartphone-line mr-1"></i>
                                Member since 2022
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-3">
                            <h4 className="text-2xl md:text-3xl font-bold">
                                ₹{props.ride?.fare || 'N/A'}
                            </h4>
                            <p className="text-sm opacity-90">{estimatedTime}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            💰 Cash payment
                        </p>
                    </div>
                </div>

                {/* Passenger Preferences */}
                <div className="flex gap-2 mt-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        🎵 Music OK
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        ❄️ AC Preferred
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                        💬 Quiet Ride
                    </span>
                </div>
            </div>

            {/* Enhanced Route Information */}
            <div className='w-full space-y-4 mb-6'>
                <div className='relative bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border-l-4 border-green-500'>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <i className="ri-map-pin-user-fill text-white text-lg"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className='text-lg font-bold text-gray-800'>Pickup Location</h4>
                                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium">
                                    <i className="ri-time-line mr-1"></i>
                                    {estimatedTime} away
                                </span>
                            </div>
                            <p className='text-sm text-gray-700 leading-relaxed mb-2'>
                                {props.ride?.pickup || 'Loading pickup location...'}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                                <span>
                                    <i className="ri-road-map-line mr-1"></i>
                                    Main road access
                                </span>
                                <span>
                                    <i className="ri-parking-line mr-1"></i>
                                    Easy pickup
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated Route Line */}
                <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                        <div className="w-px h-6 bg-gradient-to-b from-green-500 to-red-500"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-px h-6 bg-gradient-to-b from-red-500 to-red-600"></div>
                    </div>
                </div>

                <div className='relative bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-4 border-l-4 border-red-500'>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                            <i className="ri-map-pin-fill text-white text-lg"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className='text-lg font-bold text-gray-800'>Destination</h4>
                                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-medium">
                                    <i className="ri-roadster-line mr-1"></i>
                                    {props.ride?.distance || '3.2 km'}
                                </span>
                            </div>
                            <p className='text-sm text-gray-700 leading-relaxed mb-2'>
                                {props.ride?.destination || 'Loading destination...'}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                                <span>
                                    <i className="ri-timer-line mr-1"></i>
                                    Est. 12 min
                                </span>
                                <span>
                                    <i className="ri-traffic-light-line mr-1"></i>
                                    Light traffic
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => props.setRidePopUpPanel(false)}
                    className='flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105'
                >
                    <i className="ri-close-line text-xl"></i>
                    <span>Decline</span>
                </button>

                <button
                    onClick={() => {
                        props.setConfirmRidePopUpPanel(true);
                        props.confirmRide()
                    }}
                    className='flex-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105'
                >
                    <i className="ri-check-line text-xl"></i>
                    <span>Accept Ride</span>
                </button>
            </div>

            {/* Enhanced Quick Info */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <i className="ri-information-line text-xl text-yellow-600"></i>
                        <span className="font-semibold text-yellow-800">Trip Information</span>
                    </div>
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-medium">
                        Important
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <i className="ri-money-dollar-circle-line text-green-600"></i>
                        <span className="text-gray-700">Payment: <strong>Cash</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="ri-car-line text-blue-600"></i>
                        <span className="text-gray-700">Vehicle: <strong>{props.ride?.vehicleType || 'Car'}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="ri-shield-check-line text-purple-600"></i>
                        <span className="text-gray-700">Verified rider</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="ri-customer-service-2-line text-indigo-600"></i>
                        <span className="text-gray-700">24/7 Support</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp