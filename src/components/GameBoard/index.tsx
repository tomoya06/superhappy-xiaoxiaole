import "./index.css";
import { useCallback, useEffect, useState } from "preact/hooks";
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
import { Block, BlockWithPos, CheckBoard } from "../../utils/types";
import { TransitionGroup, CSSTransition } from "preact-transitioning";
import { handleMouseFactory } from "../../utils/gesture";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { checkin } from "../../store/score";
import { updateChecking } from "../../store/game";

const animationDelay = 300;

const {
  start: doHandleMousedown,
  finish: doHandleMouseup,
  switch: doSwitchHandler,
} = handleMouseFactory();

export function GameBoard() {
  const [cells, setCells] = useState<BlockWithPos[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    genBoard(BoardSize);
    updateCells();
  }, []);

  // 原地更新cells
  function updateCells() {
    const newCells = exportBoard();
    setCells(newCells);
  }

  function triggerChecking(flag: boolean) {
    doSwitchHandler(flag);
    dispatch(updateChecking(flag));
  }

  async function startCheckingJob() {
    triggerChecking(true);
    let isFinished = false;
    while (!isFinished) {
      await delay(animationDelay);
      const hasKilled = checkBoard();
      updateCells();

      if (hasKilled) {
        console.log("hasNewKilled");
        // checkin(hasKilled);
        dispatch(checkin(hasKilled));

        await delay(300);

        killBoard();
        updateCells();

        deleteBoard();
        updateCells();

        await delay(1000);
      }

      isFinished = !hasKilled;
    }
    triggerChecking(false);
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
    <div className="gameboard-container">
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
              const topVal = cell.isDeleted ? 0 : cell.pos[1];
              const calcTop = `calc(${topVal} * var(--cell-size))`;
              const zIndex = cell.isKilled ? 99 : 1;

              return (
                <CSSTransition key={cell.id} classNames="item">
                  <div
                    key={cell.id}
                    style={{
                      left: `calc(${cell.pos[0]} * var(--cell-size))`,
                      ["--top"]: calcTop,
                      width: "var(--cell-size)",
                      height: "var(--cell-size)",
                      zIndex,
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
    </div>
  );
}
