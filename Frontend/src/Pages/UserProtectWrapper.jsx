/**
 * UserProtectWrapper Component
 * 
 * A higher-order component that protects user routes by checking authentication status.
 * Validates user token, fetches user profile, and redirects to login if unauthorized.
 * Provides loading state while authentication is being verified.
 */

import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children // Child components to render if user is authenticated
}) => {

    // Authentication state management
    const token = localStorage.getItem('token') // Retrieve JWT token from local storage
    const navigate = useNavigate() // Navigation hook for route redirection
    const { user, setUser } = useContext(UserDataContext) // User context for global state
    const [isLoading, setIsLoading] = useState(true) // Loading state during authentication check

    // Effect to validate user authentication on component mount
    useEffect(() => {
        // Redirect to login if no token exists
        if (!token) {
            navigate('/login')
        }

        // Fetch user profile to validate token and get user data
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}` // Send token in Authorization header
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data) // Set user data in context
                setIsLoading(false) // Stop loading spinner
            }
        })
            .catch(err => {
                // Handle authentication errors by clearing token and redirecting
                localStorage.removeItem('token')
                navigate('/login')
            })

    }, [token])

    // Show loading spinner while authentication is being verified
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    // Render protected content once authentication is confirmed
    return (
        <>
            {children} {/* Render child components for authenticated users */}
        </>
    )
}

export default UserProtectWrapper