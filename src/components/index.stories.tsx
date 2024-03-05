import type { Meta, StoryObj } from "@storybook/react";
import {
  ChessBoard,
  ChessBoardProps,
  PromotionData,
  PromotePieceType,
} from "./ChessBoard";
import {
  Chess,
  HalfMove,
  SquareID,
} from "@ammar-ahmed22/chess-engine";
// import { SquareType } from "../../hooks";
import React, { useState, useEffect } from "react";

type UsedChessBoardProps =
  | "position"
  | "flipBoard"
  | "validMoves"
  | "onSquareClick"
  | "squareDraggable"
  | "onSquareDragStart"
  | "onSquareDrop"
  | "onSquareDragOver"
  | "onSquareDrag"
  | "onSquareDragEnd"
  | "onSquareDragEnter"
  | "onSquareDragLeave";
const Game: React.FC<Omit<ChessBoardProps, UsedChessBoardProps>> = (
  props,
) => {
  const [chess, setChess] = useState(new Chess());
  const [fen, setFEN] = useState(chess.fen());
  const [validMoves, setValidMoves] = useState(chess.validMoves());
  const [fromID, setFromID] = useState<SquareID | null>(null);
  const [toID, setToID] = useState<SquareID | null>(null);
  const [promotion, setPromotion] = useState<
    PromotionData | undefined
  >();
  const [promotedPiece, setPromotedPiece] =
    useState<PromotePieceType>();

  const executeMove = (move: HalfMove) => {
    const result = chess.execute(move);
    if (result) {
      setFEN(chess.fen());
      setValidMoves(chess.validMoves());
      setFromID(null);
      setToID(null);
      setChess(chess.clone());
    }
  };

  useEffect(() => {
    if (fromID && toID) {
      const executeMoves = chess.validMoves().filter((move) => {
        const from = SquareID.fromSquareIDType(move.from);
        const to = SquareID.fromSquareIDType(move.to);
        return (
          from.algebraic === fromID.algebraic &&
          to.algebraic === toID.algebraic
        );
      });
      // when piece promotion, 4 moves available to the same square.
      if (executeMoves.length > 1) {
        const [move] = executeMoves;
        if (move && !promotion) {
          setPromotion({ id: move.to, color: move.color });
        }
        // promotedPiece is set by ChessBoard
        if (promotedPiece) {
          const pMove = executeMoves.find((m) => {
            // move.promotion is a FEN character representing the piece. Potentially will change later on.
            if (promotedPiece === "knight") {
              return m.promotion?.toLowerCase() === "n";
            } else {
              return m.promotion?.toLowerCase() === promotedPiece[0];
            }
          });
          if (pMove) {
            executeMove(pMove);
            setPromotedPiece(undefined);
            setPromotion(undefined);
          }
        }
      } else {
        executeMove(executeMoves[0] as HalfMove);
      }
    }
  }, [fromID, toID, promotedPiece]);

  useEffect(() => {
    // black moves are chosen at random after 1 second.
    if (chess.colorToMove() === "black") {
      setTimeout(() => {
        const rndIdx = Math.floor(Math.random() * validMoves.length);
        const move = validMoves[rndIdx];
        if (move) {
          executeMove(move);
        }
      }, 1000);
    }
  }, [chess]);

  return (
    <ChessBoard
      {...props}
      position={fen}
      flipBoard={chess.colorToMove() === "black"}
      validMoves={validMoves}
      showPromotionModal={promotion}
      setPromotedPiece={setPromotedPiece}
      onSquareClick={(square) => {
        for (let move of validMoves) {
          const from = SquareID.fromSquareIDType(move.from);
          const to = SquareID.fromSquareIDType(move.to);
          if (from.algebraic === square.algebraic) {
            setFromID(from);
          }
          if (
            fromID?.algebraic === from.algebraic &&
            to.algebraic === square.algebraic
          ) {
            setToID(to);
          }
        }
      }}
      onSquareDragStart={(square) => {
        for (let move of validMoves) {
          const from = SquareID.fromSquareIDType(move.from);
          if (from.algebraic === square.algebraic) {
            setFromID(from);
          }
        }
      }}
      onSquareDrop={(_from, to, ev) => {
        ev.currentTarget.style.border = "unset";
        setToID(SquareID.fromSquareIDType(to.algebraic));
      }}
      onSquareDrag={(_square, ev) => {
        ev.currentTarget.style.opacity = "0";
      }}
      onSquareDragEnd={(_square, ev) => {
        ev.currentTarget.style.opacity = "1";
      }}
      onSquareDragEnter={(_square, ev) => {
        ev.currentTarget.style.border = "solid 3px #fff";
      }}
      onSquareDragLeave={(_square, ev) => {
        ev.currentTarget.style.border = "unset";
      }}
    />
  );
};

const meta = {
  title: "UX/Game",
  component: Game,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Game>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Neo: Story = {
  args: {
    pieceSet: "neo",
  },
};
