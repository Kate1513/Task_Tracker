import React, { useState } from 'react'
import { CreateTask } from './Task'
import { PropTypes } from 'prop-types'

function ButtonAuth({ children }) {
  return (
    <button
      type='submit'
      className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
    >
      {children}
    </button>
  )
}

function ButtonCreateTask() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button
        onClick={toggleModal}
        className='block mx-auto my-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
      >
        Crear nueva tarea
      </button>
      <CreateTask isOpen={isOpen} onClose={toggleModal}></CreateTask>
    </div>
  )
}

function CheckTask({ checked, onClick, label }) {
  return (
    <div className='flex items-center mb-4'>
      <input
        id='default-checkbox'
        type='checkbox'
        checked={checked}
        onClick={onClick}
        className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
      />
      <label htmlFor='default-checkbox' className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
        {label}
      </label>
    </div>
  )
}

ButtonAuth.propTypes = {
  children: PropTypes.string,
}

CheckTask.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
}

export { ButtonAuth, ButtonCreateTask, CheckTask }
