import styles from "./GameOver.module.css";

const GameOver = ({retry, score}) => {
  return (
    <div className={styles.gameOver}>
      <p>Sua pontuação foi: <span>{score}</span></p>
      <button onClick={retry} title="Clique Para Voltar a Tela Inicial">Voltar Para o Início</button>
    </div>
  );
};

export default GameOver;
