import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

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
          backgroundColor: '#0b1214',
          color: '#ebd0ad',
          border: '1px solid #ebd0ad',
          borderRadius: '30px',
          width: '100%',
          marginRight: '8px',
        }}
      />
       <button
        type="submit"
        className="btn"
        style={{
          backgroundColor: '#0b1214',
          border: 'none',
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
        }}
      >
        <FaSearch color="#ebd0ad" size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
