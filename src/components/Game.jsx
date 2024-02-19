import styles from "./Game.module.css";
import { useState, useRef } from "react";

const Game = ({
  verifyLetter,
  giveUpMatch,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  return (
    <div className={styles.game}>
      <p className={styles.points}>
        Pontuação: <span>{score}</span>
      </p>
      <h2>Adivinhe a Palavra:</h2>
      <h3 className={styles.tip}>
        Dica: <span>{pickedCategory}</span>
      </h3>
      <p>
        Você ainda tem <span>{guesses}</span> tentativa(s).
      </p>
      <div className={styles.wordContainer}>
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className={styles.letter}>
              {letter}
            </span>
          ) : (
            <span key={i} className={styles.blankSquare}></span>
          )
        )}
      </div>
      <div className={styles.letterContainer}>
        <p>Adivinhe Uma das Letras da Palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            title="Digite Sua Tentativa"
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button
            className={styles.confirmButton}
            onClick={verifyLetter}
            title="Arriscar?"
          >
            Arriscar
          </button>
          <button
            className={styles.giveUpButton}
            onClick={giveUpMatch}
            title="Desistir da Partida?"
          >
            Desistir
          </button>
        </form>
      </div>
      <div className={styles.wrongLettersContainer}>
        <p>Letras Erradas:</p>
        {wrongLetters.map((wrongLetter, i) => (
          <span key={i}>{wrongLetter}, </span>
        ))}
      </div>
    </div>
  );
  
};


export default Game;
