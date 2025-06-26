import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setVehiclePanel(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>


            <div onClick={() => {
                props.setConfirmRidePanel(true);
                props.selectVehicle('Car')
            }} className='flex border-2 border-gray-100 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
                <img className='h-16' src="https://www.svgrepo.com/show/408292/car-white.svg" alt="" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-gray-600 text-xs'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.Car}</h2>
            </div>


            <div onClick={() => {
                props.setConfirmRidePanel(true);
                props.selectVehicle('Moto')
            }} className='flex border-2 border-gray-100 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-gray-600 text-xs'>Affordable motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.Moto}</h2>
            </div>


            <div onClick={() => {
                props.setConfirmRidePanel(true);
                props.selectVehicle('Auto')
            }} className='flex border-2 border-gray-100 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
                <img className='h-9' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>4 mins away</h5>
                    <p className='font-normal text-gray-600 text-xs'>Affordable auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.Auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel