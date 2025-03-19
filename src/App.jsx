import React, { useEffect, useState } from 'react';
import Popup from './Popup';
import './App.css';

const API_URL =
  'https://platform-rest-prod.ngdata.no/api/products/1300/7080001150488?page=1&page_size=20&full_response=true&fieldset=maximal&facets=Category%2CAllergen&showNotForSale=true';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProducts(data.hits?.hits || []))
      .catch(() => alert('Feil ved henting av data'));
  }, []);

  return (
    <div>
      <h1>Produkter</h1>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card" onClick={() => setSelected(p)}>
            <img src={`https://bilder.ngdata.no/${p._source?.imagePath}/medium.jpg`} alt={p._source?.title || 'Uten navn'} />
            <h2>{p._source?.title || 'Uten navn'}</h2>
            <p>{p._source?.subtitle || ''}</p>
            <p>{p._source?.pricePerUnitOriginal || 'N/A'} kr</p>
          </div>
        ))}
      </div>
      {selected && <Popup product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default Products;
