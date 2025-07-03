/**
 * ConfirmRide Component
 * 
 * Final ride confirmation interface displaying selected vehicle details,
 * trip information, fare breakdown, and booking confirmation.
 * Provides comprehensive ride summary before final booking submission.
 */

import React from 'react'

/**
 * Ride confirmation component
 * @param {Object} props - Component props
 * @param {Function} props.setConfirmRidePanel - Controls panel visibility
 * @param {string} props.vehicleType - Selected vehicle type (Car/Moto/Auto)
 * @param {string} props.pickup - Pickup location address
 * @param {string} props.destination - Destination address
 * @param {Object} props.fare - Fare information object
 * @param {Function} props.createRide - Function to create ride booking
 */
const ConfirmRide = (props) => {
    // Vehicle image mappings for different ride types
    const vehicleImages = {
        Car: "https://www.svgrepo.com/show/408292/car-white.svg",
        Moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
        Auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
    };

    // Vehicle-specific color themes for UI consistency
    const vehicleColors = {
        Car: 'from-blue-50 to-blue-100',
        Moto: 'from-orange-50 to-orange-100',
        Auto: 'from-yellow-50 to-yellow-100'
    };

    return (
        <div className="relative h-full flex flex-col bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Header with close button - Panel navigation */}
            <div className="flex-shrink-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 z-10">
                <button
                    className='absolute top-4 left-1/2 transform -translate-x-1/2 p-2 rounded-full hover:bg-gray-100 transition-all duration-200'
                    onClick={() => {
                        props.setConfirmRidePanel(false); // Close confirmation panel
                    }}
                >
                    <i className="text-2xl text-gray-400 hover:text-gray-600 ri-arrow-down-wide-line"></i>
                </button>
                <h3 className='text-2xl font-bold text-gray-800 text-center mt-8'>Confirm Your Ride</h3>
                <p className='text-sm text-gray-500 text-center mt-1'>Review your trip details</p>
            </div>

            {/* Main Content - Scrollable ride details */}
            <div className='flex-1 px-4 py-4 space-y-4 overflow-y-auto min-h-0'>
                {/* Selected Vehicle Card - Shows chosen vehicle details */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-100">
                        <h4 className="text-lg font-semibold text-gray-800">Selected Vehicle</h4>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 bg-gradient-to-br ${vehicleColors[props.vehicleType] || vehicleColors.Car} rounded-xl flex items-center justify-center`}>
                                <img
                                    className='h-10 w-auto'
                                    src={vehicleImages[props.vehicleType] || vehicleImages.Car}
                                    alt={props.vehicleType || "Vehicle"}
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl font-bold text-gray-800 capitalize mb-1">
                                    {props.vehicleType === 'Car' ? 'XpressGo' : `Xpress${props.vehicleType || 'Go'}`}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center">
                                        <i className="ri-user-3-fill mr-1"></i>
                                        {props.vehicleType === 'Moto' ? '1 seat' : props.vehicleType === 'Auto' ? '3 seats' : '4 seats'}
                                    </span>
                                    <span className="flex items-center">
                                        <i className="ri-time-line mr-1"></i>
                                        {props.vehicleType === 'Moto' ? '3 mins' : props.vehicleType === 'Auto' ? '4 mins' : '2 mins'} away
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trip Details Card - Route information display */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-100">
                        <h4 className="text-lg font-semibold text-gray-800">Trip Details</h4>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Pickup Location - Starting point */}
                        <div className='flex items-start gap-4'>
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h5 className='text-sm font-medium text-gray-500 uppercase tracking-wide mb-1'>Pickup Location</h5>
                                <p className='text-base text-gray-800 font-medium leading-relaxed'>
                                    {props.pickup || 'Loading pickup location...'}
                                </p>
                            </div>
                        </div>

                        {/* Route Line - Visual separator between pickup and destination */}
                        <div className="ml-5 border-l-2 border-dashed border-gray-300 h-6"></div>

                        {/* Destination - End point */}
                        <div className='flex items-start gap-4'>
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h5 className='text-sm font-medium text-gray-500 uppercase tracking-wide mb-1'>Destination</h5>
                                <p className='text-base text-gray-800 font-medium leading-relaxed'>
                                    {props.destination || 'Loading destination...'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fare & Payment Card - Payment information and fare estimate */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
                        <h4 className="text-lg font-semibold text-green-800">Fare & Payment</h4>
                    </div>
                    <div className="p-6">
                        <div className='flex items-center justify-between'>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="text-xl ri-cash-line text-green-600"></i>
                                </div>
                                <div>
                                    <h4 className='text-lg font-semibold text-gray-800'>Cash Payment</h4>
                                    <p className='text-sm text-gray-600'>Pay directly to driver</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className='text-2xl font-bold text-green-600'>
                                    ₹{props.fare?.[props.vehicleType] || 'Calculating...'}
                                </div>
                                <p className='text-xs text-gray-500'>Estimated fare</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Button - Finalize ride booking */}
            <div className="flex-shrink-0 px-4 py-4 bg-white border-t border-gray-100">
                <button
                    onClick={() => {
                        props.setVehicleFound(true);
                        props.setConfirmRidePanel(false);
                        props.createRide()
                    }}
                    className='w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
                >
                    <div className="flex items-center justify-center gap-2">
                        <i className="ri-check-line text-xl"></i>
                        Confirm Ride
                    </div>
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">
                    By confirming, you agree to our terms and conditions
                </p>
            </div>
        </div>
    )
}

export default ConfirmRide