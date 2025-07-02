import React from 'react'

const LookingForDriver = (props) => {
    const vehicleImages = {
        XpressGo: "https://www.svgrepo.com/show/408292/car-white.svg",
        XpressMoto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
        XpressAuto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
    };

    return (
        <div className="p-4 h-full flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <button
                    className='p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                    onClick={() => props.setVehicleFound(false)}
                >
                    <i className="text-xl text-gray-600 ri-arrow-down-line"></i>
                </button>

                <div className="flex-1 text-center">
                    <h3 className='text-2xl font-bold text-gray-800 mb-1'>Finding Your Driver</h3>
                    <p className="text-sm text-gray-600">Please wait while we connect you</p>
                </div>

                <div className="w-12"></div> {/* Spacer for centering */}
            </div>

            {/* Enhanced Loading Animation */}
            <div className="flex-shrink-0 mb-8">
                <div className="relative flex items-center justify-center">
                    <div className="absolute animate-ping rounded-full h-32 w-32 bg-blue-400 opacity-20"></div>
                    <div className="absolute animate-pulse rounded-full h-24 w-24 bg-blue-300 opacity-30"></div>
                    <div className="relative bg-white rounded-full p-6 shadow-2xl">
                        <img
                            className='h-16 w-16 object-contain'
                            src={vehicleImages[props.vehicleType] || vehicleImages.XpressGo}
                            alt={props.vehicleType || "Vehicle"}
                        />
                    </div>
                </div>
                <div className="text-center mt-4">
                    <h4 className="text-lg font-semibold text-gray-800 capitalize mb-2">{props.vehicleType || 'XpressGo'}</h4>
                    <div className="flex items-center justify-center gap-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Searching for nearby drivers...</p>
                </div>
            </div>

            {/* Enhanced Trip Details */}
            <div className='bg-white rounded-2xl shadow-xl p-4 flex-1 overflow-y-auto'>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="ri-route-line text-blue-600"></i>
                    Trip Details
                </h4>

                <div className='space-y-4'>
                    <div className='flex items-start gap-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-500'>
                        <div className="flex-shrink-0 bg-green-500 rounded-full p-2">
                            <i className="text-sm ri-map-pin-user-fill text-white"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h5 className='text-sm font-semibold text-green-800 mb-1'>Pickup Location</h5>
                            <p className='text-sm text-gray-700 leading-relaxed'>{props.pickup || 'Setting pickup location...'}</p>
                        </div>
                    </div>

                    <div className='flex items-start gap-4 p-4 bg-red-50 rounded-xl border-l-4 border-red-500'>
                        <div className="flex-shrink-0 bg-red-500 rounded-full p-2">
                            <i className="text-sm ri-map-pin-fill text-white"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h5 className='text-sm font-semibold text-red-800 mb-1'>Destination</h5>
                            <p className='text-sm text-gray-700 leading-relaxed'>{props.destination || 'Setting destination...'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500'>
                        <div className="flex-shrink-0 bg-amber-500 rounded-full p-2">
                            <i className="text-sm ri-money-rupee-circle-fill text-white"></i>
                        </div>
                        <div className="flex-1">
                            <h5 className='text-sm font-semibold text-amber-800 mb-1'>Estimated Fare</h5>
                            <div className="flex items-center gap-2">
                                <span className='text-lg font-bold text-gray-800'>₹{props.fare?.[props.vehicleType] || 'Calculating...'}</span>
                                <span className='text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full'>Cash Payment</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Message */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                        <div>
                            <p className="text-blue-800 font-medium text-sm">Connecting you with a driver</p>
                            <p className="text-blue-600 text-xs mt-1">This usually takes 1-3 minutes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver