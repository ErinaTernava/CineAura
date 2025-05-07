import React from 'react';

const MovieFilterNav = ({ 
  activeFilter, 
  setActiveFilter 
}) => {
  return (
    <div className="py-2 mb-4" style={{ 
      //backgroundColor: '#0b1214',
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
          onClick={() => setActiveFilter('all')}
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
          onClick={() => setActiveFilter('available')}
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
          onClick={() => setActiveFilter('coming-soon')}
        >
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default MovieFilterNav;