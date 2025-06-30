import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const logoutCaptain = async () => {
            try {
                const token = localStorage.getItem('token')

                if (!token) {
                    navigate('/captain-login')
                    return
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    localStorage.removeItem('token')
                    navigate('/captain-login')
                }
            } catch (error) {
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        }

        logoutCaptain()
    }, [navigate])

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">Logging out...</p>
            </div>
        </div>
    )
}

export default CaptainLogout