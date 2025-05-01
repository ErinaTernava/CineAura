import React from 'react';

const HelpPage = () => {
  return (
    <div className="container-fluid py-4 min-vh-100" style={{ backgroundColor: '#0b1214' }}>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div className="card shadow-lg" style={{ 
            backgroundColor: '#0b1214', 
            borderColor: '#2c3e50',
            minHeight: '80vh'
          }}>
            <div className="card-header py-3" style={{ 
              backgroundColor: '#1a1a2e', 
              borderBottom: '1px solid #2c3e50' 
            }}>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="mb-0" style={{ color: '#ebd0ad', fontSize: '2rem' }}>Help & Support</h1>
                <span className="badge rounded-pill" style={{ backgroundColor: '#ebd0ad', color: '#1a1a2e' }}>
                  We're here to assist you
                </span>
              </div>
            </div>

            <div className="card-body px-4 py-4" style={{ color: '#d1d5db', overflowY: 'auto', maxHeight: '70vh' }}>
              <section className="mb-5">
                <h2 style={{ color: '#ebd0ad', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem' }}>1. Frequently Asked Questions</h2>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <strong>How do I purchase tickets?</strong>
                    <p>Tickets can be purchased online through our platform or at the cinema counter. You’ll receive a confirmation email upon successful booking.</p>
                  </li>
                  <li className="mb-3">
                    <strong>Can I cancel or refund my ticket?</strong>
                    <p>All sales are final. Refunds are not available unless otherwise stated under specific conditions in our Terms and Conditions.</p>
                  </li>
                  <li className="mb-3">
                    <strong>Do you offer group bookings?</strong>
                    <p>Yes! For groups of 10 or more, please contact us directly for special rates and seating arrangements.</p>
                  </li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 style={{ color: '#ebd0ad', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem' }}>2. Technical Support</h2>
                <p>
                  If you're having trouble with the website (login issues, payment errors, or loading problems), try clearing your browser cache or switching to another browser.
                  If the issue persists, contact our support team.
                </p>
              </section>

              <section className="mb-5">
                <h2 style={{ color: '#ebd0ad', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem' }}>3. Contact Support</h2>
                <p>
                  Need more help? Reach out to us:
                </p>
                <ul>
                  <li>Email: <a href="mailto:support@cineaura.com" style={{ color: '#ebd0ad' }}>support@cineaura.com</a></li>
                  <li>Phone: <a href="tel:+1234567890" style={{ color: '#ebd0ad' }}>+383 38 541 400 </a></li>
                  <li>Live Chat: Available from 9:00 AM to 9:00 PM daily</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 style={{ color: '#ebd0ad', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem' }}>4. Visit Us</h2>
                <p>
                  CineAura Headquarters<br />
                  Lagjja Kalabria,10000 Prishtine, Kosovo<br />
                  Open: Monday - Sunday, 10:00 AM to 11:00 PM
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
