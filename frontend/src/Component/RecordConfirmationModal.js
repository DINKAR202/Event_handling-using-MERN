import React from 'react';
import './button.css'

const RecordConfirmationModal = ({ showModal, handleConfirmation }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <h2>Recording Confirmation</h2>
      <p>Do you grant permission to record your entire window and webcam?</p>
      <div>
        <label>
          <input type="checkbox" id="recordAudio" />
          Record Audio
        </label>
      </div>
      <button onClick={() => handleConfirmation(true)} class="button-17" role="button">Yes</button>
      <button onClick={() => handleConfirmation(false)} class="button-17" role="button">No</button>
    </div>
  );
};

export default RecordConfirmationModal;
