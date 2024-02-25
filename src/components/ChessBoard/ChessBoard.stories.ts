import type { Meta, StoryObj } from "@storybook/react";
import ChessBoard from "./ChessBoard";


const meta = {
  title: "UI/ChessBoard",
  component: ChessBoard,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
} satisfies Meta<typeof ChessBoard>

export default meta;

type Story = StoryObj<typeof meta>;

export const Size: Story = {
  args: { size: "90vh" }
}

export const StartPosition: Story = {
  args: { position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" }
}

export const FlippedBoard: Story = {
  args: { position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", flipBoard: true }
}