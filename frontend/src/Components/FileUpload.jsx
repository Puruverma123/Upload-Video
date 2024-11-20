import React, { useState, useRef } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const videoRef = useRef(null); // Reference to the video player

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setVideoURL(response.data.url);
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Failed to upload file.');
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10; // Move forward 10 seconds
    }
  };

  const handleBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10; // Move backward 10 seconds
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {videoURL && (
        <div>
          <h3>Uploaded Video:</h3>
          <video
            ref={videoRef}
            src={videoURL}
            controls
            width="600"
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          ></video>
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleBackward}>Backward 10s</button>
            <button onClick={handleForward}>Forward 10s</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
