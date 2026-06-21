import React from 'react';
import { Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

export default function Footer({ setCurrentPage, onBookClick }) {
  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: 'var(--primary-purple)',
      color: 'var(--light-text)',
      padding: 'var(--spacing-5xl) 0 var(--spacing-xl) 0',
      marginTop: 'auto',
      borderTop: '4px solid var(--secondary-teal)'
    }}>
      <div className="container">
        <div className="grid-3col mb-3xl">
          {/* Column 1: Info */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-headings)', fontWeight: 800, marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ADIVA<span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--secondary-teal)' }}></span>
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', marginBottom: 'var(--spacing-xl)' }}>
              Expert-led premium aesthetic & skin care clinic dedicated to restoring confidence and healing skin through state-of-the-art procedures and personalized treatments.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: '0.9rem' }}>
                <Clock size={16} className="text-secondary-teal" style={{ color: 'var(--secondary-teal)' }} />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: '0.9rem' }}>
                <MapPin size={16} style={{ color: 'var(--secondary-teal)' }} />
                <span>Adiva Centre, Building X, Ahmedabad, Gujarat</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div style={{ paddingLeft: '20px' }}>
            <h4 style={{ marginBottom: 'var(--spacing-lg)', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '8px', width: 'fit-content' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.75)'}>
                  Home Page
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }} style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.75)'}>
                  Our Services Menu
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.75)'}>
                  About the Clinic
                </a>
              </li>
              <li>
                <a href="#blog" onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }} style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.75)'}>
                  Latest Blog & News
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.75)'}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & CTA */}
          <div>
            <h4 style={{ marginBottom: 'var(--spacing-lg)', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '8px', width: 'fit-content' }}>Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
              <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: '0.95rem', color: 'var(--light-text)' }}>
                <Phone size={16} style={{ color: 'var(--secondary-teal)' }} />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@adivaclinic.com" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: '0.95rem', color: 'var(--light-text)' }}>
                <Mail size={16} style={{ color: 'var(--secondary-teal)' }} />
                <span>info@adivaclinic.com</span>
              </a>
            </div>
            <button 
              onClick={onBookClick}
              className="btn btn-teal btn-sm"
              style={{ width: '100%' }}
            >
              Book Treatment
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-md)', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
          <p>© 2026 ADIVA Aesthetics. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <span>•</span>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <span>•</span>
            <a href="#" onClick={(e) => e.preventDefault()}>Accessibility Statement</a>
          </div>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Made with <Heart size={12} fill="var(--secondary-teal)" color="var(--secondary-teal)" /> by ADIVA Team
          </p>
        </div>
      </div>
    </footer>
  );
}
