import React, { useState } from 'react';
import { Award, Target, Eye, Compass, Calendar, ShieldAlert } from 'lucide-react';

export default function About({ onBookClick }) {
  const [activeTab, setActiveTab] = useState('founder');

  const tabs = [
    { id: 'founder', label: 'Our Founder' },
    { id: 'history', label: 'History & Mission' },
    { id: 'values', label: 'Core Values' },
    { id: 'facilities', label: 'Our Facilities' }
  ];

  const coreValues = [
    { icon: <Target size={24} style={{ color: 'var(--secondary-teal)' }} />, title: 'Evidence-Based Treatments', desc: 'Every treatment protocol we recommend is backed by peer-reviewed clinical studies and proven dermatological research.' },
    { icon: <Compass size={24} style={{ color: 'var(--secondary-teal)' }} />, title: 'Absolute Transparency', desc: 'No hidden costs, no exaggerated expectations. We outline treatment durations, potential side effects, and pricing upfront.' },
    { icon: <Eye size={24} style={{ color: 'var(--secondary-teal)' }} />, title: 'Patient Safety First', desc: 'All laser therapies, chemical peels, and advanced procedures are performed under expert physician supervision with US-FDA approved tech.' },
    { icon: <Award size={24} style={{ color: 'var(--secondary-teal)' }} />, title: 'Excellence in Care', desc: 'We continuously train our certified staff on the latest global standards to provide a comforting and healing experience.' }
  ];

  return (
    <div className="container section-padding animate-fade-in">
      <div className="section-header text-center">
        <span className="section-subtitle">Meet ADIVA</span>
        <h2 className="section-title">A Legacy of Skin Excellence</h2>
        <p className="section-desc">We blend modern medical dermatology with aesthetic artistry to deliver personalized, long-term healing for our patients.</p>
      </div>

      {/* Tabs Switcher */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-3xl)',
        flexWrap: 'wrap'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-3xl)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-medium)', backgroundColor: 'var(--light-text)' }}>

        {/* TAB 1: FOUNDER */}
        {activeTab === 'founder' && (
          <div className="grid-2col step-content-section" style={{ alignItems: 'start' }}>
            <div>
              <img
                src="/dr.png"
                alt="Dr. Harshit Rampara"
                style={{ borderRadius: 'var(--radius-lg)', width: '100%', maxHeight: '420px', objectFit: 'cover', boxShadow: 'var(--shadow-medium)' }}
              />
            </div>
            <div>
              <span className="badge badge-teal mb-sm">Founder & Chief Dermatologist</span>
              <h3 style={{ fontSize: '2rem', color: 'var(--primary-purple)', marginBottom: '8px' }}>Dr. Harshit Rampara</h3>
              <p style={{ color: 'var(--gray-text)', fontWeight: 600, marginBottom: 'var(--spacing-lg)' }}>M.D. Dermatology, Venereology & Leprosy | 15+ Years Clinical Experience</p>

              <p style={{ color: 'var(--gray-text)', fontSize: '0.95rem', marginBottom: 'var(--spacing-md)', lineHeight: 1.7 }}>
                Dr. Harshit Rampara completed his medical specialization in Dermatology from a premier national research institute, focusing on clinical dermatology, dermatosurgery, and advanced laser systems.
              </p>
              <p style={{ color: 'var(--gray-text)', fontSize: '0.95rem', marginBottom: 'var(--spacing-lg)', lineHeight: 1.7 }}>
                Over the last 15 years, he has successfully treated thousands of patients suffering from complex acne scars, chronic eczema, hair loss, and pigmentation disorders. He is a member of the International Academy of Cosmetic Dermatology and is committed to clinical excellence.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderLeft: '3px solid var(--secondary-teal)', paddingLeft: '16px', marginBottom: 'var(--spacing-xl)' }}>
                <p style={{ fontStyle: 'italic', color: 'var(--dark-text)', fontWeight: 500 }}>
                  "My goal is simple: to make evidence-based skincare accessible, empathetic, and transparent for every individual who walks through our doors."
                </p>
              </div>

              <button onClick={onBookClick} className="btn btn-primary">
                <Calendar size={18} />
                <span>Schedule a Consultation with Him</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: HISTORY */}
        {activeTab === 'history' && (
          <div className="step-content-section" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-purple)', marginBottom: 'var(--spacing-lg)' }}>Our Mission & Journey</h3>
            <p style={{ color: 'var(--gray-text)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 'var(--spacing-lg)' }}>
              Founded in 2011, ADIVA began as a specialized dermatological clinic in Ahmedabad with a core mission: to bridge the gap between commercial aesthetics and scientific dermatology. We noticed that many patients were subjected to generic aesthetic routines that ignored medical realities.
            </p>
            <p style={{ color: 'var(--gray-text)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 'var(--spacing-lg)' }}>
              Our clinical team decided to build a state-of-the-art center where every treatment is prescribed on medical merit. Over the last decade, we have expanded our capacity, bringing in world-class lasers, professional phototherapy, and establishing a specialized acne scar revision department.
            </p>

            <div style={{ backgroundColor: 'var(--light-bg)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginTop: 'var(--spacing-2xl)' }}>
              <h4 style={{ color: 'var(--primary-purple)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={18} style={{ color: 'var(--secondary-teal)' }} />
                <span>Our Clear Mission</span>
              </h4>
              <p style={{ color: 'var(--gray-text)', fontSize: '0.95rem' }}>
                To deliver scientifically validated, safe, and highly personalized dermatological solutions that prioritize skin health, restore patient confidence, and eliminate the confusion surrounding aesthetic skincare.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: VALUES */}
        {activeTab === 'values' && (
          <div className="step-content-section">
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-purple)', marginBottom: 'var(--spacing-2xl)' }}>Our Ethical Pillars</h3>
            <div className="grid-2col">
              {coreValues.map((value, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 'var(--spacing-md)', padding: 'var(--spacing-lg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--light-bg)' }}>
                  <div style={{ backgroundColor: 'var(--light-text)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center', boxShadow: 'var(--shadow-subtle)', flexShrink: 0 }}>
                    {value.icon}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ color: 'var(--primary-purple)', marginBottom: '6px' }}>{value.title}</h4>
                    <p style={{ color: 'var(--gray-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FACILITIES */}
        {activeTab === 'facilities' && (
          <div className="step-content-section" style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-purple)', marginBottom: 'var(--spacing-lg)' }}>High-Standard Clinic Facilities</h3>
            <p style={{ color: 'var(--gray-text)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 'var(--spacing-2xl)' }}>
              ADIVA operates out of a sterile, modern healthcare space optimized for safety, privacy, and clinical comfort. Our clinic utilizes advanced airflow controls, sanitized procedure units, and ergonomic treatment seats.
            </p>

            <div className="grid-3col">
              <div className="glass-card" style={{ padding: 'var(--spacing-xl)', backgroundColor: 'var(--light-bg)', border: 'none' }}>
                <h4 style={{ color: 'var(--primary-purple)', marginBottom: '10px' }}>Diagnostic Consultation Room</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-text)' }}>
                  Equipped with high-magnification dermatoscopes and digital skin analyzers to chart blemish depth and map scalp health accurately.
                </p>
              </div>
              <div className="glass-card" style={{ padding: 'var(--spacing-xl)', backgroundColor: 'var(--light-bg)', border: 'none' }}>
                <h4 style={{ color: 'var(--primary-purple)', marginBottom: '10px' }}>FDA-Laser Suite</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-text)' }}>
                  A dedicated climate-controlled suite housing our carbon dioxide fractional lasers, Q-switched Nd:YAG lasers, and laser hair reduction systems.
                </p>
              </div>
              <div className="glass-card" style={{ padding: 'var(--spacing-xl)', backgroundColor: 'var(--light-bg)', border: 'none' }}>
                <h4 style={{ color: 'var(--primary-purple)', marginBottom: '10px' }}>Aesthetic Procedure Suite</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-text)' }}>
                  An ultra-hygienic setting dedicated to chemical peels, medi-facials, plate-rich-plasma therapy, and minor dermatosurgical removals.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
