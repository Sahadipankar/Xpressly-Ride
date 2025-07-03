// User Context - manages user state throughout the application
import React, { createContext } from 'react'
import { useState } from 'react'

// Create context for user data sharing across components
export const UserDataContext = createContext()

const UserContext = ({ children }) => {
    // User state with default structure for user data
    const [user, setUser] = useState({
        fullName: {
            firstName: '',
            lastName: ''
        },
        email: '',
    })

    return (
        <div>
            {/* Provide user data and setter to all child components */}
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext