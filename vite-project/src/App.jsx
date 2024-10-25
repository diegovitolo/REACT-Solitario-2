import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Rectangle } from './components/Rectangle.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'

function App() {
  const [count, setCount] = useState(0)
  
  const board = Array(8).fill(null);

  const resetGame = () => {}
  const updateBoard = () => {}

  const turn = 'A';
  const winner = null;

  return (
    <main className='board'>
      <h1>Solitario</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((rectangle, index) => {
            return (
              <Rectangle
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {rectangle}
              </Rectangle>
            )
          })
        }
      </section>
     
      <section className='turn'>
        <Rectangle isSelected={turn === 'A'}>
          {'A'}
        </Rectangle>
        <Rectangle isSelected={turn === 'B'}>
          {'B'}
        </Rectangle>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner} />
      
    </main>
  )
}

export default App
