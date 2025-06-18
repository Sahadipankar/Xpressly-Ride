import React, { createContext } from 'react'
import { useState } from 'react'

export const UserContextData = createContext()

const UserContext = ({children}) => {

    const [user, setUser] = useState({
        fullName: {
            firstName: '',
            lastName: ''
        },
        email: '',
    })

    return (
        <div>
            <UserContextData.Provider value={[user, setUser]}>
                {children}
            </UserContextData.Provider>
        </div>
    )
}

export default UserContext