import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const UserLogin = () => {
    // This component renders a login form for users to log in to their accounts.

    const [email, setEmail] = useState('')
    // useState hook is used to manage the email state of the input field.

    const [password, setPassword] = useState('')
    // useState hook is used to manage the password state of the input field.

    const [userData, setUserData] = useState({})

    const submitHandler = (e) => { // This function handles the form submission.
        e.preventDefault() // Prevents the default form submission behavior.

        // Collecting user data from the input fields
        setUserData({
            Email: email,
            Password: password
        })

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