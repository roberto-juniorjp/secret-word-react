// CSS
import "./App.css";

// Hooks
import { useCallback, useEffect, useState } from "react";

// Dados
import { wordsList } from "./data/words";

//Componentes
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessAmount = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const words = useState(wordsList);

  const [pickedWord, setPickedword] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessAmount);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    // Selecionar Categoria Aleatória
    const categories = Object.keys(words[0]);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Selecionar Palavra Aleatória da Categoria Selecionada Acima
    const word =
      words[0][category][Math.floor(Math.random() * words[0][category].length)];

    // Retorna a Categoria e a Palavra Escolhida Aleatoriamente
    return { word, category };
  }, [words]);

  // Iniciar o Jogo
  const startGame = useCallback(() => {
    // Limpar as Palavras
    clearGameStages();
    

    // Escolher Categoria e Palavra
    const { word, category } = pickWordAndCategory();

    // Criar Uma Lista de Letras Para a Forca
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // Alterar os Estados
    setPickedword(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // Captura o Input das Letras
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // Verificar Se a Letra Já Foi Utilizada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // Atualizar Painel de Letras e Atualizar Chances
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // Encerrar a Partida
  const clearGameStages = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Verificar Se Acabaram as Tentativas
  useEffect(() => {
    if (guesses <= 0) {
      clearGameStages();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Verificar Condição de Vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (guessedLetters.length === uniqueLetters.length && gameStage !== stages[0].name) {
      setScore((actualScore) => (actualScore += 100));
      startGame();
    }

  }, [guessedLetters, letters, startGame]);

  const giveUpMatch = () => {
    setGameStage(stages[2].name);
  };

  // Reinicia o Jogo
  const retry = () => {
    setGuesses(guessAmount);
    setScore(0);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      <h1 id="main-title">Palavras Secretas</h1>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          giveUpMatch={giveUpMatch}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
