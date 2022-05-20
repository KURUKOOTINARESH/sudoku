import Sudoku from "./components/Sudoku";
import "./App.css";

const tableCellsList = [
  ["", 2, 8, 4, 7, 5, 9, 3, ""],
  [1, 7, "", "", 3, "", 2, "", ""],
  [3, 9, 5, 8, "", 2, "", "", ""],
  [9, 6, "", "", "", "", "", "", 2],
  [4, 1, 7, 2, 9, 8, 3, "", ""],
  ["", "", "", 1, 6, 3, 7, "", ""],
  ["", "", 6, 9, 4, 1, 5, 7, 3],
  [5, "", "", "", 2, 7, 1, 6, 8],
  [7, 3, 1, 5, 8, 6, 4, "", ""],
];
const ansTable = [
  [6, 2, 8, 4, 7, 5, 9, 3, 1],
  [1, 7, 4, 6, 3, 9, 2, 8, 5],
  [3, 9, 5, 8, 1, 2, 6, 4, 7],
  [9, 6, 3, 7, 5, 4, 8, 1, 2],
  [4, 1, 7, 2, 9, 8, 3, 5, 6],
  [8, 5, 2, 1, 6, 3, 7, 9, 4],
  [2, 8, 6, 9, 4, 1, 5, 7, 3],
  [5, 4, 9, 3, 2, 7, 1, 6, 8],
  [7, 3, 1, 5, 8, 6, 4, 2, 9],
];
const App = () => (
  <div className="app-container">
    <h1 className="title">SUDOKU</h1>
    <Sudoku tableCellsList={tableCellsList} ansTable={ansTable} />
  </div>
);

export default App;
