import React from 'react'

const RidePopUp = (props) => {
    return (
        <div className="p-4">
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setRidePopUpPanel(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-xl md:text-2xl font-semibold mb-5 text-center'>New Ride Available!</h3>

            <div className="flex items-center justify-between p-3 md:p-4 bg-yellow-100 border border-yellow-300 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img
                        className='h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-white'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAjn0EsJc3E-9hgTU6GxsMuCioyJbeeRK4A&s"
                        alt="User Avatar"
                    />
                    <div>
                        <h4 className='text-lg md:text-xl font-medium capitalize'>
                            {props.ride?.user?.fullname?.firstname} {props.ride?.user?.fullname?.lastname}
                        </h4>
                        <p className="text-sm text-gray-600">Passenger</p>
                    </div>
                </div>
                <div className="text-right">
                    <h5 className="text-lg md:text-xl font-semibold">{props.ride?.distance || 'N/A'}</h5>
                    <p className="text-sm text-gray-600">Distance</p>
                </div>
            </div>

            <div className='flex flex-col gap-4 justify-between items-center'>

                <div className='w-full mt-5 space-y-3'>
                    <div className='flex items-center gap-5 p-3 border-gray-200 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill text-green-600"></i>
                        <div className="flex-1">
                            <h3 className='text-lg font-medium'>Pickup Location</h3>
                            <p className='text-sm text-gray-600'>{props.ride?.pickup || 'Loading pickup location...'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-gray-200 border-b-2'>
                        <i className="text-lg ri-map-pin-fill text-red-600"></i>
                        <div className="flex-1">
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm text-gray-600'>{props.ride?.destination || 'Loading destination...'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-cash-line text-green-600"></i>
                        <div className="flex-1">
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare || 'Calculating...'}</h3>
                            <p className='text-sm text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>

                <div className="flex mt-5 gap-3 w-full">
                    <button
                        onClick={() => {
                            props.setRidePopUpPanel(false);
                        }}
                        className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold p-3 md:p-4 rounded-lg transition-colors duration-200'
                    >
                        Ignore
                    </button>

                    <button
                        onClick={() => {
                            props.setConfirmRidePopUpPanel(true);
                            props.confirmRide()
                        }}
                        className='flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold p-3 md:p-4 rounded-lg transition-colors duration-200'
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp