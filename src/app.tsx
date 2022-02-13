import { GameBoard } from "./components/GameBoard";
import { Header } from "./components/Header";
import { Score } from "./components/Score";
import { CheckBoard, ScoreCounter } from "./utils/types";
import { useCallback, useEffect, useState } from "preact/hooks";

export function App() {
  const [totalScore, setTotalScore] = useState(0);

  const [scoreStack, setScoreStack] = useState<ScoreCounter[]>([]);

  const submitScore = useCallback(
    (score: CheckBoard) => {
      const newStack: ScoreCounter[] = [];
      for (const scoreValue in score) {
        newStack.push({
          value: Number(scoreValue),
          count: score[scoreValue].size,
        });
      }

      setScoreStack([...scoreStack, ...newStack]);

      setTotalScore(totalScore + newStack.length * 100);
    },
    [totalScore, scoreStack]
  );

  return (
    <>
      <Header />
      <GameBoard submitScore={submitScore} />
      <Score totalScore={totalScore} scoreStack={scoreStack} />
    </>
  );
}
