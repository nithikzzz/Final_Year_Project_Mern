import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/image/all"); // Adjust the route based on your backend endpoint
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div classname="container">
      <h2>Uploaded Images</h2>
      <ul>
        {images.map((image) => (
          <li key={image._id}>
            <img
              src={`data:image/jpeg;base64,${image.image}`}
              alt="Uploaded"
              style={{ maxWidth: "200px", maxHeight: "200px" }} // Adjust the values as needed
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageList;
