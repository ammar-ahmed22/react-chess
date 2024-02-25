import React from "react";
import type { SquareType } from "../../hooks/useSquares";
import { SquareID } from "@ammar-ahmed22/chess-engine";
import PieceMap from "../../assets";
import type { PieceSet } from "../../assets"
import styled from "styled-components";

const Square = styled.div<{ size: string | number, bg: string, color?: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  box-sizing: border-box;
  font-size: 9px;
  background-color: ${props => props.bg};
  color: ${props => props.color ? props.color : "inherit"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const PieceImage = styled.img`
  width: 80%;
  height: 80%;
`

const Identifier = styled.div<{ color: string, top?: string, left?: string, bottom?: string, right?: string }>`
  position: absolute;
  margin: 0;
  padding; 0;  
  color: ${props => props.color};
  top: ${props => props.top ? props.top : "unset"};
  left: ${props => props.left ? props.left : "unset"};
  right: ${props => props.right ? props.right : "unset"};
  bottom: ${props => props.bottom ? props.bottom : "unset"};
  font-weight: bold;
  font-size: 0.75rem;
`

export type ChessSquareProps = SquareType & {
  size: string | number
  darkColor?: string,
  lightColor?: string,
  pieceSet?: PieceSet,
  showFile?: boolean,
  showRank?: boolean,
}

const ChessSquare: React.FC<ChessSquareProps> = ({
  rank,
  file,
  size,
  piece,
  showFile,
  showRank,
  darkColor = "#000",
  lightColor = "#fff",
  pieceSet = "cases"
}) => {
  const id = new SquareID(file, rank);
  const isDark = (id.file + id.rank) % 2 === 0;
  return (
    <Square 
      size={size} 
      bg={isDark ? darkColor : lightColor} 
      color={isDark ? lightColor : darkColor}
    >
      {
        piece && (
          <PieceImage src={PieceMap[pieceSet][piece.color][piece.type]} />
        )
      }
      {
        showFile && (
          <Identifier
            color={isDark ? lightColor : darkColor}
            right={"2px"}
            bottom={"2px"}
          >
            {file}
          </Identifier>
        )
      }
      {
        showRank && (
          <Identifier
            color={isDark ? lightColor : darkColor}
            top={"2px"}
            left={"2px"}
          >
            {rank}
          </Identifier>
        )
      }
    </Square>
  )
}

export default ChessSquare;