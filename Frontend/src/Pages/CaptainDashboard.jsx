import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import LiveTracking from '../Components/LiveTracking'

import { useEffect, useContext } from 'react'
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

    // Handle refresh
    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
            window.location.reload()
        }, 1000)
    }

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/captain-login')
    }

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    }, [])

    socket.on('new-ride', (data) => {

        setRide(data)
        setRidePopUpPanel(true)
    })


    async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopUpPanel(false)
        setConfirmRidePopUpPanel(true)

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
                                alt="Xpressly Logo"
                            />
                            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
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
                                {captain?.fullname?.firstname}
                            </h3>
                            <p className="text-xs text-gray-600 flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                {isOnline ? 'Online' : 'Offline'}
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
                        >
                            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
                            {isOnline ? 'Online' : 'Offline'}
                        </button>

                        {/* Refresh Button */}
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-all duration-200 disabled:opacity-50"
                        >
                            <i className={`ri-refresh-line text-lg ${refreshing ? 'animate-spin' : ''}`}></i>
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-all duration-200"
                        >
                            <i className="ri-logout-box-r-line text-lg"></i>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
                {/* Map Section */}
                <div className="flex-1 relative">
                    <div className="relative h-85 md:h-96 lg:h-full">
                        <LiveTracking />
                    </div>
                </div>

                {/* Captain Details Panel */}
                <div className="lg:w-96 bg-white lg:border-l border-gray-200 lg:shadow-xl">
                    <div className="p-4 lg:p-6 lg:h-full lg:overflow-y-auto">
                        <CaptainDetails isOnline={isOnline} setIsOnline={setIsOnline} />
                    </div>
                </div>
            </main>

            {/* Ride Request Popup - Full Screen */}
            <div ref={ridePopUpPanelRef} className='fixed w-full h-screen z-20 bottom-0 translate-y-full bg-white'>
                <div className="px-4 py-6 h-full overflow-y-auto">
                    <RidePopUp
                        ride={ride}
                        setRidePopUpPanel={setRidePopUpPanel}
                        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                        confirmRide={confirmRide}
                    />
                </div>
            </div>

            {/* Confirm Ride Popup - Full Screen */}
            <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-20 bottom-0 translate-y-full bg-white'>
                <div className="px-4 py-6 h-full overflow-y-auto">
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