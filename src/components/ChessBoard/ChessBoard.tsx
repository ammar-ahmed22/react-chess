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
  /**
   * If false, cannot be dragged
   * @default true
   */
  draggable?: boolean
  /**
   * Callback function that is called when a piece is starting to be dragged
   * @param square The square that is being dragged.
   * @returns 
   */
  onDragStart?: (square: SquareType) => void;
  /**
   * Callback function that is called when a piece is dropped over a square
   * @param from The square that the piece is being dragged from
   * @param on The square that the piece is being dropped on
   * @returns 
   */
  onDrop?: (from: SquareType, on: SquareType) => void;
  /**
   * Callback function that is called when a piece is dragged over a square. 
   * If the function returns true, the drop is allowed, otherwise it is not.
   * @param square The square that the piece is being dragged over.
   * @returns 
   */
  onDragOver?: (square: SquareType) => boolean;
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
  onSquareClick,
  draggable,
  onDragStart,
  onDrop,
  onDragOver
}) => {

  const [squares, updateSquares] = useSquares({ position, flip: flipBoard });
  const [clickedSquare, setClickedSquare] = useState<SquareID | null>(null);
  const [currentMoves, setCurrentMoves] = useState<HalfMove[]>([]);

  useEffect(() => {
    updateSquares({ position, flip: flipBoard });
  }, [position, flipBoard])

  useEffect(() => {
    if (clickedSquare && validMoves) {
      setCurrentMoves(validMoves.filter(m => {
        const from = SquareID.fromSquareIDType(m.from);
        return from.algebraic === clickedSquare.algebraic;
      }))
    }
  }, [clickedSquare])

  const genShowProps = (square: SquareType) => {
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
    return { showRank, showFile, showMove }
  }

  const handleClick = (square: SquareType) => {
    setClickedSquare(SquareID.fromSquareIDType(square.algebraic))
    if (onSquareClick) onSquareClick(square);
  } 

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
              {...genShowProps(square)}
              onClick={() => handleClick(square)}
              draggable={draggable}
              onDragStart={onDragStart}
              onDrop={onDrop}
              onDragOver={onDragOver}
              {...square}
            />
          )
        })
      }
    </BoardContainer>
  )
}

export default ChessBoard;