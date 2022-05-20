import "./index.css";
import { Component } from "react";
import GameResult from "../GameResult";

class Sudoku extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRunning: false,
      timeInSeconds: 900,
      gameCompleted: false,
      sudokuTableList: this.props.tableCellsList,
      won: false,
      pause: true,
    };
  }

  decrementTimeInSeconds = () => {
    const { timeRunning, timeInSeconds } = this.state;
    if (timeInSeconds === 0) {
      clearInterval(this.intervalId);
      this.setState({ gameCompleted: true });
    } else {
      this.setState((prevState) => ({
        timeInSeconds: prevState.timeInSeconds - 1,
        pause: false,
      }));
    }
  };

  onStartPauseButtonClick = () => {
    const { timeRunning } = this.state;
    if (timeRunning) {
      clearInterval(this.intervalId);
      this.setState({ pause: true });
    } else {
      this.intervalId = setInterval(this.decrementTimeInSeconds, 1000);
    }
    this.setState((prevState) => ({ timeRunning: !prevState.timeRunning }));
  };

  onRestartCLick = () => {
    clearInterval(this.intervalId);
    this.setState({
      timeRunning: false,
      timeInSeconds: 900,
      gameCompleted: false,
      sudokuTableList: this.props.tableCellsList,
      won: false,
      pause: true,
    });
  };

  onPlayAgainButtonClick = () => {
    this.setState({
      timeRunning: false,
      timeInSeconds: 900,
      gameCompleted: false,
      sudokuTableList: this.props.tableCellsList,
      won: false,
      pause: true,
    });
  };

  onCellChange = (index, subIndex, event) => {
    const { tableCellsList, ansTable } = this.props;
    const { sudokuTableList } = this.state;

    const userInput = parseInt(event.target.value);
    const enteredNum = userInput ? userInput : event.target.value;
    let isValid = true;
    let gameFinished = false;
    if (isNaN(enteredNum)) {
      isValid = false;
    }
    if (tableCellsList[index].includes(enteredNum)) {
      isValid = false;
    }
    tableCellsList.forEach((eachItem) => {
      if (eachItem[subIndex] === enteredNum) {
        isValid = false;
      }
    });
    const rowIndex = Math.floor(index / 3) * 3;
    const columnIndex = Math.floor(subIndex / 3) * 3;
    for (let i = rowIndex; i < rowIndex + 3; i++) {
      for (let j = columnIndex; j < columnIndex + 3; j++) {
        if (tableCellsList[i][j] === enteredNum) {
          isValid = false;
        }
      }
    }
    if (!isValid) {
      event.target.className = "cell-input not-valid";
    } else {
      event.target.className = "cell-input";
    }

    this.setState((prevState) => ({
      sudokuTableList: prevState.sudokuTableList.map((eachItem, rIndex) => {
        if (rIndex === index) {
          return eachItem.map((eachCell, sIndex) => {
            if (sIndex === subIndex) {
              return enteredNum;
            }
            return eachCell;
          });
        }
        return eachItem;
      }),
    }));
  };

  getCells = () => {
    const { tableCellsList, ansTable } = this.props;
    const { sudokuTableList, pause } = this.state;
    const cellsConClassName = pause ? "cell-input game-pause" : "cell-input";
    return (
      <ul className="cells-container">
        {tableCellsList.map((eachItem, index) => {
          return (
            <li className="cell-container">
              {eachItem.map((eachCell, subIndex) => {
                if (!eachCell) {
                  return (
                    <input
                      type="text"
                      className={cellsConClassName}
                      value={sudokuTableList[index][subIndex]}
                      onChange={(event) =>
                        this.onCellChange(index, subIndex, event)
                      }
                      disabled={pause}
                    />
                  );
                } else {
                  return <p className="cell">{eachCell}</p>;
                }
              })}
            </li>
          );
        })}
      </ul>
    );
  };

  getDisplayComponent = () => {
    const { tableCellsList, ansTable } = this.props;
    const { timeRunning, timeInSeconds, sudokuTableList } = this.state;
    let { gameCompleted, won } = this.state;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const minutesDisplay = minutes > 9 ? `${minutes}` : `0${minutes}`;
    const secondsDisplay = seconds > 9 ? `${seconds}` : `0${seconds}`;
    const startPauseButtonIcon = timeRunning
      ? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
      : "https://assets.ccbp.in/frontend/react-js/play-icon-img.png";
    const startPauseButtonText = timeRunning ? "Pause" : "Start";
    let match = true;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (ansTable[i][j] !== sudokuTableList[i][j]) {
          match = false;
        }
      }
    }
    if (match) {
      gameCompleted = true;
      won = true;
    }
    const resultText = won ? "You Won" : "You Lose";
    const resultGreetings = won ? "Congratulations" : "Better Luck Next Time";
    if (gameCompleted) {
      return (
        <GameResult
          resultText={resultText}
          resultGreetings={resultGreetings}
          onPlayAgainButtonClick={this.onPlayAgainButtonClick}
        />
      );
    } else {
      return (
        <div className="sudoku-container">
          <div className="sudoku-table-con">
            <div className="sudoku-table">{this.getCells()}</div>
            <div className="timer-controls-container">
              <button
                type="button"
                className="timer-button"
                onClick={this.onStartPauseButtonClick}
              >
                <img
                  src={startPauseButtonIcon}
                  alt="play icon"
                  className="button-icon"
                />
                <p>{startPauseButtonText}</p>
              </button>
              <button
                type="button"
                className="timer-button"
                onClick={this.onRestartCLick}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="button-icon"
                />
                <p>Restart</p>
              </button>
            </div>
          </div>
          <div className="timer-container">
            <h1 className="timer">
              {minutesDisplay}:{secondsDisplay}
            </h1>
          </div>
        </div>
      );
    }
  };

  render() {
    return <div>{this.getDisplayComponent()}</div>;
  }
}
export default Sudoku;
