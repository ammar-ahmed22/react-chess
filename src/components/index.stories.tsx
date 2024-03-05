import type { Meta, StoryObj } from "@storybook/react";
import { ChessBoard, ChessBoardProps } from "./ChessBoard";
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

  useEffect(() => {
    if (fromID && toID) {
      const [executeMove] = chess.validMoves().filter((move) => {
        const from = SquareID.fromSquareIDType(move.from);
        const to = SquareID.fromSquareIDType(move.to);
        return (
          from.algebraic === fromID.algebraic &&
          to.algebraic === toID.algebraic
        );
      });
      const result = chess.execute(executeMove as HalfMove);
      if (result) {
        setFEN(chess.fen());
        setValidMoves(chess.validMoves());
        setFromID(null);
        setToID(null);
        setChess(chess.clone());
      }
    }
  }, [fromID, toID]);

  return (
    <ChessBoard
      {...props}
      position={fen}
      flipBoard={chess.colorToMove() === "black"}
      validMoves={validMoves}
      // onSquareClick={(square) => {
      //   for (let move of validMoves) {
      //     const from = SquareID.fromSquareIDType(move.from);
      //     const to = SquareID.fromSquareIDType(move.to);
      //     if (from.algebraic === square.algebraic) {
      //       setFromID(from);
      //     }
      //     if (
      //       fromID?.algebraic === from.algebraic &&
      //       to.algebraic === square.algebraic
      //     ) {
      //       setToID(to);
      //     }
      //   }
      // }}
      // squareDraggable={(square) => {
      //   let hasValid = false;
      //   for (let move of validMoves) {
      //     const from = SquareID.fromSquareIDType(move.from);
      //     if (square.algebraic === from.algebraic) {
      //       hasValid = true;
      //     }
      //   }
      //   return hasValid;
      // }}
      // onSquareDragStart={(square) => {
      //   for (let move of validMoves) {
      //     const from = SquareID.fromSquareIDType(move.from);
      //     if (from.algebraic === square.algebraic) {
      //       setFromID(from);
      //     }
      //   }
      // }}
      // onSquareDragOver={(square) => {
      //   if (!fromID) return false;
      //   for (let move of validMoves) {
      //     const to = SquareID.fromSquareIDType(move.to);
      //     const from = SquareID.fromSquareIDType(move.from);
      //     if (
      //       fromID.algebraic === from.algebraic &&
      //       to.algebraic === square.algebraic
      //     )
      //       return true;
      //   }
      //   return false;
      // }}
      // onSquareDrop={(_from, to, ev) => {
      //   ev.currentTarget.style.border = "unset";
      //   setToID(SquareID.fromSquareIDType(to.algebraic));
      // }}
      // onSquareDrag={(_square, ev) => {
      //   ev.currentTarget.style.opacity = "0";
      // }}
      // onSquareDragEnd={(_square, ev) => {
      //   ev.currentTarget.style.opacity = "1";
      // }}
      // onSquareDragEnter={(_square, ev) => {
      //   ev.currentTarget.style.border = "solid 3px #fff";
      // }}
      // onSquareDragLeave={(_square, ev) => {
      //   ev.currentTarget.style.border = "unset";
      // }}
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
