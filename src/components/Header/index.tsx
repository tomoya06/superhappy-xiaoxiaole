import { useState } from "preact/hooks";
import { HelperText } from "../../utils/const";
import { Modal } from "../Modal";
import "./index.css";

export function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="header">
      <div className="header-title">男足消消乐</div>
      <div id="helper-entrance" onClick={() => setShowModal(true)}>
        ⚽玩法介绍
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title={'⚽玩法介绍⚽'} >
        <>
          <div>
            <p>
              {HelperText.trim().split('\n').map(txt => (
                <>{txt}<br/></>
              ))}
            </p>
          </div>
        </>
      </Modal>
    </div>
  );
}
