
import React, { useState } from 'react';
import Minesweeper from './minesweeper/Minesweeper';
import Hangman from './hangman/Hangman';

export default function App() {
  const [page, setPage] = useState('minesweeper');
  return (
    <div>
      <h1>React SPA Beadandó</h1>
      <button onClick={() => setPage('minesweeper')}>Aknakereső</button>
      <button onClick={() => setPage('hangman')}>Akasztófa</button>
      <hr />
      {page === 'minesweeper' ? <Minesweeper /> : <Hangman />}
    </div>
  );
}
