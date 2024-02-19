import styles from './StartScreen.module.css'

const StartScreen = ({startGame}) => {
  return (
    <div className={styles.start}>
        <p>Clique no botão abaixo para começar a jogar!</p>
        <button onClick={startGame} title="Clique Para Iniciar a Partida">Jogar</button>
    </div>
  )
}

export default StartScreen