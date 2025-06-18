import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserSignUp = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [userData, setUserData] = useState({})

    const submitHandler = (e) => { // This function handles the form submission.
        e.preventDefault() // Prevents the default form submission behavior.

        setUserData({
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password
        })

        // Resetting the input fields after submission
        setFirstName('')
        setLastName('')
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