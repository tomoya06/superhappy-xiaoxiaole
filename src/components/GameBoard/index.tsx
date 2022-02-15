import "./index.css";
import { useEffect, useMemo, useState } from "preact/hooks";
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
import { BlockWithPos } from "../../utils/types";
import { TransitionGroup, CSSTransition } from "preact-transitioning";
import { handleMouseFactory } from "../../utils/gesture";
import { useAppDispatch } from "../../store/hooks";
import { checkin, idleMove } from "../../store/score";
import { updateChecking } from "../../store/game";
import { getSizeFromStorage } from "../../utils/storage";

const animationDelay = 300;

const {
  start: doHandleMousedown,
  finish: doHandleMouseup,
  switch: doSwitchHandler,
} = handleMouseFactory();

export function GameBoard() {
  const [cells, setCells] = useState<BlockWithPos[]>([]);
  const dispatch = useAppDispatch();

  const boardSize = useMemo(() => {
    return getSizeFromStorage();
  }, []);

  useEffect(() => {
    genBoard(boardSize);
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

  async function startCheckingJob(targetCellValue: number) {
    let isManual = true;
    triggerChecking(true);
    let isFinished = false;
    while (!isFinished) {
      await delay(animationDelay);
      const hasKilled = checkBoard();
      updateCells();

      if (hasKilled) {
        console.log("hasNewKilled");
        dispatch(checkin(hasKilled));

        await delay(300);

        killBoard();
        updateCells();

        deleteBoard();
        updateCells();

        await delay(1000);
      } else {
        console.log("no killed");

        if (isManual) {
          dispatch(idleMove(targetCellValue));
        }
      }
      isManual = false;

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

    const targetCellValue = swapPosition(targetIdx, swapIdx);
    updateCells();

    startCheckingJob(targetCellValue);
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
          ["--board-size"]: boardSize,
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
