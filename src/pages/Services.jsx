import React, { useState, useMemo } from 'react';
import { Search, Clock, ArrowRight, Sparkles, Filter } from 'lucide-react';

export const servicesData = [
  // Skin Treatments
  { id: 'acne', name: 'Acne Treatment', category: 'Skin Treatments', duration: 30, price: 500, desc: 'Comprehensive medical evaluation and topical/systemic therapeutic regimens to manage active acne and prevent flare-ups.' },
  { id: 'acne-scars', name: 'Acne Scars Revision', category: 'Skin Treatments', duration: 45, price: 1500, desc: 'Advanced microneedling, subcision, and dermapen techniques to stimulate collagen and reconstruct deep skin scars.' },
  { id: 'pigmentation', name: 'Pigmentation Care', category: 'Skin Treatments', duration: 30, price: 800, desc: 'Targeted therapies for melasma, freckles, and dark spots to even out skin tone and restore natural luminosity.' },
  { id: 'eczema', name: 'Eczema Management', category: 'Skin Treatments', duration: 30, price: 500, desc: 'Soothe dry, inflamed skin with clinically proven moisturizing barriers and targeted anti-inflammatory regimens.' },
  { id: 'psoriasis', name: 'Psoriasis Therapy', category: 'Skin Treatments', duration: 40, price: 600, desc: 'Expert medical management of plaque psoriasis including topical vitamin D analogues and systemic care.' },
  { id: 'vitiligo', name: 'Vitiligo Treatment', category: 'Skin Treatments', duration: 30, price: 600, desc: 'Targeted repigmentation therapies using topical immunomodulators and specialized clinical counseling.' },
  { id: 'chemical-peels', name: 'Chemical Peels', category: 'Skin Treatments', duration: 30, price: 1200, desc: 'Custom medical-grade acid peels to remove dead surface layers, reduce fine lines, and address superficial blemishes.' },
  { id: 'medi-facials', name: 'Medi-Facials', category: 'Skin Treatments', duration: 60, price: 1800, desc: 'Doctor-supervised facial treatments using active clinical serums, ultrasound infusers, and hydrating masks.' },
  { id: 'warts-moles', name: 'Warts & Moles Removal', category: 'Skin Treatments', duration: 20, price: 1000, desc: 'Safe radiofrequency ablation or cryotherapy to remove benign moles, warts, and skin tags under local anesthesia.' },
  { id: 'dark-circles', name: 'Dark Circles Therapy', category: 'Skin Treatments', duration: 30, price: 750, desc: 'Micro-current infusers and specialized peptide serums to improve under-eye drainage and reduce pigmentation.' },
  
  // Laser Treatments
  { id: 'laser-hair', name: 'Laser Hair Reduction', category: 'Laser Treatments', duration: 45, price: 2000, desc: 'US-FDA approved cooling diode lasers for permanent, comfortable reduction of unwanted facial and body hair.' },
  { id: 'laser-resurfacing', name: 'Laser Skin Resurfacing', category: 'Laser Treatments', duration: 60, price: 2500, desc: 'Fractional carbon dioxide (CO2) laser therapy to vaporize micro-channels and rebuild brand new, smooth skin.' },
  { id: 'tattoo-removal', name: 'Laser Tattoo Removal', category: 'Laser Treatments', duration: 30, price: 1500, desc: 'Active Q-Switched Nd:YAG lasers to safely break down dark tattoo inks into micro-particles for natural flushing.' },
  
  // Hair Treatments
  { id: 'hair-loss', name: 'Hair Loss Treatment', category: 'Hair Treatments', duration: 30, price: 600, desc: 'Clinical evaluation of alopecia, male/female pattern baldness, and prescriptions for hair density activators.' },
  { id: 'hair-prp', name: 'PRP Hair Therapy', category: 'Hair Treatments', duration: 45, price: 2500, desc: 'Platelet-rich plasma therapy to infuse natural growth factors directly into the scalp to stimulate shrinking follicles.' },
  
  // Aesthetic Services
  { id: 'botox', name: 'Botox Anti-Wrinkle', category: 'Aesthetic Services', duration: 30, price: 5000, desc: 'Targeted purified protein micro-injections to temporarily relax active muscles and smooth out forehead frown lines.' },
  { id: 'dermal-fillers', name: 'Dermal Fillers', category: 'Aesthetic Services', duration: 45, price: 8000, desc: 'Hyaluronic acid gel infusions to restore youthful contours in the cheeks, lips, and tear troughs instantly.' },
  { id: 'bridal-package', name: 'Bridal Glow Package', category: 'Aesthetic Services', duration: 90, price: 4500, desc: 'A curated multi-step aesthetic timeline combining mild peels, laser toning, and hydration facials before the big day.' },
  
  // Body Treatments
  { id: 'stretch-marks', name: 'Stretch Marks Therapy', category: 'Body Treatments', duration: 45, price: 1500, desc: 'Collagen-induction therapy combined with localized fractional lasers to fade red and white stretch marks.' },
  { id: 'body-contouring', name: 'Non-Invasive Body Contouring', category: 'Body Treatments', duration: 60, price: 3000, desc: 'Radiofrequency heating to break down subcutaneous fat cells and tighten sagging skin on the abdomen or thighs.' }
];

