import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const FinishRide = (props) => {
    const navigate = useNavigate()
    const [isCompleting, setIsCompleting] = useState(false)
    const [paymentConfirmed, setPaymentConfirmed] = useState(false)

    async function endRide() {
        if (!paymentConfirmed) {
            alert('Please confirm that you have received the payment before finishing the ride.')
            return
        }

        setIsCompleting(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
                rideId: props.ride._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.status === 200) {
                setTimeout(() => {
                    navigate('/captain-dashboard')
                }, 1500)
            }
        } catch (error) {
            setIsCompleting(false)
            alert('Error finishing ride. Please try again.')
        }
    }

    return (
        <div className="relative bg-white min-h-full">
            {/* Enhanced Header with Close Arrow */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200 pb-4">
                <div className="flex justify-center mb-4 pt-3">
                    <button
                        onClick={() => props.setFinishRidePanel(false)}
                        className="w-16 h-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                        aria-label="Continue ride"
                    ></button>
                </div>

                {/* Down Arrow Icon */}
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => props.setFinishRidePanel(false)}
                        className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                        aria-label="Continue ride and close finish panel"
                    >
                        <i className="ri-arrow-down-line text-xl text-gray-600"></i>
                    </button>
                </div>

                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="ri-flag-line text-2xl text-white"></i>
                    </div>
                    <h2 className='text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent'>
                        🏁 Finish This Ride
                    </h2>
                    <p className="text-gray-600">Complete your journey with the passenger</p>
                </div>
            </div>

            <div className="px-4 py-6">
                {/* Enhanced Trip Summary */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-5 mb-6 shadow-lg">
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
                                        🎯 Trip Completed
                                    </span>
                                    <span className="text-xs text-gray-600">
                                        • Duration: {props.tripDuration || '12:45'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-3">
                                <h4 className="text-lg md:text-xl font-bold">2.2 km</h4>
                                <p className="text-xs opacity-90">Total Distance</p>
                            </div>
                        </div>
                    </div>

                    {/* Trip Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="text-center bg-white/60 rounded-lg p-2">
                            <i className="ri-money-dollar-circle-line text-lg text-green-600"></i>
                            <p className="text-sm font-bold text-gray-800">₹{props.ride?.fare}</p>
                            <p className="text-xs text-gray-600">Fare</p>
                        </div>
                        <div className="text-center bg-white/60 rounded-lg p-2">
                            <i className="ri-time-line text-lg text-orange-600"></i>
                            <p className="text-sm font-bold text-gray-800">{props.tripDuration || '12:45'}</p>
                            <p className="text-xs text-gray-600">Duration</p>
                        </div>
                        <div className="text-center bg-white/60 rounded-lg p-2">
                            <i className="ri-cash-line text-lg text-purple-600"></i>
                            <p className="text-sm font-bold text-gray-800">Cash</p>
                            <p className="text-xs text-gray-600">Payment</p>
                        </div>
                    </div>
                </div>

                {/* Enhanced Route Summary */}
                <div className='w-full space-y-4 mb-6'>
                    <div className='bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500'>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                <i className="ri-map-pin-user-fill text-white"></i>
                            </div>
                            <div className="flex-1">
                                <h4 className='text-lg font-bold text-gray-800 mb-1'>Pickup Location</h4>
                                <p className='text-sm text-gray-700 leading-relaxed'>
                                    {props.ride?.pickup || '1, Shakespeare Sarani'}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                        ✅ Completed
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="flex flex-col items-center">
                            <div className="w-px h-4 bg-gradient-to-b from-green-500 to-red-500"></div>
                            <i className="ri-arrow-down-line text-gray-400"></i>
                            <div className="w-px h-4 bg-gradient-to-b from-red-500 to-red-600"></div>
                        </div>
                    </div>

                    <div className='bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border-l-4 border-red-500'>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                <i className="ri-map-pin-fill text-white"></i>
                            </div>
                            <div className="flex-1">
                                <h4 className='text-lg font-bold text-gray-800 mb-1'>Destination Reached</h4>
                                <p className='text-sm text-gray-700 leading-relaxed'>
                                    {props.ride?.destination || '33, Ballygunge Place'}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                                        🎯 Arrived
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Confirmation */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-5 mb-6">
                    <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="ri-secure-payment-line text-2xl text-white"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Confirmation</h3>
                        <p className="text-sm text-gray-600">Please confirm payment before finishing the ride</p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Cash Payment</h4>
                                    <p className="text-sm text-gray-600">Amount to collect from passenger</p>
                                </div>
                                <div className="text-right">
                                    <h4 className="text-2xl font-bold text-green-600">₹{props.ride?.fare}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                            <input
                                type="checkbox"
                                id="paymentConfirmed"
                                checked={paymentConfirmed}
                                onChange={(e) => setPaymentConfirmed(e.target.checked)}
                                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                            />
                            <label htmlFor="paymentConfirmed" className="text-sm font-medium text-gray-800 cursor-pointer">
                                I confirm that I have received the payment of ₹{props.ride?.fare} from the passenger
                            </label>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <button
                        onClick={endRide}
                        disabled={!paymentConfirmed || isCompleting}
                        className={`w-full text-lg font-bold py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg transform ${paymentConfirmed && !isCompleting
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white hover:scale-105 shadow-xl'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {isCompleting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Finishing Ride...</span>
                            </>
                        ) : (
                            <>
                                <i className="ri-flag-2-line text-xl"></i>
                                <span>Finish Ride</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => props.setFinishRidePanel(false)}
                        disabled={isCompleting}
                        className='w-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-bold py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105'
                    >
                        <i className="ri-arrow-left-line text-xl"></i>
                        <span>Continue Ride</span>
                    </button>
                </div>

                {/* Important Notice */}
                <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <i className="ri-alert-line text-xl text-yellow-600"></i>
                        <h4 className="font-semibold text-yellow-800">Important Reminder</h4>
                    </div>
                    <div className="space-y-1 text-sm text-yellow-800">
                        <p>• Only finish the ride after reaching the destination</p>
                        <p>• Ensure you have collected the correct payment amount</p>
                        <p>• Thank the passenger and wish them a great day</p>
                        <p>• Rate the passenger based on your experience</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinishRide