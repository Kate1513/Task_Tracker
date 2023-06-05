import React, { useState } from 'react'
import { useAuth } from '../services/auth'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/Input'
import { ButtonAuth } from '../components/Buttons'
import { Alert, Warning } from '../components/Alerts'

function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState('')
  const [error, setError] = useState('')

  const auth = useAuth()
  const navigate = useNavigate()

  const createUser = (e) => {
    e.preventDefault()
    auth.signUpUser(email, password, username).catch(() => {
      setError('Correo invalido')
    })
  }

  const goLogin = () => {
    navigate('/')
  }

  const handlePassword = (e) => {
    const value = e.target.value
    setPassword(value)

    if (value.length >= 6) {
      setWarning('')
    } else {
      setWarning('La contraseña debe tener al menos 6 caracteres.')
    }
  }

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a className='flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white'>
          <img className='w-12 h-12 mr-2' src='/public/note-img.svg' alt='logo' />
          Task Tracker
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Crea una cuenta
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={createUser}>
              <Input
                type='text'
                name='name'
                id='name'
                value={username}
                placeholder='Ingresa tu nombre'
                label='Nombre*'
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                type='email'
                name='email'
                id='email'
                value={email}
                placeholder='name@company.com'
                label='Email*'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <Alert>{error}</Alert>}
              <Input
                type='password'
                name='password'
                id='password'
                value={password}
                placeholder='******'
                label='Contraseña*'
                onChange={handlePassword}
                required
              />
              {warning && <Warning>{warning}</Warning>}
              <ButtonAuth>Crear cuenta</ButtonAuth>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                ¿Ya tienes una cuenta?{' '}
                <a onClick={goLogin} className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  Inicia sesión aquí
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export { SignUp }