export default function Services({ setCurrentPage, setPreselectedService, onBookClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Skin Treatments', 'Laser Treatments', 'Hair Treatments', 'Aesthetic Services', 'Body Treatments'];

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            service.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const handleBookNow = (service) => {
    setPreselectedService(service);
    onBookClick();
  };

  const handleViewDetail = (serviceId) => {
    setCurrentPage(`service-${serviceId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get counts for badge labels
  const getCategoryCount = (categoryName) => {
    if (categoryName === 'All') return servicesData.length;
    return servicesData.filter(s => s.category === categoryName).length;
  };

  return (
    <div className="container section-padding animate-fade-in">
      <div className="section-header text-center">
        <span className="section-subtitle">Clinical Services</span>
        <h2 className="section-title">Our Complete Menu</h2>
        <p className="section-desc">Search and filter our dermatologist-designed clinical procedures and cosmetic treatments tailored for your specific skin and hair goals.</p>
      </div>

      <div className="services-layout">
        {/* Sidebar Categories */}
        <aside className="sidebar-filters">
          <h3 className="filter-group-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={16} />
            <span>Categories</span>
          </h3>
          <ul className="filter-list">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                >
                  <span>{category}</span>
                  <span className="filter-count">{getCategoryCount(category)}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <div className="services-grid-wrapper">
          {/* Search Bar */}
          <div className="search-bar-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search treatments (e.g. acne, laser, PRP)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar-input"
              />
            </div>
          </div>

          {/* Results Summary */}
          <p style={{ fontSize: '0.9rem', color: 'var(--gray-text)', fontWeight: 550 }}>
            Showing {filteredServices.length} {filteredServices.length === 1 ? 'treatment' : 'treatments'} matching your filters
          </p>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="services-grid">
              {filteredServices.map((service) => (
                <div key={service.id} className="glass-card service-card animate-slide-up">
                  <div className="service-card-top">
                    <span className="badge badge-purple mb-sm">{service.category}</span>
                    <h3 className="service-title" style={{ marginTop: '4px' }}>{service.name}</h3>
                    <p className="service-desc">{service.desc}</p>
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--gray-text)', marginBottom: 'var(--spacing-md)' }}>
                      <Clock size={14} />
                      <span>Duration: {service.duration} mins</span>
                    </div>
                    
                    <div className="service-card-footer">
                      <span className="service-price">₹{service.price}/-</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleViewDetail(service.id)}
                          className="btn btn-sm btn-secondary"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleBookNow(service)}
                          className="btn btn-sm btn-primary"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel text-center" style={{ padding: 'var(--spacing-3xl)', borderRadius: 'var(--radius-lg)' }}>
              <Sparkles size={48} style={{ color: 'var(--border-color-dark)', margin: '0 auto var(--spacing-md) auto' }} />
              <h3 style={{ color: 'var(--primary-purple)', marginBottom: '8px' }}>No Treatments Found</h3>
              <p style={{ color: 'var(--gray-text)' }}>We couldn't find any treatments matching your search criteria. Try using different keywords or resetting filters.</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }} 
                className="btn btn-primary" 
                style={{ marginTop: 'var(--spacing-xl)' }}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
