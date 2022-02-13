import { useState } from "preact/hooks";
import "./index.css";

export function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="header">
      <div className="header-title">男足消消乐</div>
      <div id="helper-entrance" onClick={() => setShowModal(true)}>
        ⚽玩法介绍
      </div>

      {showModal && (
        <div id="helper-modal" onClick={() => setShowModal(false)}>
          <div className="helper-container">
            <div className="helper-title">⚽玩法介绍⚽</div>

            <div>
              <p>
                比开心消消乐还要开心的男足消消乐
                <br />
                <br />
                为男足加油打气！提高球队战力！
                <br />
                <br />
                不限划动！
                <br />
                由您亲手为国足划出第一步！
                <br />
                <br />
                一路上，会有收获(指加分)，
                <br />
                也会有挫折(指扣分)，
                <br />
                但我们对国足的热爱始终都在！
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
