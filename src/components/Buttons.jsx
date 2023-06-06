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

function ButtonCreateTask(params) {
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

function ButtonNewTask(onClose) {
  return (
    <>
      <button
        onClick={onClose}
        className='block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Crear
      </button>
    </>
  )
}

ButtonAuth.propTypes = {
  children: PropTypes.string,
}

export { ButtonAuth, ButtonCreateTask, ButtonNewTask }
