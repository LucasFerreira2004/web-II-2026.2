import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const pokemonId: number = Math.floor(Math.random() * 100) + 1
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <>
      <div className="App">
        <img src={url} alt={`Pokemon ${pokemonId}`} />
      </div>
    </>
  )
}

export default App
