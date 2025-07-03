/**
 * LiveTracking Component
 * 
 * Real-time GPS tracking component using Google Maps API.
 * Displays current location, tracks movement, and updates position every second.
 * Used for live location tracking during rides and driver matching.
 */

import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'

// Map container styling
const containerStyle = {
    width: '100%',
    height: '100%',
};

// Default center coordinates (fallback location)
const center = {
    lat: -3.745,
    lng: -38.523
};

const LiveTracking = () => {
    // State to track current GPS position
    const [currentPosition, setCurrentPosition] = useState(center);

    // Effect to initialize geolocation and set up position tracking
    useEffect(() => {
        // Get initial position
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        // Set up continuous position watching
        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        // Cleanup: stop watching position on component unmount
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    // Effect to update position every second for real-time tracking
    useEffect(() => {
        /**
         * Update current position from GPS
         * Called every second to ensure real-time accuracy
         */
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
            });
        };

        updatePosition(); // Initial position update

        // Set up interval for continuous position updates
        const intervalId = setInterval(updatePosition, 1000);

    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    )
}

export default LiveTracking