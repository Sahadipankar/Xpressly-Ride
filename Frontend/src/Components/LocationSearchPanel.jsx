import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        setPanelOpen(false)
    }

    return (
        <div className="p-4">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">
                {activeField === 'pickup' ? 'Select Pickup Location' : 'Select Destination'}
            </h4>

            {suggestions && suggestions.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {suggestions.map((elem, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleSuggestionClick(elem)}
                            className='flex gap-3 border-2 border-gray-100 hover:border-gray-300 active:border-black rounded-xl items-center p-3 cursor-pointer transition-all duration-200 hover:shadow-sm'
                        >
                            <div className='bg-gray-100 h-10 w-10 flex items-center justify-center rounded-full flex-shrink-0'>
                                <i className={`${activeField === 'pickup' ? 'ri-map-pin-user-fill text-green-600' : 'ri-map-pin-fill text-red-600'}`}></i>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className='font-medium text-sm md:text-base text-gray-800 truncate'>{elem}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 mx-auto mb-4"></div>
                    <p className="text-gray-600">Searching for locations...</p>
                </div>
            )}
        </div>
    )
}

export default LocationSearchPanel