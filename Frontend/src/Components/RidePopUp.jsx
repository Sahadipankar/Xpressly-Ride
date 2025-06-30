import React, { useState, useEffect } from 'react'

const RidePopUp = (props) => {
    const [timeLeft, setTimeLeft] = useState(30) // 30 seconds to respond
    const [estimatedTime, setEstimatedTime] = useState('5-8 min')

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // Use setTimeout to avoid setState during render
                    setTimeout(() => {
                        props.setRidePopUpPanel(false);
                    }, 0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [props]);

    return (
        <div className="p-4">
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setRidePopUpPanel(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            {/* Header with Timer */}
            <div className="text-center mb-4">
                <h3 className='text-xl md:text-2xl font-bold mb-2 text-green-600'>New Ride Request!</h3>
                <div className="flex items-center justify-center gap-2">
                    <div className={`w-12 h-12 rounded-full border-4 ${timeLeft > 10 ? 'border-green-500' : 'border-red-500'} flex items-center justify-center`}>
                        <span className={`text-lg font-bold ${timeLeft > 10 ? 'text-green-600' : 'text-red-600'}`}>
                            {timeLeft}
                        </span>
                    </div>
                    <span className="text-sm text-gray-600">seconds to respond</span>
                </div>
            </div>

            {/* Passenger Info Card */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            className='h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border-3 border-white shadow-md'
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAjn0EsJc3E-9hgTU6GxsMuCioyJbeeRK4A&s"
                            alt="User Avatar"
                        />
                        <div>
                            <h4 className='text-lg md:text-xl font-semibold capitalize'>
                                {props.ride?.user?.fullname?.firstname} {props.ride?.user?.fullname?.lastname}
                            </h4>
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-500">
                                    <i className="ri-star-fill text-sm"></i>
                                    4.8
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-sm text-gray-600">Premium</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <h5 className="text-xl md:text-2xl font-bold text-blue-600">
                            ₹{props.ride?.fare || 'N/A'}
                        </h5>
                        <p className="text-sm text-gray-600">{props.ride?.distance || estimatedTime}</p>
                    </div>
                </div>
            </div>

            {/* Route Information */}
            <div className='w-full space-y-3'>
                <div className='flex items-start gap-4 p-3 bg-white rounded-lg border border-gray-200'>
                    <i className="text-xl ri-map-pin-user-fill text-green-600 mt-1"></i>
                    <div className="flex-1">
                        <h3 className='text-base md:text-lg font-semibold mb-1'>Pickup Location</h3>
                        <p className='text-sm text-gray-700 leading-relaxed'>
                            {props.ride?.pickup || 'Loading pickup location...'}
                        </p>
                        <p className="text-xs text-green-600 mt-1 font-medium">
                            <i className="ri-time-line mr-1"></i>
                            {estimatedTime} away
                        </p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-px h-6 bg-gray-300"></div>
                </div>

                <div className='flex items-start gap-4 p-3 bg-white rounded-lg border border-gray-200'>
                    <i className="text-xl ri-map-pin-fill text-red-600 mt-1"></i>
                    <div className="flex-1">
                        <h3 className='text-base md:text-lg font-semibold mb-1'>Destination</h3>
                        <p className='text-sm text-gray-700 leading-relaxed'>
                            {props.ride?.destination || 'Loading destination...'}
                        </p>
                        <p className="text-xs text-blue-600 mt-1 font-medium">
                            <i className="ri-roadster-line mr-1"></i>
                            {props.ride?.distance || '3.2 km'} • Est. 12 min
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex mt-6 gap-3 w-full">
                <button
                    onClick={() => {
                        props.setRidePopUpPanel(false);
                    }}
                    className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold p-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2'
                >
                    <i className="ri-close-line"></i>
                    Decline
                </button>

                <button
                    onClick={() => {
                        props.setConfirmRidePopUpPanel(true);
                        props.confirmRide()
                    }}
                    className='flex-2 bg-green-600 hover:bg-green-700 text-white font-semibold p-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg'
                >
                    <i className="ri-check-line"></i>
                    Accept Ride
                </button>
            </div>

            {/* Quick Info */}
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                    <i className="ri-information-line text-yellow-600"></i>
                    <span className="text-sm text-yellow-800">
                        Payment: Cash • {props.ride?.vehicleType || 'Car'} requested
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp