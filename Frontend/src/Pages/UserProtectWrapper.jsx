import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children // This component is a wrapper that protects routes for authenticated users.
}) => {

    const token = localStorage.getItem('token') // Retrieve the token from local storage.
    const navigate = useNavigate() // Hook to programmatically navigate to different routes.
    const { user, setUser } = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) { // If there is no token, redirect to the login page.
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the request headers for authentication.
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                localStorage.removeItem('token')
                navigate('/login')
            })

    }, [token])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }


    return (
        <>
            {children} {/* Render the children components if the user is authenticated */}
        </>
    )
}

export default UserProtectWrapper