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
const App = () => <Sudoku tableCellsList={tableCellsList} />;

export default App;
