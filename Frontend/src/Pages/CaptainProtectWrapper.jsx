/**
 * CaptainProtectWrapper Component
 * 
 * A higher-order component that protects captain routes by checking authentication status.
 * Validates captain token, fetches captain profile, and redirects to captain login if unauthorized.
 * Provides loading state while authentication is being verified.
 */

import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../Context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({
    children // Child components to render if captain is authenticated
}) => {
    // Authentication state management
    const token = localStorage.getItem('token') // Retrieve JWT token from local storage
    const navigate = useNavigate() // Navigation hook for route redirection
    const { captain, setCaptain } = useContext(CaptainDataContext) // Captain context for global state
    const [isLoading, setIsLoading] = useState(true) // Loading state during authentication check

    // Effect to validate captain authentication on component mount
    useEffect(() => {
        // Redirect to captain login if no token exists
        if (!token) {
            navigate('/captain-login')
        }

        // Fetch captain profile to validate token and get captain data
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}` // Send token in Authorization header
            }
        }).then((response) => {
            if (response.status === 200) {
                setCaptain(response.data.captain) // Set captain data in context
                setIsLoading(false) // Stop loading spinner
            }
        })
            .catch(err => {
                // Handle authentication errors by clearing token and redirecting
                localStorage.removeItem('token')
                navigate('/captain-login')
            })
    }, [token])

    // Show loading spinner while authentication is being verified
    if (isLoading) {
        return <div>Loading...</div>
    }

    // Render protected content once authentication is confirmed
    return (
        <>
            {children} {/* Render child components for authenticated captains */}
        </>
    )
}

export default CaptainProtectWrapper