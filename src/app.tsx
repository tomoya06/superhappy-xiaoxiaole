import { GameBoard } from "./components/GameBoard";
import { Header } from "./components/Header";
import { Progress } from "./components/Progress";
import { Score } from "./components/Score";

export function App() {
  return (
    <>
      <Header />
      <GameBoard />
      <Score />
      <Progress />
    </>
  );
}
