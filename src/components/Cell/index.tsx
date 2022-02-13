import { ValueColorMapper, ValueIconMapper } from "../../utils/const";
import { Block } from "../../utils/types";
import "./index.css";

export function Cell(props: { value: Block; posXY: number[] }) {
  const { value, posXY } = props;

  const cellColor = value.isKilled ? "red" : ValueColorMapper[value.value];

  return (
    <div
      class="cell"
      data-posx={posXY[0]}
      data-posy={posXY[1]}
      style={{
        left: posXY[0] * 60,
        ["--top"]: `${posXY[1] * 60}px`,
      }}
    >
      <div
        class="cell-container"
        style={{
          background: cellColor,
        }}
      >
        <div class="cell-value">{ValueIconMapper[value.value]}</div>
        <div class="cell-id">{value.id}</div>
      </div>
    </div>
  );
}
