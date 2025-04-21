import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ()  => {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#0b1214' }}>
      <Header />
      
      <main className="flex-grow-1 py-4" style={{ 
        backgroundColor: '#1a252f',  
        borderTop: '1px solid #ebd0ad',
        borderBottom: '1px solid #ebd0ad'
      }}>
        <div className="container py-3">
        <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
    
  );
};

export default Layout;