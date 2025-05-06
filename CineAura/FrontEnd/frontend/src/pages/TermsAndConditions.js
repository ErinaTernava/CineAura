import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditionsPage = () => {
  return (
    <div className="container-fluid py-4 min-vh-100" style={{ backgroundColor: '#1a252f' }}>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div className="card shadow-lg" style={{ 
            backgroundColor: '#0b1214', 
            borderColor: '#2c3e50',
            minHeight: '70vh'
          }}>
            <div className="card-header py-3" style={{ 
              backgroundColor: '#1a1a2e', 
              borderBottom: '1px solid #2c3e50' 
            }}>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="mb-0" style={{ color: '#ebd0ad', fontSize: '2rem' }}>CineAura Terms and Conditions</h1>
                <span className="badge rounded-pill" style={{ backgroundColor: '#ebd0ad', color: '#1a1a2e' }}>
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="card-body px-4 py-4" style={{ color: '#d1d5db', overflowY: 'auto', maxHeight: '70vh' }}>
              <section className="mb-5">
                <h2 style={{ color: '#ebd0ad', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem' }}>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the CineAura website, mobile application, or any services provided by CineAura ("Services"), 
                  you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all these Terms, 
                  you must not use our Services. We may modify these Terms at any time, and such modifications shall be effective immediately.
                </p>
              </section>

              <section className="mb-5">
                <h2 style={{ color: '#ebd0ad', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem' }}>2. Ticket Purchases & Reservations</h2>
                <ul className="list-group list-group-flush mb-3" style={{ backgroundColor: 'transparent' }}>
                  <li className="list-group-item" style={{ backgroundColor: 'transparent', color: '#d1d5db', borderColor: '#2c3e50' }}>
                    <strong>All sales are final:</strong> No refunds or exchanges except as required by law or as expressly provided in these Terms.
                  </li>
                  <li className="list-group-item" style={{ backgroundColor: 'transparent', color: '#d1d5db', borderColor: '#2c3e50' }}>
                    <strong>Pricing:</strong> Ticket prices are subject to change without notice. We reserve the right to impose additional fees.
                  </li>
                  <li className="list-group-item" style={{ backgroundColor: 'transparent', color: '#d1d5db', borderColor: '#2c3e50' }}>
                    <strong>Seating:</strong> All seating is general admission unless otherwise specified. We reserve the right to change seating arrangements.
                  </li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 style={{ color: '#ebd0ad', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem' }}>3. Cinema Policies</h2>
                <div className="row">
                  <div className="col-md-6">
                    <h5 style={{ color: '#ebd0ad' }}>Age Restrictions</h5>
                    <p>
                      Films are classified according to local regulations. Valid government-issued photo ID is required for age-restricted films. 
                      Children under 12 must be accompanied by an adult after 7 PM.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h5 style={{ color: '#ebd0ad' }}>Conduct</h5>
                    <p>
                      Disruptive behavior including loud talking, phone use, or recording will result in immediate ejection without refund. 
                      Repeat offenders may be banned from our premises.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-5">
                <h2 style={{ color: '#ebd0ad', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem' }}>4. Privacy & Data Protection</h2>
                <p>
                  We collect personal information to process transactions and improve your experience. By using our Services, you consent to:
                </p>
                <ul>
                  <li>Processing of payment information</li>
                  <li>Use of cookies and tracking technologies</li>
                  <li>Marketing communications (you may opt-out anytime)</li>
                </ul>
                <p>
                  We implement industry-standard security measures but cannot guarantee absolute security of your data.
                </p>
              </section>

              <section className="mb-5">
                <h2 style={{ color: '#ebd0ad', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem' }}>5. Intellectual Property</h2>
                <p>
                  All content on our platforms including logos, graphics, and film materials are protected by copyright. 
                  Unauthorized reproduction, distribution, or public performance is strictly prohibited and may result in legal action.
                </p>
              </section>

              <section className="mb-5">
                <h2 style={{ color: '#ebd0ad', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem' }}>6. Limitation of Liability</h2>
                <p>
                  CineAura shall not be liable for any indirect, incidental, or consequential damages arising from your use of our Services. 
                  Our total liability for any claim shall not exceed the price of your ticket.
                </p>
              </section>

              <section className="mb-5">
                <h2 style={{ color: '#ebd0ad', borderBottom: '1px solid #2c3e50', paddingBottom: '0.5rem' }}>7. Governing Law</h2>
                <p>
                  These Terms shall be governed by the laws of [Your Country/State]. Any disputes shall be resolved in the courts of [Your Jurisdiction].
                </p>
              </section>

              <div className="mt-5 pt-4 border-top border-secondary">
                <h4 style={{ color: '#ebd0ad' }}>Contact Information</h4>
                <p>
                  For questions regarding these Terms, please contact us at:
                  <br />
                  Email: <Link to="mailto:legal@cineaura.com" style={{ color: '#ebd0ad' }}>legal@cineaura.com</Link>
                  <br />
                  Phone: <Link to="tel:+1234567890" style={{ color: '#ebd0ad' }}>+1 (234) 567-890</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;