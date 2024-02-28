import React, { useRef } from "react";
import type { SquareType } from "../../hooks/useSquares";
import { SquareID } from "@ammar-ahmed22/chess-engine";
import PieceMap from "../../assets";
import type { PieceSet } from "../../assets";
import {
  Square,
  PieceImage,
  Coordinate,
  Identifier,
} from "./ChessSquare.styles";

type Overrides =
  | "onDragStart"
  | "draggable"
  | "onDrop"
  | "onDragOver"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave";
type HTMLProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  Overrides
>;

export type ChessSquareProps = SquareType &
  HTMLProps & {
    /**
     * The size of the square
     */
    size: string | number;
    /**
     * The color if the square is dark. The color of the text on light squares.
     * @default string "#000"
     */
    darkColor?: string;
    /**
     * The color if the square is light. The color of text on dark squares.
     * @default string "#ff"
     */
    lightColor?: string;
    /**
     * The piece set to use
     * @default string "cases"
     */
    pieceSet?: PieceSet;
    /**
     * If true, shows the file letter
     */
    showFile?: boolean;
    /**
     * If true, shows the rank number
     */
    showRank?: boolean;
    /**
     * If true, shows a move identifier on the square
     */
    showMove?: boolean;
    /**
     * If provided, overrides the default move identifier
     */
    moveIdentifier?: React.ReactNode;
    /**
     * If false, cannot be dragged
     * @param square If a function is passed, the square that will be dragged
     * @default true
     */
    draggable?: boolean | ((square: SquareType) => boolean);
    /**
     * Callback function that is called when a piece is starting to be dragged
     * @param square The square that is being dragged.
     * @param ev The drag event for the piece image being dragged.
     * @returns
     */
    onDragStart?: (
      square: SquareType,
      ev: React.DragEvent<HTMLImageElement>,
    ) => void;
    /**
     * Callback function that is called when a piece is dropped over a square
     * @param from The square that the piece is being dragged from
     * @param on The square that the piece is being dropped on
     * @param ev The drag event for the square being dropped on.
     * @returns
     */
    onDrop?: (
      from: SquareType,
      on: SquareType,
      ev: React.DragEvent<HTMLDivElement>,
    ) => void;
    /**
     * Callback function that is called when a piece is dragged over a square.
     * If the function returns true, the drop is allowed, otherwise it is not.
     * @param square The square that the piece is being dragged over.
     * @param ev The drag event for the square being dragged over.
     * @returns
     */
    onDragOver?: (
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
    onDrag?: (
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
    onDragEnd?: (
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
    onDragEnter?: (
      square: SquareType,
      ev: React.DragEvent<HTMLDivElement>,
    ) => void;
    /**
     * Callback function that is called when a dragged piece leaves a square
     * @param square The square that is being left.
     * @param ev The drag event for the square that is being left.
     * @returns
     */
    onDragLeave?: (
      square: SquareType,
      ev: React.DragEvent<HTMLDivElement>,
    ) => void;
  };

const ChessSquare: React.FC<ChessSquareProps> = ({
  rank,
  file,
  size,
  piece,
  algebraic,
  showFile,
  showRank,
  darkColor = "#000",
  lightColor = "#fff",
  pieceSet = "cases",
  showMove,
  moveIdentifier,
  draggable = true,
  onDragStart,
  onDrop,
  onDragOver,
  onDrag,
  onDragEnd,
  onDragEnter,
  onDragLeave,
  ...others
}) => {
  const id = new SquareID(file, rank);
  const isDark = (id.file + id.rank) % 2 === 0;
  const square: SquareType = { file, rank, algebraic, piece };
  const imageRef = useRef<HTMLImageElement>(null);
  return (
    <Square
      size={size}
      bg={isDark ? darkColor : lightColor}
      color={isDark ? lightColor : darkColor}
      onDragOver={(ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        if (onDragOver) {
          const result = onDragOver(square, ev);
          ev.dataTransfer.dropEffect = result ? "move" : "none";
        } else {
          ev.dataTransfer.dropEffect = "move";
        }
      }}
      onDrop={(ev: React.DragEvent<HTMLDivElement>) => {
        const data = JSON.parse(
          ev.dataTransfer.getData("text/plain"),
        ) as SquareType;
        if (onDrop) onDrop(data, square, ev);
      }}
      onDragEnter={(ev: React.DragEvent<HTMLDivElement>) => {
        if (onDragEnter) onDragEnter(square, ev);
      }}
      onDragLeave={(ev: React.DragEvent<HTMLDivElement>) => {
        if (onDragLeave) onDragLeave(square, ev);
      }}
      {...others}
    >
      {piece && (
        <PieceImage
          ref={imageRef}
          src={PieceMap[pieceSet][piece.color][piece.type]}
          draggable={
            typeof draggable === "boolean"
              ? draggable
              : draggable(square)
          }
          onDragStart={(ev: React.DragEvent<HTMLImageElement>) => {
            ev.dataTransfer.setData(
              "text/plain",
              JSON.stringify(square),
            );
            ev.dataTransfer.dropEffect = "move";
            if (onDragStart) onDragStart(square, ev);
          }}
          onDrag={(ev: React.DragEvent<HTMLImageElement>) => {
            // console.log("dragging");
            // ev.currentTarget.style.opacity = "0";
            if (onDrag) onDrag(square, ev);
          }}
          onDragEnd={(ev: React.DragEvent<HTMLImageElement>) => {
            // console.log("drag end");
            // ev.currentTarget.style.opacity = "1";
            if (onDragEnd) onDragEnd(square, ev);
          }}
        />
      )}
      {showFile && (
        <Coordinate
          color={isDark ? lightColor : darkColor}
          right={"2px"}
          bottom={"2px"}
        >
          {file}
        </Coordinate>
      )}
      {showRank && (
        <Coordinate
          color={isDark ? lightColor : darkColor}
          top={"2px"}
          left={"2px"}
        >
          {rank}
        </Coordinate>
      )}
      {showMove && <Identifier />}
    </Square>
  );
};

export default ChessSquare;
