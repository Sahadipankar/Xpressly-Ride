import React, { useContext, useState, useEffect, useMemo } from 'react'
import { CaptainDataContext } from '../Context/CaptainContext'

const CaptainDetails = ({ isOnline = true, setIsOnline, isConnected = true, locationError = null }) => {

    const { captain } = useContext(CaptainDataContext)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [sessionStats, setSessionStats] = useState(null)
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'earnings', message: 'Daily goal 80% complete!', time: '2 min ago', icon: 'ri-award-line' },
        { id: 2, type: 'info', message: 'Peak hours starting soon', time: '5 min ago', icon: 'ri-time-line' }
    ])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const dynamicStats = useMemo(() => {
        const baseEarnings = Math.floor(Math.random() * 500) + 600;
        const hoursOnline = (Math.random() * 6 + 2).toFixed(1);
        const totalRides = Math.floor(Math.random() * 15) + 8;
        const rating = (Math.random() * 0.5 + 4.5).toFixed(1);
        const completionRate = Math.floor(Math.random() * 5) + 95;

        return {
            todayEarnings: baseEarnings,
            weeklyEarnings: baseEarnings * 6 + Math.floor(Math.random() * 1000),
            monthlyEarnings: baseEarnings * 25 + Math.floor(Math.random() * 5000),
            hoursOnline: parseFloat(hoursOnline),
            totalDistance: Math.floor(Math.random() * 100) + 80,
            totalRides: totalRides,
            rating: parseFloat(rating),
            totalTrips: Math.floor(Math.random() * 200) + 150,
            completionRate: completionRate,
            avgTripEarnings: Math.floor(baseEarnings / totalRides),
            fuelSavings: Math.floor(Math.random() * 200) + 100,
            carbonOffset: (Math.random() * 15 + 10).toFixed(1)
        }
    }, [])

    // Set stats on component mount
    useEffect(() => {
        if (!sessionStats) {
            setSessionStats(dynamicStats)
        }
    }, [dynamicStats, sessionStats])

    if (!sessionStats) {
        return (
            <div className="flex justify-center items-center h-32" role="status" aria-label="Loading captain statistics">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    // Handle potential missing captain data
    const captainName = captain?.fullname ?
        `${captain.fullname.firstname} ${captain.fullname.lastname}` :
        'Captain'

    const vehicleInfo = captain?.vehicle ?
        `${captain.vehicle.vehicleType} • ${captain.vehicle.plate}` :
        'Vehicle Info Not Available'

    return (
        <div className="space-y-6">
            {/* Connection Status Alert */}
            {(!isConnected || locationError) && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <div className="flex items-center">
                        <i className="ri-error-warning-line text-yellow-600 mr-2"></i>
                        <div>
                            <h4 className="text-sm font-medium text-yellow-800">
                                {!isConnected ? 'Connection Issue' : 'Location Error'}
                            </h4>
                            <p className="text-sm text-yellow-700">
                                {!isConnected ? 'Reconnecting to server...' : locationError}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Captain Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                className='h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-4 border-white shadow-lg'
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKX2y-92Lgl0fEgjNpgWZhDcDZNz9J1jkrg&s"
                                alt={`Profile picture of ${captainName}`}
                            />
                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-white ${isOnline && isConnected ? 'bg-green-400' : 'bg-red-400'} flex items-center justify-center`}>
                                <i className={`text-xs text-white ${isOnline && isConnected ? 'ri-check-line' : 'ri-close-line'}`}></i>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold capitalize">
                                {captainName}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1 text-yellow-300">
                                    <i className="ri-star-fill" aria-label="Rating"></i>
                                    {sessionStats?.rating}
                                </span>
                                <span className="text-blue-200">•</span>
                                <span className="text-sm opacity-90 capitalize">
                                    {captain?.vehicle?.vehicleType || 'Vehicle'}
                                </span>
                            </div>
                            <p className="text-sm opacity-75 mt-1 address-text">
                                {vehicleInfo}
                            </p>

                            {/* Time Display */}
                            <div className="flex items-center mt-2">
                                {/* Desktop Time */}
                                <div className="hidden md:flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30 shadow-sm">
                                    <div className="text-sm font-bold text-white">
                                        {currentTime.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </div>
                                </div>

                                {/* Mobile Time */}
                                <div className="md:hidden flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30 shadow-sm">
                                    <i className="ri-time-line text-white text-xs"></i>
                                    <span className="text-xs font-medium text-white">
                                        {currentTime.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-3xl md:text-4xl font-bold">₹{sessionStats?.todayEarnings}</h2>
                        <p className="text-sm opacity-80">Today's Earnings</p>
                        <p className="text-xs opacity-60 mt-1">₹{sessionStats?.weeklyEarnings} this week</p>
                    </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex gap-3">
                    <button
                        className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg py-2 px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Open navigation"
                    >
                        <i className="ri-route-line"></i>
                        Navigation
                    </button>
                    <button
                        className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg py-2 px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Contact support"
                    >
                        <i className="ri-customer-service-line"></i>
                        Support
                    </button>
                    <button
                        className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg py-2 px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="View ride history"
                    >
                        <i className="ri-history-line"></i>
                        History
                    </button>
                </div>
            </div>

            {/* Real-time Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                        <i className="text-2xl ri-timer-2-line text-blue-600"></i>
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">ONLINE</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">{sessionStats?.hoursOnline}h</h4>
                    <p className="text-xs text-gray-600">Hours Today</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                        <i className="text-2xl ri-taxi-line text-green-600"></i>
                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">TRIPS</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">{sessionStats?.totalRides}</h4>
                    <p className="text-xs text-gray-600">Completed</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                        <i className="text-2xl ri-roadster-line text-orange-600"></i>
                        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">DISTANCE</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">{sessionStats?.totalDistance}km</h4>
                    <p className="text-xs text-gray-600">Traveled</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                        <i className="text-2xl ri-money-dollar-circle-line text-purple-600"></i>
                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">AVG</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">₹{sessionStats?.avgTripEarnings}</h4>
                    <p className="text-xs text-gray-600">Per Trip</p>
                </div>
            </div>

            {/* Enhanced Performance Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Weekly Performance */}
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h5 className="font-semibold text-gray-800">Weekly Overview</h5>
                            <p className="text-xs text-gray-500">Performance metrics</p>
                        </div>
                        <i className="ri-bar-chart-2-line text-xl text-blue-500"></i>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Trips</span>
                            <span className="font-bold text-blue-600">{sessionStats?.totalTrips}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Completion Rate</span>
                            <span className="font-bold text-green-600">{sessionStats?.completionRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Weekly Earnings</span>
                            <span className="font-bold text-purple-600">₹{sessionStats?.monthlyEarnings}</span>
                        </div>
                    </div>
                </div>

                {/* Environmental Impact */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h5 className="font-semibold text-gray-800">Eco Impact</h5>
                            <p className="text-xs text-gray-500">Your contribution</p>
                        </div>
                        <i className="ri-leaf-line text-xl text-green-500"></i>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Fuel Saved</span>
                            <span className="font-bold text-green-600">₹{sessionStats?.fuelSavings}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">CO₂ Offset</span>
                            <span className="font-bold text-emerald-600">{sessionStats?.carbonOffset}kg</span>
                        </div>
                        <div className="bg-green-100 rounded-lg p-2">
                            <p className="text-xs text-green-700 text-center font-medium">🌱 You're making a difference!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Daily Goal Progress */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h5 className="font-semibold text-gray-800">Daily Goal Progress</h5>
                        <p className="text-xs text-gray-500">₹{sessionStats?.todayEarnings} of ₹1000 target</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-indigo-600">{Math.floor((sessionStats?.todayEarnings / 1000) * 100)}%</span>
                        <p className="text-xs text-gray-500">Complete</p>
                    </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min((sessionStats?.todayEarnings / 1000) * 100, 100)}%` }}
                    >
                        <div className="h-full bg-white/30 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                    <span>₹0</span>
                    <span>₹500</span>
                    <span>₹1000</span>
                </div>
            </div>

            {/* Notifications */}
            {notifications.length > 0 && (
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold text-gray-800">Recent Updates</h5>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View All</button>
                    </div>
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <div key={notification.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notification.type === 'earnings' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    <i className={`${notification.icon} text-sm`}></i>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                                    <p className="text-xs text-gray-500">{notification.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Online Status Control */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isOnline && isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <i className={`text-xl ${isOnline && isConnected ? 'ri-signal-tower-line text-green-600' : 'ri-signal-tower-fill text-gray-400'}`}></i>
                        </div>
                        <div>
                            <h6 className="font-medium text-gray-800">Availability Status</h6>
                            <p className="text-sm text-gray-600">
                                {isOnline && isConnected ? 'Ready to accept rides' :
                                    !isConnected ? 'Connection lost' : 'Currently offline'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOnline && setIsOnline(!isOnline)}
                        disabled={!isConnected}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${isOnline && isConnected ? 'bg-green-600 focus:ring-green-500' : 'bg-gray-300 focus:ring-gray-500'
                            }`}
                        aria-label={`${isOnline ? 'Go offline' : 'Go online'}`}
                    >
                        <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${isOnline && isConnected ? 'translate-x-7' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
                {isOnline && isConnected && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2">
                            <i className="ri-information-line text-green-600"></i>
                            <span className="text-sm text-green-800">You're visible to nearby passengers</span>
                        </div>
                    </div>
                )}
                {!isConnected && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2">
                            <i className="ri-wifi-off-line text-red-600"></i>
                            <span className="text-sm text-red-800">Connection required to go online</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CaptainDetails