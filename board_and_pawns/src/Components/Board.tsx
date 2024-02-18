import { BoardState } from '../Models/BoardState'

interface BoardCallback {
  (index: number): void
}

interface BoardProps {
  board: BoardState;
  callback: BoardCallback
  optionalProp?: string; // Optional prop with default type
}
export function Board(props: BoardProps) {
  return <>
    <div className="Board">
      { props.board.cells.map((cell, index) => {
      const pos = 50 * index;
      return (<button className="Cell" key={index} style={{top: '0px', left: pos +'px'}} 
          onClick={() => props.callback(index)}>
          <p>{cell}</p>
          </button>);
      })}
      { props.board.pawns.map((pawn, _) => {
        const pos = 50 * pawn.pos;
        const color = props.board.selected == pawn.pos ? 'red' : 'black';
        return (<div className="Pawn" key={pawn.id} style={{backgroundColor: color, top: '50px', left: pos +'px'}}>
          <p>{pawn.id}</p>
          </div>);
      })}
    </div>
  </>
}