import React from 'react';

const Popup = ({ product, onClose }) => {
  const { _source } = product || {};
  return _source ? (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn"onClick={onClose}>&times;</button>
        <img src={`https://bilder.ngdata.no/${_source.imagePath}/medium.jpg`} alt={_source.title || 'Uten navn'} />
        <h2>{_source.title || 'Uten navn'}</h2>
        <p>{_source.subtitle || ''}</p>
        {_source.nutritionalContent?.length > 0 && (
          <ul>
            {_source.nutritionalContent.map((n, i) => (
              <li key={i}>{n.displayName}: {n.amount} {n.unit}</li>
            ))}
          </ul>
        )}
        <p><strong>Pris:</strong> {_source.pricePerUnitOriginal || 'N/A'} kr</p>
        <button className="add-to-cart">Add to cart</button>
      </div>
    </div>
  ) : null;
};

export default Popup;
