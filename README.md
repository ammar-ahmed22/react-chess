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
| Prop | Type | Default | Description | 
| :--- | :--- | :------ | :---------- |
| darkColor | <code>string</code> | `"#b58863"` | The color to use for dark squares. Must be a valid CSS color string (e.g. "#fff", "rgb(255, 255, 255)", etc.) |
| flipBoard | <code>boolean</code> | `false` | If true, board is flipped. |
| lightColor | <code>string</code> | `"#f0d9b5"` | The color to use for light squares. Must be a valid CSS color string (e.g. "#fff", "rgb(255, 255, 255)", etc.) |
| moveIdentifier | <code>React.ReactNode</code> | N/A | If provided, overrides the default move identifier |
| onSquareClick | <code>(square: SquareType) => void</code> | N/A | Callback function when a square is clicked |
| onSquareDrag | <code>(square: SquareType, ev: React.DragEvent<HTMLImageElement>) => void</code> | N/A | Callback function that is called while a piece is being dragged. |
| onSquareDragEnd | <code>(square: SquareType, ev: React.DragEvent<HTMLImageElement>) => void</code> | N/A | Callback function that is called when a piece stops being dragged |
| onSquareDragEnter | <code>(square: SquareType, ev: React.DragEvent<HTMLDivElement>) => void</code> | N/A | Callback function that is called when a dragged piece enters a square |
| onSquareDragLeave | <code>(square: SquareType, ev: React.DragEvent<HTMLDivElement>) => void</code> | N/A | Callback function that is called when a dragged piece leaves a square |
| onSquareDragOver | <code>(square: SquareType, ev: React.DragEvent<HTMLDivElement>) => boolean</code> | N/A | Callback function that is called when a piece is dragged over a square.
If the function returns true, the drop is allowed, otherwise it is not. |
| onSquareDragStart | <code>(square: SquareType, ev: React.DragEvent<HTMLImageElement>) => void</code> | N/A | Callback function that is called when a piece is starting to be dragged |
| onSquareDrop | <code>(from: SquareType, on: SquareType, ev: React.DragEvent<HTMLDivElement>) => void</code> | N/A | Callback function that is called when a piece is dropped over a square |
| pieceSet | <code>PieceSet &#124; PieceImageMap</code> | `"cases"` | The piece set (images) to use, provided are the `cases` and `neo` piece sets. Otherwise, provide a custom piece image map to use custom pieces. |
| position | <code>string</code> | N/A | The Chess position to render as a FEN (without metadata) string. |
| showCoordinates | <code>boolean</code> | `false` | If true, coordinates identifiers will be shown. Rank numbers will be shown on the left most file, file letters will be shown on the bottom most rank (irrespective of board orientation). |
| size | <code>string &#124; number</code> | `"90vh"` | The size of the board as a CSS string value or a number in pixels. Square sizes will be calculated accordingly |
| squareDraggable | <code>boolean &#124; (square: SquareType) => boolean</code> | `true` | If false, cannot be dragged. If a function is passed, the result of the function will determine if that square can be dragged. |
| validMoves | <code>[HalfMove](https://github.com/ammar-ahmed22/chess-engine)[]</code> | N/A | If provided, when clicking on a piece, shows valid moves |
<!-- CHESSBOARD PROPS TABLE END -->


## License
[MIT](./LICENSE)