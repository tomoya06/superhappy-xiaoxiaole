import { RenderableProps } from "preact";
import "./index.css";

export function Modal(
  props: RenderableProps<{
    show: boolean;
    onClose: () => void;
  }>
) {
  const { children, show, onClose } = props;

  return (
    <div
      className="game-modal"
      onClick={() => onClose()}
      style={{
        display: show ? "flex" : "none",
      }}
    >
      <div className="game-modal-container">{children}</div>
    </div>
  );
}
