import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen '>

            <Link to='/home' className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>

            <div className="h-1/2">
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>

            <div className="h-1/2 p-4">
                <div className="flex items-center justify-between">
                    <img className='h-20' src="https://www.svgrepo.com/show/408292/car-white.svg" alt="" />

                    <div className="text-right">
                        <h2 className='text-lg font-medium'>Dipankar Saha</h2>
                        <h4 className='text-2xl font-semibold -mt-1 -mb-1'>WB07 B3344</h4>
                        <p className='text-sm text-gray-600'>Hero Honda Karizma</p>

                    </div>
                </div>

                <div className='flex flex-col gap-4 justify-between items-center'>

                    <div className='w-full mt-5'>

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

                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>

        </div>
    )
}

export default Riding