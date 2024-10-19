import React, { useState } from 'react';

const photos = [
  'https://via.placeholder.com/600x400?text=Photo+1',
  'https://via.placeholder.com/600x400?text=Photo+2',
  'https://via.placeholder.com/600x400?text=Photo+3',
  'https://via.placeholder.com/600x400?text=Photo+4',
];

const PhotoViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + photos.length) % photos.length
    );
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      
      <img
      
        src={image}
        alt={`${[image]}`}
        style={{ width: '600px', height: '400px', objectFit: 'cover' }}

      />
      <input type='file' multiple accept='image/*' onChange={handleImageChange} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={prevPhoto} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={nextPhoto} disabled={currentIndex === photos.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PhotoViewer;

