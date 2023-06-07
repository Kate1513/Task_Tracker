import { ref, set, get, onValue, update, remove, child, push } from 'firebase/database'
import { db } from './firebase.js'


// Create User in the DB.
const registerUser = async (uid, nickname) => {
  await set(ref(db, 'users/' + uid), {
    name: nickname,
  })
}

// Get user data from the DB.
const getUserData = async (uid) => {
  const dbRef = ref(db)
  const userSnap = await get(child(dbRef, `users/${uid}`))
  if (userSnap.exists()) {
    return userSnap.val()
  } else {
    throw new Error('No existe el usuario en la base de datos.')
  }
}

// Add new task.
const addTask = async (uid, task) => {
  try {
    const newTaskRef = push(child(ref(db), `user-tasks/${uid}`))
    return await set(newTaskRef, task)
  } catch (error) {
    throw new Error('Error al agregar la tarea.')
  }
}

// Get user Tasks.
const getUserTasks = async (uid) => {
  const userTasksRef = ref(db, `user-tasks/${uid}`)
  let data = {}
  onValue(userTasksRef, (snapshot) => {
     data = snapshot.val()
  })
  return data ? Object.entries(data).map(([key, value]) => ({ taskId: key, task: value })) : []
}

// Edit task.
const editTask = async (uid, taskId, task) => {
  try {
    const updatePost = {}
    updatePost[`user-tasks/${uid}/${taskId}`] = task
    return update(ref(db), updatePost)
  } catch {
    throw new Error('Error al actualizar la tarea.')
  }
}

// Remove task.
const removeTask = async (uid, taskIdToBeRemove) => {
  try {
    remove(ref(db, `user-tasks/${uid}/${taskIdToBeRemove}`))
  } catch {
    throw new Error('Error al eliminar la tarea.')
  }
}

export { registerUser, getUserData, getUserTasks, addTask, editTask, removeTask }
