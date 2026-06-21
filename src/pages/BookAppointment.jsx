import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, ArrowLeft, ArrowRight, Check, X, AlertTriangle } from 'lucide-react';
import { servicesData } from './Services';

export default function BookAppointment({ preselectedService, onClose, setCurrentPage }) {
  // Wizard state
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(preselectedService || null);
  
  // Date and time state
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // 5 is June (0-indexed)
  const [selectedDate, setSelectedDate] = useState(null); // String YYYY-MM-DD
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Object
  
  // Form fields
  const [formFields, setFormFields] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    medicalHistory: '',
    referral: '',
    contactPreference: 'email',
    agreePrivacy: false,
    agreeReminders: false
  });
  
  // Form errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // Submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');

  // Dropdown search state
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
      setSearchTerm(preselectedService.name);
    }
  }, [preselectedService]);

  // Dropdown filtering
  const filteredServices = servicesData.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate calendar dates for MON-SUN layout
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // 1st of month weekday index (0=Mon, 6=Sun)
  let firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper: check if a date is in the past (before June 21, 2026)
  const isDateInPast = (dayNum) => {
    const compareDate = new Date(currentYear, currentMonth, dayNum);
    const today = new Date(2026, 5, 21); // Set current local date June 21, 2026
    compareDate.setHours(23, 59, 59, 999);
    today.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  // Helper: check if date is Sunday
  const isSunday = (dayNum) => {
    const checkDate = new Date(currentYear, currentMonth, dayNum);
    return checkDate.getDay() === 0;
  };

  // Generate random but deterministic slot count for a day
  const getSlotsCount = (dayNum) => {
    if (isDateInPast(dayNum) || isSunday(dayNum)) return 0;
    // Semi-random deterministic based on day number
    const base = (dayNum * 7) % 11;
    return base; // 0 to 10 slots
  };

  // Availability color mapping
  const getSlotAvailabilityColor = (slots) => {
    if (slots >= 4) return 'green';
    if (slots >= 2) return 'yellow';
    if (slots === 1) return 'red';
    return 'gray';
  };

  // Handle month shifts (limit between June 2026 and August 2026)
  const handlePrevMonth = () => {
    if (currentMonth === 5 && currentYear === 2026) return; // Prevent going before June 2026
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 7 && currentYear === 2026) return; // Limit to August 2026 (+2 months)
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Mock time slots for Step 3
  const timeSlots = {
    morning: [
      { time: '09:00 AM', status: 'available' },
      { time: '09:30 AM', status: 'available' },
      { time: '10:00 AM', status: 'booked' },
      { time: '10:30 AM', status: 'available' },
      { time: '11:00 AM', status: 'limited', remaining: 1 },
      { time: '11:30 AM', status: 'booked' }
    ],
    afternoon: [
      { time: '01:00 PM', status: 'available' },
      { time: '01:30 PM', status: 'booked' },
      { time: '02:00 PM', status: 'booked' },
      { time: '02:30 PM', status: 'available' },
      { time: '03:00 PM', status: 'available' },
      { time: '03:30 PM', status: 'limited', remaining: 1 },
      { time: '04:00 PM', status: 'available' },
      { time: '04:30 PM', status: 'booked' }
    ],
    evening: [
      { time: '05:00 PM', status: 'available' },
      { time: '05:30 PM', status: 'available' },
      { time: '06:00 PM', status: 'booked' },
      { time: '06:30 PM', status: 'available' },
      { time: '07:00 PM', status: 'available' },
      { time: '07:30 PM', status: 'booked' }
    ]
  };

  // Real-time Form Validation
  const validateField = (name, value) => {
    let errorMsg = '';
    
    if (name === 'fullName') {
      if (!value.trim()) {
        errorMsg = 'Full name is required';
      } else if (value.trim().length < 3) {
        errorMsg = 'Full name must be at least 3 characters';
      } else if (/[0-9]/.test(value)) {
        errorMsg = 'Full name cannot contain numbers';
      }
    }
    
    if (name === 'email') {
      if (!value.trim()) {
        errorMsg = 'Email address is required';
      } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          errorMsg = 'Please enter a valid email address';
        }
      }
    }
    
    if (name === 'phone') {
      if (!value.trim()) {
        errorMsg = 'Phone number is required';
      } else {
        // Strip out country code if typed, validate 10 digits
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
          errorMsg = 'Phone number must be exactly 10 digits';
        }
      }
    }

    if (name === 'agreePrivacy') {
      if (!value) {
        errorMsg = 'You must agree to the Privacy Policy to proceed';
      }
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
    return errorMsg === '';
  };

  const handleBlur = (e) => {
    const { name, value, checked, type } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, type === 'checkbox' ? checked : value);
  };

  const handleFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    const finalVal = type === 'checkbox' ? checked : value;
    
    setFormFields(prev => ({ ...prev, [name]: finalVal }));
    
    if (touched[name]) {
      validateField(name, finalVal);
    }
  };

  // Submit appointment booking details
  const handleSubmitBooking = () => {
    // Validate final fields
    const isNameValid = validateField('fullName', formFields.fullName);
    const isEmailValid = validateField('email', formFields.email);
    const isPhoneValid = validateField('phone', formFields.phone);
    const isPrivacyValid = validateField('agreePrivacy', formFields.agreePrivacy);

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      agreePrivacy: true
    });

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isPrivacyValid) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API reservation request delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Format: ADV-YYYYMMDD[Random]
      const formattedDateStr = selectedDate.replace(/-/g, '');
      const randNum = Math.floor(100 + Math.random() * 900);
      setConfirmationId(`ADV-${formattedDateStr}${randNum}`);
      setStep(7);
    }, 2000);
  };

  // Check if calendar cell is selected
  const isCellSelected = (dayNum) => {
    if (!selectedDate) return false;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    return selectedDate === dateStr;
  };

  const handleDateSelect = (dayNum) => {
    if (isDateInPast(dayNum) || isSunday(dayNum) || getSlotsCount(dayNum) === 0) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setSelectedTimeSlot(null); // Reset time when date changes
  };

  // Format date display
  const getFormattedDateDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Wizard nav controllers
  const handleNextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedDate) return;
    if (step === 3 && !selectedTimeSlot) return;
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  // Render Wizard Progress Bar
  const renderProgressBar = () => {
    const totalSteps = 6;
    const progressWidth = ((step - 1) / (totalSteps - 1)) * 100;
    
    return (
      <div className="wizard-progress">
        <div className="wizard-progress-bar" style={{ width: `${progressWidth}%` }}></div>
        {[1, 2, 3, 4, 5, 6].map((stepNum) => (
          <div 
            key={stepNum} 
            className={`wizard-step-node ${stepNum === step ? 'active' : ''} ${stepNum < step ? 'completed' : ''}`}
          >
            <div className="wizard-step-circle">
              {stepNum < step ? <Check size={16} /> : stepNum}
            </div>
            <span className="wizard-step-label">
              {stepNum === 1 && 'Service'}
              {stepNum === 2 && 'Date'}
              {stepNum === 3 && 'Time'}
              {stepNum === 4 && 'Verify'}
              {stepNum === 5 && 'Info'}
              {stepNum === 6 && 'Confirm'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Calendar cells render helper
  const renderCalendarCells = () => {
    const cells = [];
    
    // Empty cells for first day offset
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-day-cell other-month"></div>);
    }
    
    // Real day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const isPast = isDateInPast(d);
      const isSun = isSunday(d);
      const slots = getSlotsCount(d);
      const isSelected = isCellSelected(d);
      const isToday = currentYear === 2026 && currentMonth === 5 && d === 21; // June 21, 2026 is today
      
      let isDisabled = isPast || isSun || slots === 0;
      let cellClass = 'calendar-day-cell';
      
      if (isDisabled) {
        cellClass += ' disabled';
      } else {
        cellClass += ' available';
      }
      
      if (isToday) cellClass += ' today';
      if (isSelected) cellClass += ' selected';
      
      cells.push(
        <div 
          key={`day-${d}`} 
          className={cellClass}
          onClick={() => !isDisabled && handleDateSelect(d)}
        >
          <span>{d}</span>
          {!isDisabled && (
            <span className="calendar-day-slots-badge" style={{
              color: isSelected ? '#fff' : (slots >= 4 ? '#10B981' : (slots >= 2 ? '#F59E0B' : '#EF4444'))
            }}>
              ({slots})
            </span>
          )}
        </div>
      );
    }
    
    return cells;
  };

  return (
    <div className="container section-padding animate-fade-in" style={{ maxWidth: '1000px' }}>
      
      {/* ProgressBar (not shown on success step 7) */}
      {step < 7 && renderProgressBar()}

      <div className="wizard-box">
        
        {/* STEP 1: SERVICE SELECTION */}
        {step === 1 && (
          <div className="step-content-section">
            <h2 className="section-title text-center mb-xl" style={{ fontSize: '1.5rem' }}>Step 1: Select Treatment / Service</h2>
            
            <div className="form-group" style={{ maxWidth: '500px', margin: '0 auto var(--spacing-xl) auto' }}>
              <label className="form-label">Which treatment are you interested in?</label>
              
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Type to filter treatments..."
                  value={searchTerm}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  className="form-input"
                />
                
                {showDropdown && (
                  <ul className="glass-panel" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    maxHeight: '220px',
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-medium)',
                    listStyle: 'none',
                    marginTop: '4px'
                  }}>
                    {filteredServices.length > 0 ? (
                      filteredServices.map(s => (
                        <li key={s.id}>
                          <button
                            onClick={() => {
                              setSelectedService(s);
                              setSearchTerm(s.name);
                              setShowDropdown(false);
                            }}
                            type="button"
                            style={{
                              width: '100%',
                              padding: '10px 14px',
                              textAlign: 'left',
                              borderBottom: '1px solid rgba(0,0,0,0.05)',
                              backgroundColor: selectedService?.id === s.id ? 'var(--primary-purple-light)' : 'transparent',
                              color: 'var(--dark-text)',
                              fontSize: '0.9rem'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = 'var(--light-bg)'}
                            onMouseOut={(e) => e.target.style.backgroundColor = selectedService?.id === s.id ? 'var(--primary-purple-light)' : 'transparent'}
                          >
                            <span style={{ fontWeight: 600, display: 'block' }}>{s.name}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-text)' }}>{s.category} • {s.duration} mins</span>
                          </button>
                        </li>
                      ))
                    ) : (
                      <li style={{ padding: '10px 14px', color: 'var(--gray-text)', fontSize: '0.9rem' }}>No treatments found.</li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {selectedService && (
              <div className="glass-card animate-slide-up" style={{ maxWidth: '500px', margin: '0 auto var(--spacing-xl) auto', padding: 'var(--spacing-xl)', border: '1px solid rgba(94, 59, 140, 0.2)' }}>
                <span className="badge badge-purple mb-sm">{selectedService.category}</span>
                <h3 style={{ color: 'var(--primary-purple)', fontSize: '1.25rem' }}>{selectedService.name}</h3>
                <p style={{ color: 'var(--gray-text)', fontSize: '0.85rem', margin: '8px 0 var(--spacing-md) 0' }}>{selectedService.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '0.9rem' }}>
                  <span>Duration: <strong>{selectedService.duration} mins</strong></span>
                  <span style={{ color: 'var(--secondary-teal)', fontWeight: 700 }}>Est. Cost: ₹{selectedService.price}/-</span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: 'var(--spacing-2xl)' }}>
              <button 
                onClick={onClose} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleNextStep}
                disabled={!selectedService}
                className="btn btn-primary"
                style={{ opacity: selectedService ? 1 : 0.5, cursor: selectedService ? 'pointer' : 'not-allowed' }}
              >
                <span>Continue to Date</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE */}
        {step === 2 && (
          <div className="step-content-section">
            <h2 className="section-title text-center mb-xl" style={{ fontSize: '1.5rem' }}>Step 2: Select Appointment Date</h2>
            
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div className="calendar-widget">
                <div className="calendar-header">
                  <button onClick={handlePrevMonth} className="calendar-nav-btn" disabled={currentMonth === 5 && currentYear === 2026}>
                    <ArrowLeft size={16} />
                  </button>
                  <span className="calendar-month-title">{monthNames[currentMonth]} {currentYear}</span>
                  <button onClick={handleNextMonth} className="calendar-nav-btn" disabled={currentMonth === 7 && currentYear === 2026}>
                    <ArrowRight size={16} />
                  </button>
                </div>
                
                <div className="calendar-grid-weekdays">
                  <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
                </div>
                
                <div className="calendar-grid-days">
                  {renderCalendarCells()}
                </div>
              </div>
              
              {selectedDate && (
                <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center', fontWeight: 650, color: 'var(--primary-purple)', fontSize: '0.95rem' }}>
                  Selected Date: {getFormattedDateDisplay(selectedDate)}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-2xl)' }}>
              <button onClick={handleBackStep} className="btn btn-secondary">
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button
                onClick={handleNextStep}
                disabled={!selectedDate}
                className="btn btn-primary"
                style={{ opacity: selectedDate ? 1 : 0.5, cursor: selectedDate ? 'pointer' : 'not-allowed' }}
              >
                <span>Select Time Slot</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SELECT TIME SLOT */}
        {step === 3 && (
          <div className="step-content-section">
            <h2 className="section-title text-center" style={{ fontSize: '1.5rem' }}>Step 3: Select Time Slot</h2>
            <p className="text-center mb-xl" style={{ color: 'var(--gray-text)' }}>
              Available slots for <strong>{getFormattedDateDisplay(selectedDate)}</strong>
            </p>

            <div className="slots-container" style={{ maxWidth: '650px', margin: '0 auto' }}>
              {/* Morning Session */}
              <div className="slots-section">
                <h4 className="slots-section-title">Morning (9:00 AM - 12:00 PM)</h4>
                <div className="slots-grid">
                  {timeSlots.morning.map((slot, idx) => (
                    <button
                      key={`morning-${idx}`}
                      disabled={slot.status === 'booked'}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`slot-btn ${slot.status} ${selectedTimeSlot?.time === slot.time ? 'selected' : ''}`}
                    >
                      <span>{slot.time}</span>
                      {slot.status === 'booked' && <span style={{ display: 'block', fontSize: '0.65rem', marginTop: '2px', opacity: 0.7 }}>FULL</span>}
                      {slot.status === 'limited' && <span className="slot-limited-badge">Only 1</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Afternoon Session */}
              <div className="slots-section">
                <h4 className="slots-section-title">Afternoon (1:00 PM - 5:00 PM)</h4>
                <div className="slots-grid">
                  {timeSlots.afternoon.map((slot, idx) => (
                    <button
                      key={`afternoon-${idx}`}
                      disabled={slot.status === 'booked'}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`slot-btn ${slot.status} ${selectedTimeSlot?.time === slot.time ? 'selected' : ''}`}
                    >
                      <span>{slot.time}</span>
                      {slot.status === 'booked' && <span style={{ display: 'block', fontSize: '0.65rem', marginTop: '2px', opacity: 0.7 }}>FULL</span>}
                      {slot.status === 'limited' && <span className="slot-limited-badge">Only 1</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evening Session */}
              <div className="slots-section">
                <h4 className="slots-section-title">Evening (5:00 PM - 8:00 PM)</h4>
                <div className="slots-grid">
                  {timeSlots.evening.map((slot, idx) => (
                    <button
                      key={`evening-${idx}`}
                      disabled={slot.status === 'booked'}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`slot-btn ${slot.status} ${selectedTimeSlot?.time === slot.time ? 'selected' : ''}`}
                    >
                      <span>{slot.time}</span>
                      {slot.status === 'booked' && <span style={{ display: 'block', fontSize: '0.65rem', marginTop: '2px', opacity: 0.7 }}>FULL</span>}
                      {slot.status === 'limited' && <span className="slot-limited-badge">Only 1</span>}
                    </button>
                  ))}
                </div>
              </div>

              {selectedTimeSlot && (
                <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center', fontWeight: 650, color: 'var(--secondary-teal)', fontSize: '0.95rem' }}>
                  Selected Slot: {selectedTimeSlot.time} ({selectedService.duration} mins)
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', marginTop: 'var(--spacing-2xl)' }}>
              <button onClick={handleBackStep} className="btn btn-secondary">
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button
                onClick={handleNextStep}
                disabled={!selectedTimeSlot}
                className="btn btn-primary"
                style={{ opacity: selectedTimeSlot ? 1 : 0.5, cursor: selectedTimeSlot ? 'pointer' : 'not-allowed' }}
              >
                <span>Review Summary</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: VERIFY SUMMARY */}
        {step === 4 && (
          <div className="step-content-section" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="section-title text-center mb-xl" style={{ fontSize: '1.5rem' }}>Step 4: Verify Selection</h2>
            
            <div className="glass-panel mb-xl" style={{ padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(94, 59, 140, 0.15)' }}>
              <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', color: 'var(--primary-purple)', fontSize: '1.15rem', marginBottom: 'var(--spacing-md)' }}>Appointment Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray-text)' }}>Treatment Service:</span>
                  <span style={{ fontWeight: 700, color: 'var(--dark-text)' }}>{selectedService.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray-text)' }}>Date of Visit:</span>
                  <span style={{ fontWeight: 700, color: 'var(--dark-text)' }}>{getFormattedDateDisplay(selectedDate)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray-text)' }}>Reporting Time:</span>
                  <span style={{ fontWeight: 700, color: 'var(--dark-text)' }}>{selectedTimeSlot.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray-text)' }}>Duration:</span>
                  <span style={{ fontWeight: 700, color: 'var(--dark-text)' }}>{selectedService.duration} Minutes</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray-text)' }}>Assigned Doctor:</span>
                  <span style={{ fontWeight: 700, color: 'var(--dark-text)' }}>Dr. Harshit Rampara</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color-dark)', paddingTop: '12px' }}>
                  <span style={{ color: 'var(--gray-text)', fontWeight: 600 }}>Estimated Cost:</span>
                  <span style={{ fontWeight: 800, color: 'var(--secondary-teal)', fontSize: '1.1rem' }}>₹{selectedService.price}/-</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--gray-text)', textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
              Everything looks correct? Click confirm below to provide patient intake details.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleBackStep} className="btn btn-secondary">
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button onClick={handleNextStep} className="btn btn-primary">
                <span>Proceed to Patient Info</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: PATIENT INFORMATION */}
        {step === 5 && (
          <div className="step-content-section" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="section-title text-center mb-xl" style={{ fontSize: '1.5rem' }}>Step 5: Patient Information</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} noValidate>
              
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <div className="input-container">
                  <input
                    type="text"
                    name="fullName"
                    value={formFields.fullName}
                    onBlur={handleBlur}
                    onChange={handleFormChange}
                    placeholder="Enter first and last name"
                    className={`form-input ${touched.fullName ? (errors.fullName ? 'is-invalid' : 'is-valid') : ''}`}
                    required
                  />
                  {touched.fullName && (
                    <span className={`input-feedback-icon ${errors.fullName ? 'invalid' : 'valid'}`}>
                      {errors.fullName ? <X size={18} /> : <Check size={18} />}
                    </span>
                  )}
                </div>
                {touched.fullName && errors.fullName && <p className="form-error-msg">{errors.fullName}</p>}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    value={formFields.email}
                    onBlur={handleBlur}
                    onChange={handleFormChange}
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

              {/* Phone Number */}
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{
                    padding: '12px 14px',
                    backgroundColor: 'var(--light-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--dark-text)'
                  }}>+91</span>
                  <div className="input-container" style={{ flexGrow: 1 }}>
                    <input
                      type="tel"
                      name="phone"
                      value={formFields.phone}
                      onBlur={handleBlur}
                      onChange={handleFormChange}
                      placeholder="10 digit mobile number"
                      className={`form-input ${touched.phone ? (errors.phone ? 'is-invalid' : 'is-valid') : ''}`}
                      required
                    />
                    {touched.phone && (
                      <span className={`input-feedback-icon ${errors.phone ? 'invalid' : 'valid'}`}>
                        {errors.phone ? <X size={18} /> : <Check size={18} />}
                      </span>
                    )}
                  </div>
                </div>
                {touched.phone && errors.phone && <p className="form-error-msg">{errors.phone}</p>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                {/* Age */}
                <div className="form-group">
                  <label className="form-label">Age (optional)</label>
                  <input
                    type="number"
                    name="age"
                    value={formFields.age}
                    onChange={handleFormChange}
                    placeholder="Age"
                    className="form-input"
                  />
                </div>

                {/* Gender */}
                <div className="form-group">
                  <label className="form-label">Gender (optional)</label>
                  <select
                    name="gender"
                    value={formFields.gender}
                    onChange={handleFormChange}
                    className="form-input"
                    style={{ appearance: 'auto' }}
                  >
                    <option value="">--Select--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="PreferNotToSay">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Medical History */}
              <div className="form-group">
                <label className="form-label">Medical History / Concerns (optional)</label>
                <textarea
                  name="medicalHistory"
                  value={formFields.medicalHistory}
                  onChange={handleFormChange}
                  placeholder="Describe any skin history, active allergies, or previous laser surgeries..."
                  className="form-input"
                  rows="3"
                  maxLength="500"
                  style={{ resize: 'none' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-text)', float: 'right', marginTop: '2px' }}>
                  {formFields.medicalHistory.length}/500 chars
                </span>
              </div>

              {/* Referral Source */}
              <div className="form-group">
                <label className="form-label">How did you hear about us?</label>
                <select
                  name="referral"
                  value={formFields.referral}
                  onChange={handleFormChange}
                  className="form-input"
                  style={{ appearance: 'auto' }}
                >
                  <option value="">Select option</option>
                  <option value="google">Google Search</option>
                  <option value="social">Social Media (Instagram/Facebook)</option>
                  <option value="friend">Friend / Family Referral</option>
                  <option value="doctor">Doctor Referral</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Consent Checkboxes */}
              <div className="form-group" style={{ margin: 'var(--spacing-xl) 0' }}>
                <label style={{ display: 'flex', alignItems: 'start', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '10px' }}>
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    checked={formFields.agreePrivacy}
                    onBlur={handleBlur}
                    onChange={handleFormChange}
                    style={{ marginTop: '3px' }}
                    required
                  />
                  <span>I agree to the <strong>Privacy Policy</strong> and clinical consent terms. *</span>
                </label>
                {touched.agreePrivacy && errors.agreePrivacy && <p className="form-error-msg">{errors.agreePrivacy}</p>}

                <label style={{ display: 'flex', alignItems: 'start', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    name="agreeReminders"
                    checked={formFields.agreeReminders}
                    onChange={handleFormChange}
                    style={{ marginTop: '3px' }}
                  />
                  <span>Send me appointment reminders, queue updates, and skincare tips.</span>
                </label>
              </div>

            </form>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-2xl)' }}>
              <button onClick={handleBackStep} className="btn btn-secondary">
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button
                onClick={handleNextStep}
                disabled={!formFields.fullName || !formFields.email || !formFields.phone || !formFields.agreePrivacy}
                className="btn btn-primary"
                style={{
                  opacity: (formFields.fullName && formFields.email && formFields.phone && formFields.agreePrivacy) ? 1 : 0.5,
                  cursor: (formFields.fullName && formFields.email && formFields.phone && formFields.agreePrivacy) ? 'pointer' : 'not-allowed'
                }}
              >
                <span>Review & Confirm</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW & SUBMIT */}
        {step === 6 && (
          <div className="step-content-section" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="section-title text-center mb-xl" style={{ fontSize: '1.5rem' }}>Step 6: Review & Finalize Booking</h2>
            
            <div className="glass-panel mb-lg" style={{ padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(94, 59, 140, 0.15)', textAlign: 'left' }}>
              <h4 style={{ color: 'var(--primary-purple)', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>Treatment Summary</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--dark-text)' }}><strong>Service:</strong> {selectedService.name}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--dark-text)' }}><strong>Date & Time:</strong> {getFormattedDateDisplay(selectedDate)} at <strong>{selectedTimeSlot.time}</strong></p>
              <p style={{ fontSize: '0.9rem', color: 'var(--dark-text)' }}><strong>Estimated Cost:</strong> ₹{selectedService.price}/- (Consultation Fee)</p>
            </div>

            <div className="glass-panel mb-xl" style={{ padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(94, 59, 140, 0.15)', textAlign: 'left' }}>
              <h4 style={{ color: 'var(--primary-purple)', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>Patient Details</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--dark-text)' }}><strong>Name:</strong> {formFields.fullName}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--dark-text)' }}><strong>Email:</strong> {formFields.email}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--dark-text)' }}><strong>Phone:</strong> +91 {formFields.phone}</p>
              {formFields.age && <p style={{ fontSize: '0.9rem', color: 'var(--dark-text)' }}><strong>Age:</strong> {formFields.age} Years</p>}
              {formFields.gender && <p style={{ fontSize: '0.9rem', color: 'var(--dark-text)' }}><strong>Gender:</strong> {formFields.gender}</p>}
            </div>

            <div style={{ backgroundColor: 'rgba(6, 182, 212, 0.05)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(6, 182, 212, 0.15)', marginBottom: 'var(--spacing-xl)', fontSize: '0.85rem', color: 'var(--gray-text)', textAlign: 'left' }}>
              <p style={{ display: 'flex', gap: '6px', alignItems: 'start' }}>
                <CheckCircle size={14} style={{ color: 'var(--secondary-teal)', flexShrink: 0, marginTop: '2px' }} />
                <span>By confirming, you agree to report at the reception desk 10 minutes prior to your time slot ({selectedTimeSlot.time}).</span>
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleBackStep} className="btn btn-secondary" disabled={isSubmitting}>
                <ArrowLeft size={16} />
                <span>Edit Information</span>
              </button>
              
              <button
                onClick={handleSubmitBooking}
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ minWidth: '180px' }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      animation: 'float 1s linear infinite'
                    }}></span>
                    <span>Confirming...</span>
                  </span>
                ) : (
                  <span>Confirm Appointment</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: SUCCESS PAGE */}
        {step === 7 && (
          <div className="success-card animate-scale-up">
            <div className="success-icon-box">
              <Check size={36} strokeWidth={3} />
            </div>
            
            <h2 className="success-title">Appointment Confirmed!</h2>
            <p style={{ color: 'var(--gray-text)', marginBottom: 'var(--spacing-2xl)' }}>
              Your appointment reservation has been registered successfully. A confirmation email has been dispatched to <strong>{formFields.email}</strong>.
            </p>

            <div className="booking-receipt">
              <div className="receipt-row" style={{ borderBottom: '2px solid var(--border-color)' }}>
                <span className="receipt-label" style={{ fontWeight: 700, color: 'var(--primary-purple)' }}>CONFIRMATION ID</span>
                <span className="receipt-val" style={{ fontWeight: 800, color: 'var(--primary-purple)' }}>{confirmationId}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Patient Name:</span>
                <span className="receipt-val">{formFields.fullName}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Contact Number:</span>
                <span className="receipt-val">+91 {formFields.phone}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Clinical Treatment:</span>
                <span className="receipt-val">{selectedService.name}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Scheduled Date:</span>
                <span className="receipt-val">{getFormattedDateDisplay(selectedDate)}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Assigned Time Slot:</span>
                <span className="receipt-val">{selectedTimeSlot.time} ({selectedService.duration} Mins)</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Dermatologist:</span>
                <span className="receipt-val">Dr. Harshit Rampara</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Consultation Fee:</span>
                <span className="receipt-val" style={{ color: 'var(--secondary-teal)', fontWeight: 700 }}>₹{selectedService.price}/- (Pay at Clinic)</span>
              </div>
            </div>

            {/* Preparation / Guidelines */}
            <div className="glass-panel text-left mb-xl" style={{ padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)' }}>
              <h4 style={{ color: 'var(--primary-purple)', fontSize: '0.95rem', marginBottom: 'var(--spacing-sm)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={16} style={{ color: 'var(--secondary-teal)' }} />
                <span>Pre-Appointment Instructions</span>
              </h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--gray-text)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Please arrive at the clinic <strong>10 minutes prior</strong> to your scheduled slot.</li>
                <li>Carry a valid government ID card for register verification.</li>
                <li>Avoid applying thick cosmetic makeup/foundation if seeking facial skin treatments.</li>
                <li>If you have any active prior skin logs or allergy reports, please bring them along.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  window.print();
                }}
                className="btn btn-secondary btn-sm"
              >
                <span>Download PDF Receipt</span>
              </button>
              
              <button
                onClick={() => {
                  // Mock Calendar Add
                  alert('Event added to Google Calendar!');
                }}
                className="btn btn-secondary btn-sm"
              >
                <span>Add to Calendar</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onClose();
                }}
                className="btn btn-primary btn-sm"
              >
                <span>Return to Home Page</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
