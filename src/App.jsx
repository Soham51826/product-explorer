import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import Pagination from './components/Pagination';
import './App.css';

const LIMIT = 12;

function App() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = useCallback(async (query, catVal, skipVal, signal) => {
    setLoading(true);
    setError(null);

    try {
      let url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skipVal}`;
      
      if (catVal !== 'all') {
        url = `https://dummyjson.com/products/category/${catVal}?limit=${LIMIT}&skip=${skipVal}`;
      } else if (query.trim() !== '') {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${LIMIT}&skip=${skipVal}`;
      }

      const res = await fetch(url, { signal });
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const data = await res.json();
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to fetch products');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(searchQuery, category, skip, controller.signal);

    return () => controller.abort();
  }, [searchQuery, category, skip, fetchProducts]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCategory('all');
    setSkip(0);
  }, []);

  const handleCategorySelect = useCallback((cat) => {
    setCategory(cat);
    setSearchQuery('');
    setSkip(0);
  }, []);

  const currentPage = Math.floor(skip / LIMIT) + 1;
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-badge">GDG Web Dev Recruitment</div>
        <h1>Product Explorer</h1>
        <p className="subtitle">High-performance catalog interface powered by DummyJSON API</p>
        
        <SearchBar
          onSearch={handleSearch}
          activeCategory={category}
          onSelectCategory={handleCategorySelect}
        />
      </header>

      <main className="content">
        {loading && (
          <div className="product-grid">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-box skeleton-img" />
                <div className="skeleton-box skeleton-title" />
                <div className="skeleton-box skeleton-text" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="state-message error">
            <p>⚠️ {error}</p>
            <button onClick={() => fetchProducts(searchQuery, category, skip)}>
              Retry Request
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="state-message">
            <h3>No products found</h3>
            <p>Try searching for a different keyword or resetting filters.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="product-grid">
            {products.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {!loading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setSkip((page - 1) * LIMIT)}
        />
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;