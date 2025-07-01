import React from 'react'

const LookingForDriver = (props) => {
    const vehicleImages = {
        Car: "https://www.svgrepo.com/show/408292/car-white.svg",
        Moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
        Auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
    };

    return (
        <div className="p-4 h-full flex flex-col">
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setVehicleFound(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-5 text-center'>Looking for a Driver</h3>

            <div className='flex flex-col gap-4 justify-between items-center flex-1 overflow-y-auto'>
                <div className="text-center flex-shrink-0">
                    <img
                        className='h-20 md:h-24 mx-auto mb-2'
                        src={vehicleImages[props.vehicleType] || vehicleImages.Car}
                        alt={props.vehicleType || "Vehicle"}
                    />
                    <h4 className="text-lg font-semibold capitalize">{props.vehicleType || 'Car'}</h4>
                </div>

                <div className='w-full mt-5 space-y-3 flex-1 overflow-y-auto'>

                    <div className='flex items-start gap-3 sm:gap-5 p-3 border-gray-200 border-b-2'>
                        <div className="flex-shrink-0">
                            <i className="text-lg ri-map-pin-user-fill text-green-600"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className='text-lg font-medium mb-1'>Pickup Location</h3>
                            <p className='text-sm text-gray-600 address-text'>{props.pickup || 'Setting pickup location...'}</p>
                        </div>
                    </div>

                    <div className='flex items-start gap-3 sm:gap-5 p-3 border-gray-200 border-b-2'>
                        <div className="flex-shrink-0">
                            <i className="text-lg ri-map-pin-fill text-red-600"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className='text-lg font-medium mb-1'>Destination</h3>
                            <p className='text-sm text-gray-600 address-text'>{props.destination || 'Setting destination...'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 sm:gap-5 p-3'>
                        <div className="flex-shrink-0">
                            <i className="text-lg ri-cash-line text-green-600"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className='text-lg font-medium'>₹{props.fare?.[props.vehicleType] || 'Calculating...'}</h3>
                            <p className='text-sm text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-center flex-shrink-0">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Searching for nearby drivers...</p>
                </div>

            </div>
        </div>
    )
}

export default LookingForDriver