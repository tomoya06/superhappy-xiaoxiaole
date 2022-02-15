import AnimatedNumbers from "react-animated-numbers";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "./index.css";
import { useCallback, useEffect, useState } from "preact/hooks";
import { ScoreCounter } from "../../utils/types";
import { ValueImgMapper, ValueQuoteMapper } from "../../utils/const";
import { LoadingSoccer } from "../LoadingSoccer";

const counterQueue: ScoreCounter[] = [];
let consumedCounterIdx = 0;
let visitedCounterQueueIdx = 0;

// const testCounter: ScoreCounter = {
//   value: 1,
//   count: 5,
//   score: 100,
//   rate: 1.8,
// };

export function Score() {
  const [localScore, setLocalScore] = useState(0);
  const [curCounter, setCurCounter] = useState<ScoreCounter | null>(null);

  const totalScore = useAppSelector((state) => state.score.totalScore);
  const scoreStack = useAppSelector((state) => state.score.scoreStack);
  const isChecking = useAppSelector((state) => state.game.isChecking);

  const isPositive = curCounter && (curCounter.score || 0) > 0;
  const isMultiRate = curCounter && (curCounter.rate || 0) > 1;

  let intId = -1;

  useEffect(() => {
    setLocalScore(totalScore);
  }, [totalScore]);

  useEffect(() => {
    queueUp(scoreStack.slice(consumedCounterIdx));
  }, [scoreStack]);

  useEffect(() => {
    intId = setInterval(() => {
      if (counterQueue[visitedCounterQueueIdx]) {
        setCurCounter(counterQueue[visitedCounterQueueIdx++]);
      }
    }, 500);

    return () => {
      clearInterval(intId);
    };
  }, []);

  const queueUp = (subQueue: ScoreCounter[]) => {
    counterQueue.push(...subQueue);
    consumedCounterIdx = counterQueue.length;
  };

  return (
    <div id="score">
      <div className="score-point">
        <div className="soccer-label">
          <span className="label">球队战力</span>
          {isChecking && <LoadingSoccer />}
        </div>
        <AnimatedNumbers
          animateToNumber={localScore}
          fontStyle={{
            fontSize: 40,
            fontWeight: 600,
          }}
        />
      </div>
      {curCounter && (
        <div
          className={`score-stack ${
            isPositive ? "score-stack-plus" : "score-stack-minus"
          }`}
        >
          <div
            className="cover"
            style={{
              backgroundImage: `url(${ValueImgMapper[curCounter.value]})`,
            }}
          ></div>
          <div>
            <div className="score">
              <span className="value">
                {isPositive && "+"}
                {curCounter.score}
              </span>
              {isMultiRate && (
                <>
                  <span className="rate">×{curCounter.rate}</span>
                  <span>💥</span>
                </>
              )}
            </div>
            <div className="quote">{curCounter.quote}</div>
          </div>
        </div>
      )}
    </div>
  );
}
