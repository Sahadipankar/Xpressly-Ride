import React, { useContext, useState, useEffect } from 'react'
import { CaptainDataContext } from '../Context/CaptainContext'

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [onlineStatus, setOnlineStatus] = useState(true)
    const [sessionStats, setSessionStats] = useState(null)

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000)
        return () => clearInterval(timer)
    }, [])

    // Generate dynamic stats on component mount (simulating different sessions)
    useEffect(() => {
        const generateDynamicStats = () => {
            const baseEarnings = Math.floor(Math.random() * 500) + 600; // 600-1100
            const hoursOnline = (Math.random() * 6 + 2).toFixed(1); // 2-8 hours
            const totalRides = Math.floor(Math.random() * 15) + 8; // 8-23 rides
            const rating = (Math.random() * 0.5 + 4.5).toFixed(1); // 4.5-5.0
            const completionRate = Math.floor(Math.random() * 5) + 95; // 95-100%

            return {
                todayEarnings: baseEarnings,
                weeklyEarnings: baseEarnings * 6 + Math.floor(Math.random() * 1000),
                monthlyEarnings: baseEarnings * 25 + Math.floor(Math.random() * 5000),
                hoursOnline: parseFloat(hoursOnline),
                totalDistance: Math.floor(Math.random() * 100) + 80, // 80-180 km
                totalRides: totalRides,
                rating: parseFloat(rating),
                totalTrips: Math.floor(Math.random() * 200) + 150, // 150-350 total trips
                completionRate: completionRate,
                avgTripEarnings: Math.floor(baseEarnings / totalRides),
                fuelSavings: Math.floor(Math.random() * 200) + 100, // 100-300
                carbonOffset: (Math.random() * 15 + 10).toFixed(1) // 10-25 kg CO2
            }
        }

        setSessionStats(generateDynamicStats())
    }, [])

    if (!sessionStats) {
        return <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
    }

    return (
        <div className="space-y-4">
            {/* Captain Info and Status */}
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3">
                    <div className="relative">
                        <img
                            className='h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-3 border-green-400'
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKX2y-92Lgl0fEgjNpgWZhDcDZNz9J1jkrg&s"
                            alt="Captain Avatar"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${onlineStatus ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                    <div>
                        <h4 className="text-lg md:text-xl font-semibold capitalize flex items-center gap-2">
                            {captain?.fullname?.firstname} {captain?.fullname?.lastname}
                            <span className="text-yellow-500">
                                <i className="ri-star-fill text-sm"></i>
                                {sessionStats.rating}
                            </span>
                        </h4>
                        <p className="text-sm text-gray-600 capitalize">
                            {captain?.vehicle?.vehicleType} • {captain?.vehicle?.plate}
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                            {onlineStatus ? 'Online' : 'Offline'} • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <h4 className="text-xl md:text-2xl font-bold text-green-600">₹{sessionStats.todayEarnings}</h4>
                    <p className="text-sm text-gray-600">Today's Earnings</p>
                    <p className="text-xs text-gray-500">₹{sessionStats.weeklyEarnings} this week</p>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                <div className="text-center">
                    <div className="flex justify-center mb-1">
                        <i className="text-xl md:text-2xl ri-timer-2-line text-blue-600"></i>
                    </div>
                    <h5 className="text-sm md:text-lg font-bold text-gray-800">{sessionStats.hoursOnline}h</h5>
                    <p className="text-xs text-gray-600">Online Today</p>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-1">
                        <i className="text-xl md:text-2xl ri-roadster-line text-orange-600"></i>
                    </div>
                    <h5 className="text-sm md:text-lg font-bold text-gray-800">{sessionStats.totalDistance}km</h5>
                    <p className="text-xs text-gray-600">Distance</p>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-1">
                        <i className="text-xl md:text-2xl ri-taxi-line text-green-600"></i>
                    </div>
                    <h5 className="text-sm md:text-lg font-bold text-gray-800">{sessionStats.totalRides}</h5>
                    <p className="text-xs text-gray-600">Rides Today</p>
                </div>
            </div>

            {/* Enhanced Stats with Environmental Impact */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h6 className="text-sm font-medium text-gray-700">Performance</h6>
                        <i className="ri-bar-chart-line text-blue-500"></i>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Total Trips</span>
                            <span className="font-semibold">{sessionStats.totalTrips}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Completion Rate</span>
                            <span className="font-semibold text-green-600">{sessionStats.completionRate}%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h6 className="text-sm font-medium text-gray-700">Earnings</h6>
                        <i className="ri-money-dollar-circle-line text-green-500"></i>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-600">This Month</span>
                            <span className="font-semibold">₹{sessionStats.monthlyEarnings}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Per Trip Avg</span>
                            <span className="font-semibold text-blue-600">₹{sessionStats.avgTripEarnings}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Environmental Impact & Daily Goals */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                        <h6 className="text-sm font-medium text-gray-700">Eco Impact</h6>
                        <i className="ri-leaf-line text-green-500"></i>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Fuel Saved</span>
                            <span className="font-semibold text-green-600">₹{sessionStats.fuelSavings}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-600">CO₂ Offset</span>
                            <span className="font-semibold text-blue-600">{sessionStats.carbonOffset}kg</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                        <h6 className="text-sm font-medium text-gray-700">Daily Goal</h6>
                        <i className="ri-target-line text-purple-500"></i>
                    </div>
                    <div className="space-y-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((sessionStats.todayEarnings / 1000) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-600">₹{sessionStats.todayEarnings}/₹1000</span>
                            <span className="font-semibold text-purple-600">{Math.floor((sessionStats.todayEarnings / 1000) * 100)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Online Status Toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center gap-2">
                    <i className="ri-signal-tower-line text-blue-600"></i>
                    <span className="text-sm font-medium">Online Status</span>
                </div>
                <button
                    onClick={() => setOnlineStatus(!onlineStatus)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${onlineStatus ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${onlineStatus ? 'translate-x-6' : 'translate-x-1'
                            }`}
                    />
                </button>
            </div>
        </div>
    )
}

export default CaptainDetails