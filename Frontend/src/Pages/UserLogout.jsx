import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {

    const token = localStorage.getItem('token') // Retrieve the token from local storage.
    const navigate = useNavigate() // Hook to programmatically navigate to different routes.

    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token') // Remove the token from local storage on logout.
            navigate('/login') // Redirect to the login page after successful logout.
        }
    })

    return (
        <div>UserLogout</div>
    )
}

export default UserLogout