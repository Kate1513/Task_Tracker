import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/auth'
import { Input } from '../components/Input'
import { Alert } from '../components/Alerts'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const auth = useAuth()
  const navigate = useNavigate()

  const login = (e) => {
    e.preventDefault()
    auth.loginUser(email, password).catch(() => {
      setError('Credenciales incorrectas.')
    })
  }

  const goSignUp = () => {
    navigate('/signup')
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
              Bienvenido
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={login}>
              <Input
                type='email'
                name='email'
                id='email'
                value={email}
                placeholder='name@company.com'
                label=' Email*'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type='password'
                name='password'
                id='password'
                value={password}
                placeholder='******'
                label='Contraseña*'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <Alert>{error}</Alert>}
              <button
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Iniciar Sesión
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                ¿No estás registrado?{' '}
                <a
                  onClick={goSignUp}
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer'
                >
                  Crea tu cuenta
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Login }
