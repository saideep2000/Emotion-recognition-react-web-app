import React, { useState, useEffect, useRef } from 'react';

const CameraAccess = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleCameraAccess = () => {
    if (!isCameraOn) {
      handleClearImage()
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setToastMessage('Camera access initiated');
          setIsCameraOn(true);
        })
        .catch((err) => {
          console.error("Error accessing the camera: ", err);
          setToastMessage('Failed to access camera');
        });
    } else {
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setToastMessage('Camera access stopped');
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadImage = (event) => {
    stopCamera();
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        stopCamera();
      };
      reader.readAsDataURL(file);
      setToastMessage('Uploading image initiated');
    }
  };

  const handleCaptureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      setImageSrc(canvasRef.current.toDataURL('image/png'));
      stopCamera();
      setToastMessage('Picture captured');
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if(selectedOption){
      const emotion = ["Happy", "Sad", "Depressed", "Fear"];
      const randomEmotion = emotion[Math.floor(Math.random() * emotion.length)];
      setToastMessage(`Image ran through ${selectedOption}, it's ${randomEmotion}.`);
    }else{
      setToastMessage(`Select a Model to run your Image`);
    }
    
  };


  const handleClearImage = () => {
    if (selectedFile || imageSrc) {
      setSelectedFile(null);
      setImageSrc('');
      setToastMessage('Picture cleared');
    } 
    else {
      setToastMessage('No image to clear');
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      {toastMessage && (
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#000', color: '#fff', padding: '10px', borderRadius: '5px', zIndex: 1000 }}>
          {toastMessage}
        </div>
      )}

      <div style={{ width: '800px', height: '500px', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', marginBottom: '20px', marginTop: '40px' }}>
        {imageSrc ? (
          <img src={imageSrc} alt="Captured or uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          <video ref={videoRef} style={{ width: '100%', maxHeight: '100%' }} autoPlay playsInline></video>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <button onClick={handleCameraAccess} style={{ padding: '10px 20px', fontSize: '16px' }}>
          {isCameraOn ? 'Stop Camera' : 'Access Camera'}
        </button>
        {isCameraOn && (
          <button onClick={handleCaptureImage} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Capture Image
          </button>
        )}
        <button onClick={handleUploadClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Upload Image
        </button>
        <button onClick={handleClearImage} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Clear Image
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUploadImage} style={{ display: 'none' }} />
      </div>

      {imageSrc && (
        <div style={{ marginBottom: '20px' }}>
          <select onChange={handleDropdownChange} style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}>
            <option value="">Select the Model</option>
            <option value="SVM">SVM</option>
            <option value="MobileNet">MobileNet</option>
          </select>
          <button onClick={handleSubmit} style={{ padding: '10px', fontSize: '16px' }}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraAccess;
