/**
 * UserLogout Component
 * 
 * Handles user logout functionality by making API call to logout endpoint,
 * clearing authentication token, and redirecting to login page.
 * Displays loading spinner during logout process.
 */

import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate() // Navigation hook for route redirection

    // Effect to handle logout process on component mount
    useEffect(() => {
        /**
         * Async function to handle user logout
         * - Validates token existence
         * - Makes API call to logout endpoint
         * - Clears local storage and redirects to login
         */
        const logoutUser = async () => {
            try {
                const token = localStorage.getItem('token') // Get current auth token

                // Redirect to login if no token exists
                if (!token) {
                    navigate('/login')
                    return
                }

                // Make logout API call to invalidate token on server
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Send token for server validation
                    }
                })

                // Handle successful logout
                if (response.status === 200) {
                    localStorage.removeItem('token') // Clear token from local storage
                    navigate('/login') // Redirect to login page
                }
            } catch (error) {
                // Handle logout errors by clearing token and redirecting
                localStorage.removeItem('token')
                navigate('/login')
            }
        }

        logoutUser() // Execute logout function
    }, [navigate])

    // Render loading spinner while logout is in progress
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">Logging out...</p>
            </div>
        </div>
    )
}

export default UserLogout