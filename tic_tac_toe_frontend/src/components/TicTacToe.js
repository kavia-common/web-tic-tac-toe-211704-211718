import React, { useMemo, useState } from "react";
import Square from "./Square";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function calculateWinner(squares) {
  for (const [a, b, c] of WIN_LINES) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

function isBoardFull(squares) {
  return squares.every(Boolean);
}

function indexToRowCol(index) {
  return { row: Math.floor(index / 3) + 1, col: (index % 3) + 1 };
}

// PUBLIC_INTERFACE
export default function TicTacToe() {
  /** Core game state */
  const [squares, setSquares] = useState(() => Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = !winner && isBoardFull(squares);
  const gameOver = Boolean(winner) || isDraw;

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a draw!";
    return `Turn: ${xIsNext ? "X" : "O"}`;
  }, [winner, isDraw, xIsNext]);

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    if (gameOver) return;
    if (squares[index]) return;

    setSquares((prev) => {
      const next = prev.slice();
      next[index] = xIsNext ? "X" : "O";
      return next;
    });
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="ttt">
      <div className="ttt-header">
        <div className="ttt-marquee" aria-hidden="true">
          TIC • TAC • TOE • TIC • TAC • TOE •
        </div>

        <h1 className="ttt-title">Retro Tic Tac Toe</h1>
        <p className="ttt-subtitle">
          Two players. One device. First to three-in-a-row wins.
        </p>
      </div>

      <div
        className={`ttt-status ${winner ? "is-winner" : ""} ${
          isDraw ? "is-draw" : ""
        }`}
        role="status"
        aria-live="polite"
      >
        <span className="ttt-statusLabel">{statusText}</span>
      </div>

      <div className="ttt-boardWrap">
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
          {squares.map((value, idx) => {
            const { row, col } = indexToRowCol(idx);
            const isWinningSquare = line.includes(idx);

            return (
              <div
                key={idx}
                className={`ttt-cell ${isWinningSquare ? "is-winning" : ""}`}
                role="gridcell"
              >
                <Square
                  value={value}
                  disabled={gameOver || Boolean(value)}
                  onClick={() => handleSquareClick(idx)}
                  positionLabel={`Row ${row} Column ${col}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="ttt-controls">
        <button type="button" className="ttt-btn" onClick={resetGame}>
          Reset
        </button>
      </div>

      <div className="ttt-footer">
        <span className="ttt-hint">
          Hint: Click an empty tile to place your mark.
        </span>
      </div>
    </div>
  );
}
