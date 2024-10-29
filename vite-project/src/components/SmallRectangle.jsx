import './SmallReactangle.css';

export const SmallRectangle = ({ children, isSelected, color }) => {
    //dependiendo de si esta selecciona o no dependera de la clase is-selected o no
    const className = `small-rectangle ${color} ${isSelected ? 'turno' : ''}`
  
    return (
      <div className={className}>
        {children}
      </div>
    )
  }