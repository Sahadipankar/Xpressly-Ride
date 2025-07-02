import React from 'react'

const WaitingForDriver = (props) => {
    const vehicleImages = {
        XpressGo: "https://www.svgrepo.com/show/408292/car-white.svg",
        XpressMoto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
        XpressAuto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
    };

    return (
        <div className="p-4 h-full flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <button
                    className='p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                    onClick={() => props.setWaitingForDriver(false)}
                >
                    <i className="text-xl text-gray-600 ri-arrow-down-line"></i>
                </button>

                <div className="flex-1 text-center">
                    <h3 className='text-xl font-bold text-gray-800'>Driver Found!</h3>
                    <p className="text-sm text-green-600 font-medium">On the way to pickup</p>
                </div>

                <div className="w-12"></div> {/* Spacer for centering */}
            </div>

            {/* Enhanced Driver Card */}
            <div className="bg-white rounded-2xl shadow-xl p-5 mb-4 flex-shrink-0">
                <div className="flex items-center gap-4">
                    {/* Driver Avatar */}
                    <div className="relative">
                        <img
                            className='w-16 h-16 rounded-full object-cover border-2 border-green-400 shadow-lg'
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKX2y-92Lgl0fEgjNpgWZhDcDZNz9J1jkrg&s"
                            alt="Driver Avatar"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                            <i className="ri-check-line text-white text-xs"></i>
                        </div>
                    </div>

                    {/* Driver Info */}
                    <div className="flex-1 min-w-0">
                        <h4 className='text-lg font-bold text-gray-800 truncate'>
                            {props.ride?.captain?.fullname?.firstname} {props.ride?.captain?.fullname?.lastname}
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                            <span className='text-xl font-bold text-gray-900'>
                                {props.ride?.captain?.vehicle?.plate || 'Loading...'}
                            </span>
                            <span className='text-sm text-gray-500 capitalize'>
                                {props.ride?.captain?.vehicle?.vehicleType || 'Vehicle'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                <i className="ri-star-fill text-sm"></i>
                                <i className="ri-star-fill text-sm"></i>
                                <i className="ri-star-fill text-sm"></i>
                                <i className="ri-star-fill text-sm"></i>
                                <i className="ri-star-fill text-sm"></i>
                            </div>
                            <span className="text-xs text-gray-600">4.9 • 2,543 trips</span>
                        </div>
                    </div>

                    {/* Vehicle Image */}
                    <div className="flex-shrink-0">
                        <img
                            className='h-12 w-12 object-contain'
                            src={vehicleImages[props.ride?.captain?.vehicle?.vehicleType] || vehicleImages.XpressGo}
                            alt="Vehicle"
                        />
                    </div>
                </div>

                {/* OTP Section */}
                <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-800 font-medium">Your OTP</p>
                            <p className="text-xs text-green-600">Share with driver to start trip</p>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                            <span className='text-2xl font-bold text-green-800 tracking-wider'>
                                {props.ride?.otp || '****'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Trip Details */}
            <div className='bg-white rounded-2xl shadow-xl p-4 flex-1 overflow-y-auto'>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="ri-route-line text-green-600"></i>
                    Trip Details
                </h4>

                <div className='space-y-4'>
                    <div className='flex items-start gap-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-500'>
                        <div className="flex-shrink-0 bg-green-500 rounded-full p-2">
                            <i className="text-sm ri-map-pin-user-fill text-white"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h5 className='text-sm font-semibold text-green-800 mb-1'>Pickup Location</h5>
                            <p className='text-sm text-gray-700 leading-relaxed'>{props.ride?.pickup || 'Loading pickup location...'}</p>
                        </div>
                    </div>

                    <div className='flex items-start gap-4 p-4 bg-red-50 rounded-xl border-l-4 border-red-500'>
                        <div className="flex-shrink-0 bg-red-500 rounded-full p-2">
                            <i className="text-sm ri-map-pin-fill text-white"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h5 className='text-sm font-semibold text-red-800 mb-1'>Destination</h5>
                            <p className='text-sm text-gray-700 leading-relaxed'>{props.ride?.destination || 'Loading destination...'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500'>
                        <div className="flex-shrink-0 bg-blue-500 rounded-full p-2">
                            <i className="text-sm ri-money-rupee-circle-fill text-white"></i>
                        </div>
                        <div className="flex-1">
                            <h5 className='text-sm font-semibold text-blue-800 mb-1'>Trip Fare</h5>
                            <div className="flex items-center gap-2">
                                <span className='text-lg font-bold text-gray-800'>₹{props.ride?.fare || 'Calculating...'}</span>
                                <span className='text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full'>Cash Payment</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <div>
                                <p className="text-green-800 font-semibold text-sm">Driver is on the way!</p>
                                <p className="text-green-600 text-xs mt-1">Please wait at the pickup location</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                            <i className="ri-phone-line text-lg"></i>
                            Call Driver
                        </button>
                        <button className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                            <i className="ri-message-2-line text-lg"></i>
                            Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver