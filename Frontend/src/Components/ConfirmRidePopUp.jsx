import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {

    const [otp, setOtp] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setRidePopUpPanel(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-5'>Confirm this Ride to Start</h3>

            <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAjn0EsJc3E-9hgTU6GxsMuCioyJbeeRK4A&s" alt="" />
                    <h4 className='text-lg font-medium'>Sneha Mondol</h4>
                </div>
                <h5 className="text-xl font-semibold">2.2 km</h5>
            </div>

            <div className='flex flex-col gap-4 justify-between items-center'>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-gray-400 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>1, Shakespeare Sarani</h3>
                            <p className='text-sm  text-gray-600'>Park Street Area, Kolkata, West Bengal 700071</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-gray-400 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>33, Ballygunge Place </h3>
                            <p className='text-sm  text-gray-600'>Ballygunge, Kolkata, West Bengal 700019</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-cash-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹185.48</h3>
                            <p className='text-sm  text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 w-full">
                    <form onSubmit={(e) => {
                        submitHandler(e);
                    }}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="number" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3 focus:outline-none focus:ring-2 focus:ring-yellow-400' placeholder='Enter OTP' />

                        <Link to='/captain-riding' className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</Link>

                        <button onClick={() => {
                            props.setRidePopUpPanel(false);
                            props.setConfirmRidePopUpPanel(false);
                        }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp