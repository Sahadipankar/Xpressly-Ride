import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../Context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({
    children // This component is a wrapper that protects routes for authenticated users.
}) => {

    const token = localStorage.getItem('token') // Retrieve the token from local storage.
    const navigate = useNavigate() // Hook to programmatically navigate to different routes.
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) { // If there is no token, redirect to the login page.
            navigate('/captain-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the request headers for authentication.
            }
        }).then((response) => {
            if (response.status === 200) {
                setCaptain(response.data.captain) // If the response is successful, set the captain data in the context.
                setIsLoading(false) // Set loading to false after fetching the captain data.
            }
        })
            .catch(err => {
                console.log(err) // Log any errors that occur during the request.
                localStorage.removeItem('token') // Remove the token from local storage if there is an error.
                navigate('/captain-login') // If there is an error, redirect to the login page.
            })
    }, [token])


    if (isLoading) {
        return <div>Loading...</div> // Show a loading message while the authentication status is being checked.
    }
    return (
        <>
            {children} {/* Render the children components if the user is authenticated */}
        </>
    )
}

export default CaptainProtectWrapper