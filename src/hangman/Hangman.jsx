
import React, { useEffect, useState } from 'react';

const words = [
  'react', 'javascript', 'program', 'web', 'feladat',
  'komponens', 'allapot', 'valtozo', 'fuggveny', 'tanulas',
  'kattintas', 'gomb', 'fejlesztes', 'kodolas', 'valasz',
  'projekt', 'allapotkezeles', 'bongeszo', 'halozat', 'szerver',
  'frontend', 'backend', 'html', 'css', 'typescript',
  'hook', 'useeffect', 'usestate', 'grid', 'flexbox'
];

function normalize(char) {
  const map = { á: 'a', é: 'e', í: 'i', ó: 'o', ö: 'o', ő: 'o', ú: 'u', ü: 'u', ű: 'u' };
  return map[char] || char;
}

export default function Hangman() {
  const [word, setWord] = useState(() => words[Math.floor(Math.random() * words.length)]);
  const [guessed, setGuessed] = useState([]);
  const [tries, setTries] = useState(6);

  const masked = word.split('').map(letter => guessed.includes(normalize(letter)) ? letter : '_').join(' ');

  function guess(letter) {
    const normalized = normalize(letter);
    if (!guessed.includes(normalized) && tries > 0 && !isGameWon()) {
      setGuessed(prev => [...prev, normalized]);
      if (!word.split('').some(l => normalize(l) === normalized)) {
        setTries(prev => prev - 1);
      }
    }
  }

  function isGameWon() {
    return word.split('').every(l => guessed.includes(normalize(l)));
  }

  function handleKeyDown(event) {
    const letter = event.key.toLowerCase();
    if (/^[a-záéíóöőúüű]$/.test(letter)) {
      guess(letter);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  function restartGame() {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessed([]);
    setTries(6);
  }

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const gameOver = tries <= 0 || isGameWon();

  return (
    <div>
      <h3>Akasztófa</h3>
      <p>Szó: {masked}</p>
      <p>Hátralévő próbálkozások: {tries}</p>
      <div>
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => guess(letter)}
            disabled={guessed.includes(letter) || gameOver}
          >
            {letter}
          </button>
        ))}
      </div>
      {gameOver && (
        <p>{tries > 0 ? 'Gratulálok, nyertél!' : `Vesztettél! A szó: ${word}`}</p>
      )}
      <button onClick={restartGame} style={{ marginTop: '10px', padding: '10px' }}>Új játék</button>
    </div>
  );
}
