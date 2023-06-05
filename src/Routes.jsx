import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './services/auth'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { PageNotFound } from './pages/PageNotFound'

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
