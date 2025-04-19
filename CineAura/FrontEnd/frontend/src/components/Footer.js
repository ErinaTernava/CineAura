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
              href="/privacy" 
              className="text-decoration-none me-3" 
              style={{ color: '#ebd0ad' }}
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-decoration-none me-3" 
              style={{ color: '#ebd0ad' }}
            >
              Terms of Service
            </a>
            <a 
              href="/contact" 
              className="text-decoration-none" 
              style={{ color: '#ebd0ad' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  