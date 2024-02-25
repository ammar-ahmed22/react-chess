import React, { useEffect, useState } from "react";
import { ChessSquare } from "../ChessSquare";
import styled from "styled-components";
import { useSquares } from "../../hooks";
import type { PieceSet } from "../../assets";

export type ChessBoardProps = {
  /**
   * Size of the board
   */
  size?: string | number,
  /**
   * Chess position to render as FEN string
   */
  position?: string,
  /**
   * If true, board is flipped.
   */
  flipBoard?: boolean,
  /**
   * The piece set to use.
   * @default PieceSet "cases"
   */
  pieceSet?: PieceSet,
  /**
   * The color to use for dark squares
   * @default string #b58863
   */
  darkColor?: string,
  /**
   * The color to use for light squares
   * @default string #f0d9b5
   */
  lightColor?: string,
  /**
   * If true, coordinates identifiers will be shown
   */
  showCoordinates?: boolean
}

const BoardContainer = styled.div<{ size: string | number }>`
  border: solid 1px blue;
  width: ${props => props.size};
  height: ${props => props.size};
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0;
`

const ChessBoard: React.FC<ChessBoardProps> = ({
  size = "90vh",
  position,
  flipBoard,
  pieceSet = "cases",
  darkColor = "#b58863",
  lightColor = "#f0d9b5"
}) => {

  const [squares, updateSquares] = useSquares({ position, flip: flipBoard });

  useEffect(() => {
    updateSquares({ position, flip: flipBoard });
  }, [position, flipBoard])

  return (
    <BoardContainer size={size} >
      {
        squares.map((square) => {
          return (
            <ChessSquare 
              key={square.algebraic}
              size={`calc(${size} / 8)`}
              pieceSet={pieceSet}
              darkColor={darkColor}
              lightColor={lightColor}
              showRank
              showFile
              {...square}
            />
          )
        })
      }
    </BoardContainer>
  )
}

export default ChessBoard;