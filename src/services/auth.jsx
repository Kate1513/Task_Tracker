import React from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { registerUser } from './realTimeDB'
import { useNavigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'

const AuthContext = React.createContext()

function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [loggedUser, setLoggedUser] = React.useState(null)

  // Create user with email and password
  const signUpUser = async (email, password, nickname) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      registerUser(userCredential.user.uid, nickname)
      navigate('/')
    } catch {
      throw new Error('Email ya registrado.')
    }
  }

  // Login with email and password
  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setLoggedUser(userCredential)
      navigate('/home')
    } catch {
      throw new Error('No existe el usuario')
    }
  }

  // LogOut User
  const logOutUser = () => {
    window.sessionStorage.clear()
    setLoggedUser(null)
    signOut(auth)
    navigate('/')
  }

  const authUser = { loggedUser, signUpUser, loginUser, logOutUser }

  return <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
}

function useAuth() {
  const authContext = React.useContext(AuthContext)
  return authContext
}

AuthProvider.propTypes = {
  children: PropTypes.object,
}

export { AuthProvider, useAuth }
