import React from 'react'
import { Navbar } from '../components/Navbar'
import { PrintTask } from '../components/Task'
import { ButtonCreateTask } from '../components/Buttons'

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <ButtonCreateTask />
      <PrintTask></PrintTask>
    </>
  )
}

export { Home }
