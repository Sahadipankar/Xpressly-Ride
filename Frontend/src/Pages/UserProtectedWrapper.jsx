import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({
    children // This component is a wrapper that protects routes for authenticated users.
}) => {

    const token = localStorage.getItem('token') // Retrieve the token from local storage.
    const navigate = useNavigate() // Hook to programmatically navigate to different routes.

    useEffect(() => {
        if (!token) { // If there is no token, redirect to the login page.
            navigate('/login')
        }

    }, [token])

    return (
        <>
            {children} {/* Render the children components if the user is authenticated */}
        </>
    )
}

export default UserProtectedWrapper