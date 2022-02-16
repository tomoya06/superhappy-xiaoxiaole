import AnimatedNumbers from "react-animated-numbers";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "./index.css";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { memo } from "preact/compat";
import { ScoreCounter } from "../../utils/types";
import {
  DefaultBoardSize,
  MaxBoardSize,
  MinBoardSize,
  ValueImgMapper,
  ValueQuoteMapper,
} from "../../utils/const";
import { LoadingSoccer } from "../LoadingSoccer";
import { Modal } from "../Modal";
import {
  getSizeFromStorage,
  saveScoreToStorage,
  saveSizeToStorage,
} from "../../utils/storage";
import { consumeStack } from "../../store/score";

const ScoreNumber = memo(AnimatedNumbers, (prevProps, nextProps) => {
  return prevProps.animateToNumber === nextProps.animateToNumber;
});

export function Score() {
  const [localScore, setLocalScore] = useState(0);
  const [curCounter, setCurCounter] = useState<ScoreCounter | undefined>(
    undefined
  );

  const [showModal, setShowModal] = useState(false);
  const [boardsize, setBoardsize] = useState(getSizeFromStorage());
  const [resetTeam, setResetTeam] = useState(false);

  const totalScore = useAppSelector((state) => state.score.totalScore);
  const isChecking = useAppSelector((state) => state.game.isChecking);
  const curBoardsize = useMemo(() => {
    return getSizeFromStorage();
  }, []);

  const isPositive = curCounter && (curCounter.score || 0) > 0;
  const isMultiRate = curCounter && (curCounter.rate || 0) > 1;

  let intId = -1;

  useEffect(() => {
    setLocalScore(totalScore);
  }, [totalScore]);

  useEffect(() => {
    intId = setInterval(() => {
      const newItem = consumeStack();
      setCurCounter(newItem);
    }, 800);

    return () => {
      clearInterval(intId);
    };
  }, []);

  const handleConfirm = () => {
    let isChanged = false;
    if (boardsize !== curBoardsize) {
      isChanged = true;
      saveSizeToStorage(boardsize);
    }
    if (resetTeam) {
      isChanged = true;
      saveScoreToStorage(0);
    }

    if (isChanged) {
      location.reload();
    }
  };

  return (
    <div id="score">
      <div className="score-point" onClick={() => setShowModal(true)}>
        <div className="soccer-label">
          <span className="label">球队战力</span>
          {isChecking && <LoadingSoccer />}
        </div>
        {/* <div style={{ fontSize: 40, fontWeight: 600 }}>{localScore}</div> */}
        <ScoreNumber
          animateToNumber={localScore}
          fontStyle={{
            fontSize: 40,
            fontWeight: 600,
          }}
        />
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={"球队管理"}
      >
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "12px 0 0 0",
            }}
            onClick={(e) => e.stopImmediatePropagation()}
          >
            <div style={{ fontSize: 12, margin: "0 0 6px 0" }}>
              {"是否要解散球队？"}
            </div>
            <button
              onClick={() => setResetTeam(!resetTeam)}
              style={{
                lineHeight: "24px",
                backgroundColor: resetTeam ? "tomato" : "gray",
                color: "white",
              }}
            >
              {resetTeam ? "解散球队" : "不解散球队"}
            </button>
            <div style={{ fontSize: 12, margin: "6px 0 20px 0" }}>
              {resetTeam ? "解散后战力将会清空" : "坚信胜利终会到来！"}
            </div>

            <div style={{ borderBottom: "1px solid gray" }}></div>

            <div
              style={{
                margin: "20px 0 20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() =>
                  setBoardsize(Math.max(boardsize - 1, MinBoardSize))
                }
              >
                缩减
              </button>
              <div style={{ textAlign: "center", margin: "0 12px" }}>
                <div style={{ fontSize: 12 }}>目前布局</div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    width: 80,
                    margin: "2px 0 6px 0",
                  }}
                >
                  规模 {boardsize}
                </div>
              </div>
              <button
                onClick={() =>
                  setBoardsize(Math.min(boardsize + 1, MaxBoardSize))
                }
              >
                增大
              </button>
            </div>
            <div
              style={{ borderTop: "1px solid gray", margin: "0 0 20px" }}
            ></div>

            <button
              onClick={() => handleConfirm()}
              style={{ lineHeight: "24px" }}
            >
              确认球队管理
            </button>
          </div>
        </>
      </Modal>

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
