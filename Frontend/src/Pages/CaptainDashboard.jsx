import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'

import { useEffect, useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { CaptainDataContext } from '../Context/CaptainContext'
import axios from 'axios'


const CaptainDashboard = () => {

    const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

    const ridePopUpPanelRef = useRef(null)
    const confirmRidePopUpPanelRef = useRef(null)
    const [ride, setRide] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

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
        <div className='h-screen'>
            {/* Header with Logo and Logout */}
            <div className="fixed p-4 md:p-6 top-0 flex items-center justify-between w-screen bg-white/90 backdrop-blur-sm shadow-sm z-20">
                <img className='w-12 md:w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
                <Link
                    to='/captain/logout'
                    className="bg-black text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                    <i className="ri-logout-box-r-line"></i>
                    <span className="hidden sm:inline">Logout</span>
                </Link>
            </div>

            <div className="h-3/5 pt-16 md:pt-20">
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Live Map" />
            </div>

            <div className="h-2/5 p-4 md:p-6">
                <CaptainDetails />
            </div>

            <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-t-3xl shadow-2xl'>
                <RidePopUp
                    ride={ride}
                    setRidePopUpPanel={setRidePopUpPanel}
                    setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                    confirmRide={confirmRide}
                />
            </div>

            <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-t-3xl shadow-2xl'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                    setRidePopUpPanel={setRidePopUpPanel}
                />
            </div>

        </div>
    )
}

export default CaptainDashboard