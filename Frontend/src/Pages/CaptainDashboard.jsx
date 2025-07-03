/**
 * CaptainDashboard Component
 * 
 * Main dashboard interface for captain/driver operations in Xpressly.
 * Manages real-time location tracking, ride requests, status updates,
 * and provides comprehensive captain tools and information display.
 */

import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import LiveTracking from '../Components/LiveTracking'
import XpresslyLogo from '../Components/XpresslyLogo'

import { useEffect, useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { CaptainDataContext } from '../Context/CaptainContext'
import axios from 'axios'


const CaptainDashboard = () => {
    const navigate = useNavigate() // Navigation hook for route management

    // State management for dashboard functionality
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false); // Controls ride request popup
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false); // Controls ride confirmation popup
    const [isOnline, setIsOnline] = useState(true); // Captain online/offline status
    const [currentTime, setCurrentTime] = useState(new Date()); // Real-time clock display
    const [refreshing, setRefreshing] = useState(false); // Dashboard refresh state

    // Refs for popup panel animations
    const ridePopUpPanelRef = useRef(null)
    const confirmRidePopUpPanelRef = useRef(null)
    const [ride, setRide] = useState(null) // Current ride request data

    // Context hooks for global state access
    const { socket } = useContext(SocketContext) // Real-time communication
    const { captain } = useContext(CaptainDataContext) // Captain profile data

    /**
     * Initialize real-time clock update
     * Updates dashboard time display every second
     */
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer) // Cleanup on unmount
    }, [])

    /**
     * Handle dashboard refresh with loading animation
     * Provides visual feedback during page reload
     */
    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
            window.location.reload()
        }, 1000)
    }

    /**
     * Handle captain logout
     * Clears authentication token and redirects to login
     */
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/captain-login')
    }

    /**
     * Initialize socket connection and location tracking
     * Sets up real-time communication and GPS updates
     */
    useEffect(() => {
        // Join captain to socket room for targeted messaging
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })

        /**
         * Location update function
         * Sends captain's current GPS coordinates to server
         */
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

        // Update location every 10 seconds for real-time tracking
        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation() // Initial location update

        return () => clearInterval(locationInterval) // Cleanup on unmount
    }, [])

    /**
     * Listen for new ride requests
     * Handles incoming ride notifications from users
     */
    socket.on('new-ride', (data) => {

        setRide(data) // Store ride request data
        setRidePopUpPanel(true) // Show ride request popup
    })


    /**
     * Confirm ride acceptance
     * Sends confirmation to backend and updates UI state
     */
    async function confirmRide() {

        // Send ride confirmation to backend API
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        // Update UI state after successful confirmation
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
                            <XpresslyLogo className="w-10 h-10 md:w-12 md:h-12" />
                            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
                                    Xpressly
                                </h1>
                                <span className="hidden sm:inline text-gray-400">•</span>
                                <span className="hidden sm:inline text-sm font-medium text-gray-600">Captain</span>
                            </div>
                        </div>
                    </div>                    {/* Captain Info (Mobile) */}
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
                    <div className="relative h-79 md:h-96 lg:h-full">
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