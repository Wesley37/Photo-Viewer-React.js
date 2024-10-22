import React, { useState } from 'react';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';

const PhotoViewer = () => {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(imageUrls);
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        multiple 
        onChange={handleFileChange} 
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {images.map((image, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img 
              src={image} 
              alt={`Uploaded ${index}`} 
              style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }} 
              onClick={() => openLightbox(index)}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[currentIndex]}
          nextSrc={images[(currentIndex + 1) % images.length]}
          prevSrc={images[(currentIndex + images.length - 1) % images.length]}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={goToPrevious}
          onMoveNextRequest={goToNext}
        />
      )}
    </div>
  );
};

export default PhotoViewer;