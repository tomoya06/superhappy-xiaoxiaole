import { useMemo } from "preact/hooks";
import { useAppSelector } from "../../store/hooks";
import { ProgressMarker } from "../../utils/const";
import "./index.css";

function ProgressBlock(props: { label: string; value: number }) {
  const { label, value } = props;
  return (
    <div className="progress-block">
      <div className="progress-label">
        <div className="labelname">{label}</div>
        <div className="labelvalue">{value}</div>
      </div>
    </div>
  );
}

export function Progress() {
  const totalScore = useAppSelector((state) => state.score.totalScore);
  const BlockWidth = 100 / 3;

  const myPos = useMemo(() => {
    let pos = 0;
    // score=0为中心，此时idx=1，偏移量=0
    if (totalScore <= ProgressMarker[0][0]) {
      return 1 * BlockWidth;
    }
    if (totalScore > ProgressMarker[ProgressMarker.length - 1][0]) {
      const diff =
        (totalScore - ProgressMarker[ProgressMarker.length - 1][0]) /
        ProgressMarker[ProgressMarker.length - 1][0];
      return -(ProgressMarker.length - 1 + diff * 0.6) * BlockWidth;
    }

    for (let i = 0; i < ProgressMarker.length - 1; i += 1) {
      if (
        totalScore > ProgressMarker[i][0] &&
        totalScore <= ProgressMarker[i + 1][0]
      ) {
        pos = i;
        break;
      }
    }
    const blockRange = ProgressMarker[pos + 1][0] - ProgressMarker[pos][0];
    const blockDelta = (totalScore - ProgressMarker[pos][0]) / blockRange;

    return -(pos + blockDelta) * BlockWidth;
  }, [totalScore]);

  return (
    <div id="progress">
      <div className="progress-myPos"></div>
      <div
        className="progress-container"
        style={{
          left: `${myPos}vw`,
        }}
      >
        <ProgressBlock value={-Infinity} label={"万丈深渊"} />
        {ProgressMarker.map((marker) => (
          <ProgressBlock value={marker[0]} label={marker[1]} />
        ))}
        <ProgressBlock value={Infinity} label={"浩瀚宇宙"} />
        <ProgressBlock value={Infinity} label={""} />
      </div>
    </div>
  );
}
