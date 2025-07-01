import React from 'react'

const WaitingForDriver = (props) => {
    const vehicleImages = {
        Car: "https://www.svgrepo.com/show/408292/car-white.svg",
        Moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
        Auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
    };

    return (
        <div className="p-4 h-full flex flex-col">
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setWaitingForDriver(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <img
                    className='h-16 md:h-20'
                    src={vehicleImages[props.ride?.captain?.vehicle?.vehicleType] || vehicleImages.Car}
                    alt="Vehicle"
                />

                <div className="text-right flex-1 min-w-0 ml-4">
                    <h2 className='text-lg md:text-xl font-medium capitalize truncate'>
                        {props.ride?.captain?.fullname?.firstname} {props.ride?.captain?.fullname?.lastname}
                    </h2>
                    <h4 className='text-xl md:text-2xl font-semibold -mt-1 -mb-1 truncate'>
                        {props.ride?.captain?.vehicle?.plate || 'Loading...'}
                    </h4>
                    <p className='text-sm text-gray-600 capitalize truncate'>
                        {props.ride?.captain?.vehicle?.vehicleType || 'Vehicle'}
                    </p>
                    <div className="mt-2 bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block">
                        <h1 className='text-lg font-semibold'>OTP: {props.ride?.otp || '****'}</h1>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4 justify-between items-center flex-1 overflow-y-auto'>

                <div className='w-full space-y-3 flex-1 overflow-y-auto'>

                    <div className='flex items-start gap-3 sm:gap-5 p-3 border-gray-200 border-b-2'>
                        <div className="flex-shrink-0">
                            <i className="text-lg ri-map-pin-user-fill text-green-600"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className='text-lg font-medium mb-1'>Pickup Location</h3>
                            <p className='text-sm text-gray-600 address-text'>{props.ride?.pickup || 'Loading pickup location...'}</p>
                        </div>
                    </div>

                    <div className='flex items-start gap-3 sm:gap-5 p-3 border-gray-200 border-b-2'>
                        <div className="flex-shrink-0">
                            <i className="text-lg ri-map-pin-fill text-red-600"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className='text-lg font-medium mb-1'>Destination</h3>
                            <p className='text-sm text-gray-600 address-text'>{props.ride?.destination || 'Loading destination...'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 sm:gap-5 p-3'>
                        <div className="flex-shrink-0">
                            <i className="text-lg ri-cash-line text-green-600"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare || 'Calculating...'}</h3>
                            <p className='text-sm text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 w-full flex-shrink-0">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-blue-800 font-medium">Driver is on the way!</p>
                        <p className="text-blue-600 text-sm mt-1">Please wait at the pickup location</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WaitingForDriver