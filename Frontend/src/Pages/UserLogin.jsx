import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' // Importing axios for making HTTP requests.


const UserLogin = () => {
    // This component renders a login form for users to log in to their accounts.

    const [email, setEmail] = useState('')
    // useState hook is used to manage the email state of the input field.
    const [password, setPassword] = useState('')
    // useState hook is used to manage the password state of the input field.
    const [userData, setUserData] = useState({})


    const { user, setUser } = useContext(UserDataContext) // Using the UserDataContext to get and set user data.
    const navigate = useNavigate() // Hook to programmatically navigate to different routes.


    const submitHandler = async (e) => { // This function handles the form submission.
        e.preventDefault() // Prevents the default form submission behavior.

        const userData = {
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData) // Sending a POST request to the server to log in the user.

        if (response.status === 200) { // If the response is successful
            const data = response.data // Extracting user data from the response.
            setUser(data.user) // Updating the user context with the new user data.
            localStorage.setItem('token', data.token) // Storing the token in local storage for authentication.
            navigate('/home') // Navigating to the home page after successful login.
        }

        // Resetting the input fields after submission
        setEmail('')
        setPassword('')
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-17 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />

                <form onSubmit={(e) =>
                    submitHandler(e)
                }>
                    <h3 className='text-lg font-medium mb-2'>What's your Email?</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded-sm px-4 py-2 border-2 border-gray-300 w-full text-lg placeholder:text-base'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder='email@example.com'
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter your Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded-sm px-4 py-2 border-2 border-gray-300 w-full text-lg placeholder:text-base'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder='password'
                    />
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>

                </form>

                <p className='text-center font font-semibold'>New here? <Link to='/signup' className='text-blue-600 '>Create new Account</Link></p>
            </div>


            <div>
                <Link to='/captain-login' className='flex items-center justify-center bg-[#10b461] text-white font-semibold mb-5 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin