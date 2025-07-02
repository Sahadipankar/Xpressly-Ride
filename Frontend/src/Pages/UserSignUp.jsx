import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios' // Importing axios for making HTTP requests.
import { UserDataContext } from '../Context/UserContext' // Importing the UserDataContext to manage user data.

const UserSignUp = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    const navigate = useNavigate() // Hook to programmatically navigate to different routes.

    const { user, setUser } = useContext(UserDataContext) // Using the UserDataContext to get and set user data.

    const submitHandler = async (e) => { // This function handles the form submission.
        e.preventDefault() // Prevents the default form submission behavior.

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser) // Sending a POST request to the server to create a new user.

        if (response.status === 201) { // If the response is successful
            const data = response.data // Extracting user data from the response.
            setUser(data.user) // Updating the user context with the new user data.
            localStorage.setItem('token', data.token) // Storing the token in local storage for authentication.
            navigate('/home') // Navigating to the home page after successful registration.
        }

        // Resetting the input fields after submission
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }


    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-17 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Xpressly Logo" />

                <form onSubmit={(e) =>
                    submitHandler(e)
                }>

                    <h3 className='text-lg w-full font-medium mb-2'>What's your Name?</h3>
                    <div className='flex gap-3 mb-6'>
                        <input
                            className='bg-[#eeeeee] w-1/2 rounded-sm px-4 py-2 border-2 border-gray-300 text-lg placeholder:text-base'
                            required
                            type="text"
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            className='bg-[#eeeeee] w-1/2 rounded-sm px-4 py-2 border-2 border-gray-300 text-lg placeholder:text-base'
                            required
                            type="text"
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />


                    </div>

                    <h3 className='text-lg font-medium mb-2'>What's your Email?</h3>
                    <input
                        className='bg-[#eeeeee] mb-6 rounded-sm px-4 py-2 border-2 border-gray-300 w-full text-lg placeholder:text-base'
                        required
                        type="email"
                        placeholder='email@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter your Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-6 rounded-sm px-4 py-2 border-2 border-gray-300 w-full text-lg placeholder:text-base'
                        required
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>

                </form>

                <p className='text-center font font-semibold'>Already have an account? <Link to='/login' className='text-blue-600 '>Login Here</Link></p>
            </div>


            <div>
                <p className='text-[10px]'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.</p>
            </div>
        </div>
    )
}

export default UserSignUp