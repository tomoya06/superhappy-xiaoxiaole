import AnimatedNumbers from "react-animated-numbers";
import { useAppSelector } from "../../store/hooks";

import "./index.css";
import { useEffect, useState } from "preact/hooks";

export function Score() {
  const [localScore, setLocalScore] = useState(0);
  const totalScore = useAppSelector((state) => state.score.totalScore);

  useEffect(() => {
    setLocalScore(totalScore);
  }, [totalScore]);

  return (
    <div id="score">
      <div className="score-point">
        <span className="label">奖金</span>
        <AnimatedNumbers
          animateToNumber={localScore}
          fontStyle={{
            fontSize: 40,
            fontWeight: 600,
          }}
        />
      </div>
      <div></div>
    </div>
  );
}
