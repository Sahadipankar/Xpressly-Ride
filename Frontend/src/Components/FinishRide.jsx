import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setFinishRidePanel(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>

            <div className="flex items-center justify-between p-4 bg-yellow-400 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAjn0EsJc3E-9hgTU6GxsMuCioyJbeeRK4A&s" alt="" />
                    <h4 className='text-lg font-medium'>Sneha Mondol</h4>
                </div>
                <h5 className="text-xl font-semibold">2.2 km</h5>
            </div>

            <div className='flex flex-col gap-4 justify-between items-center'>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-gray-400 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>1, Shakespeare Sarani</h3>
                            <p className='text-sm  text-gray-600'>Park Street Area, Kolkata, West Bengal 700071</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-gray-400 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>33, Ballygunge Place </h3>
                            <p className='text-sm  text-gray-600'>Ballygunge, Kolkata, West Bengal 700019</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-cash-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹185.48</h3>
                            <p className='text-sm  text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 w-full">
                    <Link to='/captain-dashboard'
                        className='w-full mt-5 flex justify-center text-lg bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</Link>
                    <p className="text-red-500 mt-4 font-medium text-xs text-center">Click on finish ride button if you have received the payment.</p>
                </div>
            </div>
        </div>)
}

export default FinishRide