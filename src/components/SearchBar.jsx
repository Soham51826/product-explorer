import { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products (e.g. phone, laptop)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button className="clear-btn" onClick={() => setSearchTerm('')}>
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;