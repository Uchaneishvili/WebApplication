import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Axios from "axios";

function PopupConfirm(props) {
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const deleteUser = async (id) => {
    await Axios.delete(`http://localhost:3001/delete/${id}`);
    props.loadData();
    console.log("test");
  };

  useEffect(() => {
    setPopupIsOpen(props.confirmModalIsOpen);
  }, [props.confirmModalIsOpen]);

  return (
    <div>
      <Modal className="Modal" ariaHideApp={false} isOpen={popupIsOpen}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Are you sure？</h4>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={() => deleteUser()}>
                Yes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => props.closeConfirmPopup()}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default PopupConfirm;
