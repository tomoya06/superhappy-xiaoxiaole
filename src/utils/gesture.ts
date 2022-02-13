import { BoardSize, MoveThreshold } from "./const";
import { GestureHandler } from "./types";

function makeMovement(targetIdx: number[], moveXY: number[]): number[] | null {
  const swapIdx = [targetIdx[0], targetIdx[1]];
  const moveXYabs = [Math.abs(moveXY[0]), Math.abs(moveXY[1])];

  console.log("moveXY", moveXY);
  console.log("targetIdx", targetIdx);

  if (moveXYabs[0] === 0 && moveXYabs[1] === 0) {
    return null;
  }

  if (Math.max(...moveXYabs) < MoveThreshold) {
    return null;
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
    return null;
  }

  return swapIdx;
}

function parseEvtXY(evt: MouseEvent | TouchEvent): number[] {
  if (evt instanceof MouseEvent) {
    return [evt.clientX, evt.clientY];
  }
  if (evt instanceof TouchEvent) {
    var touch = evt.touches[0] || evt.changedTouches[0];
    return [touch.clientX, touch.clientY];
  }
  return [-1, -1];
}

function getTargetElem(elem: HTMLElement): HTMLElement | null {
  let moveTarget = elem as HTMLElement;
  while (isNaN(Number(moveTarget.dataset["posy"]))) {
    if (!moveTarget.parentElement) {
      return null;
    }
    moveTarget = moveTarget.parentElement;
  }

  return moveTarget;
}

function parsePosIdx(evt: MouseEvent | TouchEvent): number[] | null {
  let moveTarget: HTMLElement | null = null;
  if (evt instanceof MouseEvent) {
    moveTarget = getTargetElem(evt.target as HTMLElement);
  }

  if (evt instanceof TouchEvent) {
    moveTarget = getTargetElem(evt.touches[0].target as HTMLElement);
  }

  if (!moveTarget) {
    return null;
  }

  const targetIdx = [
    Number(moveTarget.dataset["posy"]),
    Number(moveTarget.dataset["posx"]),
  ];

  return targetIdx;
}

export function handleMouseFactory(): GestureHandler<MouseEvent | TouchEvent> {
  let startEvt: MouseEvent | TouchEvent | null = null;
  let isDisabled = false;

  return {
    start(evt) {
      if (isDisabled) {
        return;
      }
      startEvt = evt;
    },
    finish(evt) {
      if (isDisabled) {
        return {
          targetIdx: null,
          swapIdx: null,
        };
      }

      if (!startEvt) {
        return {
          targetIdx: null,
          swapIdx: null,
        };
      }
      const fromXY = parseEvtXY(startEvt);
      const toXY = parseEvtXY(evt);

      console.log("-======-");
      const targetIdx = parsePosIdx(startEvt);

      if (!targetIdx) {
        return {
          targetIdx: null,
          swapIdx: null,
        };
      }

      const moveXY = [toXY[0] - fromXY[0], toXY[1] - fromXY[1]];
      const swapIdx = makeMovement(targetIdx, moveXY);

      startEvt = null;

      return {
        targetIdx,
        swapIdx,
      };
    },
    switch(flag) {
      isDisabled = flag;
    },
  };
}
