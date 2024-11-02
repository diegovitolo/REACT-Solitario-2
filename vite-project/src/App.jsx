import { useState } from 'react'
import './App.css'

import { Rectangle } from './components/Rectangle.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { TableroResultado } from './components/TableroResultado.jsx'
import { useBoard } from './hooks/board.js'


function App() {

  const [puntaje, setPuntaje] = useState({J1: 0,J2: 0})
  const [turn, setTurn] = useState(() => {return 'J1'})
  const [winner, setWinner] = useState(null)

  const {board, resetBoard, updateBoard} = useBoard({turn, setTurn, puntaje, setPuntaje, setWinner});

  const resetGame = () => {
    resetBoard();
    setTurn('J1');
    setWinner(null);
  };


  return (
    <main className='board'>
      <h1>Solitario</h1>
      <TableroResultado puntaje={puntaje} turn={turn}></TableroResultado>
      <section className='game'>
        {
          board.map((contenido, index) => {
            return (
              <Rectangle
                key={index}
                index={index}
                updateBoard={updateBoard}
                color={contenido.color}
              >
                {contenido.mostrar ? contenido.valor : ''}
              </Rectangle>
            )
          })
        }
      </section>
      <button onClick={resetGame}>Reset del juego</button>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;