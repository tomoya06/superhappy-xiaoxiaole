import { GameBoard } from "./components/GameBoard";
import { Header } from "./components/Header";
import { Score } from "./components/Score";

export function App() {
  return (
    <>
      <Header />
      <GameBoard />
      <Score />
    </>
  );
}
