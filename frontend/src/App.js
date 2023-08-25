import React, { useState, useRef } from 'react';
import './App.css';
import './Component/button.css';
import UserInfoForm from './Component/UserInfoForm';
import RecordConfirmationModal from './Component/RecordConfirmationModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [recordAudio, setRecordAudio] = useState(false);
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const notify = () => toast("Recording has started...");
  const notify2 = () => toast("Recording has been stopped.");

  const handleFormSubmit = (email, name) => {
    setShowModal(true);
    console.log('Email:', email);
    console.log('Name:', name);
  };

  const handleConfirmation = async (confirmed) => {
    setShowModal(false);
    if (confirmed) {
      setRecordingStarted(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: recordAudio,
        video: true,
      });
      initializeRecording(stream);
      notify(); // Notify that recording has started
    }
  };

  const initializeRecording = (stream) => {
    const mediaRecorderInstance = new MediaRecorder(stream);

    mediaRecorderInstance.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setRecordedChunks((prevChunks) => [...prevChunks, e.data]);
      }
    };

    mediaRecorderInstance.onstop = () => {
      saveRecordedVideo(); // Save recorded video to a file
      stream.getTracks().forEach(track => track.stop()); // Stop all tracks (including camera)
      setRecordingStarted(false);
      notify2(); // Notify that recording has stopped
    };

    setMediaRecorder(mediaRecorderInstance);
    mediaRecorderInstance.start();
  };

  const saveRecordedVideo = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded-video.webm';
    a.click();
  };

  const handleStartRecording = () => {
    setShowModal(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (
    <div className='border border-5 form-handling'>
      <h1 className='text-center heading'>Event-Handling App</h1>
      <UserInfoForm handleFormSubmit={handleFormSubmit} />
      <div style={{ margin: "10px 20px" }}>
        <label>
          <input
            type="checkbox"
            checked={recordAudio}
            onChange={(e) => setRecordAudio(e.target.checked)}
          />
          Audio recording
        </label>
      </div>
      {recordingStarted ? (
        <div>
          <button onClick={handleStopRecording} className="button-77" role="button">Recording Stop</button>
        </div>
      ) : (
        <div>
          <RecordConfirmationModal showModal={showModal} handleConfirmation={handleConfirmation} />
          <button onClick={handleStartRecording} className="button-71" role="button">Recording Start</button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};


export default App;