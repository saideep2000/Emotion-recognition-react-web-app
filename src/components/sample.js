// import React, { useState, useEffect, useRef } from 'react';
// import { styled } from '@mui/material';

// const CameraAccess = () => {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [toastMessage, setToastMessage] = useState('');
//   const [imageSrc, setImageSrc] = useState('');
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef(null);
//   const videoRef = useRef(null);


//   useEffect(() => {
//     if (toastMessage) {
//       const timer = setTimeout(() => {
//         setToastMessage('');
//       }, 3000); // Clear the toast message after 3 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [toastMessage]);

//   const handleCameraAccess = () => {
//     if (!isCameraOn) {
//       // Request access to the camera
//       if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices.getUserMedia({ video: true })
//           .then((stream) => {
//             if (videoRef.current) {
//               videoRef.current.srcObject = stream;
//             }
//             setToastMessage('Camera access initiated');
//             setIsCameraOn(true);
//           })
//           .catch((err) => {
//             console.error("Error accessing the camera: ", err);
//             setToastMessage('Failed to access camera');
//           });
//       }
//     } else {
//       // Stop the camera
//       if (videoRef.current && videoRef.current.srcObject) {
//         const tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach(track => track.stop());
//         videoRef.current.srcObject = null;
//       }
//       setToastMessage('Camera access stopped');
//       setIsCameraOn(false);
//     }
//   };
  

//   const handleUploadClick = () => {
//     // Programmatically click the hidden file input
//     fileInputRef.current.click();
//   };

//   const handleUploadImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageSrc(reader.result); // Convert file to base64 string
//       };
//       reader.readAsDataURL(file);
//       setToastMessage('Uploading image initiated');
//     }
//   };

//   const handleDropdownChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleSubmit = () => {
//     console.log('Option submitted:', selectedOption);
//     setToastMessage(`Option submitted: ${selectedOption}`);
//   };

//   const handleClickPicture = () => {
//     setToastMessage('Picture Captured, now submit your Image');
//   };

//   const handleClearImage = () => {
//     if(selectedFile || imageSrc ){
//       setSelectedFile(null);
//       setImageSrc('');
//       setToastMessage('Pictured Cleared');
//     }else{
//       setToastMessage('No Image to clear');
//     }
//   };


//   const VisuallyHiddenInput = styled('input')({
//     position: 'absolute',
//     overflow: 'hidden',
//     clip: 'rect(0 0 0 0)',
//     height: 1,
//     width: 1,
//     margin: -1,
//     padding: 0,
//     border: 0,
//   });

//   return (
//     <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
//       {/* Toast message */}
//       {toastMessage && (
//         <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#000', color: '#fff', padding: '10px', borderRadius: '5px', zIndex: 1000 }}>
//           {toastMessage}
//         </div>
//       )}

//       {/* Image display or loading indicator */}
//       <div style={{ width: '800px', height: '500px', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', marginBottom: '20px', marginTop: '40px' }}>
//         {imageSrc ? (
//           <div style={{ width: '800px', height: '500px', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', marginBottom: '20px', marginTop: '40px' }}>
//             <video ref={videoRef} style={{ width: '100%', maxHeight: '100%' }} autoPlay playsInline></video>
//           </div>
//         ) : selectedFile ? (
//           <div style={{ textAlign: 'center', color: '#fff' }}>
//             <p>Loading...</p>
//             {/* For a real loading spinner, replace the above <p> with an <img> tag */}
//           </div>
//         ) : (
//           'Display area'
//         )}
//       </div>

//       {/* Camera and upload controls */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
//         <button onClick={handleCameraAccess} style={{ padding: '10px 20px', fontSize: '16px' }}>
//           {isCameraOn ? 'Stop Camera' : 'Access Camera'}
//         </button>
//         <button onClick={handleUploadClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
//           Upload Image
//         </button>
//         <button onClick={handleClearImage} style={{ padding: '10px 20px', fontSize: '16px' }}>
//           Clear Image
//         </button>
//         <VisuallyHiddenInput ref={fileInputRef} type="file" accept="image/*" onChange={handleUploadImage} />
//       </div>

//       {/* Options and submit button */}
//       <div style={{ marginBottom: '20px' }}>
//         {imageSrc && (
//           <>
//             <select onChange={handleDropdownChange} style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}>
//               <option value="">Select the Model</option>
//               <option value="option1">SVM</option>
//               <option value="option2">MobileNet</option>
//             </select>
//             <button onClick={handleSubmit} style={{ padding: '10px', fontSize: '16px' }}>
//               Submit
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CameraAccess;
