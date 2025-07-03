/**
 * Socket.IO Service
 * 
 * Real-time communication system for the Xpressly ride-sharing platform.
 * Manages WebSocket connections between users and captains for live updates,
 * location tracking, and ride status notifications.
 */

const socketIo = require('socket.io');
const userModel = require('./Models/user.model');
const captainModel = require('./Models/captain.model');

let io; // Global socket.io instance

/**
 * Initialize Socket.IO server with CORS configuration
 * Sets up event listeners for user and captain real-time interactions
 * @param {Object} server - HTTP server instance
 */
function initializeSocket(server) {
    // Initialize Socket.IO with CORS settings for cross-origin requests
    io = socketIo(server, {
        cors: {
            origin: '*', // Allow all origins for development
            methods: ['GET', 'POST']
        }
    });

    // Handle new socket connections
    io.on('connection', (socket) => {

        /**
         * Handle user/captain joining the system
         * Associates socket ID with user/captain for targeted messaging
         */
        socket.on('join', async (data) => {
            const { userId, userType } = data;

            // Update user/captain record with current socket ID
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        /**
         * Handle captain location updates
         * Updates captain's real-time location for user tracking and matching
         */
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            // Validate location data structure
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            // Update captain's location in database for geospatial queries
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        /**
         * Handle user ride completion requests
         * Facilitates communication between user and captain for ride finalization
         */
        socket.on('user-complete-ride-request', async (data) => {
            const { rideId, paymentMethod } = data;

            try {
                const rideModel = require('./Models/ride.model');

                // Find ride with captain information
                const ride = await rideModel.findById(rideId).populate('captain');

                // Send completion request to captain if connected
                if (ride && ride.captain && ride.captain.socketId) {
                    io.to(ride.captain.socketId).emit('user-requests-ride-completion', {
                        rideId: rideId,
                        paymentMethod: paymentMethod,
                        message: 'User has requested to complete the ride'
                    });

                    // Acknowledge request to user
                    socket.emit('ride-completion-acknowledged', {
                        message: 'Request sent to driver'
                    });
                }
            } catch (error) {
                socket.emit('error', { message: 'Failed to send completion request' });
            }
        });

        /**
         * Handle socket disconnection
         * Clean up is handled automatically by Socket.IO
         */
        socket.on('disconnect', () => {
            // Connection cleanup is handled automatically by Socket.IO
        });
    });
}

/**
 * Send targeted message to specific socket ID
 * Enables direct communication with users or captains
 * @param {string} socketId - Target socket ID
 * @param {Object} messageObject - Message with event and data properties
 */
const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };