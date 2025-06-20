import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../Context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignUp = () => {

    const navigate = useNavigate() // Using useNavigate hook to programmatically navigate after form submission.

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')


    const { captain, setCaptain } = React.useContext(CaptainDataContext) // Using the CaptainDataContext to access and set captain data.

    const submitHandler = async (e) => { // This function handles the form submission.
        e.preventDefault() // Prevents the default form submission behavior.

        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData) // Sending a POST request to the server with the captain data.

        if (response.status === 201) { // If the response status is 201, it means the captain was created successfully.
            const data = response.data // Extracting the data from the response.
            setCaptain(data.captain) // Setting the captain data in the context.
            localStorage.setItem('token', data.token) // Storing the token in localStorage for authentication.
            navigate('/captain-dashboard') // Navigating to the captain dashboard after successful registration.
        }

        // Resetting the input fields after submission
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')

        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Logo" />

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


                    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className='flex gap-4 mb-7'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="text"
                            placeholder='Vehicle Color'
                            value={vehicleColor}
                            onChange={(e) => {
                                setVehicleColor(e.target.value)
                            }}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="text"
                            placeholder='Vehicle Plate'
                            value={vehiclePlate}
                            onChange={(e) => {
                                setVehiclePlate(e.target.value)
                            }}
                        />
                    </div>
                    <div className='flex gap-4 mb-7'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="number"
                            min="1" // Only allows positive numbers
                            placeholder='Vehicle Capacity'
                            value={vehicleCapacity}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || Number(value) > 0) {
                                    setVehicleCapacity(value);
                                }
                            }}
                        />
                        <select
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            value={vehicleType}
                            onChange={(e) => {
                                setVehicleType(e.target.value)
                            }}
                        >
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="Car">Car</option>
                            <option value="Auto">Auto</option>
                            <option value="Moto">Moto</option>
                        </select>
                    </div>



                    <button className='bg-[#111] text-white font-semibold mb-3 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain Account</button>

                </form>

                <p className='text-center font font-semibold'>Already have an account? <Link to='/captain-login' className='text-blue-600 '>Login Here</Link></p>
            </div>


            <div>
                <p className='text-[10px]'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.</p>
            </div>
        </div>
    )
}

export default CaptainSignUp