import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div className="p-4">
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setVehicleFound(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-5 text-center'>Looking for a Driver</h3>

            <div className='flex flex-col gap-4 justify-between items-center'>
                <img className='h-20 md:h-24' src="https://www.svgrepo.com/show/408292/car-white.svg" alt="Car" />

                <div className='w-full mt-5 space-y-3'>

                    <div className='flex items-center gap-5 p-3 border-gray-200 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill text-green-600"></i>
                        <div className="flex-1">
                            <h3 className='text-lg font-medium'>Pickup Location</h3>
                            <p className='text-sm text-gray-600'>{props.pickup || 'Setting pickup location...'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-gray-200 border-b-2'>
                        <i className="text-lg ri-map-pin-fill text-red-600"></i>
                        <div className="flex-1">
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm text-gray-600'>{props.destination || 'Setting destination...'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-cash-line text-green-600"></i>
                        <div className="flex-1">
                            <h3 className='text-lg font-medium'>₹{props.fare?.[props.vehicleType] || 'Calculating...'}</h3>
                            <p className='text-sm text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Searching for nearby drivers...</p>
                </div>

            </div>
        </div>
    )
}

export default LookingForDriver