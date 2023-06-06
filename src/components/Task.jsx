import React, { useState, useEffect } from 'react'
import { getUserData } from '../services/realTimeDB'
import { TaskContent } from './Input'
import { XMarkIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CheckTask } from './Buttons'
import { PropTypes } from 'prop-types'

function PrintTask({ uid }) {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(uid)
        setUserData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [uid])

  return (
    <>
      {userData ? (
        <section className='block max-w-sm px-6 py-4 mx-6 sm:mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
          <div className='flex justify-between border-b'>
            <CheckTask></CheckTask>
            <div className='flex sm:mr-2 pb-1'>
              <PencilSquareIcon className='h-7 w-7 text-gray-500 cursor-pointer' />
              <TrashIcon className='h-7 w-7 ml-2 text-gray-500 cursor-pointer' />
            </div>
          </div>
          <div>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{userData.title}</h5>
            <div className='max-h-52 overflow-auto'>
              <p className='font-normal break-words text-gray-700 dark:text-gray-400'>
                {userData.content}
                Contenidooooooooooooooooooooooooooooooooooooooooooo. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed cursus nibh in metus tristique, vitae dignissim urna placerat. Phasellus ultrices ligula ut
                consectetur laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; Curabitur ullamcorper, ligula in iaculis lobortis, turpis velit gravida metus, et luctus metus
                erat vitae nunc. Integer vitae elementum nisi. Sed suscipit scelerisque consectetur. Integer nec dui
                vitae mauris facilisis malesuada in sit amet nulla. Ut scelerisque augue tellus, non ullamcorper nunc
                vestibulum in. Etiam tristique, sem eu accumsan gravida, metus enim tincidunt felis, sed malesuada mi ex
                id enim.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <h1 className='flex justify-center my-12 text-3xl'>Animate a crear una nueva tarea</h1>
      )}
    </>
  )
}

function CreateTask({ isOpen, onClose }) {
  if (!isOpen) {
    return null
  }
  return (
    <>
      <div className='block max-w-sm px-5 py-3 mx-6 sm:mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
        <div className='flex justify-end border-b mb-2'>
          <XMarkIcon onClick={onClose} className='h-6 w-6 mb-1 text-gray-500 cursor-pointer' />
        </div>
        <TaskContent></TaskContent>
      </div>
    </>
  )
}

PrintTask.propTypes = {
  uid: PropTypes.string,
}

CreateTask.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export { PrintTask, CreateTask }
