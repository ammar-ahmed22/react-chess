import React, { useEffect, useState } from "react";
import { ChessSquare } from "../ChessSquare";
import { BoardContainer } from "./ChessBoard.styles";
import { SquareType, useSquares } from "../../hooks";
import type { PieceSet, PieceImageMap } from "../../assets";
import type {
  HalfMove,
  SquareIDType,
  PieceType,
  Color,
} from "@ammar-ahmed22/chess-engine";
import { SquareID } from "@ammar-ahmed22/chess-engine";

type HTMLProps = React.HTMLAttributes<HTMLDivElement>;
export type PromotePieceType = Omit<PieceType, "pawn" | "king">;
export type PromotionData = { id: SquareIDType; color: Color };

export type ChessBoardProps = HTMLProps & {
  /**
   * The size of the board as a CSS string value or a number in pixels. Square sizes will be calculated accordingly
   * @default "90vh"
   */
  size?: string | number;
  /**
   * The Chess position to render as a FEN (without metadata) string.
   */
  position?: string;
  /**
   * If true, board is flipped.
   * @default false
   */
  flipBoard?: boolean;
  /**
   * The piece set (images) to use, provided are the `cases` and `neo` piece sets. Otherwise, provide a custom piece image map to use custom pieces.
   * @default "cases"
   */
  pieceSet?: PieceSet | PieceImageMap;
  /**
   * The color to use for dark squares. Must be a valid CSS color string (e.g. "#fff", "rgb(255, 255, 255)", etc.)
   * @default "#b58863"
   */
  darkColor?: string;
  /**
   * The color to use for light squares. Must be a valid CSS color string (e.g. "#fff", "rgb(255, 255, 255)", etc.)
   * @default "#f0d9b5"
   */
  lightColor?: string;
  /**
   * If true, coordinates identifiers will be shown. Rank numbers will be shown on the left most file, file letters will be shown on the bottom most rank (irrespective of board orientation).
   * @default false
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
   * If provided, shows the piece promotion modal at the provided square.
   */
  showPromotionModal?: PromotionData;
  /**
   * If true, disables the board and darkens it
   * @default false
   */
  disabled?: boolean;
  /**
   * React Set State function to set the selected promote piece when modal is shown
   */
  setPromotedPiece?: React.Dispatch<
    React.SetStateAction<PromotePieceType | undefined>
  >;
  /**
   * Callback function when a square is clicked
   * @param square The square that is being clicked
   */
  onSquareClick?: (square: SquareType) => void;
  /**
   * If false, cannot be dragged. If a function is passed, the result of the function will determine if that square can be dragged.
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
   *
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
   *
   * @param square The square that the piece is being dragged over.
   * @param ev The drag event for the square that is being dragged over.
   * @returns
   */
  onSquareDragOver?: (
    square: SquareType,
    ev: React.DragEvent<HTMLDivElement>,
  ) => void;
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
  showPromotionModal,
  setPromotedPiece,
  disabled,
  ...others
}) => {
  const [squares, updateSquares] = useSquares({
    position,
    flip: flipBoard,
  });
  const [clickedSquare, setClickedSquare] = useState<SquareID | null>(
    null,
  );
  const [dragging, setDragging] = useState<SquareID | null>(null);
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

  const squareProps = (square: SquareType) => {
    let showRank = false;
    let showFile = false;
    let showMove = false;
    let draggable = false;
    let droppable = false;
    let promotionModal = undefined;
    if (showCoordinates) {
      if (square.rank === (flipBoard ? 8 : 1)) {
        showFile = true;
      }
      if (square.file === (flipBoard ? "h" : "a")) {
        showRank = true;
      }
    }

    for (let move of currentMoves) {
      const to = SquareID.fromSquareIDType(move.to);
      if (to.algebraic === square.algebraic) showMove = true;
    }

    if (validMoves) {
      for (let move of validMoves) {
        const from = SquareID.fromSquareIDType(move.from);
        const to = SquareID.fromSquareIDType(move.to);
        if (from.algebraic === square.algebraic) draggable = true;
        if (dragging) {
          if (
            dragging.algebraic === from.algebraic &&
            to.algebraic === square.algebraic
          )
            droppable = true;
        }
      }
    }
    if (squareDraggable !== undefined) {
      draggable =
        typeof squareDraggable === "boolean"
          ? squareDraggable
          : squareDraggable(square);
    }

    if (showPromotionModal) {
      const id = SquareID.fromSquareIDType(showPromotionModal.id);
      if (id.algebraic === square.algebraic)
        promotionModal = showPromotionModal.color;
    }

    return {
      showRank,
      showFile,
      showMove,
      draggable,
      droppable,
      showPromotionModal: promotionModal,
      setPromotedPiece,
    };
  };

  const handleClick = (square: SquareType) => {
    setClickedSquare(SquareID.fromSquareIDType(square.algebraic));
    if (onSquareClick) onSquareClick(square);
  };

  return (
    <BoardContainer
      size={size}
      disabled={disabled}
      {...others}
    >
      {squares.map((square) => {
        return (
          <ChessSquare
            key={square.algebraic}
            size={`calc(${size} / 8)`}
            pieceSet={pieceSet}
            darkColor={darkColor}
            lightColor={lightColor}
            onClick={() => handleClick(square)}
            onDragStart={(square, ev) => {
              setDragging(
                SquareID.fromSquareIDType(square.algebraic),
              );
              if (onSquareDragStart) onSquareDragStart(square, ev);
            }}
            onDrop={onSquareDrop}
            onDragOver={onSquareDragOver}
            onDrag={onSquareDrag}
            onDragEnter={onSquareDragEnter}
            onDragLeave={onSquareDragLeave}
            onDragEnd={(square, ev) => {
              setDragging(null);
              if (onSquareDragEnd) onSquareDragEnd(square, ev);
            }}
            {...squareProps(square)}
            {...square}
          />
        );
      })}
    </BoardContainer>
  );
};

export default ChessBoard;
