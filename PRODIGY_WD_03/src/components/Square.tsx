import React from "react";

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

export default function Square({ value, onClick }: SquareProps) {
  const getColor = () => {
    if (value === "X") return "red";
    if (value === "O") return "blue";
    return "black"; // default color if empty
  };

  return (
    <button
      className="square"
      onClick={onClick}
      style={{ color: getColor(), fontWeight: "bold", fontSize: "2rem" }}
    >
      {value}
    </button>
  );
}
