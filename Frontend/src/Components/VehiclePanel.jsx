/**
 * VehiclePanel Component
 * 
 * Interactive vehicle selection panel for ride booking.
 * Displays available vehicle types (Car, Moto, Auto) with pricing,
 * estimated arrival times, and detailed vehicle information.
 * Handles vehicle selection and proceeds to ride confirmation.
 */

import React from 'react'

/**
 * Vehicle selection panel component
 * @param {Object} props - Component props
 * @param {Function} props.setVehiclePanel - Controls panel visibility
 * @param {Function} props.setConfirmRidePanel - Opens ride confirmation panel
 * @param {Function} props.selectVehicle - Handles vehicle selection
 * @param {Object} props.fare - Contains fare information for different vehicle types
 */
const VehiclePanel = (props) => {
    return (
        <div className="relative h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
            {/* Header with close button - Panel navigation controls */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 z-10">
                <button
                    className='absolute top-4 left-1/2 transform -translate-x-1/2 p-2 rounded-full hover:bg-gray-100 transition-all duration-200'
                    onClick={() => {
                        props.setVehiclePanel(false); // Close vehicle selection panel
                    }}
                >
                    <i className="text-2xl text-gray-400 hover:text-gray-600 ri-arrow-down-wide-line"></i>
                </button>
                <h3 className='text-2xl font-bold text-gray-800 text-center mt-8'>Choose Your Ride</h3>
                <p className='text-sm text-gray-500 text-center mt-1'>Select the perfect vehicle for your journey</p>
            </div>

            {/* Vehicle Options - Available ride types with details */}
            <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
                {/* Car Option - Premium vehicle choice */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true); // Open confirmation panel
                    props.selectVehicle('Car') // Set selected vehicle type
                }} className='group relative bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden'>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className='relative flex items-center p-5'>
                        <div className="flex-shrink-0 mr-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img className='h-10 w-auto' src="https://www.svgrepo.com/show/408292/car-white.svg" alt="Car" />
                            </div>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className='font-bold text-lg text-gray-800'>XpressGo</h4>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <i className="ri-user-3-fill mr-1"></i>
                                    <span>4 seats</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className='inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full'>
                                    <i className="ri-time-line mr-1"></i>
                                    2 mins away
                                </span>
                                <span className='text-xs text-gray-500'>• Eco-friendly</span>
                            </div>
                            <p className='text-sm text-gray-600'>Comfortable rides for daily commutes</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                            <div className='text-2xl font-bold text-gray-800'>₹{props.fare?.Car || '---'}</div>
                            <div className='text-xs text-gray-500'>Estimated fare</div>
                        </div>
                    </div>
                </div>

                {/* Moto Option - Quick transportation choice */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('Moto')
                }} className='group relative bg-white rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden'>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className='relative flex items-center p-5'>
                        <div className="flex-shrink-0 mr-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img className='h-8 w-auto' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Moto" />
                            </div>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className='font-bold text-lg text-gray-800'>XpressMoto</h4>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <i className="ri-user-3-fill mr-1"></i>
                                    <span>1 seat</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className='inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full'>
                                    <i className="ri-time-line mr-1"></i>
                                    3 mins away
                                </span>
                                <span className='text-xs text-gray-500'>• Fastest</span>
                            </div>
                            <p className='text-sm text-gray-600'>Quick rides through traffic</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                            <div className='text-2xl font-bold text-gray-800'>₹{props.fare?.Moto || '---'}</div>
                            <div className='text-xs text-gray-500'>Estimated fare</div>
                        </div>
                    </div>
                </div>

                {/* Auto Option - Budget-friendly choice */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('Auto')
                }} className='group relative bg-white rounded-2xl border border-gray-200 hover:border-yellow-300 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden'>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className='relative flex items-center p-5'>
                        <div className="flex-shrink-0 mr-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img className='h-8 w-auto' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="Auto" />
                            </div>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className='font-bold text-lg text-gray-800'>XpressAuto</h4>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <i className="ri-user-3-fill mr-1"></i>
                                    <span>3 seats</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className='inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full'>
                                    <i className="ri-time-line mr-1"></i>
                                    4 mins away
                                </span>
                                <span className='text-xs text-gray-500'>• Budget-friendly</span>
                            </div>
                            <p className='text-sm text-gray-600'>Affordable three-wheeler rides</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                            <div className='text-2xl font-bold text-gray-800'>₹{props.fare?.Auto || '---'}</div>
                            <div className='text-xs text-gray-500'>Estimated fare</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer tip - User guidance information */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-center text-sm text-gray-500">
                    <i className="ri-information-line mr-2"></i>
                    Tap any vehicle to continue with booking
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel