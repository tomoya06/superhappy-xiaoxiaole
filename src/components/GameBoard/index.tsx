import "./index.css";
import { useEffect, useRef, useState } from "preact/hooks";
import { BoardSize, MoveThreshold } from "../../utils/const";
import {
  checkBoard,
  delay,
  deleteBoard,
  genBoard,
  killBoard,
} from "../../utils/func";
import { Cell } from "../Cell";
import { Block } from "../../utils/types";
import { wrapGrid } from "animate-css-grid";

const animationDelay = 300;

export function GameBoard() {
  const [cells, setCells] = useState<Block[][]>(genBoard(BoardSize));
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const boardElem = document.getElementById("gameboard");
    if (!boardElem) {
      return;
    }
    wrapGrid(boardElem, {
      duration: animationDelay,
      easing: "easeInOut",
    });
  }, []);

  let startEvt: MouseEvent | null = null;

  // 原地更新cells
  function updateCells() {
    setCells(cells.map((row) => [...row]));
  }

  function handleMouseMoveFinish(from: MouseEvent | null, to: MouseEvent) {
    if (!from) {
      return;
    }
    const fromXY = [from.clientX, from.clientY];
    const toXY = [to.clientX, to.clientY];

    console.log("-======-");
    // console.log("move evt: ", from, to);
    // console.log("move pos: ", fromXY, toXY);

    let moveTarget = from.target as HTMLElement;
    while (isNaN(Number(moveTarget.dataset["posy"]))) {
      if (!moveTarget.parentElement) {
        return;
      }
      moveTarget = moveTarget.parentElement;
    }

    const targetIdx = [
      Number(moveTarget.dataset["posy"]),
      Number(moveTarget.dataset["posx"]),
    ];

    // const targetIdx = [Math.floor(Math.abs(fromXY[0]) / 60), Math.floor(Math.abs(fromXY[1]) / 60)];

    const moveXY = [toXY[0] - fromXY[0], toXY[1] - fromXY[1]];

    makeMovement(targetIdx, moveXY);
  }

  function makeMovement(targetIdx: number[], moveXY: number[]) {
    const swapIdx = [targetIdx[0], targetIdx[1]];
    const moveXYabs = [Math.abs(moveXY[0]), Math.abs(moveXY[1])];

    console.log("moveXY", moveXY);
    console.log("targetIdx", targetIdx);

    if (moveXYabs[0] === 0 && moveXYabs[1] === 0) {
      return;
    }

    if (Math.max(...moveXYabs) < MoveThreshold) {
      return;
    }

    if (moveXYabs[0] > moveXYabs[1]) {
      // 选择水平移动
      if (moveXY[0] > 0) {
        swapIdx[1] += 1;
      } else {
        swapIdx[1] -= 1;
      }
    } else {
      if (moveXY[1] > 0) {
        swapIdx[0] += 1;
      } else {
        swapIdx[0] -= 1;
      }
    }

    console.log("swapIdx", swapIdx);
    if (
      swapIdx[0] < 0 ||
      swapIdx[1] < 0 ||
      swapIdx[0] >= BoardSize ||
      swapIdx[1] >= BoardSize
    ) {
      return;
    }

    swapPosition(targetIdx, swapIdx);

    startCheckingJob();
  }

  async function startCheckingJob() {
    setIsChecking(true);
    while (await startChecking()) {}
    setIsChecking(false);
  }

  async function startChecking() {
    await delay(animationDelay);
    const hasKilled = checkBoard(cells);
    updateCells();
    if (hasKilled) {
      console.log("hasNewKilled");
      await delay(500);
      killBoard(cells);
      updateCells();

      await delay(animationDelay+50);
      deleteBoard(cells);
      updateCells();

      await delay(1000);
    }

    return hasKilled;
  }

  function swapPosition(targetIdx: number[], swapIdx: number[]) {
    [cells[targetIdx[0]][targetIdx[1]], cells[swapIdx[0]][swapIdx[1]]] = [
      cells[swapIdx[0]][swapIdx[1]],
      cells[targetIdx[0]][targetIdx[1]],
    ];
    updateCells();
  }

  function handleMousedown(evt: MouseEvent) {
    if (isChecking) {
      return;
    }
    // console.log('handleMousedown', evt);
    startEvt = evt;
  }
  function handleMouseup(evt: MouseEvent) {
    if (isChecking) {
      return;
    }
    // console.log('handleMouseup', evt);
    handleMouseMoveFinish(startEvt, evt);
    startEvt = null;
  }

  return (
    <>
      <div
        id="gameboard"
        onMouseDown={handleMousedown}
        onMouseUp={handleMouseup}
        onMouseLeave={handleMouseup}
      >
        {cells
          .flatMap((row) => row)
          .map((cell, idx) => {
            const rowIdx = Math.floor(idx / BoardSize);
            const colIdx = Math.floor(idx % BoardSize);

            return <Cell value={cell} posXY={[colIdx, rowIdx]} key={cell.id} />;
          })}
      </div>
      <div>{isChecking && <span>检查!</span>}</div>
    </>
  );
}
