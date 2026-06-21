import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

export default function Header({ currentPage, setCurrentPage, onBookClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`header-nav ${isScrolled ? 'scrolled' : ''} glass-panel`}>
      <div className="container header-container">
        <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <span>ADIVA</span><span className="logo-dot"></span>
        </a>

        {/* Desktop Menu */}
        <nav>
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${currentPage === item.id || (item.id === 'services' && currentPage.startsWith('service-')) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button 
                onClick={onBookClick}
                className="btn btn-sm btn-primary"
                style={{ marginLeft: 'var(--spacing-md)' }}
              >
                <Calendar size={16} />
                <span>Book Appointment</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggler */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <ul className="nav-menu mobile-open">
            {navItems.map((item) => (
              <li key={item.id} style={{ width: '100%', textAlign: 'center' }}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  style={{ display: 'block', padding: '12px 0' }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 'var(--spacing-md)' }}>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookClick();
                }}
                className="btn btn-primary"
                style={{ width: '80%' }}
              >
                <Calendar size={18} />
                <span>Book Appointment</span>
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
