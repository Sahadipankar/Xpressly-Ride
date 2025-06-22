import React from 'react'
import { Route, Routes } from 'react-router-dom'
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

const App = () => { // This is the main App component that sets up the routes for the application
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />

        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />

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