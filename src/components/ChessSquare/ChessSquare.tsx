import React from "react";
import type { SquareType } from "../../hooks/useSquares";
import { SquareID } from "@ammar-ahmed22/chess-engine";
import PieceMap from "../../assets";
import type { PieceSet } from "../../assets"
import { Square, PieceImage, Coordinate, Identifier } from "./ChessSquare.styles";



export type ChessSquareProps = SquareType & React.HTMLAttributes<HTMLDivElement> & {
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
  moveIdentifier?: React.ReactNode
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
  pieceSet = "cases",
  showMove,
  moveIdentifier,
  ...others
}) => {
  const id = new SquareID(file, rank);
  const isDark = (id.file + id.rank) % 2 === 0;
  return (
    <Square 
      size={size} 
      bg={isDark ? darkColor : lightColor} 
      color={isDark ? lightColor : darkColor}
      {...others}
    >
      {
        piece && (
          <PieceImage src={PieceMap[pieceSet][piece.color][piece.type]} />
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