import React, { useContext } from 'react'
import { CaptainDataContext } from '../Context/CaptainContext'

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3">
                    <img
                        className='h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border-2 border-gray-200'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKX2y-92Lgl0fEgjNpgWZhDcDZNz9J1jkrg&s"
                        alt="Captain Avatar"
                    />
                    <div>
                        <h4 className="text-lg md:text-xl font-medium capitalize">
                            {captain?.fullname?.firstname} {captain?.fullname?.lastname}
                        </h4>
                        <p className="text-sm text-gray-600">{captain?.vehicle?.vehicleType} • {captain?.vehicle?.plate}</p>
                    </div>
                </div>
                <div className="text-right">
                    <h4 className="text-xl md:text-2xl font-semibold text-green-600">₹{captain?.earnings || 0}</h4>
                    <p className="text-sm text-gray-600">Today's Earned</p>
                </div>
            </div>

            <div className="flex p-3 md:p-4 mt-6 bg-gray-100 rounded-xl justify-center gap-3 md:gap-5 items-start">
                <div className="text-center flex-1">
                    <i className="text-2xl md:text-3xl mb-2 font-light ri-timer-2-line text-blue-600"></i>
                    <h5 className="text-lg md:text-xl font-medium">{captain?.hoursOnline || 0}</h5>
                    <p className="text-xs md:text-sm text-gray-600">Hours Online</p>
                </div>
                <div className="text-center flex-1">
                    <i className="text-2xl md:text-3xl mb-2 font-light ri-speed-up-line text-green-600"></i>
                    <h5 className="text-lg md:text-xl font-medium">{captain?.totalDistance || 0} km</h5>
                    <p className="text-xs md:text-sm text-gray-600">Distance</p>
                </div>
                <div className="text-center flex-1">
                    <i className="text-2xl md:text-3xl mb-2 font-light ri-booklet-line text-orange-600"></i>
                    <h5 className="text-lg md:text-xl font-medium">{captain?.totalRides || 0}</h5>
                    <p className="text-xs md:text-sm text-gray-600">Total Rides</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails