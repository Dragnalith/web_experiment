import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { Board } from './Components/Board';
import { BoardState, updateBoard } from './Models/BoardState'
import './styles/style.css';

function App() {
  const [ boardState, setboardState] = useState(new BoardState());

  var textStateArray = boardState.cells.map(() => 'X')
  for (const pawn of boardState.pawns) {
      textStateArray[pawn.pos] = 'O';
  }
  return (
    <div>
      <h1>Board & Pawns</h1>
      <ul>
        <li>Create: Click on a button with no pawn to create a pawn.</li>
        <li>Select: Click on a button where a pawn already exist to select it.</li>
        <li>Move: Click on a button with no pawn to move the selected pawn.</li>
        <li>Remove: Click on a button where a pawn is selected to remove it.</li>
      </ul>
      <div>
        <p>Instant State: {textStateArray.join("")}</p>
      </div>
      <Board board={boardState} callback={(index) => setboardState(updateBoard(boardState, index))}/>
    </div>
  );
}

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);
root.render(<App />);