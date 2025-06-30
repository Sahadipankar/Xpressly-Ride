const socketIo = require('socket.io');
const userModel = require('./Models/user.model');
const captainModel = require('./Models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        socket.on('user-complete-ride-request', async (data) => {
            const { rideId, paymentMethod } = data;

            try {
                const rideModel = require('./Models/ride.model');
                const ride = await rideModel.findById(rideId).populate('captain');

                if (ride && ride.captain && ride.captain.socketId) {
                    io.to(ride.captain.socketId).emit('user-requests-ride-completion', {
                        rideId: rideId,
                        paymentMethod: paymentMethod,
                        message: 'User has requested to complete the ride'
                    });

                    socket.emit('ride-completion-acknowledged', {
                        message: 'Request sent to driver'
                    });
                }
            } catch (error) {
                socket.emit('error', { message: 'Failed to send completion request' });
            }
        });

        socket.on('disconnect', () => {
            // Connection cleanup is handled automatically
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };