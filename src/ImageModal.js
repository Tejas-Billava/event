import React from "react";
import "./ImageModal.css"; // Import the CSS file for ImageModal

const ImageModal = ({ images, onClose, onSelect, selectedImage, onSubmit }) => {
  return (
    <div className="image-modal-overlay">
      <div className="image-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="image-grid">
          {images.map((image, index) => (
            <div
              key={index}
              className={`image-item ${
                image.src === selectedImage ? "selected" : ""
              }`}
              onClick={() => onSelect(image.src)}
            >
              <img src={image.src} alt={`Option ${index}`} />
            </div>
          ))}
        </div>
        {/* Submit Button for Modal */}
        <button className="modal-submit-button" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
