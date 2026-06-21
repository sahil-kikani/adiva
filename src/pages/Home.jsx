import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Award, ShieldCheck, ThumbsUp, Calendar, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home({ setCurrentPage, onBookClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'ref-slide',
      isRef: true,
      titleThin: 'A complete',
      titleHugeNumber: '360°',
      titleHugeText: 'solution',
      titleHugeFor: 'for',
      titleMedium: 'all your skin and hair problems',
      subtitle: 'Skin | Hair | Laser | Aesthetic Treatments',
      image: '/skin_hair_model.png'
    },
    {
      id: 'clinic-slide',
      isRef: false,
      title: 'Reveal Your Natural, Healthy Skin',
      subtitle: 'Experience clinical precision blended with aesthetic warmth. ADIVA brings expert dermatological solutions to restore, protect, and enhance your skin.',
      image: '/clinic_hero.png',
      badge: "Ahmedabad's Premier Skincare Center"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const [activeTreatmentTab, setActiveTreatmentTab] = useState('Skin');

  const treatmentsByTab = {
    Skin: [
      { name: 'Laser Hair Removal', image: '/laser_hair_removal.png', slug: 'laser-hair' },
      { name: 'Acne Scar Treatment', image: '/acne_scar_treatment.png', slug: 'acne-scars' },
      { name: 'Pimples Treatment', image: '/pimples_treatment.png', slug: 'acne' },
      { name: 'Skin Lightening Treatment', image: '/skin_lightening.png', slug: 'medi-facials' },
      { name: 'Pigmentation Treatment', image: '/split_pigmentation.png', slug: 'pigmentation' }
    ],
    Hair: [
      { name: 'Hair Loss Treatment', image: '/skin_hair_model.png', slug: 'hair-loss' },
      { name: 'PRP Hair Therapy', image: '/skin_hair_model.png', slug: 'hair-prp' },
      { name: 'Scalp Rejuvenation', image: '/skin_hair_model.png', slug: 'hair-loss' },
      { name: 'Hair Density Care', image: '/skin_hair_model.png', slug: 'hair-loss' },
      { name: 'Follicle Stimulation', image: '/skin_hair_model.png', slug: 'hair-prp' }
    ],
    Body: [
      { name: 'Stretch Marks Therapy', image: '/skin_before.png', slug: 'stretch-marks' },
      { name: 'Body Contouring', image: '/clinic_hero.png', slug: 'body-contouring' },
      { name: 'Skin Tightening', image: '/skin_after.png', slug: 'body-contouring' },
      { name: 'Laser Fat Freezing', image: '/clinic_hero.png', slug: 'body-contouring' },
      { name: 'Body Resurfacing', image: '/skin_after.png', slug: 'body-contouring' }
    ]
  };

  const stats = [
    { number: '26+', label: 'Years of Excellence' },
    { number: '33,660+', label: 'Happy Patients' },
    { number: '51+', label: 'Advanced Treatments' }
  ];

  const previewServices = [
    { slug: 'acne', title: 'Acne Treatment', desc: 'Expert medical care for active acne, cystic lesions, and personalized maintenance plans to prevent future breakouts.' },
    { slug: 'acne-scars', title: 'Acne Scar Revision', desc: 'State-of-the-art fractional lasers, subcision, and microneedling to dramatically smooth out deep and superficial scarring.' },
    { slug: 'laser-treatments', title: 'Laser Skin Resurfacing', desc: 'Precision laser technologies to target pigmentation, fine lines, sun damage, and uneven skin texture safely.' },
    { slug: 'chemical-peels', title: 'Advanced Chemical Peels', desc: 'Customized acid blends to gently exfoliate, renew surface skin cells, and restore a youthful, glowing complexion.' }
  ];

  const highlights = [
    {
      icon: <Award size={28} />,
      title: 'Expert-led Care',
      desc: 'Led by senior dermatologists and certified technicians with decades of combined clinical and aesthetic experience.'
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Advanced Technology',
      desc: 'Equipped with US-FDA approved laser systems and modern diagnostic tools to ensure safe, predictable outcomes.'
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Personalized Journeys',
      desc: 'No generic formulas. We design customized treatment blueprints that align with your unique skin profile and long-term goals.'
    },
    {
      icon: <ThumbsUp size={28} />,
      title: '90%+ Satisfaction Rate',
      desc: 'A legacy built on trust, verified results, and patient-first care that speaks for itself in our client testimonials.'
    }
  ];

  const recentBlogs = [
    {
      title: 'The Truth About Acne Scars: What Really Works?',
      date: 'June 18, 2026',
      readTime: '5 min read',
      excerpt: 'From chemical peels to fractional laser therapies, discover which treatment paths offer the most effective results for your scar type.'
    },
    {
      title: 'Understanding Laser Hair Reduction for Sensitive Skin',
      date: 'June 12, 2026',
      readTime: '4 min read',
      excerpt: 'Struggling with shaving rash? Learn how modern cooling lasers make permanent hair reduction completely comfortable even for sensitive skin.'
    },
    {
      title: 'Dermatologist Guide: Building a Hydrating Summer Routine',
      date: 'June 05, 2026',
      readTime: '6 min read',
      excerpt: 'Hot weather requires lightweight protection. We break down the absolute essentials you need to keep your skin hydrated and protected.'
    }
  ];

  return (
    <div className="animate-fade-in">      {/* Hero Slider Carousel Section */}
      <section className="hero-carousel-container">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          className="carousel-arrow-btn left"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNextSlide}
          className="carousel-arrow-btn right"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Track */}
        <div
          className="hero-carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="hero-carousel-slide">
              <div className="container hero-carousel-content">

                {slide.isRef ? (
                  /* Slide 1: Reference Design (from user screenshot) */
                  <>
                    <div className="ref-slide-text-box">
                      <div className="ref-slide-thin">{slide.titleThin}</div>
                      <h1 className="ref-slide-huge">
                        <span className="number">{slide.titleHugeNumber}</span>
                        <span className="purple-text">{slide.titleHugeText}</span>
                        <span className="gray-text">{slide.titleHugeFor}</span>
                      </h1>
                      <div className="ref-slide-medium">{slide.titleMedium}</div>

                      {/* Three dots under title */}
                      <div className="ref-slide-dots">
                        <div className="ref-slide-dot-item"></div>
                        <div className="ref-slide-dot-item"></div>
                        <div className="ref-slide-dot-item"></div>
                      </div>

                      <div className="ref-slide-subtitle">{slide.subtitle}</div>

                      <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)' }}>
                        <button onClick={onBookClick} className="btn btn-primary">
                          <Calendar size={16} />
                          <span>Book Appointment</span>
                        </button>
                        <button onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-secondary">
                          <span>Treatments Menu</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="ref-slide-image-wrapper">
                      {/* Background graphics */}
                      <div className="ref-slide-decorations">
                        <div className="ref-slide-lines"></div>
                        <div className="ref-slide-poly-back"></div>
                      </div>
                      <img
                        src={slide.image}
                        alt="ADIVA Aesthetics Skin & Hair"
                        className="ref-slide-model-img"
                      />
                    </div>
                  </>
                ) : (
                  /* Slide 2: Standard Design (Clinic Lobby) */
                  <>
                    <div style={{ zIndex: 10, textAlign: 'left' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '100px', backgroundColor: 'var(--primary-purple-light)', color: 'var(--primary-purple)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 'var(--spacing-md)' }}>
                        <Sparkles size={14} />
                        <span>{slide.badge}</span>
                      </div>
                      <h1 className="hero-headline" style={{ margin: '8px 0 var(--spacing-md) 0' }}>
                        Reveal Your Natural, <span>Healthy Skin</span>
                      </h1>
                      <p className="hero-subheadline" style={{ marginBottom: 'var(--spacing-xl)' }}>
                        {slide.subtitle}
                      </p>
                      <div className="hero-ctas">
                        <button onClick={onBookClick} className="btn btn-lg btn-primary">
                          <Calendar size={18} />
                          <span>Book Appointment</span>
                        </button>
                        <button onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-lg btn-secondary">
                          <span>Explore Treatments</span>
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="hero-image-wrapper">
                      <img
                        src={slide.image}
                        alt="ADIVA Skincare Clinic"
                        className="hero-main-img animate-float"
                        style={{ maxHeight: '420px' }}
                      />
                      <div className="hero-badge-floating badge-1" style={{ top: '15%' }}>
                        <div style={{ backgroundColor: 'var(--secondary-teal)', width: '12px', height: '12px', borderRadius: '50%' }}></div>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--dark-text)' }}>US-FDA Approved</p>
                          <p style={{ fontSize: '0.7rem', color: 'var(--gray-text)' }}>Safe & Certified Tech</p>
                        </div>
                      </div>
                      <div className="hero-badge-floating badge-2" style={{ bottom: '15%' }}>
                        <div style={{ display: 'flex', color: '#FBBF24' }}>
                          <Star size={14} fill="#FBBF24" /><Star size={14} fill="#FBBF24" /><Star size={14} fill="#FBBF24" /><Star size={14} fill="#FBBF24" /><Star size={14} fill="#FBBF24" />
                        </div>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--dark-text)' }}>4.9/5 Rating</p>
                          <p style={{ fontSize: '0.7rem', color: 'var(--gray-text)' }}>Based on 2,500+ reviews</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>
          ))}
        </div>

        {/* Page Indicator Dots */}
        <div className="carousel-indicator-dots">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`carousel-indicator-dot ${currentSlide === index ? 'active' : ''}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--light-text)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Treatments Tab Section (from user screenshot request) */}
      <section className="treatment-section">
        <div className="container">
          <h2 style={{ fontSize: '2.25rem', color: 'var(--dark-text)', fontFamily: 'var(--font-headings)', fontWeight: 700, marginBottom: 'var(--spacing-lg)' }}>
            Our Treatments
          </h2>

          {/* Tab selectors */}
          <div className="treatment-tabs">
            {['Skin', 'Hair', 'Body'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTreatmentTab(tab)}
                className={`treatment-tab-btn ${activeTreatmentTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <p className="treatment-desc-para">
            We specialise in advanced dermatology & aesthetic treatments to help you achieve flawless, radiant skin. Discover the power of the Science of ADIVA, where expert care and FDA-approved technology deliver safe, lasting results for a range of skin concerns. We personalise treatments to give you healthy, glowing skin you can feel confident in.
          </p>

          {/* Oval cards row */}
          <div className="treatment-cards-row">
            {treatmentsByTab[activeTreatmentTab].map((item, index) => (
              <div key={index} className="treatment-oval-card-wrapper">
                <div
                  className="treatment-oval-card"
                  onClick={() => {
                    setCurrentPage(`service-${item.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="treatment-oval-img-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="treatment-oval-img"
                    />
                  </div>
                  <div className="treatment-oval-arrow-btn">
                    <ArrowRight size={16} />
                  </div>
                </div>
                <div className="treatment-oval-title">{item.name}</div>
              </div>
            ))}
          </div>

          {/* Bottom Chevron Nav Indicator */}
          <div className="treatment-bottom-nav">
            <button
              onClick={() => {
                // Navigate to services page
                setCurrentPage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="treatment-bottom-nav-btn"
              aria-label="View all treatments list"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Our Specialities</span>
            <h2 className="section-title">Popular Clinical Services</h2>
            <p className="section-desc">We offer targeted treatments designed to deliver visible, scientifically-proven improvements under dermatologist supervision.</p>
          </div>

          <div className="grid-2col mb-2xl">
            {previewServices.map((service) => (
              <div key={service.slug} className="glass-card service-card">
                <div className="service-card-top">
                  <div className="service-icon-box">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                </div>
                <div className="service-card-footer">
                  <span className="service-price">Consultation Fee: ₹500</span>
                  <button
                    onClick={() => { setCurrentPage(`service-${service.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="btn-text btn"
                  >
                    <span>View Treatment Detail</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn btn-secondary"
            >
              <span>Explore All 20+ Treatments</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--light-text)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Why ADIVA</span>
            <h2 className="section-title">A Higher Standard of Skincare</h2>
            <p className="section-desc">We combine clinical expertise with modern technology and absolute patient transparency to make dermatological care warm and effective.</p>
          </div>

          <div className="grid-2col">
            {highlights.map((item, idx) => (
              <div key={idx} className="why-card" style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                <div className="why-icon-circle" style={{ flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-purple)', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--gray-text)', fontSize: '0.95rem' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder/Team Highlight Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Clinical Leadership</span>
            <h2 className="section-title">Meet Our Medical Director</h2>
          </div>

          <div className="founder-card animate-slide-up">
            <div className="founder-img-box">
              <img src="/dr.png" alt="Dr. Harshit Rampara" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="founder-info">
              <span className="badge badge-purple mb-sm" style={{ width: 'fit-content' }}>Founder & Medical Director</span>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-purple)', marginBottom: '4px' }}>Dr. Harshit Rampara</h3>
              <p style={{ color: 'var(--secondary-teal)', fontWeight: 600, marginBottom: 'var(--spacing-md)', fontSize: '0.95rem' }}>M.D. in Dermatology & Venereology</p>
              <p style={{ color: 'var(--gray-text)', fontSize: '0.95rem', marginBottom: 'var(--spacing-xl)', lineHeight: 1.6 }}>
                "Skin health is not just skin deep. It dictates how we face the world and feel about ourselves. At ADIVA, we are passionate about combining gold-standard medical research with gentle, evidence-based treatments to help you achieve long-term skin healing and confidence."
              </p>
              <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <button onClick={onBookClick} className="btn btn-primary btn-sm">
                  <span>Schedule Consultation</span>
                </button>
                <button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-secondary btn-sm">
                  <span>Read Doctor Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--light-text)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Latest Insights</span>
            <h2 className="section-title">Educational Resources & Advice</h2>
            <p className="section-desc">Learn about skin care science, routines, and clinical procedures straight from our medical experts.</p>
          </div>

          <div className="grid-3col mb-2xl">
            {recentBlogs.map((blog, idx) => (
              <div key={idx} className="glass-card blog-card">
                <div className="blog-content">
                  <div className="blog-meta">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-desc">{blog.excerpt}</p>
                  <button
                    onClick={() => { setCurrentPage('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="btn-text btn"
                    style={{ alignSelf: 'flex-start', padding: 0 }}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding" style={{
        background: 'var(--gradient-primary)',
        color: 'var(--light-text)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="hero-shapes">
          <div className="hero-shape-1" style={{ background: 'rgba(6, 182, 212, 0.15)' }}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)', color: '#fff' }}>Ready to Transform Your Skin?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto var(--spacing-2xl) auto', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem' }}>
            Book a clinical evaluation with Dr. Harshit Rampara today and start your journey towards healthy, glowing skin.
          </p>
          <button onClick={onBookClick} className="btn btn-lg btn-teal">
            <Calendar size={18} />
            <span>Book Appointment Today</span>
          </button>
        </div>
      </section>
    </div>
  );
}
