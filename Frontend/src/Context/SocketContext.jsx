// Socket Context - manages real-time WebSocket connections
import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create context for socket instance sharing
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initialize socket connection with configuration
        const newSocket = io(`${import.meta.env.VITE_BASE_URL}`, {
            autoConnect: true,           // Automatically connect on initialization
            reconnection: true,          // Enable auto-reconnection
            reconnectionDelay: 1000,     // Wait 1 second before reconnection attempts
            reconnectionAttempts: 5,     // Maximum reconnection attempts
            timeout: 20000,              // Connection timeout in milliseconds
        });

        // Handle successful connection
        newSocket.on('connect', () => {
        });

        // Handle disconnection events
        newSocket.on('disconnect', (reason) => {
        });

        // Handle connection errors
        newSocket.on('connect_error', (error) => {
        });

        setSocket(newSocket);

        // Cleanup: close socket when component unmounts
        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;