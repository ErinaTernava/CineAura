import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto py-4" style={{ 
      backgroundColor: '#0b1214',
      borderTop: '1px solid #ebd0ad'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0" style={{ color: '#ebd0ad' }}>
              &copy; 2025 CineAura. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">           
            <a 
              href="/terms" 
              className="text-decoration-none me-3" 
              style={{ color: '#ebd0ad' }}
            >
              Terms of Service
            </a>          
            <Link 
              to="/help"
              className="text-decoration-none"
              style={{ color: '#ebd0ad' }}
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
