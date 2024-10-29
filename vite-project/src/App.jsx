import { useState } from 'react'
import './App.css'

import { Rectangle } from './components/Rectangle.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { TableroResultado } from './components/TableroResultado.jsx'

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Intercambia elementos
  }
  return arr;
}
function inicializarBoard(){
  let array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  array = shuffle(array);
  console.log(array);
  return array;
}

function App() {

  const [puntaje, setPuntaje] = useState({'J1': 0,'J2': 0})
  //El jugador debe elegir dos cartas
  //si eleccion vale 1 estoy en primer eleccion
  //si eleccion vale 2 estoy en segunda y ultima eleccion, luego debe volver a 1
  const [eleccion, setEleccion] = useState([1, null]);
  const [board, setBoard] = useState(() => {
    console.log("inicializando")
    return inicializarBoard();
  });

  const [boardAMostrar, setBoardAMostrar] = useState(() => {return Array(board.length).fill(null)});

  const resetGame = () => {
    setTurn('J1');
    setBoard(inicializarBoard());
    setBoardAMostrar(Array(board.length).fill(null));
  };
  
  const updateBoard = (index) => {
    //si alguien esta queriendo apretar mas de dos cartas (al hacerlo rapido) no debemos permitirlo
    if(eleccion[0]===3){return}

    //si aprietan dos veces la misma carta no hago nada
    if(eleccion[1]===index){return}

    
    const newBoardAMostrar = [...boardAMostrar];
    newBoardAMostrar[index] = board[index];
    setBoardAMostrar(newBoardAMostrar); 

    if (eleccion[0]===1){
      setEleccion([2, index]);
    }
    else if (eleccion[0]===2){
      setEleccion([3, null])
      //si estoy en la segunda eleccion de carta eleccion[0]===2
      //vere si la carta 1 coincide con la 2
      //alert( "carta 1: " + board[eleccion[1]] + " carta 2: " + board[index])
      if (board[eleccion[1]]===board[index]){
        setEleccion([1, null]);
        if (turn === 'J1'){setPuntaje({'J1': puntaje['J1']+1, 'J2': puntaje['J2']})}
        if (turn === 'J2'){setPuntaje({'J1': puntaje['J1'], 'J2': puntaje['J2']+1})}
      } else {
        //si no hubo coincidenicas entre carta 1 y carta 2 las vuelvo a poner boca abajo
        const newNewBoardAMostrar = [...newBoardAMostrar];
        newNewBoardAMostrar[eleccion[1]] = null;
        newNewBoardAMostrar[index] = null;
        setTimeout(async () => {
          await setBoardAMostrar(newNewBoardAMostrar);
          await setEleccion([1, null]);
        }, 1000);
      }
      if (turn === 'J1'){setTurn('J2')}
      else {setTurn('J1')}
    }
  }

  const [turn, setTurn] = useState(() => {return 'J1'})
  const winner = null;

  return (
    <main className='board'>
      <h1>Solitario</h1>
      <TableroResultado puntaje={puntaje} turn={turn}></TableroResultado>
      <section className='game'>
        {
          boardAMostrar.map((valor, index) => {
            return (
              <Rectangle
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {valor}
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