import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Phone, Check, ArrowRight, HelpCircle, ChevronDown, Clock } from 'lucide-react';
import { servicesData } from './Services';

export default function ServiceDetail({ serviceId, setCurrentPage, setPreselectedService, onBookClick }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeFaq, setActiveFaq] = useState(null);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  // Retrieve current service data, default to acne if not found
  const service = servicesData.find(s => s.id === serviceId) || servicesData[0];

  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const handleBookNow = () => {
    setPreselectedService(service);
    onBookClick();
  };

  // Specific detail data map to provide rich text for each service
  const serviceDetails = {
    acne: {
      whatIsIt: 'Acne is a complex inflammatory disorder of the sebaceous glands that affects millions of individuals. Our clinical acne treatments go beyond standard cosmetics to regulate sebum synthesis, clear cellular blockages, and neutralize bacterial growth deep within the skin layers.',
      benefits: [
        'Visible reduction in inflammatory pustules and papules within 3-4 weeks',
        'Regulation of sebum (oil) synthesis to prevent future blockages',
        'Gentle cellular exfoliation to clear hyperkeratinized pore linings',
        'Evidence-based prescriptions that align with your lifestyle'
      ],
      approach: [
        { step: '01', title: 'Clinical Skin Analysis', desc: 'Dr. Harshit Rampara performs a detailed dermatoscope evaluation to determine your acne subtype (hormonal, comedonal, or cystic) and grade sebum levels.' },
        { step: '02', title: 'Deep Cleansing & Comedone Extraction', desc: 'Sterile extraction of clogged pores is performed under magnification to clear microcomedones and prevent deep inflammatory progression.' },
        { step: '03', title: 'Targeted Topical & Light Therapy', desc: 'Application of professional antimicrobial salves paired with low-level light therapy (LLLT) to kill Acne Vulgaris bacteria and reduce active redness.' },
        { step: '04', title: 'Maintenance Blueprint', desc: 'We design a personalized daily skincare routine (cleanser, actives, sunscreen) and list potential dietary triggers to sustain results.' }
      ],
      faqs: [
        { q: 'How many sessions will I need before seeing improvements?', a: 'Most patients observe a noticeable calming of red inflammation within 2-3 weeks. However, completing a full 3-month medical cycle is recommended for complete hormonal stabilization and structural clearance.' },
        { q: 'Will these treatments cause my skin to dry out?', a: 'Some prescription treatments like retinoids or benzoyl peroxide can cause mild flaking initially. We balance our active clinical protocols with customized physiological barrier creams to minimize dryness.' },
        { q: 'Are extractions painful?', a: 'Comedone extraction causes mild, momentary pressure, but our certified clinical therapists use specialized round-tipped extractors to ensure the procedure is safe, sanitary, and highly comfortable.' }
      ]
    },
    'acne-scars': {
      whatIsIt: 'Acne scars form when deep dermal tissues are damaged during inflammatory breakouts. Standard creams cannot repair these structural depressions. We use advanced microneedling, dermapen collagen induction, and surgical subcision to break down rigid fibrous bands and rebuild smooth, level skin.',
      benefits: [
        'Noticeable smoothing of deep boxcar, rolling, and icepick scars',
        'Stimulation of natural Type-I collagen synthesis within deep dermal layers',
        'Reduction in post-inflammatory erythema (redness) and dark scar shadows',
        'Safe, controlled micro-injuries that trigger rapid cellular healing'
      ],
      approach: [
        { step: '01', title: 'Scar Mapping & Subtype Diagnosis', desc: 'We analyze your scars under angled lighting to separate tethered rolling scars from deep icepick scars, planning a multi-modality approach.' },
        { step: '02', title: 'Local Anesthesia Application', desc: 'A premium, high-strength topical numbing cream is applied for 45 minutes to ensure your procedure is completely pain-free.' },
        { step: '03', title: 'Active Dermasurgery / Microneedling', desc: 'We execute subcision to release anchoring scar tissue beneath the skin, followed by automated microneedling to stimulate fibroblast collagen production.' },
        { step: '04', title: 'Post-Procedural Healing', desc: 'We apply sterile cooling peptide sheets and provide comprehensive occlusion guidelines to speed up recovery and protect new skin.' }
      ],
      faqs: [
        { q: 'What is the recovery time after a scar revision session?', a: 'You will experience mild redness and swelling resembling a sunburn for 48 to 72 hours. We provide a specialized healing cream, and you can comfortably return to office work by day 3.' },
        { q: 'How many sessions are typically required for deep boxcar scars?', a: 'Collagen modeling is a gradual process. While skin texture improves after a single session, a series of 4 to 6 sessions spaced 6 weeks apart delivers the most dramatic, permanent scar level smoothing.' },
        { q: 'Is subcision safe?', a: 'Yes. Subcision is a standard, highly effective minor surgical procedure. It is performed under sterile clinical guidelines by Dr. Harshit Rampara using specialized, ultra-fine Nokor needles to avoid superficial bruising.' }
      ]
    }
  };

  // Get current service details or fallback to acne
  const details = serviceDetails[service.id] || serviceDetails['acne'];

  // Select related services (excluding current one)
  const relatedServices = servicesData
    .filter(s => s.id !== service.id && s.category === service.category)
    .slice(0, 3);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="animate-fade-in">
      {/* Service Hero Banner */}
      <section style={{ backgroundColor: 'var(--primary-purple-light)', borderBottom: '1px solid var(--border-color)', padding: 'var(--spacing-4xl) 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-xl)' }}>
          <div>
            <span className="badge badge-purple mb-sm">{service.category}</span>
            <h1 style={{ color: 'var(--primary-purple)', fontSize: '2.5rem', marginTop: '4px', marginBottom: '12px' }}>{service.name}</h1>
            <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', color: 'var(--gray-text)' }}>
                <Clock size={16} />
                <span>Session Duration: {service.duration} Mins</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', color: 'var(--gray-text)' }}>
                <Calendar size={16} />
                <span>Dermatologist Supervised</span>
              </div>
            </div>
          </div>
          
          <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center', minWidth: '220px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--gray-text)', fontWeight: 600, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Consultation Fee</span>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-purple)', display: 'block', margin: '4px 0' }}>₹{service.price}/-</span>
            <button onClick={handleBookNow} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2col" style={{ alignItems: 'start' }}>
            {/* Left: What is it & benefits */}
            <div>
              <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-purple)', marginBottom: 'var(--spacing-md)' }}>Understanding the Treatment</h2>
              <p style={{ color: 'var(--gray-text)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 'var(--spacing-xl)' }}>
                {details.whatIsIt}
              </p>
              
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-purple)', marginBottom: 'var(--spacing-md)' }}>Key Clinical Benefits</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                {details.benefits.map((benefit, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'start', gap: 'var(--spacing-sm)', fontSize: '0.95rem', color: 'var(--gray-text)' }}>
                    <div style={{ backgroundColor: 'var(--secondary-teal-light)', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--secondary-teal)', flexShrink: 0, marginTop: '2px' }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Before & After comparison slider */}
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-purple)', marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>Clinical Before & After Comparison</h3>
              <div 
                ref={sliderRef}
                className="comparison-slider-container"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={() => { isDragging.current = true; }}
                onTouchStart={() => { isDragging.current = true; }}
              >
                {/* Before Image */}
                <img 
                  src="/skin_before.png" 
                  alt="Acne skin condition before treatment" 
                  className="slider-img slider-img-before" 
                />
                
                {/* After Image */}
                <img 
                  src="/skin_after.png" 
                  alt="Clear skin condition after treatment" 
                  className="slider-img slider-img-after" 
                  style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                />
                
                {/* Slider bar line */}
                <div className="slider-bar-handle" style={{ left: `${sliderPosition}%` }}>
                  <div className="slider-button">
                    <ArrowRight size={14} style={{ transform: 'rotate(180deg)', position: 'absolute', left: '4px' }} />
                    <ArrowRight size={14} style={{ position: 'absolute', right: '4px' }} />
                  </div>
                </div>
                
                <span className="slider-label slider-label-before">Before Treatment</span>
                <span className="slider-label slider-label-after">After Treatment</span>
              </div>
              <p style={{ textAlign: 'center', color: 'var(--gray-text)', fontSize: '0.8rem', marginTop: 'var(--spacing-sm)', fontStyle: 'italic' }}>
                *Drag the slider handle to view the skin texture transition. (Illustrative case study)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--light-text)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Our Methodology</span>
            <h2 className="section-title">The Treatment Journey</h2>
            <p className="section-desc">We follow a strict, multi-step clinical timeline to ensure every diagnosis is backed by dermatological logic and completed safely.</p>
          </div>
          
          <div className="approach-timeline">
            {details.approach.map((step, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-step">Step {step.step}</span>
                  <h3 className="timeline-title">{step.title}</h3>
                  <p className="timeline-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">FAQ</span>
            <h2 className="section-title">Common Patient Inquiries</h2>
            <p className="section-desc">Have questions about safety, pain levels, or cost? We believe in absolute transparency. Here are our quick answers.</p>
          </div>
          
          <div className="faq-list">
            {details.faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                <button onClick={() => toggleFaq(idx)} className="faq-question-btn">
                  <span>{faq.q}</span>
                  <ChevronDown size={18} style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
                </button>
                <div className="faq-answer-pane" style={{ maxHeight: activeFaq === idx ? '200px' : '0' }}>
                  <div className="faq-answer-content">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--light-text)', borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-purple)', textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>Related Treatments</h2>
            
            <div className="grid-3col">
              {relatedServices.map((relService) => (
                <div key={relService.id} className="glass-card" style={{ padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <span className="badge badge-teal mb-sm">{relService.category}</span>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-purple)', margin: '4px 0 10px 0' }}>{relService.name}</h3>
                    <p style={{ color: 'var(--gray-text)', fontSize: '0.85rem', marginBottom: 'var(--spacing-xl)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {relService.desc}
                    </p>
                  </div>
                  <button 
                    onClick={() => { setCurrentPage(`service-${relService.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="btn-text btn"
                    style={{ alignSelf: 'flex-start', padding: 0 }}
                  >
                    <span>View Treatment</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Block */}
      <section className="section-padding" style={{ background: 'var(--gradient-primary)', color: 'var(--light-text)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.25rem', marginBottom: 'var(--spacing-md)', color: '#fff' }}>Ready to Start Your Acne Healing journey?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto var(--spacing-xl) auto', color: 'rgba(255, 255, 255, 0.85)' }}>
            Schedule your professional clinic evaluation with Dr. Harshit Rampara. Experience transparent medical skincare.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
            <button onClick={handleBookNow} className="btn btn-lg btn-teal">
              <Calendar size={18} />
              <span>Book Appointment Today</span>
            </button>
            <a href="tel:+919876543210" className="btn btn-lg btn-secondary" style={{ borderColor: 'rgba(255, 255, 255, 0.5)', color: '#fff' }}>
              <Phone size={18} />
              <span>Call +91 98765 43210</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
