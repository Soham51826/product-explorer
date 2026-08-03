import { useState } from 'react';

function ProductCard({ product, onClick }) {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = 'https://via.placeholder.com/200?text=No+Image';

  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <div className="img-container">
        <span className="category-badge">{product.category}</span>
        {product.discountPercentage > 0 && (
          <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
        )}
        <img
          src={imgError ? fallbackImage : product.thumbnail}
          alt={product.title}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <div className="brand-tag">{product.brand || 'Generic'}</div>
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>
        
        <div className="product-meta">
          <div className="price-block">
            <span className="price">${product.price}</span>
          </div>
          <div className="rating-badge">
            ★ {product.rating.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;