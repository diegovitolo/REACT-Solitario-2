export const Rectangle = ({ children, isSelected, updateBoard, index }) => {
    //dependiendo de si esta selecciona o no dependera de la clase is-selected o no
    const className = `rectangle ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      //updateBoard(index)
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }