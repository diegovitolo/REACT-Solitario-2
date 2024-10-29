import { SmallRectangle } from './SmallRectangle.jsx'

export const TableroResultado = ({puntaje, turn}) => {

    return (
      <section className='resultado'>
        <SmallRectangle color={'blanco'}>Turno</SmallRectangle>
        <SmallRectangle color={'blanco'}>Puntaje</SmallRectangle>
        <SmallRectangle color={'azul'} isSelected={turn === 'J1'}>Jugador 1</SmallRectangle>
        <SmallRectangle color={'azul'}>{puntaje['J1']}</SmallRectangle>
        <SmallRectangle color={'rojo'} isSelected={turn === 'J2'}>Jugador 2</SmallRectangle>
        <SmallRectangle color={'rojo'}>{puntaje['J2']}</SmallRectangle>
      </section>
      )
}

