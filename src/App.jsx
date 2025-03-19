import React, { useEffect, useState } from 'react';
import Popup from './Popup';
import './App.css';

const API_URL =
  'https://platform-rest-prod.ngdata.no/api/products/1300/7080001150488?page=1&page_size=20&full_response=true&fieldset=maximal&facets=Category%2CAllergen&showNotForSale=true';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.hits?.hits || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Feil ved henting av data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Laster inn produkter...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Produkter</h1>
      <div className="products-grid">
        {products.map((p) => (
          <div
            key={p._id}
            className="product-card"
            onClick={() => setSelectedProduct(p)}
          >
            <img
              src={`https://bilder.ngdata.no/${p._source.imagePath}/medium.jpg`}
              alt={p._source.title}
            />
            <h2>{p._source.title || 'Uten navn'}</h2>
            <p>{p._source.subtitle}</p>
            <p>{p._source.pricePerUnitOriginal} kr</p>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <Popup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Products;
