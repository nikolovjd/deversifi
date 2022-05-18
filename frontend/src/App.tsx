import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthView from './components/Auth'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Deposit from './components/Deposit'
import NavBar from './components/NavBar'
import TradeView from './view/TradeView'
import RequireAuth from './components/RequireAuth'
import { AuthProvider } from './hooks/UseAuth'
import LandingView from './view/LandingView'

function App() {
  return (
    <div className='App'>
      <Container>
        <AuthProvider>
          <br />
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path='/' element={<LandingView />} />
              <Route path='/auth' element={<AuthView />} />
              <Route path='/deposit' element={<RequireAuth><Deposit /></RequireAuth>} />
              <Route path='/trade' element={<RequireAuth><TradeView /></RequireAuth>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Container>
    </div>
  )
}

export default App
