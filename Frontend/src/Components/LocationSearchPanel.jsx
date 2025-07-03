import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
    const [recentLocations, setRecentLocations] = useState([])

    useEffect(() => {
        const savedLocations = localStorage.getItem('recentLocations')
        if (savedLocations) {
            setRecentLocations(JSON.parse(savedLocations))
        } else {
            setRecentLocations([
                "Brainware University",
                "Baguiati, VIP Road, Kolkata",
                "Sealdah Railway Station",
                "Howrah Railway Station"
            ])
        }
    }, [])

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        addToRecentLocations(suggestion)
        setPanelOpen(false)
    }

    const addToRecentLocations = (location) => {
        const updatedLocations = [location, ...recentLocations.filter(loc => loc !== location)].slice(0, 2)
        setRecentLocations(updatedLocations)
        localStorage.setItem('recentLocations', JSON.stringify(updatedLocations))
    }

    return (
        <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 h-full panel-container panel-scroll prevent-zoom">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 flex-shrink-0 ${activeField === 'pickup'
                    ? 'bg-gradient-to-br from-emerald-400 to-green-500'
                    : 'bg-gradient-to-br from-rose-400 to-red-500'
                    }`}>
                    <i className={`${activeField === 'pickup' ? 'ri-map-pin-user-fill' : 'ri-map-pin-fill'} text-white text-base sm:text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate">
                        {activeField === 'pickup' ? 'Select Pickup Location' : 'Choose Destination'}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                        {activeField === 'pickup' ? 'Where should we pick you up?' : 'Where would you like to go?'}
                    </p>
                </div>
            </div>

            {/* Search Results */}
            {suggestions && suggestions.length > 0 ? (
                <div className="mb-4 sm:mb-6">
                    <h5 className="text-xs sm:text-sm font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="ri-search-line text-white text-xs sm:text-sm"></i>
                        </div>
                        Search Results
                    </h5>
                    <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto panel-scroll">
                        {suggestions.map((elem, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleSuggestionClick(elem)}
                                className='flex gap-3 sm:gap-4 bg-white/70 backdrop-blur-sm border border-white/40 hover:border-blue-300 hover:shadow-xl rounded-xl sm:rounded-2xl items-start p-3 sm:p-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group'
                            >
                                <div className={`h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-lg sm:rounded-xl flex-shrink-0 shadow-md transition-all duration-300 ${activeField === 'pickup'
                                    ? 'bg-gradient-to-br from-emerald-400 to-green-500 group-hover:from-emerald-500 group-hover:to-green-600'
                                    : 'bg-gradient-to-br from-rose-400 to-red-500 group-hover:from-rose-500 group-hover:to-red-600'
                                    }`}>
                                    <i className={`${activeField === 'pickup' ? 'ri-map-pin-user-fill' : 'ri-map-pin-fill'} text-white text-sm sm:text-base`}></i>
                                </div>
                                <div className="flex-1 min-w-0 pr-2">
                                    <h4 className='font-semibold text-sm sm:text-base text-gray-800 group-hover:text-blue-700 transition-colors leading-tight address-text'>{elem}</h4>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Tap to select location</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <i className="ri-arrow-right-circle-line text-xl sm:text-2xl text-gray-400 group-hover:text-blue-600 transition-colors"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-6 sm:py-8 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-white border-t-transparent"></div>
                    </div>
                    <p className="text-gray-700 font-bold text-base sm:text-lg">Searching locations...</p>
                </div>
            )}

            {/* Recent Locations */}
            <div className="mb-4 sm:mb-6">
                <h5 className="text-xs sm:text-sm font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-time-line text-white text-xs sm:text-sm"></i>
                    </div>
                    Recent Locations
                </h5>
                <div className="space-y-2 sm:space-y-3">
                    {recentLocations.slice(0, 4).map((location, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleSuggestionClick(location)}
                            className='flex gap-3 sm:gap-4 bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:border-purple-400 hover:shadow-lg rounded-lg sm:rounded-xl items-start p-3 sm:p-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group'
                        >
                            <div className="bg-gradient-to-br from-purple-400 to-pink-500 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg flex-shrink-0 shadow-md group-hover:from-purple-500 group-hover:to-pink-600 transition-all duration-300">
                                <i className="ri-history-line text-white text-xs sm:text-sm"></i>
                            </div>
                            <div className="flex-1 min-w-0 pr-2">
                                <h4 className='font-medium text-xs sm:text-sm text-gray-800 group-hover:text-purple-700 transition-colors leading-tight address-text'>{location}</h4>
                                <p className="text-xs text-gray-500 mt-1">Recent location</p>
                            </div>
                            <div className="flex-shrink-0">
                                <i className="ri-arrow-right-circle-line text-base sm:text-lg text-gray-400 group-hover:text-purple-600 transition-colors"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LocationSearchPanel