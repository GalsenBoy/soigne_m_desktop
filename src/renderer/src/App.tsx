/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './components/auth/Login'
import './assets/app/globals.css'
import Register from './components/auth/Register'
import Home from './components/Home'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
