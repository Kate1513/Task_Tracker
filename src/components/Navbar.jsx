import React, { useEffect, useState } from 'react'
import { useAuth } from '../services/auth'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { getUserData } from '../services/realTimeDB'

function Navbar() {
  const [name, setName] = useState('')

  const auth = useAuth()

  const handleLogOut = () => {
    auth.logOutUser()
  }

  useEffect(() => {
    getUserData(auth.loggedUser.user.uid).then((response) => {
      setName(response.name)
    })
  }, [])

  return (
    <>
      <nav className='p-1 md:p-4 bg-white border-gray-200 dark:bg-gray-900'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4'>
          <div className='flex items-center'>
            <img src='/note-img.png' className='h-12 mr-3' alt='Logo' />
            <span className='self-center w-20 md:w-auto  sm:text-2xl font-semibold dark:text-white'>{name}</span>
          </div>
          <div className='flex items-center'>
            <a
              onClick={handleLogOut}
              className='flex flex-col items-center text-md font-bold text-primary-600 dark:text-blue-500 hover:underline cursor-pointer'
            >
              <ArrowRightOnRectangleIcon className='h-6 w-6 text-gray-500' />
              Cerrar sesion
            </a>
          </div>
        </div>
      </nav>
      <nav className='bg-gray-50 dark:bg-gray-700'>
        <div className='max-w-screen-xl px-4 py-3 mx-auto'>
          <div className='flex items-center'></div>
        </div>
      </nav>
    </>
  )
}

export { Navbar }
