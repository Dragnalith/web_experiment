import { createRoot } from 'react-dom/client';
import { Board } from './Components/Board';
import './styles/style.css';

function App() {
  return (
    <div>
      <h1>Board & Pawns</h1>
      <ul>
        <li>Create: Click on a button with no pawn to create a pawn.</li>
        <li>Select: Click on a button where a pawn already exist to select it.</li>
        <li>Move: Click on a button with no pawn to move the selected pawn.</li>
        <li>Remove: Click on a button where a pawn is selected to remove it.</li>
      </ul>
      <Board/>
    </div>
  );
}

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);
root.render(<App />);