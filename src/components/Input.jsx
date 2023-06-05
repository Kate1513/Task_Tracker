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

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export { Input }
