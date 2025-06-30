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
                "Mumbai International Airport, Andheri East, Mumbai",
                "Connaught Place, New Delhi",
                "Brigade Road, Bangalore",
                "Park Street, Kolkata",
                "Marina Beach, Chennai"
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
        const updatedLocations = [location, ...recentLocations.filter(loc => loc !== location)].slice(0, 5)
        setRecentLocations(updatedLocations)
        localStorage.setItem('recentLocations', JSON.stringify(updatedLocations))
    }

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-full">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 ${activeField === 'pickup'
                    ? 'bg-gradient-to-br from-emerald-400 to-green-500'
                    : 'bg-gradient-to-br from-rose-400 to-red-500'
                    }`}>
                    <i className={`${activeField === 'pickup' ? 'ri-map-pin-user-fill' : 'ri-map-pin-fill'} text-white text-lg`}></i>
                </div>
                <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">
                        {activeField === 'pickup' ? 'Select Pickup Location' : 'Choose Destination'}
                    </h4>
                    <p className="text-sm text-gray-600">
                        {activeField === 'pickup' ? 'Where should we pick you up?' : 'Where would you like to go?'}
                    </p>
                </div>
            </div>

            {/* Search Results */}
            {suggestions && suggestions.length > 0 ? (
                <div className="mb-6">
                    <h5 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                            <i className="ri-search-line text-white text-sm"></i>
                        </div>
                        Search Results
                    </h5>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {suggestions.map((elem, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleSuggestionClick(elem)}
                                className='flex gap-4 bg-white/70 backdrop-blur-sm border border-white/40 hover:border-blue-300 hover:shadow-xl rounded-2xl items-center p-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group'
                            >
                                <div className={`h-12 w-12 flex items-center justify-center rounded-xl flex-shrink-0 shadow-md transition-all duration-300 ${activeField === 'pickup'
                                    ? 'bg-gradient-to-br from-emerald-400 to-green-500 group-hover:from-emerald-500 group-hover:to-green-600'
                                    : 'bg-gradient-to-br from-rose-400 to-red-500 group-hover:from-rose-500 group-hover:to-red-600'
                                    }`}>
                                    <i className={`${activeField === 'pickup' ? 'ri-map-pin-user-fill' : 'ri-map-pin-fill'} text-white`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className='font-semibold text-base text-gray-800 truncate group-hover:text-blue-700 transition-colors'>{elem}</h4>
                                    <p className="text-sm text-gray-500 mt-1">Tap to select location</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <i className="ri-arrow-right-circle-line text-2xl text-gray-400 group-hover:text-blue-600 transition-colors"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                    </div>
                    <p className="text-gray-700 font-bold text-lg">Searching locations...</p>
                </div>
            )}

            {/* Recent Locations */}
            <div className="mb-6">
                <h5 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <i className="ri-time-line text-white text-sm"></i>
                    </div>
                    Recent Locations
                </h5>
                <div className="space-y-3">
                    {recentLocations.slice(0, 4).map((location, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleSuggestionClick(location)}
                            className='flex gap-4 bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:border-purple-400 hover:shadow-lg rounded-xl items-center p-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group'
                        >
                            <div className="bg-gradient-to-br from-purple-400 to-pink-500 h-10 w-10 flex items-center justify-center rounded-lg flex-shrink-0 shadow-md group-hover:from-purple-500 group-hover:to-pink-600 transition-all duration-300">
                                <i className="ri-history-line text-white text-sm"></i>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className='font-medium text-sm text-gray-800 truncate group-hover:text-purple-700 transition-colors'>{location}</h4>
                                <p className="text-xs text-gray-500 mt-1">Recent location</p>
                            </div>
                            <div className="flex-shrink-0">
                                <i className="ri-arrow-right-circle-line text-lg text-gray-400 group-hover:text-purple-600 transition-colors"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LocationSearchPanel