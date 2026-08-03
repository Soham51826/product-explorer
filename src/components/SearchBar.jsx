import { useState, useEffect } from 'react';

function SearchBar({ onSearch, activeCategory, onSelectCategory }) {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'beauty', 'fragrances', 'furniture', 'groceries'];

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <div className="search-section">
      <div className="search-bar">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search products by title, tag, or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-btn" onClick={() => setSearchTerm('')}>
            ✕
          </button>
        )}
      </div>

      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;