import { useState } from 'react';

function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);

  const fallbackImage = 'https://via.placeholder.com/150?text=No+Image';

  return (
    <div className="product-card">
      <div className="img-container">
        <img
          src={imgError ? fallbackImage : product.thumbnail}
          alt={product.title}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>
        <div className="product-meta">
          <span className="price">${product.price}</span>
          <span className="rating">★ {product.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;