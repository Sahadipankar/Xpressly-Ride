/**
 * ConfirmRidePopUp Component
 * 
 * Modal for captains to confirm and start accepted rides using OTP verification.
 * Displays passenger details, ride information, and OTP input form.
 * Handles ride start API call and navigation to active ride screen.
 */

import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const ConfirmRidePopUp = (props) => {
    // Component state and navigation
    const [otp, setOtp] = useState('') // OTP entered by captain
    const navigate = useNavigate()

    /**
     * Handle ride start with OTP verification
     * @param {Event} e - Form submit event
     */
    const submitHandler = async (e) => {
        e.preventDefault()

        // API call to start ride with OTP verification
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id, // Current ride ID
                otp: otp // OTP for verification
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Auth token
            }
        })

        // Handle successful ride start
        if (response.status === 200) {
            props.setConfirmRidePopUpPanel(false) // Close confirmation popup
            props.setRidePopUpPanel(false) // Close ride popup
            navigate('/captain-riding', { state: { ride: props.ride } }) // Navigate to active ride screen
        }
    }

    return (
        <div className="relative bg-white min-h-full">
            {/* Enhanced Header - No Close Arrow for Confirmed Rides */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200 pb-4">
                {/* Commitment Notice */}
                <div className="bg-gradient-to-r from-green-100 to-blue-100 border-l-4 border-green-500 p-3 mb-4">
                    <div className="flex items-center gap-2">
                        <i className="ri-information-line text-green-600"></i>
                        <p className="text-sm text-green-800 font-medium">
                            You've committed to this ride. Please proceed with OTP verification.
                        </p>
                    </div>
                </div>

                <div className="text-center pt-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="ri-check-double-line text-2xl text-white"></i>
                    </div>
                    <h2 className='text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent'>
                        🎉 Ride Confirmed!
                    </h2>
                    <p className="text-gray-600">Enter OTP to start the ride</p>
                </div>
            </div>

            <div className="px-4 py-6">
                {/* Enhanced Passenger Info */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-5 mb-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <img
                                    className='h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-4 border-white shadow-lg'
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAjn0EsJc3E-9hgTU6GxsMuCioyJbeeRK4A&s"
                                    alt="Passenger"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <i className="ri-check-line text-white text-xs"></i>
                                </div>
                            </div>
                            <div>
                                <h3 className='text-xl md:text-2xl font-bold capitalize text-gray-800'>
                                    {props.ride?.user?.fullname?.firstname} {props.ride?.user?.fullname?.lastname}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                        👤 Passenger
                                    </span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                        ✅ Verified
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-3">
                                <h4 className="text-lg md:text-xl font-bold">
                                    {props.ride?.distance || '3.2 km'}
                                </h4>
                                <p className="text-xs opacity-90">Distance</p>
                            </div>
                        </div>
                    </div>

                    {/* Trip Summary */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="text-center bg-white/50 rounded-lg p-2">
                            <i className="ri-money-dollar-circle-line text-lg text-green-600"></i>
                            <p className="text-sm font-bold text-gray-800">₹{props.ride?.fare || '85'}</p>
                            <p className="text-xs text-gray-600">Fare</p>
                        </div>
                        <div className="text-center bg-white/50 rounded-lg p-2">
                            <i className="ri-time-line text-lg text-blue-600"></i>
                            <p className="text-sm font-bold text-gray-800">12 min</p>
                            <p className="text-xs text-gray-600">Duration</p>
                        </div>
                        <div className="text-center bg-white/50 rounded-lg p-2">
                            <i className="ri-cash-line text-lg text-purple-600"></i>
                            <p className="text-sm font-bold text-gray-800">Cash</p>
                            <p className="text-xs text-gray-600">Payment</p>
                        </div>
                    </div>
                </div>

                {/* Enhanced Route Information */}
                <div className='w-full space-y-4 mb-6'>
                    <div className='bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500'>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                <i className="ri-map-pin-user-fill text-white"></i>
                            </div>
                            <div className="flex-1">
                                <h4 className='text-lg font-bold text-gray-800 mb-1'>Pickup Location</h4>
                                <p className='text-sm text-gray-700 leading-relaxed'>
                                    {props.ride?.pickup || 'Loading pickup location...'}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                        <i className="ri-navigation-line mr-1"></i>
                                        Navigate
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="flex flex-col items-center">
                            <div className="w-px h-4 bg-gradient-to-b from-green-500 to-red-500"></div>
                            <i className="ri-arrow-down-line text-gray-400 animate-bounce"></i>
                            <div className="w-px h-4 bg-gradient-to-b from-red-500 to-red-600"></div>
                        </div>
                    </div>

                    <div className='bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border-l-4 border-red-500'>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                <i className="ri-map-pin-fill text-white"></i>
                            </div>
                            <div className="flex-1">
                                <h4 className='text-lg font-bold text-gray-800 mb-1'>Destination</h4>
                                <p className='text-sm text-gray-700 leading-relaxed'>
                                    {props.ride?.destination || 'Loading destination...'}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                                        <i className="ri-flag-line mr-1"></i>
                                        Final Stop
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced OTP Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="ri-key-2-line text-2xl text-white"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Enter Passenger OTP</h3>
                        <p className="text-sm text-gray-600">Ask the passenger for their 6-digit verification code</p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <div className="flex gap-2 justify-center mb-4">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        className="w-12 h-12 md:w-14 md:h-14 text-center text-xl md:text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 bg-white shadow-sm"
                                        value={otp[index] || ''}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, '');
                                            if (value.length <= 1) {
                                                const newOtp = otp.split('');
                                                newOtp[index] = value;
                                                setOtp(newOtp.join(''));

                                                if (value && index < 5) {
                                                    const nextInput = e.target.parentElement.children[index + 1];
                                                    nextInput?.focus();
                                                }
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                                                const prevInput = e.target.parentElement.children[index - 1];
                                                prevInput?.focus();
                                            }
                                        }}
                                        onPaste={(e) => {
                                            e.preventDefault();
                                            const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
                                            setOtp(pasteData);
                                            const nextIndex = Math.min(pasteData.length, 5);
                                            const targetInput = e.target.parentElement.children[nextIndex];
                                            targetInput?.focus();
                                        }}
                                    />
                                ))}
                            </div>

                            {/* OTP Status */}
                            <div className="text-center mb-4">
                                {otp.length === 0 && (
                                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                                        <i className="ri-information-line"></i>
                                        Waiting for OTP...
                                    </p>
                                )}
                                {otp.length > 0 && otp.length < 6 && (
                                    <p className="text-sm text-blue-600 flex items-center justify-center gap-2">
                                        <i className="ri-time-line"></i>
                                        {otp.length}/6 digits entered
                                    </p>
                                )}
                                {otp.length === 6 && (
                                    <p className="text-sm text-green-600 flex items-center justify-center gap-2">
                                        <i className="ri-check-line"></i>
                                        OTP complete - Ready to start!
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                type="submit"
                                disabled={otp.length !== 6}
                                className={`w-full text-lg font-bold py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg transform ${otp.length === 6
                                    ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white hover:scale-105 shadow-xl'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <i className="ri-play-circle-line text-xl"></i>
                                <span>Start Ride</span>
                                {otp.length === 6 && <i className="ri-arrow-right-line animate-pulse"></i>}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    const confirmCancel = window.confirm(
                                        "Are you sure you want to cancel this ride? This will disappoint the passenger and may affect your rating."
                                    );
                                    if (confirmCancel) {
                                        props.setRidePopUpPanel(false);
                                        props.setConfirmRidePopUpPanel(false);
                                    }
                                }}
                                className='w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105'
                            >
                                <i className="ri-close-circle-line text-xl"></i>
                                <span>Cancel Ride</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Help Section */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <i className="ri-question-line text-xl text-yellow-600"></i>
                        <h4 className="font-semibold text-yellow-800">Need Help?</h4>
                    </div>
                    <div className="space-y-2 text-sm text-yellow-800">
                        <p>• Ask the passenger: "What's your OTP?"</p>
                        <p>• The OTP is visible on their phone screen</p>
                        <p>• Contact support if passenger doesn't have OTP</p>
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button className="flex-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-medium py-2 px-3 rounded-lg text-sm transition-colors">
                            <i className="ri-phone-line mr-1"></i>
                            Call Passenger
                        </button>
                        <button className="flex-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-medium py-2 px-3 rounded-lg text-sm transition-colors">
                            <i className="ri-customer-service-line mr-1"></i>
                            Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp