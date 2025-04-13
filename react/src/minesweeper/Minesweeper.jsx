
import React, { useState } from 'react';

export default function Minesweeper() {
  const size = 8;
  const mines = 10;
  const [board, setBoard] = useState(() => generateBoard());

  function generateBoard() {
    const newBoard = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        isMine: false,
        adjacent: 0,
        isRevealed: false,
      }))
    );

    let placed = 0;
    while (placed < mines) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      if (!newBoard[r][c].isMine) {
        newBoard[r][c].isMine = true;
        placed++;
      }
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (newBoard[r][c].isMine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
              if (newBoard[nr][nc].isMine) count++;
            }
          }
        }
        newBoard[r][c].adjacent = count;
      }
    }

    return newBoard;
  }

  function reveal(board, r, c) {
    if (r < 0 || r >= size || c < 0 || c >= size) return;
    const cell = board[r][c];
    if (cell.isRevealed || cell.isMine) return;
    cell.isRevealed = true;
    if (cell.adjacent === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          reveal(board, r + dr, c + dc);
        }
      }
    }
  }

  function handleClick(r, c) {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const cell = newBoard[r][c];
    if (cell.isRevealed) return;

    if (cell.isMine) {
      cell.isRevealed = true;
      setBoard(newBoard);
      alert('Vesztettél! Aknára léptél.');
      return;
    }

    if (cell.adjacent === 0) {
      reveal(newBoard, r, c);
    } else {
      cell.isRevealed = true;
    }

    setBoard(newBoard);
  }

  function restartGame() {
    setBoard(generateBoard());
  }

  return (
    <div>
      <button onClick={restartGame}>Új játék</button>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 40px)` }}>
        {board.flatMap((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: cell.isRevealed ? '#ddd' : '#999',
                border: '1px solid #555',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              {cell.isRevealed ? (cell.isMine ? '💣' : cell.adjacent || '') : ''}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
