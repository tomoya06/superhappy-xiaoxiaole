import "./index.css";
import { useEffect, useState } from "preact/hooks";
import { BoardSize, MoveThreshold } from "../../utils/const";
import {
  checkBoard,
  delay,
  deleteBoard,
  exportBoard,
  genBoard,
  killBoard,
  swapPosition,
} from "../../utils/func";
import { Cell } from "../Cell";
import { Block, BlockWithPos } from "../../utils/types";
import { TransitionGroup, CSSTransition } from "preact-transitioning";

const animationDelay = 300;

export function GameBoard() {
  const [cells, setCells] = useState<BlockWithPos[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  let startEvt: MouseEvent | null = null;

  useEffect(() => {
    genBoard(BoardSize);
    updateCells();
  }, []);

  // 原地更新cells
  function updateCells() {
    const newCells = exportBoard();
    setCells(newCells);
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
    updateCells();

    startCheckingJob();
  }

  async function startCheckingJob() {
    setIsChecking(true);
    while (await startChecking()) {}
    setIsChecking(false);
  }

  async function startChecking() {
    await delay(animationDelay);
    const hasKilled = checkBoard();
    updateCells();

    if (hasKilled) {
      console.log("hasNewKilled");
      await delay(300);

      killBoard();
      updateCells();

      deleteBoard();
      updateCells();

      await delay(1000);
    }

    return hasKilled;
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
        <TransitionGroup>
          {cells
            .filter((cell) => !cell.isDeleted)
            .map((cell) => {
              return (
                <CSSTransition key={cell.id} classNames="item">
                  <div
                    key={cell.id}
                    style={{
                      left: cell.pos[0] * 60,
                      ["--top"]: `${cell.isDeleted ? 0 : cell.pos[1] * 60}px`,
                    }}
                    data-posx={cell.pos[0]}
                    data-posy={cell.pos[1]}
                  >
                    <Cell value={cell} />
                  </div>
                </CSSTransition>
              );
            })}
        </TransitionGroup>
      </div>
      <div>{isChecking && <span>检查!</span>}</div>
    </>
  );
}
