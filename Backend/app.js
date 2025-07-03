const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDB = require('./DB/db');
const userRoutes = require('./Routes/user.routes');
const captainRoutes = require('./Routes/captain.routes');
const mapsRoutes = require('./Routes/maps.routes');
const rideRoutes = require('./Routes/ride.routes');

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);   // Use maps routes for API requests
app.use('/rides', rideRoutes); // Use ride routes for API requests


module.exports = app;
// This is a simple Express application that responds with "Hello World!" when the root URL is accessed.