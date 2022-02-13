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
import { handleMouseFactory } from "../../utils/gesture";

const animationDelay = 300;

const {
  start: doHandleMousedown,
  finish: doHandleMouseup,
  switch: doSwitchHandler,
} = handleMouseFactory();

export function GameBoard() {
  const [cells, setCells] = useState<BlockWithPos[]>([]);

  useEffect(() => {
    genBoard(BoardSize);
    updateCells();
  }, []);

  // 原地更新cells
  function updateCells() {
    const newCells = exportBoard();
    setCells(newCells);
  }

  async function startCheckingJob() {
    doSwitchHandler(true);
    while (await startChecking()) {}
    doSwitchHandler(false);
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

  function handleMousedown(evt: MouseEvent | TouchEvent) {
    // console.log("onMouseDown", evt);
    doHandleMousedown(evt);
  }
  function handleMouseup(evt: MouseEvent | TouchEvent) {
    // console.log("handleMouseup", evt);

    const { swapIdx, targetIdx } = doHandleMouseup(evt);

    if (!targetIdx || !swapIdx) {
      return;
    }

    swapPosition(targetIdx, swapIdx);
    updateCells();

    startCheckingJob();
  }
  return (
    <>
      <div
        id="gameboard"
        onMouseDown={handleMousedown}
        onMouseUp={handleMouseup}
        onMouseLeave={handleMouseup}
        onTouchStart={handleMousedown}
        onTouchEnd={handleMouseup}
        onTouchCancel={handleMouseup}
        style={{
          ["--board-size"]: BoardSize,
        }}
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
                      left: `calc(${cell.pos[0]} * var(--cell-size))`,
                      ["--top"]: `calc(${
                        cell.isDeleted ? 0 : cell.pos[1]
                      } * var(--cell-size))`,
                      width: "var(--cell-size)",
                      height: "var(--cell-size)",
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
    </>
  );
}
