import { CheckBoard, ScoreCounter } from "../../utils/types";
import AnimatedNumber from "animated-number-react";
import { useAppSelector } from "../../store/hooks";

import "./index.css";

export function Score() {
  const totalScore = useAppSelector((state) => state.score.totalScore);

  return (
    <div id="score">
      <div className="score-point">
        <span className="label">得分</span>

        <AnimatedNumber
          value={totalScore}
          formatValue={(val: number) => val.toFixed(0)}
        />
      </div>
    </div>
  );
}
