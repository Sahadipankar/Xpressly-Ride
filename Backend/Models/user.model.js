const mongoose = require('mongoose');   // Import Mongoose for MongoDB object modeling
const bcrypt = require('bcrypt');     // Import bcrypt for password hashing   
const jwt = require('jsonwebtoken');    // Import jsonwebtoken for creating JWTs



const userSchema = new mongoose.Schema({    // Define the user schema
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
        type: String,
        required: true,
        select: false,  // Exclude password from queries by default
    },
    socketId: {  // Optional field for storing socket ID
        type: String,
    },
});


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (password) {  // Method to compare password with hashed password
    return await bcrypt.compare(password, this.password);  
}

userSchema.statics.hashPassword = async function (password) {  // Static method to hash password
    return await bcrypt.hash(password, 10);  // Hash the password with a salt rounds of 10
}


const userModel = mongoose.model('User', userSchema);  // Create a Mongoose model for the user schema


module.exports = userModel;  // Export the user model for use in other files