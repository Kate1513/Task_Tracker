import React, { useState, useEffect } from 'react'
import { getUserTasks, editTask, removeTask } from '../services/realTimeDB'
import { TaskContent } from './Inputs'
import { XMarkIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CheckTask } from './Buttons'
import { PropTypes } from 'prop-types'
import { useAuth } from '../services/auth'

function PrintTask() {
  const auth = useAuth()
  const [userTasks, setUserTasks] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)

  const toggleModal = () => {
    setOpenEdit(!openEdit)
    setTaskToEdit(null)
  }

  const updateChecked = (element) => {
    element.task.completed = !element.task.completed
    editTask(auth.loggedUser.user.uid, element.taskId, element.task)
  }
  const toUpdate = (element) => {
    setTaskToEdit(element)
    setOpenEdit(true)
  }

  const deleteTask = (element) => {
    removeTask(auth.loggedUser.user.uid, element.taskId)
  }

  useEffect(() => {
    getUserTasks(auth.loggedUser.user.uid).then((tasks) => setUserTasks(() => tasks))
  }, [userTasks])

  return (
    <>
      {taskToEdit && openEdit ? (
        <EditTask
          isOpen={openEdit}
          onClose={toggleModal}
          title={taskToEdit.task.title}
          content={taskToEdit.task.content}
          taskId={taskToEdit.taskId}
        />
      ) : null}
      {userTasks.length > 0 ? (
        userTasks.map((element) => (
          <>
            <section className='block max-w-sm px-6 py-4 mx-6 sm:mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
              <div className='flex justify-between border-b'>
                <CheckTask checked={element.task.completed} onClick={() => updateChecked(element)} />
                <div className='flex sm:mr-2 pb-1'>
                  {openEdit ? null : (
                    <PencilSquareIcon
                      onClick={() => toUpdate(element)}
                      className='h-7 w-7 text-gray-500 cursor-pointer'
                    />
                  )}
                  <TrashIcon
                    onClick={() => deleteTask(element)}
                    className='h-7 w-7 ml-2 text-gray-500 cursor-pointer'
                  />
                </div>
              </div>
              <div>
                <h5
                  className={
                    element.task.completed
                      ? 'mb-2 text-2xl font-bold tracking-tight line-through text-green-500 dark:text-white'
                      : 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'
                  }
                >
                  {element.task.title}
                </h5>
                <div className='max-h-52 overflow-auto'>
                  <p className='font-normal break-words text-gray-700 dark:text-gray-400'>{element.task.content}</p>
                </div>
              </div>
            </section>
          </>
        ))
      ) : (
        <h1 className='flex justify-center my-12 text-xl sm:text-3xl text-center'>¡Animate a crear una nueva tarea!</h1>
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
        <TaskContent type='new'></TaskContent>
      </div>
    </>
  )
}

function EditTask({ isOpen, onClose, title, content, taskId }) {
  if (!isOpen) {
    return null
  }
  return (
    <>
      <div className='block max-w-sm px-5 py-3 mx-6 sm:mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
        <div className='flex justify-end border-b mb-2'>
          <p>
            Editando: <strong>{title}</strong>
          </p>
          <XMarkIcon onClick={onClose} className='h-6 w-6 mb-1 text-gray-500 cursor-pointer' />
        </div>
        <TaskContent type='edit' title={title} content={content} taskId={taskId}></TaskContent>
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

EditTask.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export { PrintTask, CreateTask, EditTask }
