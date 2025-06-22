import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setRidePopUpPanel(false);
                }}><i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>

            <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
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

                <div className="flex mt-5 w-full items-center justify-between">
                    <button onClick={() => {
                        props.setRidePopUpPanel(false);
                    }} className='mt-1 bg-gray-300 text-gray-700 font-semibold p-3 px-12 rounded-lg'>Ignore</button>

                    <button onClick={() => {
                        props.setConfirmRidePopUpPanel(true);
                    }} className='mt-1 bg-green-600 text-white font-semibold p-3 px-12 rounded-lg'>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp