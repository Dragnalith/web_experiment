import { useState } from 'react';
import { BoardState } from '../Models/BoardState'

interface BoardCallback {
  (index: number): void
}

interface BoardProps {
  board: BoardState;
  callback: BoardCallback
  optionalProp?: string; // Optional prop with default type
}

interface AnimatedPawn {
    id: number,
    pos: number,
    dest: number,
    pixelPos: number,
  }


export function Board(props: BoardProps) {
  const [animatedPawns, setAnimatedPawns] = useState(new Map<number, AnimatedPawn>())

  var newAnimatedPawns = new Map<number, AnimatedPawn>();
  var modified = false;
  var needAnimation = false;
  // Add New
  for (const pawn of props.board.pawns) {
    var animatedPawn = {
      id: pawn.id,
      pos: pawn.pos,
      dest: 50 * pawn.pos,
      pixelPos: 50 * pawn.pos
    };
    newAnimatedPawns.set(pawn.id, animatedPawn)
    if (!animatedPawns.has(pawn.id)) {
      animatedPawns.set(pawn.id, animatedPawn)
      modified = true
    }
  }

  var toRemove = new Set<number>();
  for (const [id, _] of animatedPawns) {
    if (!newAnimatedPawns.has(id)) {
      toRemove.add(id)
    } else {
      if (animatedPawns.get(id)!.dest != newAnimatedPawns.get(id)!.dest) {
        animatedPawns.get(id)!.dest = newAnimatedPawns.get(id)!.dest;
        animatedPawns.get(id)!.pos = newAnimatedPawns.get(id)!.pos;
        modified = true
      }
      if (animatedPawns.get(id)!.dest != animatedPawns.get(id)!.pixelPos) {
        needAnimation = true
      }
    }
  }
  for (const id of toRemove) {
    animatedPawns.delete(id)
    modified = true
  }

  if (modified) {
    setAnimatedPawns(animatedPawns)
  }
  if (needAnimation) {
    console.log('need anim')
    requestAnimationFrame(function() {
      const newMap = new Map<number, AnimatedPawn>();
      console.log(animatedPawns)
      animatedPawns.forEach((p, id) => {
        if (p.dest < p.pixelPos) {
          p.pixelPos -= 10
          if (p.pixelPos < p.dest) {
            p.pixelPos = p.dest
          }
        }
        if (p.dest > p.pixelPos) {
          p.pixelPos += 10
          if (p.pixelPos > p.dest) {
            p.pixelPos = p.dest
          }
        }
        newMap.set(id, p);
      })
      setAnimatedPawns(newMap)
    });
  }
  
  return <>
    <div className="Board">
      { props.board.cells.map((cell, index) => {
      const pos = 50 * index;
      return (<button className="Cell" key={index} style={{top: '0px', left: pos +'px'}} 
          onClick={() => props.callback(index)}>
          <p>{cell}</p>
          </button>);
      })}
      { [...animatedPawns].map(([_, p]) => {
        const pos = p.pixelPos;
        const color = props.board.selected == p.pos ? 'red' : 'black';
        return (<div className="Pawn" key={p.id} style={{backgroundColor: color, top: '50px', left: pos +'px'}}>
          <p>{p.id}</p>
          </div>);
      })}
    </div>
  </>
}