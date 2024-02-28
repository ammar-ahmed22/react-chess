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
- Responsive Board Size
- Setting Board Position with FEN string
- Board Orientation
- Custom Actions
  + onSquareClick
  + onSquareDragStart
  + onSquareDrag
  + onSquareDragEnd
  + onSquareDragEnter
  + onSquareDragOver
  + onSquareDrop
  + onSquareDragLeave
+ Light/Dark Square Colors
+ Valid Move Identifiers
+ Board Coordinate Identifiers

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
| Prop | Default Value | Options | Description |
| :--- | :------------ | :------ | :---------- |
| `size` | `"90vh"`      | `string` or `number` | The size of the board as a CSS string value or a number in pixels. Square sizes will be calculated accordingly | 
| `position` | | `string` | The Chess position to render as a FEN (without metadata) string. |


## License
[MIT](./LICENSE)