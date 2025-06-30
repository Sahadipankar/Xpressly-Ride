import React, { useEffect, useRef, useState, useContext } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmRide from '../Components/ConfirmRide';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForDriver from '../Components/WaitingForDriver';
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


    return (
        <div className='h-screen relative overflow-hidden'>
            {/* Enhanced Header with Logo, User Greeting, Clock and Logout */}
            <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 md:p-6 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <img className='w-10 md:w-12' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                            {user?.fullname?.firstname ? (
                                <span className="text-white text-sm md:text-base font-semibold">
                                    {user.fullname.firstname.charAt(0).toUpperCase()}
                                </span>
                            ) : user?.email ? (
                                <span className="text-white text-sm md:text-base font-semibold">
                                    {user.email.charAt(0).toUpperCase()}
                                </span>
                            ) : (
                                <i className="ri-user-fill text-white text-sm md:text-base"></i>
                            )}
                        </div>
                        <div className="block">
                            <p className="text-xs md:text-sm text-gray-500 leading-tight">Hello,</p>
                            <p className="text-sm md:text-base font-semibold text-gray-800 leading-tight">
                                {user?.fullname?.firstname ?
                                    `${user.fullname.firstname} ${user.fullname.lastname || ''}`.trim() :
                                    user?.email ? user.email.split('@')[0] : 'User'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Clock and Logout section */}
                <div className="flex items-center gap-3">
                    {/* Digital Clock - Desktop */}
                    <div className="hidden sm:flex flex-col items-center justify-center bg-gray-50 px-3 py-2 rounded-lg border shadow-sm">
                        <div className="text-lg md:text-xl font-bold text-gray-800 leading-tight">
                            {currentTime.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </div>
                        <div className="text-xs text-gray-500 leading-tight mt-0.5">
                            {currentTime.toLocaleDateString([], {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                    </div>

                    {/* Mobile Clock */}
                    <div className="sm:hidden flex items-center justify-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border shadow-sm">
                        <i className="ri-time-line text-gray-600 text-sm flex-shrink-0" style={{ lineHeight: '1' }}></i>
                        <span className="text-sm font-medium text-gray-800" style={{ lineHeight: '1' }}>
                            {currentTime.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </span>
                    </div>

                    <Link
                        to='/user/logout'
                        className="bg-black text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <i className="ri-logout-box-r-line"></i>
                        <span className="hidden sm:inline">Logout</span>
                    </Link>
                </div>
            </div>

            <div className='h-screen w-screen pt-16 md:pt-20'>
                <LiveTracking />
            </div>

            <div className='flex flex-col justify-end h-screen absolute top-0 w-full pt-16 md:pt-20'>
                <div className='h-[30%] bg-white p-4 md:p-6 relative rounded-t-3xl shadow-2xl'>
                    <h5 ref={panelCloseRef}
                        onClick={() => setPanelOpen(false)}
                        className='absolute opacity-0 right-4 md:right-6 top-4 md:top-6 text-2xl cursor-pointer hover:text-gray-600 transition-colors'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-xl md:text-2xl font-semibold mb-4'>Find a Trip</h4>

                    <form className='relative' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        {/* Pickup Input */}
                        <div className="relative mt-4 md:mt-5">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                <i className="ri-map-pin-user-fill text-lg text-green-600"></i>
                            </div>
                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('pickup')
                                }}
                                value={pickup}
                                onChange={handlePickupChange}
                                className='bg-gray-100 pl-12 pr-20 py-2 md:py-3 text-base md:text-lg rounded-xl w-full border-2 border-transparent focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-200'
                                type="text"
                                placeholder="Add a pick-up location"
                            />
                            {/* Current Location Icon */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCurrentLocationAsPickup();
                                }}
                                className={`absolute right-12 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer transition-all duration-300 ${gettingCurrentLocation
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-green-600 hover:text-green-700 hover:scale-110'
                                    }`}
                                title="Use my current location"
                            >
                                {gettingCurrentLocation ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent"></div>
                                ) : (
                                    <i className="ri-crosshair-line text-lg"></i>
                                )}
                            </div>
                            {pickup && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPickup('');
                                        setPickupSuggestions([]);
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <i className="ri-close-line text-lg"></i>
                                </button>
                            )}
                        </div>

                        {/* Destination Input */}
                        <div className="relative mt-3">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                <i className="ri-map-pin-fill text-lg text-red-600"></i>
                            </div>
                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('destination')
                                }}
                                value={destination}
                                onChange={handleDestinationChange}
                                className='bg-gray-100 pl-12 pr-12 py-2 md:py-3 text-base md:text-lg rounded-xl w-full border-2 border-transparent focus:outline-none focus:border-red-500 focus:bg-white transition-all duration-200'
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
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <i className="ri-close-line text-lg"></i>
                                </button>
                            )}
                        </div>
                    </form>
                    <button
                        onClick={findTrip}
                        disabled={!pickup || !destination}
                        className='bg-black text-white px-4 py-2 md:py-3 rounded-xl mt-3 md:mt-4 w-full font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 text-sm md:text-base'>
                        {pickup && destination ? 'Find Trip' : 'Enter pickup and destination'}
                    </button>
                </div>

                <div ref={panelOpenRef} className='bg-white h-0 rounded-t-3xl'>
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

            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-t-3xl shadow-2xl'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>

            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 rounded-t-3xl shadow-2xl'>
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

            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 rounded-t-3xl shadow-2xl'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 rounded-t-3xl shadow-2xl'>
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