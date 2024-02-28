import React, { useEffect, useState } from "react";
import { ChessSquare } from "../ChessSquare";
import { BoardContainer } from "./ChessBoard.styles";
import { SquareType, useSquares } from "../../hooks";
import type { PieceSet } from "../../assets";
import type { HalfMove } from "@ammar-ahmed22/chess-engine";
import { SquareID } from "@ammar-ahmed22/chess-engine";

type HTMLProps = React.HTMLAttributes<HTMLDivElement>;

export type ChessBoardProps = HTMLProps & {
  /**
   * Size of the board
   */
  size?: string | number;
  /**
   * Chess position to render as FEN string
   */
  position?: string;
  /**
   * If true, board is flipped.
   */
  flipBoard?: boolean;
  /**
   * The piece set to use.
   * @default PieceSet "cases"
   */
  pieceSet?: PieceSet;
  /**
   * The color to use for dark squares
   * @default string #b58863
   */
  darkColor?: string;
  /**
   * The color to use for light squares
   * @default string #f0d9b5
   */
  lightColor?: string;
  /**
   * If true, coordinates identifiers will be shown
   */
  showCoordinates?: boolean;
  /**
   * If provided, when clicking on a piece, shows valid moves
   */
  validMoves?: HalfMove[];
  /**
   * If provided, overrides the default move identifier
   */
  moveIdentifier?: React.ReactNode;
  /**
   * Callback function when a square is clicked
   * @param algebraic The algebraic identifier for the square (e.g. a3)
   * @returns
   */
  onSquareClick?: (square: SquareType) => void;
  /**
   * If false, cannot be dragged
   * @param square If a function is passed, the square that will be dragged
   * @default true
   */
  squareDraggable?: boolean | ((square: SquareType) => boolean);
  /**
   * Callback function that is called when a piece is starting to be dragged
   * @param square The square that is being dragged.
   * @param ev The drag event for the piece image that is being dragged.
   * @returns
   */
  onSquareDragStart?: (
    square: SquareType,
    ev: React.DragEvent<HTMLImageElement>,
  ) => void;
  /**
   * Callback function that is called when a piece is dropped over a square
   * @param from The square that the piece is being dragged from
   * @param on The square that the piece is being dropped on
   * @param ev The drag event for the square that is being dropped on.
   * @returns
   */
  onSquareDrop?: (
    from: SquareType,
    on: SquareType,
    ev: React.DragEvent<HTMLDivElement>,
  ) => void;
  /**
   * Callback function that is called when a piece is dragged over a square.
   * If the function returns true, the drop is allowed, otherwise it is not.
   * @param square The square that the piece is being dragged over.
   * @returns
   */
  onSquareDragOver?: (
    square: SquareType,
    ev: React.DragEvent<HTMLDivElement>,
  ) => boolean;
  /**
   * Callback function that is called while a piece is being dragged.
   *
   * @param square The square that is being dragged
   * @param ev The drag event for the piece image being dragged.
   * @returns
   */
  onSquareDrag?: (
    square: SquareType,
    ev: React.DragEvent<HTMLImageElement>,
  ) => void;
  /**
   * Callback function that is called when a piece stops being dragged
   *
   * @param square The square that was being dragged
   * @param ev The drag event for the piece image that was being dragged.
   * @returns
   */
  onSquareDragEnd?: (
    square: SquareType,
    ev: React.DragEvent<HTMLImageElement>,
  ) => void;
  /**
   * Callback function that is called when a dragged piece enters a square
   *
   * @param square The square that is being entered
   * @param ev The drag event for the square that is being entered.
   * @returns
   */
  onSquareDragEnter?: (
    square: SquareType,
    ev: React.DragEvent<HTMLDivElement>,
  ) => void;
  /**
   * Callback function that is called when a dragged piece leaves a square
   * @param square The square that is being left.
   * @param ev The drag event for the square that is being left.
   * @returns
   */
  onSquareDragLeave?: (
    square: SquareType,
    ev: React.DragEvent<HTMLDivElement>,
  ) => void;
};

const ChessBoard: React.FC<ChessBoardProps> = ({
  size = "90vh",
  position,
  flipBoard,
  showCoordinates,
  pieceSet = "cases",
  lightColor = "#E2E8F0",
  darkColor = "#2C5282",
  validMoves,
  onSquareClick,
  squareDraggable,
  onSquareDragStart,
  onSquareDrop,
  onSquareDragOver,
  onSquareDrag,
  onSquareDragEnd,
  onSquareDragEnter,
  onSquareDragLeave,
  ...others
}) => {
  const [squares, updateSquares] = useSquares({
    position,
    flip: flipBoard,
  });
  const [clickedSquare, setClickedSquare] = useState<SquareID | null>(
    null,
  );
  const [currentMoves, setCurrentMoves] = useState<HalfMove[]>([]);

  useEffect(() => {
    updateSquares({ position, flip: flipBoard });
  }, [position, flipBoard]);

  useEffect(() => {
    if (clickedSquare && validMoves) {
      setCurrentMoves(
        validMoves.filter((m) => {
          const from = SquareID.fromSquareIDType(m.from);
          return from.algebraic === clickedSquare.algebraic;
        }),
      );
    }
  }, [clickedSquare, validMoves]);

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
    return { showRank, showFile, showMove };
  };

  const handleClick = (square: SquareType) => {
    setClickedSquare(SquareID.fromSquareIDType(square.algebraic));
    if (onSquareClick) onSquareClick(square);
  };

  return (
    <BoardContainer size={size} {...others}>
      {squares.map((square) => {
        return (
          <ChessSquare
            key={square.algebraic}
            size={`calc(${size} / 8)`}
            pieceSet={pieceSet}
            darkColor={darkColor}
            lightColor={lightColor}
            {...genShowProps(square)}
            onClick={() => handleClick(square)}
            draggable={squareDraggable}
            onDragStart={onSquareDragStart}
            onDrop={onSquareDrop}
            onDragOver={onSquareDragOver}
            onDrag={onSquareDrag}
            onDragEnter={onSquareDragEnter}
            onDragLeave={onSquareDragLeave}
            onDragEnd={onSquareDragEnd}
            {...square}
          />
        );
      })}
    </BoardContainer>
  );
};

export default ChessBoard;
