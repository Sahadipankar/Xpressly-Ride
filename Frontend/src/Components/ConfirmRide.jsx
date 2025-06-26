import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setConfirmRidePanel(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-5'>Confirm your ride</h3>

            <div className='flex flex-col gap-4 justify-between items-center'>
                <img className='h-30' src="https://www.svgrepo.com/show/408292/car-white.svg" alt="" />

                <div className='w-full mt-5'>

                    <div className='flex items-center gap-5 p-3 border-gray-400 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>1, Shakespeare Sarani</h3>
                            <p className='text-sm  text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-gray-400 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>33, Ballygunge Place </h3>
                            <p className='text-sm  text-gray-600'>{props.destination}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-cash-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]}</h3>
                            <p className='text-sm  text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <button onClick={() => {
                    props.setVehicleFound(true);
                    props.setConfirmRidePanel(false);
                    props.createRide()
                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide