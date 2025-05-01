import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          backgroundColor: '#1a1a2e',
          color: '#ebd0ad',
          border: '1px solid #2c3e50',
        }}
      />
      <button
        type="submit"
        className="btn"
        style={{
          backgroundColor: '#ebd0ad',
          color: '#0b1214',
          fontWeight: 'bold',
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
