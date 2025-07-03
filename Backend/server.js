/**
 * Server Entry Point
 * 
 * Main server file that creates HTTP server and initializes Socket.IO
 * for real-time communication. Starts the Xpressly backend service.
 */

const http = require('http');
const app = require('./app'); // Import configured Express application
const { initializeSocket } = require('./socket'); // Import Socket.IO configuration

// Set server port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Create HTTP server instance using the configured Express app
const server = http.createServer(app);

// Initialize Socket.IO for real-time features (live tracking, notifications)
initializeSocket(server);

// Start server and listen for incoming connections
server.listen(port, () => {
    console.log(`Xpressly Server running on port ${port}`);
});