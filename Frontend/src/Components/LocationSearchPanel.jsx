import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
    const [recentLocations] = useState([
        "Mumbai International Airport, Andheri East, Mumbai",
        "Connaught Place, New Delhi",
        "Brigade Road, Bangalore",
        "Park Street, Kolkata",
        "Marina Beach, Chennai"
    ])

    const [nearbyPlaces] = useState([
        { name: "Nearby Restaurants", icon: "ri-restaurant-line", places: ["McDonald's", "KFC", "Domino's"] },
        { name: "Hospitals", icon: "ri-hospital-line", places: ["Apollo Hospital", "Fortis Healthcare"] },
        { name: "Shopping Malls", icon: "ri-shopping-cart-line", places: ["Phoenix Mall", "Express Avenue"] },
        { name: "Hotels", icon: "ri-hotel-line", places: ["Taj Hotel", "ITC Grand"] }
    ])

    const [gettingLocation, setGettingLocation] = useState(false)

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        setPanelOpen(true)
    }

    const handleRecentLocationClick = (location) => {
        handleSuggestionClick(location)
    }

    const handleCurrentLocation = async () => {
        setGettingLocation(true)

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords

                        // Use reverse geocoding to get address from coordinates
                        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-address`, {
                            params: {
                                lat: latitude,
                                lng: longitude
                            },
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })

                        const address = response.data.results[0]?.formatted_address ||
                            `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`

                        if (activeField === 'pickup') {
                            setPickup(address)
                        } else if (activeField === 'destination') {
                            setDestination(address)
                        }
                        setPanelOpen(true)

                    } catch (error) {
                        console.error('Error getting address:', error)
                        // Fallback to coordinates
                        const fallbackAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                        if (activeField === 'pickup') {
                            setPickup(fallbackAddress)
                        } else if (activeField === 'destination') {
                            setDestination(fallbackAddress)
                        }
                        setPanelOpen(true)
                    } finally {
                        setGettingLocation(false)
                    }
                },
                (error) => {
                    console.error('Error getting location:', error)
                    alert('Unable to get your location. Please enable location services and try again.')
                    setGettingLocation(false)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 60000
                }
            )
        } else {
            alert('Geolocation is not supported by this browser.')
            setGettingLocation(false)
        }
    }

    return (
        <div className="p-4 bg-gradient-to-b from-white to-gray-50">
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeField === 'pickup' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                    <i className={`${activeField === 'pickup' ? 'ri-map-pin-user-fill text-green-600' : 'ri-map-pin-fill text-red-600'}`}></i>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                        {activeField === 'pickup' ? 'Select Pickup Location' : 'Choose Destination'}
                    </h4>
                    <p className="text-sm text-gray-500">
                        {activeField === 'pickup' ? 'Where should we pick you up?' : 'Where would you like to go?'}
                    </p>
                </div>
            </div>

            {/* Search Results */}
            {suggestions && suggestions.length > 0 ? (
                <div className="mb-6">
                    <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <i className="ri-search-line text-blue-600"></i>
                        Search Results
                    </h5>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {suggestions.map((elem, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleSuggestionClick(elem)}
                                className='flex gap-3 border border-gray-200 hover:border-blue-300 active:border-blue-500 rounded-xl items-center p-3 cursor-pointer transition-all duration-200 hover:shadow-md bg-white group'
                            >
                                <div className={`h-10 w-10 flex items-center justify-center rounded-full flex-shrink-0 ${activeField === 'pickup' ? 'bg-green-100 group-hover:bg-green-200' : 'bg-red-100 group-hover:bg-red-200'
                                    }`}>
                                    <i className={`${activeField === 'pickup' ? 'ri-map-pin-user-fill text-green-600' : 'ri-map-pin-fill text-red-600'}`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className='font-medium text-sm md:text-base text-gray-800 truncate group-hover:text-blue-700 transition-colors'>{elem}</h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <i className="ri-map-line mr-1"></i>
                                        India • Tap to select
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <i className="ri-arrow-right-s-line text-gray-400 group-hover:text-blue-600 transition-colors"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-6 mb-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Searching for locations...</p>
                    <p className="text-sm text-gray-500 mt-1">Finding the best matches for you</p>
                </div>
            )}

            {/* Recent Locations */}
            <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <i className="ri-time-line text-purple-600"></i>
                    Recent Locations
                </h5>
                <div className="space-y-2">
                    {recentLocations.slice(0, 3).map((location, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleRecentLocationClick(location)}
                            className='flex gap-3 border border-gray-100 hover:border-purple-200 rounded-lg items-center p-3 cursor-pointer transition-all duration-200 hover:bg-purple-50 group'
                        >
                            <div className="bg-purple-100 group-hover:bg-purple-200 h-8 w-8 flex items-center justify-center rounded-full flex-shrink-0">
                                <i className="ri-history-line text-purple-600 text-sm"></i>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className='font-medium text-sm text-gray-800 truncate group-hover:text-purple-700 transition-colors'>{location}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nearby Places Categories */}
            <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <i className="ri-compass-3-line text-orange-600"></i>
                    Nearby Places
                </h5>
                <div className="grid grid-cols-2 gap-3">
                    {nearbyPlaces.map((category, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-gray-200 hover:border-orange-200 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md group"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <i className={`${category.icon} text-orange-600 group-hover:text-orange-700`}></i>
                                <h6 className="text-sm font-medium text-gray-800 group-hover:text-orange-700 transition-colors">{category.name}</h6>
                            </div>
                            <div className="space-y-1">
                                {category.places.slice(0, 2).map((place, placeIdx) => (
                                    <div
                                        key={placeIdx}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleSuggestionClick(place)
                                        }}
                                        className="text-xs text-gray-600 hover:text-orange-600 hover:bg-orange-50 p-1 rounded transition-colors cursor-pointer"
                                    >
                                        {place}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Location Option */}
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div
                    onClick={handleCurrentLocation}
                    className={`flex gap-3 border rounded-xl items-center p-3 cursor-pointer transition-all duration-200 hover:shadow-md group ${gettingLocation
                            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                            : 'border-blue-200 hover:border-blue-400 bg-blue-50'
                        }`}
                >
                    <div className={`h-10 w-10 flex items-center justify-center rounded-full flex-shrink-0 ${gettingLocation
                            ? 'bg-gray-200'
                            : 'bg-blue-100 group-hover:bg-blue-200'
                        }`}>
                        {gettingLocation ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        ) : (
                            <i className="ri-navigation-line text-blue-600"></i>
                        )}
                    </div>
                    <div className="flex-1">
                        <h4 className={`font-medium text-base transition-colors ${gettingLocation
                                ? 'text-gray-600'
                                : 'text-blue-800 group-hover:text-blue-900'
                            }`}>
                            {gettingLocation ? 'Getting Location...' : 'Use Current Location'}
                        </h4>
                        <p className={`text-sm ${gettingLocation
                                ? 'text-gray-500'
                                : 'text-blue-600'
                            }`}>
                            {gettingLocation ? 'Please wait...' : 'Automatically detect your location'}
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <i className={`ri-gps-line text-lg ${gettingLocation ? 'text-gray-500' : 'text-blue-600'
                            }`}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationSearchPanel