# ADIVA Website Redesign - Quick Reference Guide

## DESIGN SYSTEM AT A GLANCE

### Color Palette
```
PRIMARY PURPLE      | #5E3B8C  (Deep Trust, Authority)
SECONDARY TEAL      | #06B6D4  (Modern, Fresh, Healing)
ACCENT CORAL        | #FF6B6B  (Warmth, Approachability)
LIGHT BACKGROUND    | #F8F9FA  (Clean, Medical)
DARK TEXT           | #1F2937  (Readable)
```

### Typography
```
HEADINGS:   Poppins / Inter (Bold, Modern, 700+ weight)
BODY:       Inter / Outfit (Warm, Accessible, 400-500 weight)
DATA:       Monospace (Small, Utility information)
```

### Spacing Scale
4 • 8 • 12 • 16 • 24 • 32 • 48 • 64 • 80 • 96 (pixels)

### Shadows & Borders
- Subtle shadows (not dramatic)
- Border radius: 4px (subtle) → 8px (medium) → 12px (rounded)
- Clean, clinical aesthetic with warmth

---

## SITE NAVIGATION MAP

```
┌─────────────────────────────────────┐
│          ADIVA HEADER               │
│  Logo | Home | Services | About     │
│        Blog | Contact | [Book]      │
└─────────────────────────────────────┘
           │
     ┌─────┼─────┬─────────┬──────────┐
     │     │     │         │          │
   HOME  SERVICES  ABOUT   BLOG    CONTACT
     │     │        │       │         │
     │   SERVICES ├─TEAM  ├─POST   FORM
     │     LIST    │      │
     │     │       FOUNDER  ARTICLES
     │  [DETAIL]  │      LIST
     │  PAGES     HISTORY│
     │  (20+)     VALUES ├─[POST]
     │            │      DETAIL
     │          FACILITIES
     │
  ├─ HERO
  ├─ STATS
  ├─ SERVICES PREVIEW
  ├─ WHY CHOOSE ADIVA
  ├─ TEAM HIGHLIGHT
  ├─ BLOG PREVIEW
  ├─ TESTIMONIALS
  └─ FINAL CTA

         BOOK APPOINTMENT
         (Multi-step modal/page)
         ├─ Service Selection
         ├─ Calendar (Select Date)
         ├─ Time Slots
         ├─ Confirm Details
         ├─ Patient Info Form
         ├─ Review & Confirm
         └─ Success Page
```

---

## PAGE STRUCTURE BREAKDOWN

### 1️⃣ HOME PAGE (/)
```
┌──────────────────────────────────┐
│ HERO SECTION                     │
│ - Headline + Subheading          │
│ - CTA Buttons (Book / Learn)     │
│ - Background Image (subtle)      │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ QUICK STATS SECTION              │
│ ┌──────┐ ┌──────┐ ┌──────┐      │
│ │26+   │ │33660+│ │51+   │      │
│ │Years │ │Happy │ │Treats│      │
│ └──────┘ └──────┘ └──────┘      │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ SERVICES PREVIEW (4-6 cards)     │
│ ┌──────┐ ┌──────┐ ┌──────┐      │
│ │Icon  │ │Icon  │ │Icon  │      │
│ │Title │ │Title │ │Title │      │
│ │→Link │ │→Link │ │→Link │      │
│ └──────┘ └──────┘ └──────┘      │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ WHY CHOOSE ADIVA (3-4 items)     │
│ - Expert-led                     │
│ - Advanced Technology            │
│ - Personalized Care              │
│ - 90%+ Satisfaction              │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ TEAM HIGHLIGHT                   │
│ [Team Photo]                     │
│ "Meet Our Expert Team"           │
│ "→ Meet Our Team" CTA            │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ LATEST BLOG (3 posts)            │
│ ┌──────┐ ┌──────┐ ┌──────┐      │
│ │Image │ │Image │ │Image │      │
│ │Title │ │Title │ │Title │      │
│ │Date  │ │Date  │ │Date  │      │
│ └──────┘ └──────┘ └──────┘      │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ FINAL CTA                        │
│ "Ready to Transform?"            │
│ [Book Appointment Button]        │
└──────────────────────────────────┘
```

### 2️⃣ SERVICES PAGE (/services)
```
┌──────────────────────────────────┐
│ HEADER: "Our Complete Menu"      │
└──────────────────────────────────┘
     ↓
┌────────────────┬─────────────────┐
│ SIDEBAR        │ MAIN CONTENT    │
├────────────────┤                 │
│ Skin Treatments│ SERVICE GRID    │
│ Hair Care      │ ┌──┬──┬──┬──┐   │
│ Laser          │ │○ │○ │○ │○ │   │
│ Aesthetic      │ ├──┼──┼──┼──┤   │
│ Body           │ │○ │○ │○ │○ │   │
│                │ ├──┼──┼──┼──┤   │
│ [Filters]      │ │○ │○ │○ │○ │   │
│                │ └──┴──┴──┴──┘   │
└────────────────┴─────────────────┘
        ↓
[CLICK ON SERVICE]
        ↓
/services/acne → SERVICE DETAIL PAGE
```

### 3️⃣ SERVICE DETAIL PAGE (/services/[slug])
```
┌──────────────────────────────────┐
│ HERO BANNER                      │
│ Service Name | Category Badge    │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ WHAT IS IT SECTION               │
│ (Plain language, benefits)       │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ OUR TREATMENT APPROACH           │
│ Step-by-step explanation         │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ BEFORE & AFTER GALLERY           │
│ [Comparison Slider / Gallery]    │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ BENEFITS (4-6 icons)             │
│ ✓ Benefit 1                      │
│ ✓ Benefit 2                      │
│ ✓ Benefit 3                      │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ FAQ ACCORDION                    │
│ ▼ Question 1?                    │
│   Answer...                      │
│ ▶ Question 2?                    │
│   Answer...                      │
│ ▶ Question 3?                    │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ RELATED SERVICES (3 links)       │
│ → Service A | → Service B | → C  │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ CTA SECTION                      │
│ "Ready to Start Your Treatment?" │
│ [Book Appointment Button]        │
│ "Get Free Consultation"          │
│ Call: +91-XXXXX-XXXXX           │
└──────────────────────────────────┘
```

### 4️⃣ BOOK APPOINTMENT (CRITICAL)
```
MODAL/PAGE: /book-appointment

STEP 1: SERVICE SELECTION
┌──────────────────────────────────┐
│ Select Your Treatment:           │
│ [Dropdown ▼ Acne Treatment]      │
│ Duration: 30 min                 │
└──────────────────────────────────┘
  [Next] or [Continue]


STEP 2: SELECT DATE (CALENDAR)
┌──────────────────────────────────┐
│          JUNE 2026       →        │
├──────────────────────────────────┤
│ MON TUE WED THU FRI SAT SUN      │
├──────────────────────────────────┤
│  1   2   3   4   5   6   7       │
│  8   9  10  11  12  13  14       │
│ 15  16  17  18  19  20 (21)⭕    │
│ 22  23  24  25  26  27  28       │
│ 29  30   1   2   3   4   5       │
└──────────────────────────────────┘
(Click on available date)


STEP 3: SELECT TIME SLOT
┌──────────────────────────────────┐
│ Available Slots - Monday, June 24│
├──────────────────────────────────┤
│ MORNING                          │
│ [09:00 AM] [10:00 AM] [11:00AM]  │
│                                  │
│ AFTERNOON                        │
│ [02:00 PM] [02:30 PM] [03:00PM]  │
│ [03:30PM] [04:00 PM] [FULL]      │
│                                  │
│ EVENING                          │
│ [06:00 PM] [06:30 PM]            │
└──────────────────────────────────┘
(Click on preferred slot)


STEP 4: CONFIRM DETAILS
┌──────────────────────────────────┐
│ Appointment Summary              │
├──────────────────────────────────┤
│ Service: Acne Treatment          │
│ Date: Monday, June 24, 2026      │
│ Time: 02:30 PM                   │
│ Duration: 30 minutes             │
│ Doctor: Dr. Harshit Rampara      │
│ Estimated Cost: ₹500/-           │
├──────────────────────────────────┤
│ [Confirm] [Change Selection]     │
└──────────────────────────────────┘


STEP 5: PATIENT INFORMATION
┌──────────────────────────────────┐
│ Your Information                 │
├──────────────────────────────────┤
│ Full Name: [________________]    │
│ Email: [____________________]    │
│ Phone: +91 [______________]      │
│ Age: [___] Gender: [Dropdown]    │
│ Medical History: [TextArea]      │
│ Contact Preference: ○ Phone ○ SMS│
│ ☑ I agree to privacy policy      │
│ ☑ Receive appointment reminders  │
├──────────────────────────────────┤
│ [Proceed to Confirmation]        │
└──────────────────────────────────┘


STEP 6: REVIEW & CONFIRM
┌──────────────────────────────────┐
│ Final Confirmation               │
├──────────────────────────────────┤
│ Patient: John Doe                │
│ Service: Acne Treatment          │
│ Date: Monday, June 24, 2026      │
│ Time: 02:30 PM                   │
│ Contact: john@email.com          │
│ Phone: +91-XXXXX-XXXXX           │
├──────────────────────────────────┤
│ [Confirm Appointment]            │
│ [Edit Information]               │
└──────────────────────────────────┘


STEP 7: SUCCESS PAGE
┌──────────────────────────────────┐
│ ✅ APPOINTMENT CONFIRMED!        │
├──────────────────────────────────┤
│ Confirmation ID: ADV-20260624001 │
│                                  │
│ Acne Treatment                   │
│ Monday, June 24, 2026            │
│ 02:30 PM (30 minutes)            │
│                                  │
│ Dr. Harshit Rampara              │
│ Adiva Centre, Building X         │
│ Ahmedabad, Gujarat               │
│                                  │
│ ✓ Confirmation sent to inbox     │
│ ✓ Reminder: 24 hours before      │
│                                  │
├──────────────────────────────────┤
│ [Add to Calendar] [Download PDF] │
│ [Return to Home]                 │
└──────────────────────────────────┘
```

---

## KEY INTERACTIVE ELEMENTS

### Calendar Component (Most Important)
```
Features:
✓ Full month view (MON-SUN layout)
✓ Today highlighted (blue circle)
✓ Selected date highlighted (purple circle)
✓ Past dates disabled/grayed
✓ Show available slots count per day
✓ Navigation arrows to change month
✓ Click to select date
✓ Show count: "3 slots available"

States:
- Today: Light blue background + blue circle
- Selected: Purple circle
- Available: Normal, clickable
- Full/Unavailable: Gray, disabled
- Hover: Slight highlight on available dates
```

### Time Slot Selector
```
Display as:
┌────────────────────────────┐
│ MORNING SESSION            │
│ [09:00 AM] [10:00 AM] ...  │
│ AFTERNOON SESSION          │
│ [02:00 PM] [03:00 PM] ...  │
│ [04:00 PM] [FULL] ...      │
│ EVENING SESSION            │
│ [06:00 PM] [06:30 PM] ...  │
└────────────────────────────┘

Button States:
- Available: Green background, clickable, cursor pointer
- Selected: Purple background, white text
- Unavailable: Gray background, crossed out, disabled
- Limited: Yellow/orange badge: "Only 1 left"
```

### Form Validation
```
Real-time feedback:
✓ Green checkmark: Valid input
✗ Red X mark: Invalid input
! Orange warning: Required field

Messages:
❌ "Please enter a valid email"
❌ "Phone must be 10 digits"
❌ "This field is required"
✅ "Email format is correct"
```

---

## RESPONSIVE BREAKPOINTS

```
MOBILE         TABLET           DESKTOP
320-640px      641-1024px       1025px+

┌──────────┐  ┌──────────────┐  ┌───────────────┐
│ Mobile   │  │ Tablet       │  │ Desktop       │
│ Layout   │  │ Layout       │  │ Layout        │
│ Stacked  │  │ 2-column     │  │ Multi-column  │
│ Full     │  │ Optimized    │  │ Full featured │
│ width    │  │ touch        │  │ experience    │
│          │  │              │  │               │
│ Ham menu │  │ Nav visible  │  │ Nav visible   │
│          │  │              │  │               │
│ Single   │  │ 2-col grid   │  │ 3-col grid    │
│ col grid │  │              │  │               │
└──────────┘  └──────────────┘  └───────────────┘
```

---

## CTA (CALL-TO-ACTION) HIERARCHY

