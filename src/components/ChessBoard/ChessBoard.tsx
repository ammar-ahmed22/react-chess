import React, { useState } from "react";

export type ChessBoardProps = {
  size?: string | number,
  position?: string
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  size = "90vh",
  position
}) => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      counter: {counter}{" "}
      <button onClick={() => setCounter(prev => prev + 1)}>+</button>
      size: {size}
      position: {position}
    </div>
  )
}

export default ChessBoard;