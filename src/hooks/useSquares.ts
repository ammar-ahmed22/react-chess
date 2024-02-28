import { useState } from "react";
import {
  Color,
  fen2matrix,
  PieceType,
  validateFEN,
} from "@ammar-ahmed22/chess-engine";

export type SquareType = {
  file: string;
  rank: number;
  algebraic: string;
  piece?: {
    type: PieceType;
    color: Color;
  };
};

export type useSquareOpts = {
  position?: string;
  flip?: boolean;
};

export const useSquares = (
  opts?: useSquareOpts,
): [SquareType[], (opts: useSquareOpts) => void] => {
  const createSquares = (opts?: useSquareOpts): SquareType[] => {
    const result: SquareType[] = [];
    const files = "abcdefgh";
    for (let rank = 8; rank >= 1; rank--) {
      for (let file of files) {
        result.push({
          file,
          rank,
          algebraic: `${file}${rank}`,
        });
      }
    }

    if (opts?.position) {
      try {
        validateFEN(opts.position);
        const flatMatrix = fen2matrix(opts.position).flatMap(
          (a) => a,
        );
        for (let i = 0; i < flatMatrix.length; i++) {
          const piece = flatMatrix[i];
          const square = result[i];
          if (piece && square) {
            square.piece = {
              type: piece.type,
              color: piece.color,
            };
            result[i] = square;
          }
        }
        if (opts?.flip) {
          result.reverse();
        }
      } catch (error) {
        console.warn(error);
      }
    }
    return result;
  };

  const [squares, setSquares] = useState<SquareType[]>(
    createSquares(opts),
  );

  const updateSquares = (opts: useSquareOpts) => {
    setSquares(createSquares(opts));
  };

  return [squares, updateSquares];
};
