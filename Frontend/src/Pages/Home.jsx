import React, { useEffect, useRef, useState, useContext } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmRide from '../Components/ConfirmRide';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForDriver from '../Components/WaitingForDriver';
import XpresslyLogo from '../Components/XpresslyLogo';
import axios from 'axios';
import { SocketContext } from '../Context/SocketContext';
import { UserDataContext } from '../Context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import LiveTracking from '../Components/LiveTracking';




const Home = () => {

    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);

    const panelOpenRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)

    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)


    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)
    const [gettingCurrentLocation, setGettingCurrentLocation] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())

    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    // Update clock every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])


    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })

        // User location tracking
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-user', {
                        userId: user._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                }, (error) => {
                    // Error getting location
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        return () => clearInterval(locationInterval)
    }, [user, socket])


    socket.on('ride-confirmed', ride => {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } })
    })



    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleCurrentLocationAsPickup = async () => {
        setGettingCurrentLocation(true)

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords

                        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-address`, {
                            params: { lat: latitude, lng: longitude },
                            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                        })

                        let address = response.data.results?.[0]?.formatted_address ||
                            response.data.display_name ||
                            response.data.address ||
                            `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`

                        setPickup(address)

                    } catch (error) {
                        const { latitude, longitude } = position.coords
                        const fallbackAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                        setPickup(fallbackAddress)
                    } finally {
                        setGettingCurrentLocation(false)
                    }
                },
                (error) => {
                    alert('Unable to get your location. Please allow location access.')
                    setGettingCurrentLocation(false)
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
            )
        } else {
            alert('Geolocation is not supported by this browser.')
            setGettingCurrentLocation(false)
        }
    }



    const submitHandler = (e) => {
        e.preventDefault();
    }

    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelOpenRef.current, {
                height: '70%',
                padding: 24
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1,
            })
        } else {
            gsap.to(panelOpenRef.current, {
                height: '0%',
                padding: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0,
            })
        }
    }, [panelOpen]);


    useGSAP(() => {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)',
            })
        }
        else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel]);


    useGSAP(() => {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)',
            })
        }
        else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel]);


    useGSAP(() => {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)',
            })
        }
        else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound]);


    useGSAP(() => {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)',
            })
        }
        else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver]);


    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setFare(response.data)
    }


    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    // Enhanced refresh function - Complete page refresh like captain dashboard
    const refreshSession = async () => {
        setRefreshing(true)

        try {
            // Clear all state and local storage data
            setPickup('')
            setDestination('')
            setPickupSuggestions([])
            setDestinationSuggestions([])
            setActiveField(null)
            setPanelOpen(false)
            setVehiclePanel(false)
            setConfirmRidePanel(false)
            setVehicleFound(false)
            setWaitingForDriver(false)
            setFare({})
            setVehicleType(null)
            setRide(null)
            setGettingCurrentLocation(false)

            // Clear browser cache and storage
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => {
                        caches.delete(name)
                    })
                })
            }

            // Clear session storage
            sessionStorage.clear()

            // Show refreshing animation for better UX
            await new Promise(resolve => setTimeout(resolve, 800))

            // Force complete page reload like captain dashboard
            window.location.reload()

        } catch (error) {
            console.error('Refresh failed:', error)
            // Fallback: still reload the page
            window.location.reload()
        } finally {
            setRefreshing(false)
        }
    }

    return (
        <div className='h-screen relative overflow-hidden prevent-zoom'>
            {/* Enhanced Header with Logo, User Greeting, Clock and Logout */}
            <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 sm:p-4 md:p-6 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                    <XpresslyLogo className="w-8 sm:w-10 md:w-12 flex-shrink-0" />
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div>
                            <h1 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
                                Xpressly
                            </h1>
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full overflow-hidden shadow-md flex-shrink-0 border-2 border-gray-200">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAjn0EsJc3E-9hgTU6GxsMuCioyJbeeRK4A&s"
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM5Q0E3RjQiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0idHJhbnNmb3JtOiB0cmFuc2xhdGUoOHB4LCA4cHgpOyI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMSAyMlYyMEMxOSAxNi45IDE2IDE1IDEyIDE1QzggMTUgNSAxNi45IDMgMjBWMjJIMjFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+';
                                }}
                            />
                        </div>
                        <div className="block min-w-0 flex-1">
                            <p className="text-xs text-gray-500 leading-tight">Hello,</p>
                            <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 leading-tight truncate">
                                {user?.fullname?.firstname ?
                                    `${user.fullname.firstname} ${user.fullname.lastname || ''}`.trim() :
                                    user?.email ? user.email.split('@')[0] : 'User'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons section */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    {/* Enhanced Refresh Button */}
                    <button
                        onClick={refreshSession}
                        disabled={refreshing}
                        className={`relative overflow-hidden group px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed ${refreshing
                            ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white animate-pulse'
                            : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white'
                            }`}
                        title={refreshing ? "Refreshing entire page..." : "Refresh Complete Page"}
                    >
                        {/* Animated background shimmer */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform transition-transform duration-1000 ${refreshing ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'}`}></div>

                        {/* Icon with enhanced animations */}
                        <div className="relative z-10 flex items-center gap-2">
                            <i className={`ri-refresh-line text-base sm:text-lg transition-all duration-500 ${refreshing ? 'animate-spin scale-110' : 'group-hover:rotate-180'}`}></i>
                            <span className="hidden sm:inline font-medium">
                                {refreshing ? 'Refreshing...' : 'Refresh'}
                            </span>
                        </div>

                        {/* Enhanced loading animation */}
                        {refreshing && (
                            <div className="hidden sm:flex items-center gap-1 ml-1">
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                            </div>
                        )}

                        {/* Mobile loading indicator */}
                        {refreshing && (
                            <div className="sm:hidden absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
                        )}
                    </button>

                    <Link
                        to='/user/logout'
                        className="relative overflow-hidden group px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-black text-white"
                        title="Logout from your account"
                    >
                        {/* Animated background shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-transform duration-1000 -translate-x-full group-hover:translate-x-full"></div>

                        {/* Icon with enhanced animations */}
                        <div className="relative z-10 flex items-center gap-2">
                            <i className="ri-logout-box-r-line text-base sm:text-lg transition-all duration-500 group-hover:rotate-12"></i>
                            <span className="hidden sm:inline font-medium">Logout</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Enhanced Map Section with Short Height */}
            <div className='h-[51vh] sm:h-[45vh] md:h-[50vh] w-screen pt-17 sm:pt-14 md:pt-16 lg:pt-20 relative'>
                <LiveTracking />

                {/* Map Overlay Features - Hidden when panel is open */}
                <div className={`absolute top-16 sm:top-18 md:top-20 lg:top-24 right-4 z-10 transition-opacity duration-300 ${panelOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    {/* Weather Widget */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 mt-3 shadow-lg border border-white/20">
                        <div className="flex items-center gap-2">
                            <i className="ri-sun-line text-yellow-500 text-lg"></i>
                            <div>
                                <p className="text-xs font-medium text-gray-800">28°C</p>
                                <p className="text-xs text-gray-600">Clear</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div className='flex flex-col justify-end h-screen absolute top-0 w-full pt-12 sm:pt-14 md:pt-16 lg:pt-20'>
                {/* Quick Actions Bar - Hidden when panel is open */}
                <div className={`px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200 transition-opacity duration-300 ${panelOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex justify-between items-center max-w-6xl mx-auto">
                        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                            <button className="flex flex-col items-center gap-1 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap">
                                <i className="ri-hospital-line text-red-500 text-lg"></i>
                                <span className="text-xs font-medium text-gray-700">Hospital</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap">
                                <i className="ri-plane-line text-blue-500 text-lg"></i>
                                <span className="text-xs font-medium text-gray-700">Airport</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap">
                                <i className="ri-shopping-bag-line text-green-500 text-lg"></i>
                                <span className="text-xs font-medium text-gray-700">Mall</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap">
                                <i className="ri-train-line text-purple-500 text-lg"></i>
                                <span className="text-xs font-medium text-gray-700">Station</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap">
                                <i className="ri-building-line text-orange-500 text-lg"></i>
                                <span className="text-xs font-medium text-gray-700">Office</span>
                            </button>
                        </div>
                        <button className="ml-3 flex-shrink-0 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                            <i className="ri-more-line text-gray-600 text-lg"></i>
                        </button>
                    </div>
                </div>

                {/* Enhanced Ride Booking Section */}
                <div className='bg-white p-3 sm:p-4 md:p-6 relative rounded-t-3xl shadow-2xl border-t border-gray-100'>
                    <h5 ref={panelCloseRef}
                        onClick={() => setPanelOpen(false)}
                        className='absolute opacity-0 right-5 sm:right-4 md:right-6 top-3 sm:top-4 md:top-6 text-xl sm:text-2xl cursor-pointer hover:text-gray-600 transition-colors'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>

                    {/* Header with Live Data */}
                    <div className="mb-4">
                        <h4 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800'>Find a Trip</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Choose your destination and get started</p>
                    </div>

                    {/* Recent Destinations */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <h5 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <i className="ri-time-line text-gray-500"></i>
                                Recent Destinations
                            </h5>

                            {/* Time Display */}
                            <div className="flex items-center">
                                {/* Desktop Time */}
                                <div className="hidden md:flex items-center bg-gray-50 px-2 py-1 rounded-lg border shadow-sm">
                                    <div className="text-sm font-bold text-gray-800">
                                        {currentTime.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </div>
                                </div>

                                {/* Mobile Time */}
                                <div className="md:hidden flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border shadow-sm">
                                    <i className="ri-time-line text-gray-600 text-xs"></i>
                                    <span className="text-xs font-medium text-gray-800">
                                        {currentTime.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all whitespace-nowrap">
                                <i className="ri-home-line text-blue-500 text-sm"></i>
                                <span className="text-xs font-medium text-gray-700">Home</span>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all whitespace-nowrap">
                                <i className="ri-building-line text-orange-500 text-sm"></i>
                                <span className="text-xs font-medium text-gray-700">Work</span>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all whitespace-nowrap">
                                <i className="ri-building-4-line text-purple-500 text-sm"></i>
                                <span className="text-xs font-medium text-gray-700">Office</span>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all whitespace-nowrap">
                                <i className="ri-shopping-cart-line text-green-500 text-sm"></i>
                                <span className="text-xs font-medium text-gray-700">Mall</span>
                            </button>
                        </div>
                    </div>

                    <form className='relative' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        {/* Enhanced Pickup Input */}
                        <div className="relative mt-3 sm:mt-4 md:mt-5">
                            <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10">
                                <i className="ri-map-pin-user-fill text-base sm:text-lg text-green-600"></i>
                            </div>
                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('pickup')
                                }}
                                value={pickup}
                                onChange={handlePickupChange}
                                className='bg-gradient-to-r from-green-50 to-green-100 pl-10 sm:pl-12 pr-16 sm:pr-20 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg rounded-2xl w-full border-2 border-green-200 focus:outline-none focus:border-green-500 focus:from-white focus:to-white transition-all duration-300 shadow-sm hover:shadow-md'
                                type="text"
                                placeholder="Add a pick-up location"
                            />
                            {/* Enhanced Current Location Icon */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCurrentLocationAsPickup();
                                }}
                                className={`absolute right-12 sm:right-14 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer transition-all duration-300 ${gettingCurrentLocation
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-green-600 hover:text-green-700 hover:scale-110'
                                    }`}
                                title="Use my current location"
                            >
                                {gettingCurrentLocation ? (
                                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-green-600 border-t-transparent"></div>
                                ) : (
                                    <i className="ri-crosshair-line text-base sm:text-lg"></i>
                                )}
                            </div>
                            {pickup && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPickup('');
                                        setPickupSuggestions([]);
                                    }}
                                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full p-1"
                                >
                                    <i className="ri-close-line text-sm sm:text-base"></i>
                                </button>
                            )}
                        </div>

                        {/* Enhanced Destination Input */}
                        <div className="relative mt-3 sm:mt-4">
                            <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10">
                                <i className="ri-map-pin-fill text-base sm:text-lg text-red-600"></i>
                            </div>
                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('destination')
                                }}
                                value={destination}
                                onChange={handleDestinationChange}
                                className='bg-gradient-to-r from-red-50 to-red-100 pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg rounded-2xl w-full border-2 border-red-200 focus:outline-none focus:border-red-500 focus:from-white focus:to-white transition-all duration-300 shadow-sm hover:shadow-md'
                                type="text"
                                placeholder="Enter your destination"
                            />
                            {destination && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDestination('');
                                        setDestinationSuggestions([]);
                                    }}
                                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full p-1"
                                >
                                    <i className="ri-close-line text-sm sm:text-base"></i>
                                </button>
                            )}
                        </div>

                        {/* Route Options */}
                        {pickup && destination && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <i className="ri-route-line text-blue-600"></i>
                                        <span className="text-gray-700 font-medium">Route options available</span>
                                    </div>
                                    <span className="text-blue-600 font-semibold">3 routes</span>
                                </div>
                            </div>
                        )}
                    </form>
                    {/* Enhanced CTA Button */}
                    <button
                        onClick={findTrip}
                        disabled={!pickup || !destination}
                        className={`w-full py-4 sm:py-4.5 md:py-5 rounded-2xl mt-4 sm:mt-5 md:mt-6 font-bold hover:shadow-lg disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base md:text-lg flex items-center justify-center gap-3 ${pickup && destination
                            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 transform hover:scale-[1.02] shadow-lg'
                            : 'bg-gray-300 text-gray-500'
                            }`}>
                        {pickup && destination ? (
                            <>
                                <i className="ri-map-line text-lg"></i>
                                <span>Find Trip</span>
                                <i className="ri-arrow-right-line text-lg"></i>
                            </>
                        ) : (
                            <>
                                <i className="ri-map-pin-line text-lg"></i>
                                <span>Enter pickup and destination</span>
                            </>
                        )}
                    </button>
                </div>

                <div ref={panelOpenRef} className='bg-white h-0 rounded-t-3xl overflow-hidden max-h-[85vh] z-30 relative'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>

            </div>

            <div ref={vehiclePanelRef} className='fixed w-full z-40 bottom-0 translate-y-full bg-white px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 pt-8 sm:pt-10 md:pt-12 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>

            <div ref={confirmRidePanelRef} className='fixed w-full z-40 bottom-0 translate-y-full bg-white px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 pt-8 sm:pt-10 md:pt-12 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div ref={vehicleFoundRef} className='fixed w-full z-40 bottom-0 translate-y-full bg-white px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 pt-8 sm:pt-10 md:pt-12 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div ref={waitingForDriverRef} className='fixed w-full z-40 bottom-0 translate-y-full bg-white px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 pt-8 sm:pt-10 md:pt-12 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto'>
                <WaitingForDriver
                    waitingForDriver={waitingForDriver}
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                />
            </div>

        </div>
    )
}

export default Home