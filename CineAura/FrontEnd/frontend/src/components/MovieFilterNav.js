import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieFilterNav = ({ 
  activeFilter, 
  setActiveFilter, 
  onGenreSelect 
}) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:5283/api/Movie/genres');
        setGenres(response.data);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setSelectedGenreId(genreId);
    onGenreSelect(genreId);
    setActiveFilter('genre'); 
  };

  const handleButtonClick = (filterType) => {
    setActiveFilter(filterType);
    setSelectedGenreId(''); 
    if (filterType !== 'genre') {
      onGenreSelect(''); 
    }
  };

  return (
    <div className="py-2 mb-4" style={{ 
      borderBottom: '1px solid #ebd0ad',
      borderTop: '1px solid #ebd0ad'
    }}>
      <div className="container d-flex flex-wrap justify-content-center align-items-center gap-3">
        <button 
          style={{ 
            backgroundColor: activeFilter === 'all' ? '#ebd0ad' : 'transparent',
            color: activeFilter === 'all' ? '#0b1214' : '#ebd0ad',
            border: '1px solid #ebd0ad',
            borderRadius: '20px',
            padding: '0.25rem 1rem'
          }}
          onClick={() => handleButtonClick('all')}
        >
          All Movies
        </button>
        
        <button 
          style={{ 
            backgroundColor: activeFilter === 'available' ? '#ebd0ad' : 'transparent',
            color: activeFilter === 'available' ? '#0b1214' : '#ebd0ad',
            border: '1px solid #ebd0ad',
            borderRadius: '20px',
            padding: '0.25rem 1rem'
          }}
          onClick={() => handleButtonClick('available')}
        >
          Currently Available
        </button>
        
        <button 
          style={{ 
            backgroundColor: activeFilter === 'coming-soon' ? '#ebd0ad' : 'transparent',
            color: activeFilter === 'coming-soon' ? '#0b1214' : '#ebd0ad',
            border: '1px solid #ebd0ad',
            borderRadius: '20px',
            padding: '0.25rem 1rem'
          }}
          onClick={() => handleButtonClick('coming-soon')}
        >
          Coming Soon
        </button>

        <select 
          className="form-select w-auto" 
          value={selectedGenreId} 
          onChange={handleGenreChange}
          style={{ 
            backgroundColor: '#0b1214', 
            color: '#ebd0ad', 
            border: '1px solid #ebd0ad',
            borderRadius: '20px',
            padding: '0.25rem 1rem',
            minWidth: '160px'
          }}
        >
          <option value="">Filter by Genre</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.genreName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MovieFilterNav;