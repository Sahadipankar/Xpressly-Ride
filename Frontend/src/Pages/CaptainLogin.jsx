import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => { // This component renders a login form for captains to log in to their accounts.

    const [email, setEmail] = useState('') // useState hook is used to manage the email state of the input field.

    const [password, setPassword] = useState('') // useState hook is used to manage the password state of the input field.

    const [CaptainData, setCaptainData] = useState({})

    const submitHandler = (e) => { // This function handles the form submission.
        e.preventDefault() // Prevents the default form submission behavior.

        // Collecting captain data from the input fields
        setCaptainData({
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
                <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Logo" />

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

                <p className='text-center font font-semibold'>New here? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
            </div>


            <div>
                <Link to='/login' className='flex items-center justify-center bg-[#d5622d] text-white font-semibold mb-5 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin