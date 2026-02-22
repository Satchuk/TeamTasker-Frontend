import React from "react";
import "./ConfirmDeleteModal.css";

const ConfirmDeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="modal-backdrop">

      <div className="confirm-modal">
        <h3>Delete Task</h3>

        <p>
          Are you sure you want to delete this task?
          <br />
          This action cannot be undone.
        </p>

        <div className="confirm-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>

    </div>
  );
};

export default ConfirmDeleteModal;
