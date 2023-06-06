import React from 'react'
import { TaskContent } from './Input'
import { XMarkIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { PropTypes } from 'prop-types'

function PrintTask() {
  return (
    <>
      <section className='block max-w-sm max-h-80 overflow-auto px-6 py-4 mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
        <div className='flex justify-end border-b'>
          <div className='mr-2 pb-1'>
            <PencilSquareIcon className='h-7 w-7 text-gray-500 cursor-pointer' />
          </div>
          <div className='mr-2 pb-1'>
            <TrashIcon className='h-7 w-7 text-gray-500 cursor-pointer' />
          </div>
        </div>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Titulo de la tarea</h5>
        <p className='font-normal break-words text-gray-700 dark:text-gray-400'>
          Contenidooooooooooooooooooooooooooooooooooooooooooo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed cursus nibh in metus tristique, vitae dignissim urna placerat. Phasellus ultrices ligula ut consectetur
          laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur
          ullamcorper, ligula in iaculis lobortis, turpis velit gravida metus, et luctus metus erat vitae nunc. Integer
          vitae elementum nisi. Sed suscipit scelerisque consectetur. Integer nec dui vitae mauris facilisis malesuada
          in sit amet nulla. Ut scelerisque augue tellus, non ullamcorper nunc vestibulum in. Etiam tristique, sem eu
          accumsan gravida, metus enim tincidunt felis, sed malesuada mi ex id enim.
        </p>
      </section>
    </>
  )
}

function CreateTask({ isOpen, onClose }) {
  if (!isOpen) {
    return null
  }
  return (
    <>
      <div className='block max-w-sm px-6 py-4 mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
        <div className='flex justify-end border-b'>
          <XMarkIcon onClick={onClose} className='h-6 w-6 text-gray-500 cursor-pointer' />
        </div>
        <TaskContent></TaskContent>
      </div>
    </>
  )
}

CreateTask.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export { PrintTask, CreateTask }
