var uuid = 0;

class PawnModel {
  pos: number = -1; 
  id: number = -1;
}

export class BoardState {
  cells: string[] = ['0', '1', '2', '3', '4', '5', '6', '7'];
  pawns: PawnModel[] = [];
  selected: number = -1;
}

export function updateBoard(boardState: BoardState, clickedIndex: number): BoardState {
  var clickedPawn = undefined;
  var selectedPawn = undefined;
  for (const pawn of boardState.pawns) {
    if (pawn.pos == clickedIndex) {
      clickedPawn = pawn
    }
    if (pawn.pos == boardState.selected) {
      selectedPawn = pawn;
    }
  }
  if (clickedPawn === undefined) {
    if (selectedPawn === undefined) {
      // Create Pawn
      console.log('Create ' + clickedIndex);
      uuid += 1;
      return {
        ...boardState,
        pawns: [...boardState.pawns, {pos: clickedIndex, id: uuid}],
      };
    } else {
      // Move Pawn
      console.log('Move ' + clickedIndex);
      selectedPawn.pos = clickedIndex;
      return {
        ...boardState,
        pawns: [...boardState.pawns],
        selected: -1
      };
    }
  } else {
    if (clickedPawn.pos === boardState.selected) {
      // Remove Pawn
      console.log('Remove ' + clickedIndex);
      var pawns = boardState.pawns.filter((pawn) => pawn.pos != clickedIndex);
      return {
        ...boardState,
        pawns: pawns,
        selected: -1
      };
    } else {
      // Select Pawn
      console.log('Select ' + clickedIndex);
      return {
        ...boardState,
        selected: clickedIndex
      };
    }
  }
}