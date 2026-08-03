function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-grid">
          <div className="modal-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div className="modal-details">
            <span className="modal-category">{product.category}</span>
            <h2>{product.title}</h2>
            <p className="modal-brand">Brand: <strong>{product.brand || 'N/A'}</strong></p>
            <p className="modal-desc">{product.description}</p>

            <div className="modal-price-row">
              <span className="modal-price">${product.price}</span>
              <span className="modal-rating">★ {product.rating} / 5</span>
              <span className={`modal-stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;