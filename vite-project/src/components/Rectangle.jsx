import './Rectangle.css';

export const Rectangle = ({ children, isSelected, updateBoard, index, color }) => {
    //dependiendo de si esta selecciona o no dependera de la clase is-selected o no
    const className = `rectangle ${color ?? ''} ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }