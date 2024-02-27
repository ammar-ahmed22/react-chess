import React from "react";
import type { SquareType } from "../../hooks/useSquares";
import { SquareID } from "@ammar-ahmed22/chess-engine";
import PieceMap from "../../assets";
import type { PieceSet } from "../../assets"
import { Square, PieceImage, Coordinate, Identifier } from "./ChessSquare.styles";



export type ChessSquareProps = SquareType & Omit<React.HTMLAttributes<HTMLDivElement>, "onDragStart" | "draggable" | "onDrop" | "onDragOver"> & {
  /**
   * The size of the square
   */
  size: string | number
  /**
   * The color if the square is dark. The color of the text on light squares.
   * @default string "#000"
   */
  darkColor?: string,
  /**
   * The color if the square is light. The color of text on dark squares.
   * @default string "#ff"
   */
  lightColor?: string,
  /**
   * The piece set to use
   * @default string "cases"
   */
  pieceSet?: PieceSet,
  /**
   * If true, shows the file letter
   */
  showFile?: boolean,
  /**
   * If true, shows the rank number
   */
  showRank?: boolean,
  /**
   * If true, shows a move identifier on the square
   */
  showMove?: boolean,
  /**
   * If provided, overrides the default move identifier
   */
  moveIdentifier?: React.ReactNode,
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
  ...others
}) => {
  const id = new SquareID(file, rank);
  const isDark = (id.file + id.rank) % 2 === 0;
  const square: SquareType = { file, rank, algebraic, piece };
  return (
    <Square 
      size={size} 
      bg={isDark ? darkColor : lightColor} 
      color={isDark ? lightColor : darkColor}
      onDragOver={(ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        if (onDragOver) {
          ev.dataTransfer.dropEffect = onDragOver(square) ? "move" : "none";
        } else {
          ev.dataTransfer.dropEffect = "move";
        }
      }}
      onDrop={(ev: React.DragEvent<HTMLDivElement>) => {
        const data = JSON.parse(ev.dataTransfer.getData("text/plain")) as SquareType;
        if (onDrop) onDrop(data, square);
      }}
      {...others}
    >
      {
        piece && (
          <PieceImage 
            src={PieceMap[pieceSet][piece.color][piece.type]} 
            draggable={draggable}
            onDragStart={(ev: React.DragEvent<HTMLImageElement>) => {
              ev.dataTransfer.setData("text/plain", JSON.stringify(square))
              const image = new Image();
              image.src = PieceMap[pieceSet][piece.color][piece.type];
              ev.dataTransfer.setDragImage(image, 10, 10)
              ev.dataTransfer.dropEffect = "move";
              if (onDragStart) onDragStart(square);
            }}
          />
        )
      }
      {
        showFile && (
          <Coordinate
            color={isDark ? lightColor : darkColor}
            right={"2px"}
            bottom={"2px"}
          >
            {file}
          </Coordinate>
        )
      }
      {
        showRank && (
          <Coordinate
            color={isDark ? lightColor : darkColor}
            top={"2px"}
            left={"2px"}
          >
            {rank}
          </Coordinate>
        )
      }
      {
        showMove && (
          <Identifier />
        )
      }
    </Square>
  )
}

export default ChessSquare;