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
  const dbRef = ref(db);
  const userSnap = await get(child(dbRef, `users/${uid}`))
  if (userSnap.exists()) {
    return userSnap.val()
  } else {
      throw new Error('No existe el usuario en la base de datos.')
    }
}
// Add new toDo.
const addToDo = async(uid, toDo)=>{
  try{
    const newToDoId = push(child(ref(db, 'user-todos/'))).key
    const updatePost = {}
    updatePost[`/user-todos/${uid}/${newToDoId}`] = toDo
    return update(ref(db), updatePost)
  }
  catch{
    throw new Error('Error al agregar la tarea.')
  }  
}

// Get user toDos.
const getUserToDos = async (uid) => {
  const userToDos = onValue(ref(db, `user-todos/${uid}`))
  if (userToDos.exists()) {
    return userToDos.val()
  } else {
    throw new Error('No existe el usuario en la base de datos.')
  }
}

// Edit toDo.
const editToDo = async(uid, toDoId, toDo)=>{
  try{
    const updatePost = {}
    updatePost[`/user-todos/${uid}/${toDoId}`] = toDo
    return update(ref(db), updatePost)
  }
  catch{
    throw new Error('Error al actualizar la tarea.')
  }  
}

// Remove toDo.
const removeToDo = async(uid, toDoIdToBeRemove)=>{
  try{
    remove(ref(db, `user-todos/${uid}/${toDoIdToBeRemove}`))
  }
  catch{
    throw new Error('Error al eliminar la tarea.')
  }  
}

export { registerUser, getUserData, getUserToDos, addToDo, editToDo, removeToDo }