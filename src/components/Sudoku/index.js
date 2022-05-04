import "./index.css";
import { Component } from "react";

let emptyCount = 31;
class Sudoku extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRunning: false,
      timeInSeconds: 900,
      gameCompleted: false,
      sudokuTableList: this.props.tableCellsList,
      won: false,
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
      }));
    }
  };

  onStartPauseButtonClick = () => {
    const { timeRunning } = this.state;
    if (timeRunning) {
      clearInterval(this.intervalId);
    } else {
      this.intervalId = setInterval(this.decrementTimeInSeconds, 1000);
    }
    this.setState((prevState) => ({ timeRunning: !prevState.timeRunning }));
  };

  onRestartCLick = () => {
    emptyCount = 31;
    clearInterval(this.intervalId);
    this.setState({
      timeRunning: false,
      timeInSeconds: 900,
      gameCompleted: false,
      sudokuTableList: this.props.tableCellsList,
      won: false,
    });
  };

  onPlayAgainButtonClick = () => {
    emptyCount = 31;
    this.setState({
      timeRunning: false,
      timeInSeconds: 900,
      gameCompleted: false,
      sudokuTableList: this.props.tableCellsList,
      won: false,
    });
  };

  onCellChange = (index, subIndex, event) => {
    const { tableCellsList } = this.props;
    const { sudokuTableList } = this.state;
    const userInput = parseInt(event.target.value);
    const enteredNum = userInput ? userInput : event.target.value;
    let isValid = true;
    let gameFinished = false;
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
      emptyCount -= 1;
      console.log(emptyCount);
      if (emptyCount === 0) {
        gameFinished = true;
      }
      event.target.className = "cell-input";
    }
    if (gameFinished) {
      this.setState({
        gameCompleted: true,
        sudokuTableList: this.props.tableCellsList,
        won: true,
      });
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
    const { tableCellsList } = this.props;
    const { sudokuTableList } = this.state;
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
                      className="cell-input"
                      value={sudokuTableList[index][subIndex]}
                      onChange={(event) =>
                        this.onCellChange(index, subIndex, event)
                      }
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
    const { tableCellsList } = this.props;
    const { timeRunning, timeInSeconds, gameCompleted } = this.state;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const minutesDisplay = minutes > 9 ? `${minutes}` : `0${minutes}`;
    const secondsDisplay = seconds > 9 ? `${seconds}` : `0${seconds}`;
    const startPauseButtonIcon = timeRunning
      ? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
      : "https://assets.ccbp.in/frontend/react-js/play-icon-img.png";
    const startPauseButtonText = timeRunning ? "Pause" : "Start";
    if (gameCompleted) {
      return (
        <div className="sudoku-container">
          <div className="result-container">
            <div className="result-text-container">
              <h1>You Won</h1>
              <h1>Congratulations</h1>
            </div>
            <button
              type="button"
              className="play-again-button"
              onClick={this.onPlayAgainButtonClick}
            >
              Play Again
            </button>
          </div>
        </div>
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
    return (
      <div className="app-container">
        <h1 className="title">SUDOKU</h1>
        {this.getDisplayComponent()}
      </div>
    );
  }
}
export default Sudoku;
