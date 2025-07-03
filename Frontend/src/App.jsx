/**
 * Main Application Component
 * 
 * Defines the complete route structure for the Xpressly ride-sharing application.
 * Manages navigation between user and captain interfaces with authentication protection.
 * Implements route guards for secure access to protected areas.
 */

import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Import page components
import Start from './Pages/Start'
import Home from './Pages/Home'
import UserLogin from './Pages/UserLogin'
import CaptainLogin from './Pages/CaptainLogin'
import UserSignUp from './Pages/UserSignUp'
import CaptainSignUp from './Pages/CaptainSignUp'
import UserProtectWrapper from './Pages/UserProtectWrapper'
import UserLogout from './Pages/UserLogout'
import CaptainDashboard from './Pages/CaptainDashboard'
import CaptainProtectWrapper from './Pages/CaptainProtectWrapper'
import CaptainLogout from './Pages/CaptainLogout'
import Riding from './Pages/Riding'
import CaptainRiding from './Pages/CaptainRiding'

/**
 * App Component - Central routing configuration
 * Organizes routes into public, user-protected, and captain-protected sections
 */
const App = () => {
  return (
    <div>
      <Routes>
        {/* Public routes - accessible without authentication */}
        <Route path="/" element={<Start />} /> {/* Landing page */}
        <Route path="/login" element={<UserLogin />} /> {/* User login */}
        <Route path="/signup" element={<UserSignUp />} /> {/* User registration */}
        <Route path="/captain-login" element={<CaptainLogin />} /> {/* Captain login */}
        <Route path="/captain-signup" element={<CaptainSignUp />} /> {/* Captain registration */}

        {/* Active ride routes - accessible during ongoing trips */}
        <Route path="/riding" element={<Riding />} /> {/* User ride interface */}
        <Route path="/captain-riding" element={<CaptainRiding />} /> {/* Captain ride interface */}

        {/* Protected user routes - require user authentication */}
        <Route path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>} />

        <Route path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          } />

        {/* Protected captain routes - require captain authentication */}
        <Route path="/captain-dashboard"
          element={
            <CaptainProtectWrapper>
              <CaptainDashboard />
            </CaptainProtectWrapper>
          } />

        <Route path="/captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          } />
      </Routes>
    </div>
  )
}

export default App