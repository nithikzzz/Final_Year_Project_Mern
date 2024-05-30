import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
    // Reset the image upload status when a new file is selected
    setIsImageUploaded(false);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Use the relative path instead of the absolute URL
      await axios.post('/image/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Set the state to show the image upload alert
      setIsImageUploaded(true);

      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <div className="img">
      <h2>Image Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      <Link to="/viewpage">
        <button>Image View Page</button>
      </Link>

      {isImageUploaded && (
        <div className="alert">
          <p>Image uploaded successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
