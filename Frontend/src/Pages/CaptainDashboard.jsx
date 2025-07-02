import React, { useRef, useState, useEffect, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import { SocketContext } from '../Context/SocketContext'
import { CaptainDataContext } from '../Context/CaptainContext'
import axios from 'axios'


const CaptainDashboard = () => {
    const navigate = useNavigate()
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [refreshing, setRefreshing] = useState(false);
    const [locationError, setLocationError] = useState(null);
    const [isConnected, setIsConnected] = useState(false); // Start as false until socket connects

    const ridePopUpPanelRef = useRef(null)
    const confirmRidePopUpPanelRef = useRef(null)
    const [ride, setRide] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000)
        return () => clearInterval(timer)
    }, [])

    // Handle refresh with better error handling
    const handleRefresh = useCallback(() => {
        setRefreshing(true)
        try {
            // Check if captain data is available before refreshing
            if (captain?._id) {
                setTimeout(() => {
                    setRefreshing(false)
                    window.location.reload()
                }, 1000)
            } else {
                setRefreshing(false)
                navigate('/captain-login')
            }
        } catch (error) {
            console.error('Refresh error:', error)
            setRefreshing(false)
        }
    }, [captain, navigate])

    // Handle logout with proper cleanup
    const handleLogout = useCallback(() => {
        try {
            // Disconnect socket before logout
            if (socket) {
                socket.disconnect()
            }
            localStorage.removeItem('token')
            navigate('/captain-login')
        } catch (error) {
            console.error('Logout error:', error)
            navigate('/captain-login')
        }
    }, [socket, navigate])

    useEffect(() => {
        if (!captain?._id) {
            return
        }

        if (!socket) {
            setIsConnected(false)
            setLocationError('Connecting to server...')
            return
        }

        // Initialize connection state based on socket status
        setIsConnected(socket.connected)

        if (socket.connected) {
            setLocationError(null)
        }

        // Socket connection monitoring
        const handleConnect = () => {
            setIsConnected(true)
            setLocationError(null)
            console.log('Captain connected to socket')
        }

        const handleDisconnect = () => {
            setIsConnected(false)
            setLocationError('Connection lost. Trying to reconnect...')
            console.log('Captain disconnected from socket')
        }

        socket.on('connect', handleConnect)
        socket.on('disconnect', handleDisconnect)

        // Join captain room
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        setLocationError(null)
                        if (socket.connected) {
                            socket.emit('update-location-captain', {
                                userId: captain._id,
                                location: {
                                    ltd: position.coords.latitude,
                                    lng: position.coords.longitude
                                }
                            })
                        }
                    },
                    error => {
                        console.error('Geolocation error:', error)
                        setLocationError('Location access denied. Please enable location services.')
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 30000
                    }
                )
            } else {
                setLocationError('Geolocation is not supported by this browser.')
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        return () => {
            clearInterval(locationInterval)
            socket.off('connect', handleConnect)
            socket.off('disconnect', handleDisconnect)
        }
    }, [captain?._id, socket])

    // Socket event listeners
    useEffect(() => {
        if (!socket) return

        const handleNewRide = (data) => {
            setRide(data)
            setRidePopUpPanel(true)
        }

        socket.on('new-ride', handleNewRide)

        return () => {
            socket.off('new-ride', handleNewRide)
        }
    }, [socket])

    async function confirmRide() {
        try {
            if (!ride?._id || !captain?._id) {
                throw new Error('Missing ride or captain data')
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
                rideId: ride._id,
                captainId: captain._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.status === 200) {
                setRidePopUpPanel(false)
                setConfirmRidePopUpPanel(true)
            }
        } catch (error) {
            console.error('Error confirming ride:', error)
            // Show error feedback to user
            alert('Failed to confirm ride. Please try again.')
        }
    }


    useGSAP(() => {
        if (ridePopUpPanel) {
            gsap.to(ridePopUpPanelRef.current, {
                transform: 'translateY(0)',
            })
        }
        else {
            gsap.to(ridePopUpPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopUpPanel]);


    useGSAP(() => {
        if (confirmRidePopUpPanel) {
            gsap.to(confirmRidePopUpPanelRef.current, {
                transform: 'translateY(0)',
            })
        }
        else {
            gsap.to(confirmRidePopUpPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopUpPanel]);


    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50'>
            {/* Enhanced Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                className='w-10 h-10 md:w-12 md:h-12 object-contain'
                                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                                alt="Uber Logo"
                            />
                            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${isOnline && isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}
                                title={isOnline && isConnected ? 'Online and Connected' : 'Offline or Disconnected'}></div>
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-lg font-bold text-gray-800">Captain Dashboard</h1>
                            <p className="text-xs text-gray-600">
                                {currentTime.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Captain Info (Mobile) */}
                    <div className="flex md:hidden items-center gap-2">
                        <div className="text-right">
                            <h3 className="text-sm font-semibold capitalize">
                                {captain?.fullname?.firstname || 'Captain'}
                            </h3>
                            <p className="text-xs text-gray-600 flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${isOnline && isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                {isOnline && isConnected ? 'Online' : 'Offline'}
                            </p>
                        </div>
                        <img
                            className='w-8 h-8 rounded-full object-cover border-2 border-green-400'
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKX2y-92Lgl0fEgjNpgWZhDcDZNz9J1jkrg&s"
                            alt="Captain Avatar"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        {/* Online/Offline Toggle */}
                        <button
                            onClick={() => setIsOnline(!isOnline)}
                            className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isOnline
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                                }`}
                            aria-label={`Set status to ${isOnline ? 'offline' : 'online'}`}
                        >
                            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
                            {isOnline ? 'Online' : 'Offline'}
                        </button>

                        {/* Refresh Button */}
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-all duration-200 disabled:opacity-50"
                            aria-label="Refresh dashboard"
                        >
                            <i className={`ri-refresh-line text-lg ${refreshing ? 'animate-spin' : ''}`}></i>
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-all duration-200"
                            aria-label="Logout"
                        >
                            <i className="ri-logout-box-r-line text-lg"></i>
                        </button>
                    </div>
                </div>

                {/* Error Notifications */}
                {locationError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 mx-4 mb-2">
                        <div className="flex items-center">
                            <i className="ri-error-warning-line text-red-500 mr-2"></i>
                            <p className="text-sm text-red-700">{locationError}</p>
                        </div>
                    </div>
                )}

                {!isConnected && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mx-4 mb-2">
                        <div className="flex items-center">
                            <i className="ri-wifi-off-line text-yellow-500 mr-2"></i>
                            <p className="text-sm text-yellow-700">Connection lost. Trying to reconnect...</p>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
                {/* Map Section */}
                <div className="flex-1 relative">
                    <div className="relative h-64 md:h-96 lg:h-full">
                        <img
                            className='h-full w-full object-cover'
                            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                            alt="Live tracking map showing captain location and nearby passengers"
                        />

                        {/* Map Overlay - Status Indicator */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${isOnline && isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                                <span className="text-sm font-medium">
                                    {isOnline && isConnected ? 'Available for rides' : 'Currently offline'}
                                </span>
                            </div>
                            {locationError && (
                                <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                                    <i className="ri-error-warning-line"></i>
                                    Location services needed
                                </div>
                            )}
                        </div>

                        {/* Map Controls */}
                        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                            <button
                                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Zoom in"
                            >
                                <i className="ri-add-line text-lg"></i>
                            </button>
                            <button
                                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Zoom out"
                            >
                                <i className="ri-subtract-line text-lg"></i>
                            </button>
                            <button
                                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Center on current location"
                            >
                                <i className="ri-navigation-line text-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Captain Details Panel */}
                <div className="lg:w-96 bg-white lg:border-l border-gray-200 lg:shadow-xl">
                    <div className="p-4 lg:p-6 lg:h-full lg:overflow-y-auto panel-scroll">
                        <CaptainDetails
                            isOnline={isOnline}
                            setIsOnline={setIsOnline}
                            isConnected={isConnected}
                            locationError={locationError}
                        />
                    </div>
                </div>
            </main>

            {/* Ride Request Popup */}
            <div ref={ridePopUpPanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white rounded-t-3xl shadow-2xl panel-container'>
                <div className="px-4 py-6 panel-scroll">
                    <RidePopUp
                        ride={ride}
                        setRidePopUpPanel={setRidePopUpPanel}
                        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                        confirmRide={confirmRide}
                    />
                </div>
            </div>

            {/* Confirm Ride Popup */}
            <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-20 bottom-0 translate-y-full bg-white panel-container'>
                <div className="px-4 py-6 h-full overflow-y-auto panel-scroll safe-area-bottom">
                    <ConfirmRidePopUp
                        ride={ride}
                        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                        setRidePopUpPanel={setRidePopUpPanel}
                    />
                </div>
            </div>
        </div>
    )
}

export default CaptainDashboard