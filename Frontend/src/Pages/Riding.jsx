import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../Components/LiveTracking';


const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()
    const [rideStartTime] = useState(new Date())
    const [currentTime, setCurrentTime] = useState(new Date())
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const [isRideCompleted, setIsRideCompleted] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        socket.on("ride-ended", () => {
            setIsRideCompleted(true)
            setTimeout(() => navigate('/home'), 2000)
        })

        return () => {
            socket.off("ride-ended")
        }
    }, [socket, navigate])

    const getRideDuration = () => {
        const diff = Math.floor((currentTime - rideStartTime) / 1000)
        const minutes = Math.floor(diff / 60)
        const seconds = diff % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const getVehicleIcon = (vehicleType) => {
        switch (vehicleType?.toLowerCase()) {
            case 'motorcycle':
                return 'https://www.svgrepo.com/show/408292/motorcycle.svg'
            case 'auto':
                return 'https://www.svgrepo.com/show/408292/rickshaw.svg'
            default:
                return 'https://www.svgrepo.com/show/408292/car-white.svg'
        }
    }

    return (
        <div className='h-screen bg-gray-50'>
            {/* Header */}
            <div className="bg-white shadow-sm p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h1 className="text-lg font-semibold text-gray-800">Riding</h1>
                    <span className="text-sm text-gray-500">• {getRideDuration()}</span>
                </div>
                <Link to='/home' className="h-10 w-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-full transition-colors">
                    <i className="text-lg font-medium ri-home-5-line text-gray-600"></i>
                </Link>
            </div>

            <div className="h-[45%]">
                <LiveTracking />
            </div>

            <div className="h-[55%] bg-white rounded-t-3xl shadow-lg overflow-y-auto">
                {/* Driver Info Card */}
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <img
                                    className='h-16 w-16 rounded-full object-cover border-3 border-green-200'
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAjn0EsJc3E-9hgTU6GxsMuCioyJbeeRK4A&s"
                                    alt="Driver"
                                />
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h2 className='text-xl font-semibold capitalize text-gray-800'>
                                    {ride?.captain?.fullname?.firstname} {ride?.captain?.fullname?.lastname}
                                </h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-yellow-500">
                                        <i className="ri-star-fill text-sm"></i>
                                        4.8
                                    </span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-sm text-gray-600">5 years experience</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2">
                                <img
                                    className='h-12 w-12'
                                    src={getVehicleIcon(ride?.captain?.vehicle?.vehicleType)}
                                    alt="Vehicle"
                                />
                            </div>
                            <div className="text-center">
                                <h4 className='text-lg font-bold text-gray-800'>{ride?.captain?.vehicle?.plate || 'Loading...'}</h4>
                                <p className='text-xs text-gray-500 capitalize'>
                                    {ride?.captain?.vehicle?.vehicleType || 'Vehicle'} • {ride?.captain?.vehicle?.color || 'Blue'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-3">
                        <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                            <i className="ri-phone-line"></i>
                            <span className="text-sm font-medium">Call</span>
                        </button>
                        <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                            <i className="ri-message-3-line"></i>
                            <span className="text-sm font-medium">Message</span>
                        </button>
                        <button className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                            <i className="ri-share-line"></i>
                            <span className="text-sm font-medium">Share</span>
                        </button>
                    </div>
                </div>

                {/* Trip Details */}
                <div className="p-4 space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Trip Details</h3>

                        <div className='space-y-3'>
                            <div className='flex items-start gap-4 p-3 bg-white/70 rounded-lg'>
                                <i className="text-xl ri-map-pin-user-fill text-green-600 mt-1"></i>
                                <div className="flex-1">
                                    <h4 className='text-sm font-medium text-green-700'>Pickup Location</h4>
                                    <p className='text-gray-700 font-medium'>{ride?.pickup || 'Loading pickup location...'}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <i className="ri-time-line mr-1"></i>
                                        Started at {rideStartTime.toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="w-px h-8 bg-gradient-to-b from-green-300 to-red-300"></div>
                            </div>

                            <div className='flex items-start gap-4 p-3 bg-white/70 rounded-lg'>
                                <i className="text-xl ri-map-pin-fill text-red-600 mt-1"></i>
                                <div className="flex-1">
                                    <h4 className='text-sm font-medium text-red-700'>Destination</h4>
                                    <p className='text-gray-700 font-medium'>{ride?.destination || 'Loading destination...'}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <i className="ri-roadster-line mr-1"></i>
                                        {ride?.distance || '3.2 km'} • Est. arrival: {new Date(Date.now() + 12 * 60000).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fare Breakdown */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Fare Details</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Base Fare</span>
                                <span className="font-medium">₹{Math.floor((ride?.fare || 100) * 0.6)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Distance Charge</span>
                                <span className="font-medium">₹{Math.floor((ride?.fare || 100) * 0.3)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Time Charge</span>
                                <span className="font-medium">₹{Math.floor((ride?.fare || 100) * 0.1)}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total Fare</span>
                                <span className="text-green-600">₹{ride?.fare || 'Calculating...'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-yellow-50 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h3>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setPaymentMethod('cash')}
                                className={`flex-1 p-3 rounded-lg border-2 transition-all ${paymentMethod === 'cash'
                                        ? 'border-green-500 bg-green-50 text-green-700'
                                        : 'border-gray-200 bg-white text-gray-600'
                                    }`}
                            >
                                <i className="ri-cash-line text-xl mb-1"></i>
                                <p className="text-sm font-medium">Cash</p>
                            </button>
                            <button
                                onClick={() => setPaymentMethod('digital')}
                                className={`flex-1 p-3 rounded-lg border-2 transition-all ${paymentMethod === 'digital'
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 bg-white text-gray-600'
                                    }`}
                            >
                                <i className="ri-smartphone-line text-xl mb-1"></i>
                                <p className="text-sm font-medium">Digital</p>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Complete Ride Button */}
                <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0">
                    {isRideCompleted ? (
                        <div className="bg-green-100 text-green-800 font-semibold p-4 rounded-xl text-center">
                            <i className="ri-check-line text-xl mr-2"></i>
                            Ride Completed! Redirecting...
                        </div>
                    ) : (
                        <button className='w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold p-4 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2'>
                            <i className="ri-secure-payment-line"></i>
                            Complete Ride & Pay ₹{ride?.fare}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Riding