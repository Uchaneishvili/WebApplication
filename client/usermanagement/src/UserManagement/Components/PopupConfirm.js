import React from "react";
import Modal from "react-modal";

function PopupConfirm(props) {
  return (
    <div>
      <Modal
        className="Modal"
        ariaHideApp={false}
        isOpen={props.confirmModalIsOpen}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Are you sure？</h4>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-success"
                onClick={() => props.deleteUser(props.userIdToDelete)}
              >
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
