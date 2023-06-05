import React from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from './firebase'
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
      registerDocUser(userCredential.user.uid, nickname)
      navigate('/')
    } catch {
      throw new Error()
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

  // Create User Document in Firestore.
  const registerDocUser = async (uid, nickname) => {
    await setDoc(doc(db, 'Users', uid), {
      name: nickname,
    })
  }

  const authUser = { loggedUser, signUpUser, loginUser }

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
