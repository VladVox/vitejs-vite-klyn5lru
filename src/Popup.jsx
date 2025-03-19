import React from 'react';
import './App.css';

const Popup = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <img
          src={`https://bilder.ngdata.no/${product._source.imagePath}/medium.jpg`}
          alt={product._source.title}
        />
        <h2>{product._source.title || 'Uten navn'}</h2>
        <p>{product._source.subtitle}</p>
        <p>{product._source.pricePerUnitOriginal} kr</p>
        <button className='add-to-cart'>Add to cart</button>
      </div>
    </div>
  );
};

export default Popup;
