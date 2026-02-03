import React from "react";

/**
 * A single Tic Tac Toe square rendered as a button.
 *
 * Props:
 * - value: "X" | "O" | null
 * - onClick: () => void
 * - disabled: boolean
 * - positionLabel: string (for accessibility, e.g. "Row 1 Column 1")
 */
export default function Square({ value, onClick, disabled, positionLabel }) {
  return (
    <button
      type="button"
      className={`ttt-square ${value ? `is-${value.toLowerCase()}` : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${positionLabel}${value ? `, ${value}` : ", empty"}`}
    >
      <span className="ttt-squareText" aria-hidden="true">
        {value}
      </span>
    </button>
  );
}
