import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiFilm, FiPlusSquare, FiUsers, FiSettings, FiHome, FiCalendar, FiMail } from 'react-icons/fi';

const AdminLayout = () => {
  return (
    <div className="d-flex">
      <div
        style={{
          width: '220px',
          backgroundColor: '#1a252f',
          borderRight: '1px solid #ebd0ad',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          margin: -40,
          height: '100vh',
        }}
      >
        <div
          style={{
            paddingBottom: '25px',
            borderBottom: '1px solid #ebd0ad',
            marginBottom: '25px',
          }}
        >
          <h2
            style={{
              color: '#ebd0ad',
              fontSize: '1.3rem',
              fontWeight: '600',
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FiSettings style={{ marginRight: '12px' }} />
            Admin Dashboard
          </h2>
        </div>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px', 
            flex: 1,
          }}
        >
          <Link
            to="/admin/movies"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 15px',
              borderRadius: '6px',
              backgroundColor: window.location.pathname.includes('/movies') ? '#2c3e50' : 'transparent',
              color: window.location.pathname.includes('/movies') ? '#ebd0ad' : '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s',
             
            }}
          >
            <FiFilm style={{ marginRight: '12px', fontSize: '1.1rem' }} />
            View Movies
          </Link>
          <Link
            to="/admin/halls"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 15px',
              borderRadius: '6px',
              backgroundColor:
                window.location.pathname.includes('/halls') && !window.location.pathname.includes('/edit')
                  ? '#2c3e50'
                  : 'transparent',
              color:
                window.location.pathname.includes('/halls') && !window.location.pathname.includes('/edit')
                  ? '#ebd0ad'
                  : '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <FiHome style={{ marginRight: '12px', fontSize: '1.1rem' }} />
            View Halls
          </Link>

          <Link
            to="/admin/showtimes"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 15px',
              borderRadius: '6px',
              backgroundColor: window.location.pathname.includes('/showtimes') ? '#2c3e50' : 'transparent',
              color: window.location.pathname.includes('/showtimes') ? '#ebd0ad' : '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <FiCalendar style={{ marginRight: '12px', fontSize: '1.1rem' }} />
            View Showtimes
          </Link>
           
          <Link
            to="/admin/users"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 15px',
              borderRadius: '6px',
              backgroundColor: window.location.pathname.includes('/users') ? '#2c3e50' : 'transparent',
              color: window.location.pathname.includes('/users') ? '#ebd0ad' : '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <FiUsers style={{ marginRight: '12px', fontSize: '1.1rem' }} />
            Manage Users
          </Link>

          <Link
            to="/admin/email-config"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 15px',
              borderRadius: '6px',
              backgroundColor: window.location.pathname.includes('/email-config') ? '#2c3e50' : 'transparent',
              color: window.location.pathname.includes('/email-config') ? '#ebd0ad' : '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <FiMail style={{ marginRight: '12px', fontSize: '1.1rem' }} />
            Email Configuration
          </Link>
        </nav>
      </div>
      
      <div
        style={{
          flex: 1,
          padding: '30px',
          marginLeft: '250px',
          backgroundColor: '#0b1214',
          minHeight: '40vh',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
