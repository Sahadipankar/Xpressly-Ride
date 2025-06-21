import React, { useRef } from 'react'
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmRide from '../Components/ConfirmRide';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForDriver from '../Components/WaitingForDriver';

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


    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-17 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />

            <div className='h-screen w-screen'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>

            <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] bg-white p-6 relative'>
                    <h5 ref={panelCloseRef}
                        onClick={() => setPanelOpen(false)}
                        className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5 >
                    <h4 className='text-2xl font-semibold'>Find a Trip</h4>

                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>

                        <div className="line absolute h-16 w-1 top-[45%] bg-gray-700 left-10 rounded-full"></div>
                        <input
                            onClick={() => setPanelOpen(true)}
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            type="text"
                            placeholder="Add a pick-up location"
                        />
                        <input
                            onClick={() => setPanelOpen(true)}
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            type="text"
                            placeholder="Enter your destination"
                        />
                    </form>
                </div>

                <div ref={panelOpenRef} className='bg-white h-0'>
                    <LocationSearchPanel
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                    />
                </div>

            </div>


            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <VehiclePanel
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>


            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <ConfirmRide
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>


            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForDriver setVehicleFound={setVehicleFound}/>
            </div>


            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
                <WaitingForDriver waitingForDriver={waitingForDriver}/>
            </div>

        </div>
    )
}

export default Home