### Primary CTA (Highest Priority)
- "Book Appointment"
- Background: Purple (#5E3B8C)
- Text: White
- Size: Large (16-18px)
- Padding: 14px 32px
- Hover: Darker purple + scale 1.05
- Location: Hero, service cards, footers

### Secondary CTA (Medium Priority)
- "Learn More", "Get Consultation"
- Background: Transparent
- Border: 2px purple
- Text: Purple
- Size: Medium
- Hover: Purple background with white text
- Location: Service cards, blog cards

### Tertiary CTA (Lower Priority)
- "Read More", "View Details"
- Color: Teal (#06B6D4)
- No background
- Underline on hover
- Size: Small to medium

---

## ANIMATION GUIDELINES

```
Use MINIMAL animations for modern feel:

Page Load:
- Fade in content (100-200ms)
- Stagger children elements (50-100ms offset)

Scroll Triggers:
- Slide up + fade on scroll into view (400ms)
- Used sparingly on hero images, CTAs

Hover States:
- Button scale (1.02-1.05)
- Shadow increase
- Color transition (100-150ms)

Form Interactions:
- Input focus: Border color change + subtle glow
- Error: Shake animation (200ms)
- Success: Checkmark animation (300ms)

Calendar:
- Date selection: Click feedback with scale
- Transition between months (fade)

DO NOT:
✗ Excessive parallax scrolling
✗ Auto-playing videos
✗ Confetti everywhere
✗ 3D rotations
✗ Animations that slow page
✗ Multiple animations competing
```

---

## CONVERSION OPTIMIZATION

```
CTA Placement Strategy:

1. HERO SECTION
   Primary CTA: "Book Appointment" (button)
   
2. AFTER SERVICES PREVIEW
   Secondary CTA: "Explore All Services"
   
3. AFTER SERVICE DETAILS
   Primary CTA: "Schedule Consultation"
   
4. FOOTER
   Secondary CTA: "Contact Us" + Phone number
   
5. SIDEBAR (on desktop)
   Sticky CTA: "Book Now" (follows scroll)
   
6. AFTER BLOG POSTS
   Secondary CTA: "Start Your Treatment"

Button Copy Psychology:
- Use action verbs: "Book", "Schedule", "Start"
- Avoid: "Click Here", "Submit"
- Be specific: "Book Acne Treatment" vs "Book Now"
- Add urgency (subtle): "Schedule Today"
```

---

## ACCESSIBILITY CHECKLIST

```
✓ Color contrast: 4.5:1 text on background
✓ Touch targets: Min 44x44px
✓ Keyboard navigation: Tab through all elements
✓ Focus indicators: Visible on all interactive elements
✓ Alt text: All images described
✓ Heading hierarchy: H1 → H2 → H3 (no skips)
✓ Form labels: Associated with inputs
✓ Error messages: Clear and helpful
✓ Reduced motion: Animations respect prefers-reduced-motion
✓ ARIA labels: On icon-only buttons
✓ Skip links: Jump to main content
✓ Mobile zoom: Not disabled (allows 200% zoom)
```

---

## PERFORMANCE TARGETS

```
METRIC              TARGET      CURRENT

Lighthouse Mobile    90+        N/A
Lighthouse Desktop   95+        N/A
LCP (Largest        <2.5s       TBD
  Contentful Paint)
FID (First Input    <100ms      TBD
  Delay)
CLS (Cumulative     <0.1        TBD
  Layout Shift)
Page Size           <3MB        TBD
First Paint         <1s         TBD
TTL (Time to        <3s         TBD
  Interactive)

Optimization Tips:
- Next.js Image component for all images
- Code splitting per route
- Lazy load components below fold
- Minimize CSS bundles
- Cache-first strategies
```

---

## SERVICES TO INCLUDE (Full List)

```
SKIN TREATMENTS:
□ Acne                  □ Open Pores        □ Tanning
□ Acne Scars            □ Pigmentation      □ Dark Circles
□ Freckles              □ Fungal Infections □ Bacterial Infection
□ Nail Infections       □ Moles             □ Warts
□ Skin Tags             □ Keloids           □ Psoriasis
□ Eczema                □ Vitiligo          □ Allergy
□ Stretch Marks         □ Chemical Peels    □ Medi-Facials
□ Urticaria

SPECIALIST SERVICES:
□ Laser Treatments      □ Aesthetic         □ Bridal Packages
□ Hair Treatments       □ Body Treatments

(Confirm exact services with client before finalizing)
```

---

This quick reference guide should accompany the detailed master prompt when presenting to developers or AI Studio.
