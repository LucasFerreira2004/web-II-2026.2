import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Form } from './Form'

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-5" >
        <h1 className= "text-lg font-bold">Agendamento da barbearia cabeleira</h1>
        <Form onSubmit={() => {}} />
      </div>
    </>
  )
}

export default App
