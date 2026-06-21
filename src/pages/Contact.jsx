import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Check, X, Send, Map } from 'lucide-react';

export default function Contact() {
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name, value) => {
    let errorMsg = '';
    
    if (name === 'name') {
      if (!value.trim()) {
        errorMsg = 'Name is required';
      } else if (value.trim().length < 3) {
        errorMsg = 'Name must be at least 3 characters';
      }
    }
    
    if (name === 'email') {
      if (!value.trim()) {
        errorMsg = 'Email is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMsg = 'Please enter a valid email address';
        }
      }
    }
    
    if (name === 'phone') {
      if (!value.trim()) {
        errorMsg = 'Phone number is required';
      } else {
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
          errorMsg = 'Phone number must be exactly 10 digits';
        }
      }
    }

    if (name === 'message') {
      if (!value.trim()) {
        errorMsg = 'Message cannot be empty';
      } else if (value.trim().length < 10) {
        errorMsg = 'Message must be at least 10 characters';
      }
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
    return errorMsg === '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isNameValid = validateField('name', formFields.name);
    const isEmailValid = validateField('email', formFields.email);
    const isPhoneValid = validateField('phone', formFields.phone);
    const isMessageValid = validateField('message', formFields.message);

    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate inquiry submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormFields({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTouched({});
      
      // Clear success banner after 5s
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="container section-padding animate-fade-in">
      <div className="section-header text-center">
        <span className="section-subtitle">Reach Out</span>
        <h2 className="section-title">Contact Our Clinic</h2>
        <p className="section-desc">Have a general question, need directions, or want to reschedule? Get in touch with our front desk staff.</p>
      </div>

      <div className="grid-2col" style={{ alignItems: 'start' }}>
        
        {/* Left: Contact Info cards & Map */}
        <div>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-purple)', marginBottom: 'var(--spacing-lg)' }}>Clinic Details</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-2xl)' }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', padding: 'var(--spacing-lg)', backgroundColor: 'var(--light-text)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', alignItems: 'center' }}>
              <div style={{ backgroundColor: 'var(--primary-purple-light)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--primary-purple)', flexShrink: 0 }}>
                <Phone size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: 'var(--dark-text)' }}>Call Reception Desk</p>
                <a href="tel:+919876543210" style={{ color: 'var(--secondary-teal)', fontWeight: 600 }}>+91 98765 43210</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-md)', padding: 'var(--spacing-lg)', backgroundColor: 'var(--light-text)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', alignItems: 'center' }}>
              <div style={{ backgroundColor: 'var(--primary-purple-light)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--primary-purple)', flexShrink: 0 }}>
                <Mail size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: 'var(--dark-text)' }}>Email Inquiries</p>
                <a href="mailto:info@adivaclinic.com" style={{ color: 'var(--secondary-teal)', fontWeight: 600 }}>info@adivaclinic.com</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-md)', padding: 'var(--spacing-lg)', backgroundColor: 'var(--light-text)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', alignItems: 'center' }}>
              <div style={{ backgroundColor: 'var(--primary-purple-light)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--primary-purple)', flexShrink: 0 }}>
                <MapPin size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: 'var(--dark-text)' }}>Clinic Location</p>
                <p style={{ color: 'var(--gray-text)', fontSize: '0.9rem' }}>Adiva Centre, Building X, Ahmedabad, Gujarat</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-md)', padding: 'var(--spacing-lg)', backgroundColor: 'var(--light-text)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', alignItems: 'center' }}>
              <div style={{ backgroundColor: 'var(--primary-purple-light)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--primary-purple)', flexShrink: 0 }}>
                <Clock size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: 'var(--dark-text)' }}>Operational Hours</p>
                <p style={{ color: 'var(--gray-text)', fontSize: '0.9rem' }}>Monday - Saturday: 9:00 AM - 8:00 PM (Closed Sundays)</p>
              </div>
            </div>
          </div>

          {/* Stylized Clinic Map Graphic */}
          <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-text)', textAlign: 'center' }}>
            <h4 style={{ color: 'var(--primary-purple)', marginBottom: 'var(--spacing-sm)', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
              <Map size={18} style={{ color: 'var(--secondary-teal)' }} />
              <span>Map Guide</span>
            </h4>
            <div style={{
              width: '100%',
              height: '180px',
              backgroundColor: 'var(--light-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Abstract Map Grid */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(var(--primary-purple) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
              <div style={{ width: '80%', height: '8px', backgroundColor: 'var(--border-color-dark)', transform: 'rotate(-10deg)', position: 'absolute', top: '40%' }}></div>
              <div style={{ width: '80%', height: '8px', backgroundColor: 'var(--border-color-dark)', transform: 'rotate(70deg)', position: 'absolute', left: '30%' }}></div>
              
              {/* Location Pin */}
              <div className="animate-float" style={{
                position: 'absolute',
                top: '30%',
                left: '42%',
                backgroundColor: 'var(--primary-purple)',
                color: 'var(--light-text)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-medium)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                zIndex: 10
              }}>
                <MapPin size={12} style={{ color: 'var(--secondary-teal)' }} />
                <span>ADIVA CENTRE</span>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-text)', marginTop: '8px' }}>
              We are located on the main road opposite Building X, easily accessible via public transport. Free parking is available.
            </p>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="glass-panel" style={{ padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-text)' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-purple)', marginBottom: 'var(--spacing-lg)', textAlign: 'left' }}>Send An Inquiry</h3>
          
          {isSuccess && (
            <div style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: 'var(--spacing-lg)', fontSize: '0.9rem', textAlign: 'left' }}>
              <Check size={18} strokeWidth={3} />
              <span>Inquiry sent successfully! Our reception team will reach out shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  value={formFields.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`form-input ${touched.name ? (errors.name ? 'is-invalid' : 'is-valid') : ''}`}
                  required
                />
                {touched.name && (
                  <span className={`input-feedback-icon ${errors.name ? 'invalid' : 'valid'}`}>
                    {errors.name ? <X size={18} /> : <Check size={18} />}
                  </span>
                )}
              </div>
              {touched.name && errors.name && <p className="form-error-msg">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  value={formFields.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="E.g., name@domain.com"
                  className={`form-input ${touched.email ? (errors.email ? 'is-invalid' : 'is-valid') : ''}`}
                  required
                />
                {touched.email && (
                  <span className={`input-feedback-icon ${errors.email ? 'invalid' : 'valid'}`}>
                    {errors.email ? <X size={18} /> : <Check size={18} />}
                  </span>
                )}
              </div>
              {touched.email && errors.email && <p className="form-error-msg">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <div className="input-container">
                <input
                  type="tel"
                  name="phone"
                  value={formFields.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  className={`form-input ${touched.phone ? (errors.phone ? 'is-invalid' : 'is-valid') : ''}`}
                  required
                />
                {touched.phone && (
                  <span className={`input-feedback-icon ${errors.phone ? 'invalid' : 'valid'}`}>
                    {errors.phone ? <X size={18} /> : <Check size={18} />}
                  </span>
                )}
              </div>
              {touched.phone && errors.phone && <p className="form-error-msg">{errors.phone}</p>}
            </div>

            {/* Subject */}
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                value={formFields.subject}
                onChange={handleChange}
                placeholder="E.g., Rescheduling request, feedback..."
                className="form-input"
              />
            </div>

            {/* Message Body */}
            <div className="form-group">
              <label className="form-label">Message *</label>
              <div className="input-container">
                <textarea
                  name="message"
                  value={formFields.message}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Write your query here..."
                  className={`form-input ${touched.message ? (errors.message ? 'is-invalid' : 'is-valid') : ''}`}
                  rows="4"
                  style={{ resize: 'none' }}
                  required
                />
                {touched.message && (
                  <span className={`input-feedback-icon ${errors.message ? 'invalid' : 'valid'}`} style={{ top: '24px' }}>
                    {errors.message ? <X size={18} /> : <Check size={18} />}
                  </span>
                )}
              </div>
              {touched.message && errors.message && <p className="form-error-msg">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <Send size={16} />
                  <span>Send Message Inquiry</span>
                </span>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
