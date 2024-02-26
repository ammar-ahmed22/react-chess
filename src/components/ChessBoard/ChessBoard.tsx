import React, { useEffect, useState } from "react";
import { ChessSquare } from "../ChessSquare";
import { BoardContainer } from "./ChessBoard.styles";
import { SquareType, useSquares } from "../../hooks";
import type { PieceSet } from "../../assets";
import type { HalfMove } from "@ammar-ahmed22/chess-engine";
import { SquareID } from "@ammar-ahmed22/chess-engine";


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
  showCoordinates?: boolean,
  /**
   * If provided, when clicking on a piece, shows valid moves
   */
  validMoves?: HalfMove[]
  /**
   * If provided, overrides the default move identifier
   */
  moveIdentifier?: React.ReactNode,
  /**
   * Callback function when a square is clicked
   * @param algebraic The algebraic identifier for the square (e.g. a3)
   * @returns 
   */
  onSquareClick?: (square: SquareType) => void
}



const ChessBoard: React.FC<ChessBoardProps> = ({
  size = "90vh",
  position,
  flipBoard,
  showCoordinates,
  pieceSet = "cases",
  darkColor = "#b58863",
  lightColor = "#f0d9b5",
  validMoves,
  onSquareClick
}) => {

  const [squares, updateSquares] = useSquares({ position, flip: flipBoard });
  const [clickedSquare, setClickedSquare] = useState<SquareID | null>(null);
  const [currentMoves, setCurrentMoves] = useState<HalfMove[]>([]);

  useEffect(() => {
    updateSquares({ position, flip: flipBoard });
  }, [position, flipBoard])

  useEffect(() => {
    console.log(`clicked: ${clickedSquare?.algebraic}`);
    if (clickedSquare && validMoves) {
      setCurrentMoves(validMoves.filter(m => {
        const from = SquareID.fromSquareIDType(m.from);
        return from.algebraic === clickedSquare.algebraic;
      }))
    }
  }, [clickedSquare])

  useEffect(() => {
    if (currentMoves.length) {
      console.log("current moves:", currentMoves);
    }
  }, [currentMoves])

  const handleClick = (square: SquareType) => {
    setClickedSquare(SquareID.fromSquareIDType(square.algebraic))
    if (onSquareClick) onSquareClick(square);
  } 

  return (
    <BoardContainer size={size} >
      {
        squares.map((square) => {
          let showRank = false;
          let showFile = false;
          if (showCoordinates) {
            if (square.rank === (flipBoard ? 8 : 1)) {
              showFile = true;
            }
            if (square.file === (flipBoard ? "h" : "a")) {
              showRank = true;
            }
          }
          let showMove = false;
          for (let move of currentMoves) {
            const to = SquareID.fromSquareIDType(move.to);
            if (to.algebraic === square.algebraic) showMove = true;
          }
          return (
            <ChessSquare 
              key={square.algebraic}
              size={`calc(${size} / 8)`}
              pieceSet={pieceSet}
              darkColor={darkColor}
              lightColor={lightColor}
              showRank={showRank}
              showFile={showFile}
              showMove={showMove}
              onClick={() => handleClick(square)}
              {...square}
            />
          )
        })
      }
    </BoardContainer>
  )
}

export default ChessBoard;