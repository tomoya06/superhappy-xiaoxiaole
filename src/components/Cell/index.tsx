import {
  ValueColorMapper,
  ValueIconMapper,
  ValueImgMapper,
} from "../../utils/const";
import { Block } from "../../utils/types";
import "./index.css";

export function Cell(props: { value: Block }) {
  const { value } = props;

  return (
    <div
      className={`cell ${value.isKilled && "cell-killing"}`}
      style={{
        backgroundImage: `url(${ValueImgMapper[value.value]})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      {/* <div class="cell-value">{ValueIconMapper[value.value]}</div> */}
      {/* <div class="cell-id">{value.id}</div> */}
    </div>
  );
}
