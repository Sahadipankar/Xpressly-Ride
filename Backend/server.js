const http = require('http'); // Import the http module to create an HTTP server
const app = require('./app'); // Import the Express application from app.js
const port = process.env.PORT || 3000; // Set the port to the value from environment variables or default to 3000

const server = http.createServer(app); // Create an HTTP server using the Express app

server.listen(port, () => { // Start the server and listen on the specified port
    console.log(`Server is running on port ${port}`); // Log a message indicating the server is running
})
// This code creates an HTTP server using the Express application and listens on a specified port, logging a message when the server is running.

