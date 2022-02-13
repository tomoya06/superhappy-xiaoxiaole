import { ValueColorMapper, ValueIconMapper } from "../../utils/const";
import { Block } from "../../utils/types";
import "./index.css";

export function Cell(props: { value: Block }) {
  const { value } = props;

  const cellColor = value.isKilled ? "red" : ValueColorMapper[value.value];

  return (
    <div class="cell">
      <div
        class="cell-container"
        style={{
          background: cellColor,
        }}
      >
        <div class="cell-value">{ValueIconMapper[value.value]}</div>
        {/* <div class="cell-id">{value.id}</div> */}
      </div>
    </div>
  );
}
