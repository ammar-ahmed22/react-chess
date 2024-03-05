import type { Meta, StoryObj } from "@storybook/react";
import ChessBoard from "./ChessBoard";
import { Chess } from "@ammar-ahmed22/chess-engine";

const meta = {
  title: "UI/ChessBoard",
  component: ChessBoard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof ChessBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

const chess = new Chess();
export const Size: Story = {
  args: { size: "90vh" },
};

export const StartPosition: Story = {
  args: { position: chess.fen() },
};

export const FlippedBoard: Story = {
  args: { position: chess.fen(), flipBoard: true },
};

export const ValidMoves: Story = {
  args: {
    position: chess.fen(),
    validMoves: chess.validMoves(),
  },
};

export const PiecePromotion: Story = {
  args: {
    position: "rnbqkb1P/pppp3p/7n/8/8/8/PPPPP1PP/RNBQKBNR",
    showPromotionModal: { id: "h8", color: "white" },
  },
};
