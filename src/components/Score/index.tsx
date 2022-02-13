import { CheckBoard, ScoreCounter } from "../../utils/types";
import AnimatedNumber from "animated-number-react";
import "./index.css";

interface Props {
  totalScore: number;
  scoreStack: ScoreCounter[];
}

export function Score(props: Props) {
  const { totalScore } = props;
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
