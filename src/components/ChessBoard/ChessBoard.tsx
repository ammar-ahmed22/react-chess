import React, { useState } from "react";
import styled from "styled-components";

export type ChessBoardProps = {
  size?: string | number,
  position?: string
}

const Container = styled.div<{ size?: string | number }>`
  border: solid 1px blue;
  width: ${props => props.size ? props.size : "90vh"};
  height: ${props => props.size ? props.size : "90vh"};
`

const ChessBoard: React.FC<ChessBoardProps> = ({
  size = "90vh",
  position
}) => {
  const [counter, setCounter] = useState(0);
  return (
    <Container 
      size={size}
    />
  )
}

export default ChessBoard;