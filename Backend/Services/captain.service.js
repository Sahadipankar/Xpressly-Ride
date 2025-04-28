const captainModel = require('../Models/captain.model');    // Import the captain model


module.exports.createCaptain = async ({     // Function to create a new captain
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType
}) => { 
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required'); // Check if all required fields are provided
    }

    const captain = captainModel.create({ // Create a new captain instance
        fullname: { firstname, lastname }, // Set the captain's name
        email, // Set the captain's email
        password, // Set the captain's password
        vehicle: { color, plate, capacity, vehicleType }, // Set the vehicle details
    });
    return captain; // Return the created captain instance
}