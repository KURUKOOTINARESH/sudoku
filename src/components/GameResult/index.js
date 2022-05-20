import "./index.css";

const GameResult = (props) => {
  const { onPlayAgainButtonClick, resultText, resultGreetings } = props;

  const onButtonClick = () => {
    onPlayAgainButtonClick();
  };

  return (
    <div className="sudoku-container">
      <div className="result-container">
        <div className="result-text-container">
          <h1>{resultText}</h1>
          <h1>{resultGreetings}</h1>
        </div>
        <button
          type="button"
          className="play-again-button"
          onClick={onButtonClick}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
export default GameResult;
