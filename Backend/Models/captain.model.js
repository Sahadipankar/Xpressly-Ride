const mongoose = require('mongoose');   // Import Mongoose for MongoDB object modeling
const bcrypt = require('bcrypt');       // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');    // Import jsonwebtoken for creating JWTs


const captainSchema = new mongoose.Schema({     // Define the captain schema

    fullname: {     // Nested schema for full name
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {        // Email field with validation
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'],
    },
    password: {     // Password field with validation
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    socketId: {     // Optional field for storing socket ID
        type: String,
    },
    status : {      // Status field with validation
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {      // Nested schema for vehicle details
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
            unique: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['Car', 'Bike', 'Auto'],
        },
    },
    location: {     // Nested schema for location details
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    }
})


captainSchema.methods.generateAuthToken = function () { // Method to generate JWT token for authentication
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};


captainSchema.methods.comparePassword = async function (password) { // Method to compare password with hashed password
    return await bcrypt.compare(password, this.password);
}


captainSchema.statics.hashPassword = async function (password) {    // Static method to hash password
    return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model('Captain', captainSchema);  // Create a Mongoose model for the captain schema


module.exports = captainModel;  // Export the captain model for use in other files