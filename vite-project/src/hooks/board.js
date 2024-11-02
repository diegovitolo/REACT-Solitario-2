import confetti from 'canvas-confetti'
import { useState } from 'react'

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Intercambia elementos
    }
    return arr;
  }
function inicializarBoard(cantidadCartas){
    const array = [];
    //for para crear array de 1 a cantidad de cartas
    for (let i = 1; i <= cantidadCartas/2; i++) {
      array.push(i, i); // Agrega el número dos veces
    }
    const barajado = shuffle(array);
  
    console.log(barajado);
    const barajado3D = barajado.map((valor, index) => ({
      valor: valor,
      color: null,
      mostrar: false,
    }));
    //console.log(barajado3D);
    return barajado3D;
}

const CANTIDAD_CARTAS=10;

export function useBoard({turn, setTurn, puntaje, setPuntaje, setWinner}){
    const [board, setBoard] = useState(() => {
        //console.log("inicializando")
        return inicializarBoard(CANTIDAD_CARTAS);
    });
    //El jugador debe elegir dos cartas
    //si eleccion vale 1 estoy en primer eleccion
    //si eleccion vale 2 estoy en segunda y ultima eleccion, luego debe volver a 1
    const [eleccion, setEleccion] = useState({numeroEleccion:1, indiceCarta: null });

    const resetBoard = () => {
        setBoard(inicializarBoard(CANTIDAD_CARTAS));
        setPuntaje({J1: 0,J2: 0});
        
    }
    const updateBoard = (index) => {
        //si alguien esta queriendo apretar mas de dos cartas (al hacerlo rapido) no debemos permitirlo
        if(eleccion.numeroEleccion===3){return}

        //si seleccionan una carta que ya esta pintada volvemos sin hacer nada
        if(board[index].color!=null){return}

        //si aprietan dos veces la misma carta no hago nada
        if(eleccion.indiceCarta===index){return}
        //console.log(board)
        const newBoard = structuredClone(board);
        newBoard[index].mostrar = true;
        //setBoard(newBoard); 
        //const newNewBoard = structuredClone(board);

        if (eleccion.numeroEleccion===1){
            setEleccion({numeroEleccion: 2, indiceCarta: index});
            setBoard(newBoard);
        }
        else if (eleccion.numeroEleccion===2){
            setEleccion({numeroEleccion: 3, indiceCarta:null})
            //si estoy en la segunda eleccion de carta eleccion.numerEleccion===2
            //vere si la carta 1 coincide con la 2
            //alert( "carta 1: " + board[eleccion[1]] + " carta 2: " + board[index])
            if (board[eleccion.indiceCarta].valor===board[index].valor){
                setEleccion({numeroEleccion: 1, indiceCarta: null});
                if (turn === 'J1'){
                    //console.log(puntaje.J1)
                    setPuntaje({J1: puntaje.J1+1, J2: puntaje.J2})
                    newBoard[eleccion.indiceCarta].color = 'azul';
                    newBoard[index].color = 'azul';
                    //console.log(puntaje.J1)
                    if ((puntaje.J1+1)>=(CANTIDAD_CARTAS/4)){
                        confetti();
                        setWinner('Jugador 1');
                    }
                }
                if (turn === 'J2'){
                    setPuntaje({J1: puntaje.J1, J2: puntaje.J2+1})
                    newBoard[eleccion.indiceCarta].color = 'rojo';
                    newBoard[index].color = 'rojo';
                    if ((puntaje.J2+1)>=(CANTIDAD_CARTAS/4)){
                        confetti();
                        setWinner('Jugador 2');
                    }
                }
                //console.log('J1' + puntaje.J1)
                //console.log('J2' + puntaje.J2)
                //console.log(CANTIDAD_CARTAS/4)
                if (puntaje.J1>=CANTIDAD_CARTAS/4 ||puntaje.J2>=CANTIDAD_CARTAS/2 ){
                    confetti();
                }
                setBoard(newBoard);

            } else {
                //si no hubo coincidenicas entre carta 1 y carta 2 las vuelvo a poner boca abajo
                setBoard(newBoard);

                
                setTimeout(async () => {
                    newBoard[eleccion.indiceCarta].mostrar = false;
                    newBoard[index].mostrar = false;
                    await setBoard(newBoard);
                    await setEleccion({numeroEleccion: 1, indiceCarta: null});
                }, 1000);
            }
            if (turn === 'J1'){setTurn('J2')}
            else {setTurn('J1')}
            }
        
    }
    return {board, resetBoard, updateBoard}
}