import { ValueColorMapper, ValueIconMapper } from "../../utils/const";
import { Block } from "../../utils/types";
import "./index.css";

export function Cell(props: { value: Block; posXY: number[] }) {
  const { value, posXY } = props;

  const cellColor = value.isKilled ? "red" : ValueColorMapper[value.value];

  return (
    <div
      class="cell"
      style={{
        background: cellColor,
        gridColumn: posXY[0]+1,
        gridRow: posXY[1]+1,
      }}
      data-posx={posXY[0]}
      data-posy={posXY[1]}
    >
      <div class="cell-value">{ValueIconMapper[value.value]}</div>
      <div class="cell-id">{value.id}</div>
    </div>
  );
}
