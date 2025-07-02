import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div className="p-4 h-full flex flex-col">
            <h5 className='absolute top-3 left-1/2 transform -translate-x-1/2 cursor-pointer hover:text-gray-700 transition-colors'
                onClick={() => {
                    props.setVehiclePanel(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-xl md:text-2xl font-semibold mb-5 text-center'>Choose a Vehicle</h3>

            <div className="space-y-3 flex-1 overflow-y-auto">
                {/* Car Option */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('Car')
                }} className='flex border-2 border-gray-200 hover:border-black active:border-black mb-2 rounded-xl w-full p-3 md:p-4 items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md'>
                    <img className='h-12 md:h-16 flex-shrink-0' src="https://www.svgrepo.com/show/408292/car-white.svg" alt="Car" />
                    <div className='flex-1 px-3 min-w-0'>
                        <h4 className='font-medium text-base md:text-lg'>XpressGo <span className="text-gray-600"><i className="ri-user-3-fill"></i>4</span></h4>
                        <h5 className='font-medium text-sm text-green-600'>2 mins away</h5>
                        <p className='font-normal text-gray-600 text-xs md:text-sm'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg md:text-xl font-semibold flex-shrink-0'>₹{props.fare?.Car || 'N/A'}</h2>
                </div>

                {/* Moto Option */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('Moto')
                }} className='flex border-2 border-gray-200 hover:border-black active:border-black mb-2 rounded-xl w-full p-3 md:p-4 items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md'>
                    <img className='h-8 md:h-10 flex-shrink-0' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Moto" />
                    <div className='flex-1 px-3 min-w-0'>
                        <h4 className='font-medium text-base md:text-lg'>XpressMoto <span className="text-gray-600"><i className="ri-user-3-fill"></i>1</span></h4>
                        <h5 className='font-medium text-sm text-green-600'>3 mins away</h5>
                        <p className='font-normal text-gray-600 text-xs md:text-sm'>Affordable motorcycle rides</p>
                    </div>
                    <h2 className='text-lg md:text-xl font-semibold flex-shrink-0'>₹{props.fare?.Moto || 'N/A'}</h2>
                </div>

                {/* Auto Option */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('Auto')
                }} className='flex border-2 border-gray-200 hover:border-black active:border-black mb-2 rounded-xl w-full p-3 md:p-4 items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md'>
                    <img className='h-8 md:h-9 flex-shrink-0' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="Auto" />
                    <div className='flex-1 px-3 min-w-0'>
                        <h4 className='font-medium text-base md:text-lg'>XpressAuto <span className="text-gray-600"><i className="ri-user-3-fill"></i>3</span></h4>
                        <h5 className='font-medium text-sm text-green-600'>4 mins away</h5>
                        <p className='font-normal text-gray-600 text-xs md:text-sm'>Affordable auto rides</p>
                    </div>
                    <h2 className='text-lg md:text-xl font-semibold flex-shrink-0'>₹{props.fare?.Auto || 'N/A'}</h2>
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel