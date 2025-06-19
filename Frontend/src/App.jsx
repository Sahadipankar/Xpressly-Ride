import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './Pages/Start'
import Home from './Pages/Home'
import UserLogin from './Pages/UserLogin'
import CaptainLogin from './Pages/CaptainLogin'
import UserSignUp from './Pages/UserSignUp'
import CaptainSignUp from './Pages/CaptainSignUp'
import UserProtectedWrapper from './Pages/UserProtectedWrapper'
import UserLogout from './Pages/UserLogout'
import CaptainDashboard from './Pages/CaptainDashboard'

const App = () => { // This is the main App component that sets up the routes for the application
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />

        <Route path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>} />

        <Route path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>} />

        <Route path="/captain-dashboard"
          element={
            <CaptainDashboard />
          } />
      </Routes>
    </div>
  )
}

export default App