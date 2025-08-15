import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line, type } = calculateWinner(squares);

  function handleClick(i: number) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!squares.includes(null)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} winningLine={line} winType={type} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button className="reset-btn" onClick={resetGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    { indexes: [0, 1, 2], type: "horizontal-0" },
    { indexes: [3, 4, 5], type: "horizontal-1" },
    { indexes: [6, 7, 8], type: "horizontal-2" },
    { indexes: [0, 3, 6], type: "vertical-0" },
    { indexes: [1, 4, 7], type: "vertical-1" },
    { indexes: [2, 5, 8], type: "vertical-2" },
    { indexes: [0, 4, 8], type: "diagonal-0" },
    { indexes: [2, 4, 6], type: "diagonal-1" },
  ];

  for (let line of lines) {
    const [a, b, c] = line.indexes;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: line.indexes, type: line.type };
    }
  }
  return { winner: null, line: [], type: null };
}
