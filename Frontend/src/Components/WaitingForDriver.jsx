import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.WaitingForDriver(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

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

            </div>
        </div>)
}

export default WaitingForDriver