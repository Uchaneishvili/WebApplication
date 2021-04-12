import React, { useState, useEffect } from "react";
import { Modal } from "antd";

function PopupConfirm(props) {
  const [popupEnable, setPopupEnable] = useState();

  useEffect(() => {
    setPopupEnable(props.confirmPopup);
  }, [props.confirmPopup]);
  return (
    <div>
      <Modal
        className="Modal"
        visible={popupEnable}
        isOpen={props.confirmPopup}
        onCancel={() => props.closeConfirmPopup()}
        onOk={() => props.deleteCar(props.carIdToDelete)}
      >
        <div className="modal-header">
          <h4>Are you sure？</h4>
        </div>
      </Modal>
    </div>
  );
}
export default PopupConfirm;
