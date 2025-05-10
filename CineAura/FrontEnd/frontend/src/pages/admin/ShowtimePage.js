import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthToken from '../../hooks/useAuthToken';
import ShowtimeCard from '../../components/admin/ShowtimeCard';

const ShowtimesPage = () => {
  const { token } = useAuthToken();
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
     const fetchShowtimes = async () => {
       try {
         const response = await fetch('http://localhost:5283/api/Showtime/getAll', {
           headers: { 'Authorization': `Bearer ${token}` }
         });
         if (!response.ok) throw new Error('Failed to fetch showtimes');
         const data = await response.json();
         setShowtimes(data);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };
 
     fetchShowtimes();
   }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this showtime?')) return;
    
    try {
      const response = await fetch(`http://localhost:5283/api/Showtime/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to delete showtime');
      
      setShowtimes(showtimes.filter(showtime => showtime.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center py-5">Loading showtimes...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
     <div className="container py-4">
       <div className="d-flex justify-content-between align-items-center mb-4">
         <h2 style={{ color: '#ebd0ad' }}>Showtime Management</h2>
         <Link to="/admin/add-showtime" className="btn" style={{ backgroundColor: '#ebd0ad', color: '#1a1a2e' }}>
           Add New Showtime
         </Link>
       </div>
 
       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
         {showtimes.map(showtime => (
           <div className="col" key={showtime.id}>
             <ShowtimeCard 
               showtime={showtime} 
               onDelete={handleDelete} 
             />
           </div>
         ))}
       </div>
     </div>
   );
 };
 
export default ShowtimesPage;