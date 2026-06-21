import React, { useState, useMemo } from 'react';
import { Search, Clock, ArrowRight, X, Calendar, Sparkles } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Truth About Acne Scars: What Really Works?',
    category: 'Acne Solutions',
    date: 'June 18, 2026',
    readTime: '5 min read',
    excerpt: 'From chemical peels to fractional laser therapies, discover which treatment paths offer the most effective results for your scar type.',
    content: `Acne scars are permanent texture changes and depressions that occur on the skin after severe, deep acne inflammation. Understanding your scar type is the first step toward effective treatment.
    
    ### Types of Acne Scars:
    1. **Rolling Scars**: Broad depressions with sloping edges that give skin a wavy appearance.
    2. **Boxcar Scars**: U-shaped depressions with sharp, vertical edges.
    3. **Icepick Scars**: Narrow, deep punctures that resemble small holes from a needle.
    
    ### Gold-Standard Treatments:
    - **Fractional Laser Resurfacing**: Vaporizes micro-channels in the skin to force the body to deposit brand new collagen fibers, evening out the skin level.
    - **Subcision**: A minor surgical procedure that uses an ultra-fine needle to sever rigid fibrous anchor bands that tether the scar to deep muscle tissues.
    - **Microneedling / Dermapen**: Controlled physical punctures that trigger fibroblasts to synthesize fresh Type-1 collagen.
    
    Consulting a certified dermatologist like Dr. Harshit Rampara is critical to charting which laser or microneedling combination suits your skin profile.`
  },
  {
    id: 2,
    title: 'Understanding Laser Hair Reduction for Sensitive Skin',
    category: 'Laser Tech',
    date: 'June 12, 2026',
    readTime: '4 min read',
    excerpt: 'Struggling with shaving rash? Learn how modern cooling lasers make permanent hair reduction completely comfortable even for sensitive skin.',
    content: `For decades, people with sensitive skin avoided laser hair treatments out of fear of irritation, burns, or redness. Shaving and waxing, however, cause continuous micro-tears and painful folliculitis.
    
    ### How Modern Lasers Protect Sensitive Skin:
    Modern cooling diode lasers utilize a specialized sapphire cooling tip that touches the skin. While the laser pulse shoots light energy into the melanin of the hair follicle, the cooling contact layer keeps the epidermis chilled at a safe 4°C.
    
    ### Benefits:
    - **No razor bumps**: Safely reduces follicular volume.
    - **Minimal discomfort**: Described as a light pinch.
    - **Precision**: Targets hair melanin without damaging surrounding pigment cells.`
  },
  {
    id: 3,
    title: 'Dermatologist Guide: Building a Hydrating Summer Routine',
    category: 'Skincare Routines',
    date: 'June 05, 2026',
    readTime: '6 min read',
    excerpt: 'Hot weather requires lightweight protection. We break down the absolute essentials you need to keep your skin hydrated and protected.',
    content: `Summer brings intense UV index rates and humidity, which causes sebaceous glands to overproduce sebum. Many people skip moisturizers, leading to dehydrated skin cells and compensative acne flare-ups.
    
    ### The 3 Core Pillars of a Summer Routine:
    1. **Lightweight Hyaluronic Serums**: Instead of heavy creams, hydrate with water-binding hyaluronic molecules that lock in moisture without clogging pores.
    2. **Gel-Based Sunscreens**: Look for broad-spectrum SPF 50 sunscreens in a matte gel or fluid formulation. It protects from UVA/UVB rays without contributing to a greasy shine.
    3. **Mild Salicylic Acid Cleanser**: Wash away sweat and sebum buildup twice a day without disrupting your skin's physiological pH barrier.`
  }
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  const categories = ['All', 'Acne Solutions', 'Laser Tech', 'Skincare Routines'];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="container section-padding animate-fade-in">
      <div className="section-header text-center">
        <span className="section-subtitle">Adiva Journal</span>
        <h2 className="section-title">Skin Science & Insights</h2>
        <p className="section-desc">Keep your skin healthy and glowing with clinical knowledge, treatment guidance, and daily skin health advice directly from our clinic specialists.</p>
      </div>

      {/* Category filters & Search */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-3xl)'
      }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-xs)', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-input-wrapper" style={{ maxWidth: '320px', width: '100%' }}>
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar-input"
            style={{ padding: '10px 14px 10px 38px', fontSize: '0.9rem' }}
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid-3col">
          {filteredPosts.map((post) => (
            <div key={post.id} className="glass-card blog-card animate-slide-up">
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="badge badge-purple">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-desc">{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gray-text)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </span>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="btn-text btn"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel text-center" style={{ padding: 'var(--spacing-3xl)', borderRadius: 'var(--radius-lg)' }}>
          <Sparkles size={40} style={{ color: 'var(--border-color-dark)', margin: '0 auto var(--spacing-md) auto' }} />
          <h3 style={{ color: 'var(--primary-purple)' }}>No Articles Found</h3>
          <p style={{ color: 'var(--gray-text)' }}>We couldn\'t find any posts matching your criteria. Try adjusting your search term.</p>
        </div>
      )}

      {/* Full Article Reader Overlay */}
      {selectedPost && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '650px',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-lg)',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: 'var(--spacing-3xl)',
            boxShadow: 'var(--shadow-premium)',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'var(--gray-text)'
              }}
            >
              <X size={24} />
            </button>

            <span className="badge badge-purple mb-sm">{selectedPost.category}</span>
            <h2 style={{ color: 'var(--primary-purple)', fontSize: '1.75rem', marginBottom: '8px', lineHeight: 1.3 }}>{selectedPost.title}</h2>
            
            <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: 'var(--gray-text)', marginBottom: 'var(--spacing-xl)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} />
                <span>{selectedPost.date}</span>
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                <span>{selectedPost.readTime}</span>
              </span>
              <span>•</span>
              <span>By Dr. Harshit Rampara</span>
            </div>

            <div style={{
              color: 'var(--dark-text)',
              fontSize: '1rem',
              lineHeight: 1.7,
              textAlign: 'left',
              whiteSpace: 'pre-line'
            }}>
              {selectedPost.content}
            </div>

            <button
              onClick={() => setSelectedPost(null)}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 'var(--spacing-2xl)', float: 'right' }}
            >
              Close Reader
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
