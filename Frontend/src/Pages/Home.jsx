import React, { useRef } from 'react'
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel';

const Home = () => {

    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const vehilcePanelRef = useRef(null)
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault();
    }

    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1,
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0,
            })
        }
    }, [panelOpen]);


    useGSAP(() => {
        if (vehiclePanelOpen) {
            gsap.to(vehilcePanelRef.current, {
                transform: 'translateY(0)',
            })
        }
        else {
            gsap.to(vehilcePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanelOpen]);


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

                <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel
                        setPanelOpen={setPanelOpen}
                        setVehiclePanelOpen={setVehiclePanelOpen}
                    />
                </div>

            </div>

            <div ref={vehilcePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-10'>

                <h5 className='p-1 text-center w-[93%] absolute top-0'
                    onClick={() => {
                        setVehiclePanelOpen(false);
                    }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

                <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>


                <div className='flex border-2 border-gray-100 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
                    <img className='h-16' src="https://www.svgrepo.com/show/408292/car-white.svg" alt="" />
                    <div className='w-1/2'>
                        <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                        <h5 className='font-medium text-sm'>2 mins away</h5>
                        <p className='font-normal text-gray-600 text-xs'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹200.75</h2>
                </div>


                <div className='flex border-2 border-gray-100 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
                    <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                    <div className='w-1/2'>
                        <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                        <h5 className='font-medium text-sm'>3 mins away</h5>
                        <p className='font-normal text-gray-600 text-xs'>Affordable motorcycle rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹120.30</h2>
                </div>


                <div className='flex border-2 border-gray-100 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
                    <img className='h-9' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
                    <div className='w-1/2'>
                        <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                        <h5 className='font-medium text-sm'>4 mins away</h5>
                        <p className='font-normal text-gray-600 text-xs'>Affordable auto rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹160.84</h2>
                </div>
            </div>
        </div>
    )
}

export default Home