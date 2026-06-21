import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import { X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState(null);

  // Custom Hash Router Synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        if (hash === 'book-appointment') {
          setIsBookingOpen(true);
        } else {
          setCurrentPage(hash);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Init hash check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBookClick = () => {
    setPreselectedService(null);
    setIsBookingOpen(true);
    window.location.hash = 'book-appointment';
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    // Restore hash to current page
    window.location.hash = currentPage;
  };

  // Render active page component
  const renderPage = () => {
    if (currentPage.startsWith('service-')) {
      const slug = currentPage.replace('service-', '');
      return (
        <ServiceDetail
          serviceId={slug}
          setCurrentPage={setCurrentPage}
          setPreselectedService={setPreselectedService}
          onBookClick={() => setIsBookingOpen(true)}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} onBookClick={handleBookClick} />;
      case 'services':
        return (
          <Services
            setCurrentPage={setCurrentPage}
            setPreselectedService={setPreselectedService}
            onBookClick={() => setIsBookingOpen(true)}
          />
        );
      case 'about':
        return <About onBookClick={handleBookClick} />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} onBookClick={handleBookClick} />;
    }
  };

  return (
    <>
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onBookClick={handleBookClick}
      />
      
      <main className="main-content">
        {renderPage()}
      </main>

      <Footer
        setCurrentPage={setCurrentPage}
        onBookClick={handleBookClick}
      />

      {/* Full-Page Booking Modal Overlay */}
      {isBookingOpen && (
        <div className="booking-portal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--light-bg)',
          zIndex: 2000,
          overflowY: 'auto',
          animation: 'fadeIn 0.25s ease-out'
        }}>
          {/* Header bar of modal */}
          <div className="glass-panel" style={{
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            padding: '16px 0',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255,255,255,0.9)'
          }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-purple)' }}>
                <span>ADIVA BOOKING SYSTEM</span>
                <span className="logo-dot"></span>
              </div>
              
              <button 
                onClick={handleCloseBooking}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--gray-text)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#fff'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-coral)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--gray-text)'}
              >
                <X size={18} />
                <span>Close Portal</span>
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div style={{ padding: '24px 0' }}>
            <BookAppointment
              preselectedService={preselectedService}
              onClose={handleCloseBooking}
              setCurrentPage={(page) => {
                setCurrentPage(page);
                setIsBookingOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
