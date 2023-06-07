import React from 'react'
import { PropTypes } from 'prop-types'
import { addTask, editTask } from '../services/realTimeDB'
import { useAuth } from '../services/auth'
import { ButtonAuth } from './Buttons'

function Input(props) {
  return (
    <div className='mb-6'>
      <label htmlFor={props.name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder={props.placeholder}
        onChange={props.onChange}
        required
      />
    </div>
  )
}

function TaskContent({ type, title, content, taskId }) {
  const auth = useAuth()

  const submitTask = (e) => {
    e.preventDefault()

    const task = {
      title: e.target.title.value,
      content: e.target.content.value,
      completed: false,
    }

    if (type === 'new') {
      return addTask(auth.loggedUser.user.uid, task)
    }
    if (type === 'edit') {
      return editTask(auth.loggedUser.user.uid, taskId, task)
    }
  }

  return (
    <>
      <form onSubmit={submitTask}>
        <input
          type='text'
          id='title'
          placeholder='Nombre de Tarea'
          className='block w-full p-2 mb-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          required
          defaultValue={title}
        />
        <div className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
          <div className='px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800'>
            <textarea
              id='content'
              rows='4'
              className='w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400'
              placeholder='Escribe tu tarea...'
              required
              defaultValue={content}
            />
          </div>
          <div className='flex items-center justify-end px-3 py-2 border-t dark:border-gray-600'>
            {type === 'new' ? <ButtonAuth>Crear</ButtonAuth> : <ButtonAuth>Guardar</ButtonAuth>}
          </div>
        </div>
      </form>
    </>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

TaskContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
}

export { Input, TaskContent }
