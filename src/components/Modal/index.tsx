import { RenderableProps } from "preact";
import "./index.css";

export function Modal(
  props: RenderableProps<{
    show: boolean;
    onClose: () => void;
    title: string;
  }>
) {
  const { children, show, onClose, title } = props;

  return (
    <div
      className="game-modal"
      onClick={() => onClose()}
      style={{
        display: show ? "flex" : "none",
      }}
    >
      <div className="game-modal-container">
        <div className="game-modal-title">{title}</div>
        {children}
      </div>
    </div>
  );
}
