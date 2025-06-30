import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const ConfirmRidePopUp = (props) => {

    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopUpPanel(false)
            props.setRidePopUpPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }


    }

    return (
        <div className="p-4">
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setConfirmRidePopUpPanel(false);
                    props.setRidePopUpPanel(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-xl md:text-2xl font-semibold mb-5 text-center'>Confirm this Ride to Start</h3>

            <div className="flex items-center justify-between p-3 md:p-4 bg-green-100 border border-green-300 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img
                        className='h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-white'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAjn0EsJc3E-9hgTU6GxsMuCioyJbeeRK4A&s"
                        alt="User Avatar"
                    />
                    <div>
                        <h4 className='text-lg md:text-xl font-medium capitalize'>
                            {props.ride?.user?.fullname?.firstname} {props.ride?.user?.fullname?.lastname}
                        </h4>
                        <p className="text-sm text-gray-600">Passenger</p>
                    </div>
                </div>
                <div className="text-right">
                    <h5 className="text-lg md:text-xl font-semibold">{props.ride?.distance || 'N/A'}</h5>
                    <p className="text-sm text-gray-600">Distance</p>
                </div>
            </div>

            <div className='flex flex-col gap-4 justify-between items-center'>

                <div className='w-full mt-5 space-y-3'>
                    <div className='flex items-center gap-5 p-3 border-gray-200 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill text-green-600"></i>
                        <div className="flex-1">
                            <h3 className='text-lg font-medium'>Pickup Location</h3>
                            <p className='text-sm text-gray-600'>{props.ride?.pickup || 'Loading pickup location...'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-gray-200 border-b-2'>
                        <i className="text-lg ri-map-pin-fill text-red-600"></i>
                        <div className="flex-1">
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm text-gray-600'>{props.ride?.destination || 'Loading destination...'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-cash-line text-green-600"></i>
                        <div className="flex-1">
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare || 'Calculating...'}</h3>
                            <p className='text-sm text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 w-full">
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter OTP from Passenger
                            </label>
                            <input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                type="number"
                                className='bg-gray-100 px-4 md:px-6 py-3 md:py-4 font-mono text-lg md:text-xl rounded-lg w-full border-2 border-transparent focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-200'
                                placeholder='Enter 4-digit OTP'
                                maxLength="4"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={otp.length !== 4}
                            className='w-full text-base md:text-lg flex justify-center bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold p-3 md:p-4 rounded-lg transition-colors duration-200'
                        >
                            Start Ride
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                props.setRidePopUpPanel(false);
                                props.setConfirmRidePopUpPanel(false);
                            }}
                            className='w-full bg-red-600 hover:bg-red-700 text-base md:text-lg text-white font-semibold p-3 md:p-4 rounded-lg transition-colors duration-200'
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp