<div align="center">
<h1>@ammar-ahmed22/react-chess</h1>
<p>Custom built Chess UI components/hooks for React to be used with my custom built <a href="https://google.ca">Chess engine.</a></p>
</div>

## What is this?
I don't intend for many people to see this, however, if you do stumble across this, this library was created merely as a learning exercise for myself. There is already a more robust/complete Chess UI built for React called `react-chessboard`.

I built this with two distinct learning goals:
1. To learn how to create React component libraries
2. To hone my React skills by building a complex UI such as a Chess board

I mentioned in the description that it is meant to be used with my Chess engine, which is true; however, I tried to make the components/hooks as flexible as possible so that it could potentially be used by any Chess engines or to simply view Chess positions, etc. 

## Installation
```sh
npm install --save @ammar-ahmed22/react-chess
```

## Features
- *Responsive Board Size*: Squares and board height auto-update with one prop
- *FEN Position*: Set the position of the board with a FEN string
- *Board Orientation*: Flip the orientation of the board
- *Custom Actions*: Various custom actions for each individual square are available with single callbacks (e.g onSquareClick)
+ *UI Customization*: Change light/dark square colors, override move identifiers, etc.
+ *Valid Move Identifiers*: Handles showing valid moves onClick when provided
+ *Board Coordinate Identifiers*: Show coordinate identifiers

## Usage
### Render a Chess FEN position
```typescript
import { ChessBoard } from "@ammar-ahmed22/react-chess";
import { Chess } from "@ammar-ahmed22/chess-engine";

export default function App() {
  const chess = new Chess();
  return (
    <div>
      <ChessBoard 
        position={chess.fen()} // starts off with the starting position
      />
    </div>
  )
}
```

## `ChessBoard` Props
<!-- CHESSBOARD PROPS TABLE START -->
| Prop | Type | Default | Params | Description | 
| :--- | :--- | :------ | :----- | :---------- |
| darkColor | `string` | `"#b58863"` | N/A | The color to use for dark squares. Must be a valid CSS color string (e.g. "#fff", "rgb(255, 255, 255)", etc.) |
| flipBoard | `boolean` | `false` | N/A | If true, board is flipped. |
| lightColor | `string` | `"#f0d9b5"` | N/A | The color to use for light squares. Must be a valid CSS color string (e.g. "#fff", "rgb(255, 255, 255)", etc.) |
| moveIdentifier | `React.ReactNode` | N/A | N/A | If provided, overrides the default move identifier |
| onSquareClick | `(square: SquareType) => void` | N/A | @param square - The square that is being clicked | Callback function when a square is clicked |
| onSquareDrag | `(square: SquareType, ev: React.DragEvent<HTMLImageElement>) => void` | N/A | @param square - The square that is being dragged<br />@param ev - The drag event for the piece image being dragged. | Callback function that is called while a piece is being dragged. |
| onSquareDragEnd | `(square: SquareType, ev: React.DragEvent<HTMLImageElement>) => void` | N/A | @param square - The square that was being dragged<br />@param ev - The drag event for the piece image that was being dragged. | Callback function that is called when a piece stops being dragged |
| onSquareDragEnter | `(square: SquareType, ev: React.DragEvent<HTMLDivElement>) => void` | N/A | @param square - The square that is being entered<br />@param ev - The drag event for the square that is being entered. | Callback function that is called when a dragged piece enters a square |
| onSquareDragLeave | `(square: SquareType, ev: React.DragEvent<HTMLDivElement>) => void` | N/A | @param square - The square that is being left.<br />@param ev - The drag event for the square that is being left. | Callback function that is called when a dragged piece leaves a square |
| onSquareDragOver | `(square: SquareType, ev: React.DragEvent<HTMLDivElement>) => boolean` | N/A | @param square - The square that the piece is being dragged over.<br />@param ev - The drag event for the square that is being dragged over. | Callback function that is called when a piece is dragged over a square.
If the function returns true, the drop is allowed, otherwise it is not. |
| onSquareDragStart | `(square: SquareType, ev: React.DragEvent<HTMLImageElement>) => void` | N/A | @param square - The square that is being dragged.<br />@param ev - The drag event for the piece image that is being dragged. | Callback function that is called when a piece is starting to be dragged |
| onSquareDrop | `(from: SquareType, on: SquareType, ev: React.DragEvent<HTMLDivElement>) => void` | N/A | @param from - The square that the piece is being dragged from<br />@param on - The square that the piece is being dropped on<br />@param ev - The drag event for the square that is being dropped on. | Callback function that is called when a piece is dropped over a square |
| pieceSet | `PieceSet | PieceImageMap` | `"cases"` | N/A | The piece set (images) to use, provided are the `cases` and `neo` piece sets. Otherwise, provide a custom piece image map to use custom pieces. |
| position | `string` | N/A | N/A | The Chess position to render as a FEN (without metadata) string. |
| showCoordinates | `boolean` | `false` | N/A | If true, coordinates identifiers will be shown. Rank numbers will be shown on the left most file, file letters will be shown on the bottom most rank (irrespective of board orientation). |
| size | `string | number` | `"90vh"` | N/A | The size of the board as a CSS string value or a number in pixels. Square sizes will be calculated accordingly |
| squareDraggable | `boolean | (square: SquareType) => boolean` | `true` | @param square - If a function is passed, the square that will be dragged | If false, cannot be dragged. If a function is passed, the result of the function will determine if that square can be dragged. |
| validMoves | `[HalfMove](https://github.com/ammar-ahmed22/chess-engine)[]` | N/A | N/A | If provided, when clicking on a piece, shows valid moves |
<!-- CHESSBOARD PROPS TABLE END -->


## License
[MIT](./LICENSE)