import { useState } from 'react';
import { BoardState, updateBoard} from '../Models/BoardState'

export function Board() {
  const [ boardState, setboardState] = useState(new BoardState());
  
  var textStateArray = boardState.cells.map(() => 'X')
  for (const pawn of boardState.pawns) {
      textStateArray[pawn.pos] = 'O';
  }
  return <>
    <div>
      <p>Current State: {textStateArray.join("")}</p>
    </div>
    <div className="Board">
      { boardState.cells.map((cell, index) => {
      const pos = 50 * index;
      return <button
          className="Cell" key={index} style={{top: '0px', left: pos +'px'}} 
          onClick={() => setboardState(updateBoard(boardState, index))}>
          <p>{cell}</p>
          </button>
      })}
      { boardState.pawns.map((pawn, _) => {
      const pos = 50 * pawn.pos;
      const color = boardState.selected == pawn.pos ? 'red' : 'black';
      return <div className="Pawn" key={pawn.id} style={{backgroundColor: color, top: '50px', left: pos +'px'}}>
          <p>{pawn.id}</p>
          </div>
      })}
    </div>
  </>
}