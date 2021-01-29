import React, { useState } from "react";
import Modal from "react-awesome-modal";

function PopUpAlerts() {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div>
      <section>
        <h1>React-Modal Examples</h1>
        <input type="button" value="Open" onClick={openModal} />
        <Modal
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={closeModal}
        >
          <div>
            <h1>Title</h1>
            <p>Some Contents</p>
            <a href="javascript:void(0);" onClick={closeModal}>
              Close
            </a>
          </div>
        </Modal>
      </section>
    </div>
  );
}

export default PopUpAlerts;
