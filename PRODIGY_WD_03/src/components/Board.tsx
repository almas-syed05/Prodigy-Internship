 // keep only what you use

import Square from "./Square";

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
  winningLine: number[];
  winType: string | null;
}

export default function Board({ squares, onClick,  winType }: BoardProps) {
  return (
    <div className="board-container">
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => onClick(i)}
          
        />
      ))}
      {winType && <div className={`strike ${winType}`}></div>}
    </div>
  );
}
