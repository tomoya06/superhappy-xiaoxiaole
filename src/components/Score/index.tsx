import AnimatedNumbers from "react-animated-numbers";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "./index.css";
import { useCallback, useEffect, useState } from "preact/hooks";
import { ScoreCounter } from "../../utils/types";
import { ValueImgMapper, ValueQuoteMapper } from "../../utils/const";

const counterQueue: ScoreCounter[] = [];
let consumedCounterIdx = 0;
let visitedCounterQueueIdx = 0;

export function Score() {
  const [localScore, setLocalScore] = useState(0);
  const [curCounter, setCurCounter] = useState<ScoreCounter | null>(null);

  const totalScore = useAppSelector((state) => state.score.totalScore);
  const scoreStack = useAppSelector((state) => state.score.scoreStack);

  const isPositive = curCounter && (curCounter.score || 0) > 0;

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
        <span className="label">球队战力</span>
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
              {isPositive && "+"}
              {curCounter.score}
            </div>
            <div className="quote">{ValueQuoteMapper[curCounter.value]}</div>
          </div>
        </div>
      )}
    </div>
  );
}
