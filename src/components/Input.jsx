import React from 'react'
import { PropTypes } from 'prop-types'

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

function TaskContent(props) {
  return (
    <>
      <input
        type='text'
        id='small-input'
        placeholder='Nombre de Tarea'
        className='block w-full p-2 mb-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      >
        {props.title}
      </input>
      <form>
        <div className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
          <div className='px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800'>
            <textarea
              id='comment'
              rows='4'
              className='w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400'
              placeholder='Escribe tu tarea...'
              required
            >
              {props.content}
            </textarea>
          </div>
          <div className='flex items-center justify-end px-3 py-2 border-t dark:border-gray-600'>
            <button
              type='submit'
              className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
            >
              Crear
            </button>
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
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export { Input, TaskContent }
