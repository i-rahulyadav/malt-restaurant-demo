import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Facebook,
  Instagram,
  Menu as MenuIcon,
  Music2,
  Phone,
  Play,
  Search,
  Star,
  UtensilsCrossed,
  X,
  MapPinned,
  Sparkles,
  Martini,
  PartyPopper,
  Users,
} from 'lucide-react';
import { aboutImage, experienceItems, galleryItems, heroImage, menuCategories, menuItems } from './data/menuData';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
];

const sampleEvent = {
  title: 'Upcoming event details to be confirmed',
  description:
    'This concept area can highlight live music, seasonal evenings, and special restaurant programming once the owner confirms the details.',
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeGalleryCategory, setActiveGalleryCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [formState, setFormState] = useState({
    fullName: '',
    phoneNumber: '',
    guests: '2',
    date: '',
    time: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1)).concat(['reservation']);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section) => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleSection?.target?.id) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0.1, 0.25, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage || isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage, isMenuOpen]);

  const filteredMenuItems = useMemo(
    () =>
      menuItems.filter((item) => activeCategory === 'All' || item.category === activeCategory),
    [activeCategory],
  );

  const filteredGalleryItems = useMemo(
    () =>
      galleryItems.filter(
        (item) => activeGalleryCategory === 'All' || item.category === activeGalleryCategory,
      ),
    [activeGalleryCategory],
  );

  const handleNavClick = () => setIsMenuOpen(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({ ...current, [name]: '' }));
    setFormSuccess('');
  };

  const validateReservation = () => {
    const errors = {};
    const phonePattern = /^[0-9+\-\s]{7,20}$/;
    const guestCount = Number(formState.guests);
    const selectedDate = formState.date ? new Date(`${formState.date}T00:00:00`) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formState.fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!formState.phoneNumber.trim()) {
      errors.phoneNumber = 'Please enter a phone number.';
    } else if (!phonePattern.test(formState.phoneNumber.trim())) {
      errors.phoneNumber = 'Enter a valid phone number.';
    }
    if (!Number.isFinite(guestCount) || guestCount < 1 || guestCount > 20) {
      errors.guests = 'Guest count must be between 1 and 20.';
    }
    if (!formState.date) {
      errors.date = 'Please choose a preferred date.';
    } else if (!selectedDate || Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
      errors.date = 'Please choose today or a future date.';
    }
    if (!formState.time) errors.time = 'Please choose a preferred time.';

    return errors;
  };

  const handleReservationSubmit = (event) => {
    event.preventDefault();
    const errors = validateReservation();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setFormSuccess(
      'This is a demo reservation request. No real booking has been made. Please contact the restaurant directly to confirm availability.',
    );
    setFormState({
      fullName: '',
      phoneNumber: '',
      guests: '2',
      date: '',
      time: '',
      message: '',
    });
  };

  return (
    <div className="site-shell">
      <header className={`navbar ${isScrolled ? 'navbar--solid' : ''}`}>
        <div className="container navbar__inner">
          <a className="brand" href="#home" onClick={handleNavClick}>
            <span className="brand__mark">M</span>
            <span>
              <span className="brand__name">MALT</span>
              <span className="brand__tag">Website Concept</span>
            </span>
          </a>

          <nav className="nav-desktop" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${activeSection === item.href.slice(1) ? 'nav-link--active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="navbar__actions">
            <a className="button button--ghost button--small hide-mobile" href="tel:+9779829004333">
              <Phone size={16} />
              Call Malt
            </a>
            <a className="button button--primary button--small" href="#reservation">
              Reserve a Table
            </a>
            <button
              className="mobile-toggle"
              type="button"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`mobile-menu__link ${activeSection === item.href.slice(1) ? 'mobile-menu__link--active' : ''}`}
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
          <a className="button button--primary mobile-menu__cta" href="#reservation" onClick={handleNavClick}>
            Reserve a Table
          </a>
        </div>
      </header>

      <main>
        <Hero />
        <About />
        <MenuSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filteredMenuItems={filteredMenuItems}
        />
        <Experience />
        <GallerySection
          activeGalleryCategory={activeGalleryCategory}
          setActiveGalleryCategory={setActiveGalleryCategory}
          filteredGalleryItems={filteredGalleryItems}
          onImageSelect={setSelectedImage}
        />
        <EventsSection />
        <ReservationSection
          formState={formState}
          formErrors={formErrors}
          formSuccess={formSuccess}
          onChange={handleFormChange}
          onSubmit={handleReservationSubmit}
        />
        <ContactSection />
      </main>

      <Footer />

      {selectedImage ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.title}>
          <button className="lightbox__backdrop" type="button" onClick={() => setSelectedImage(null)} aria-label="Close image preview" />
          <div className="lightbox__panel">
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="lightbox__caption">
              <p>{selectedImage.category}</p>
              <h3>{selectedImage.title}</h3>
              <button className="button button--ghost" type="button" onClick={() => setSelectedImage(null)}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="hero__background">
        <img
          src={heroImage}
          alt="Concept hero dining scene for MALT website demo"
        />
        <div className="hero__overlay" />
      </div>
      <div className="container hero__content reveal">
        <p className="eyebrow">MALT</p>
        <p className="hero__meta">FINE &amp; DINE • FAMILY RESTAURANT • LOUNGE BAR</p>
        <h1>Good Food. Great Vibes. Unforgettable Moments.</h1>
        <p className="hero__copy">Discover a dining experience in the heart of Birgunj.</p>
        <div className="hero__location">
          <MapPinned size={18} />
          <span>Adarshnagar • Rungta Mall • Birgunj</span>
        </div>
        <div className="hero__actions">
          <a className="button button--primary" href="#menu">
            Explore Menu
            <ArrowRight size={18} />
          </a>
          <a className="button button--ghost" href="#reservation">
            Reserve a Table
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section section--alt" id="about">
      <div className="container split-layout reveal">
        <div className="image-frame image-frame--tall">
          <img src={aboutImage} alt="Concept image of a premium restaurant interior for MALT demo" />
        </div>
        <div className="section-copy">
          <p className="section-copy__eyebrow">About Malt</p>
          <h2>Where Flavor Meets Atmosphere</h2>
          <p>
            Welcome to Malt, a dining and lounge destination in Adarshnagar, Birgunj. Enjoy a welcoming setting for
            food, drinks, family gatherings, and memorable moments.
          </p>
          <p className="concept-note">Editable concept copy until the restaurant owner confirms the official story.</p>
          <div className="info-grid">
            <article>
              <span>Location</span>
              <strong>Rungta Mall, Birgunj</strong>
            </article>
            <article>
              <span>Contact</span>
              <strong>982-9004333</strong>
            </article>
            <article>
              <span>Style</span>
              <strong>Family Dining &amp; Lounge</strong>
            </article>
            <article>
              <span>Note</span>
              <strong>Concept website demo</strong>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection({ activeCategory, setActiveCategory, filteredMenuItems }) {
  return (
    <section className="section" id="menu">
      <div className="container reveal">
        <div className="section-heading">
          <div>
            <p className="section-copy__eyebrow">Featured Menu</p>
            <h2>Discover Our Menu</h2>
          </div>
          <p>Explore a selection of dishes and beverages for your next visit.</p>
        </div>

        <div className="filter-row" role="tablist" aria-label="Menu categories">
          {menuCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-pill ${activeCategory === category ? 'filter-pill--active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="card-grid card-grid--menu">
          {filteredMenuItems.map((item) => (
            <article className="menu-card" key={item.name}>
              <div className="menu-card__image">
                <img src={item.image} alt={`Concept image for ${item.name}`} />
                {item.vegetarian ? <span className="badge">Vegetarian concept</span> : null}
              </div>
              <div className="menu-card__body">
                <div className="menu-card__header">
                  <h3>{item.name}</h3>
                  <span>{item.category}</span>
                </div>
                <p>{item.description}</p>
                <div className="menu-card__footer">
                  <strong>{item.priceLabel}</strong>
                  <span>Sample image</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="center-cta">
          <a className="button button--ghost" href="#menu">
            Explore Full Menu
          </a>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section section--alt" id="experience">
      <div className="container reveal">
        <div className="section-heading">
          <div>
            <p className="section-copy__eyebrow">Restaurant Experience</p>
            <h2>A Premium Dining Mood</h2>
          </div>
          <p>Elegant concepts that communicate the spirit of MALT without inventing unsupported claims.</p>
        </div>

        <div className="card-grid card-grid--experience">
          {experienceItems.map((item, index) => (
            <article className="feature-card" key={item.title}>
              <div className="feature-card__icon">
                {index === 0 ? <UtensilsCrossed size={22} /> : null}
                {index === 1 ? <Martini size={22} /> : null}
                {index === 2 ? <Music2 size={22} /> : null}
                {index === 3 ? <Users size={22} /> : null}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ activeGalleryCategory, setActiveGalleryCategory, filteredGalleryItems, onImageSelect }) {
  const galleryCategories = ['All', 'Food', 'Drinks', 'Interior', 'Events'];

  return (
    <section className="section" id="gallery">
      <div className="container reveal">
        <div className="section-heading">
          <div>
            <p className="section-copy__eyebrow">Gallery</p>
            <h2>Visual Concept Gallery</h2>
          </div>
          <p>Sample images are clearly marked as concept/demo placeholders and should be replaced with authentic photos.</p>
        </div>

        <div className="filter-row" role="tablist" aria-label="Gallery categories">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-pill ${activeGalleryCategory === category ? 'filter-pill--active' : ''}`}
              onClick={() => setActiveGalleryCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredGalleryItems.map((item) => (
            <button
              key={item.title}
              type="button"
              className="gallery-card"
              onClick={() => onImageSelect(item)}
              aria-label={`Open preview for ${item.title}`}
            >
              <img src={item.image} alt={`Concept gallery image: ${item.title}`} />
              <div className="gallery-card__overlay">
                <span>{item.category}</span>
                <strong>{item.title}</strong>
                <span>Concept/demo image</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section className="section section--alt" id="events">
      <div className="container events-layout reveal">
        <div className="events-layout__copy">
          <p className="section-copy__eyebrow">Live Music &amp; Events</p>
          <h2>Evenings Worth Remembering</h2>
          <p>Discover a welcoming atmosphere for dining, drinks, and entertainment.</p>
          <div className="events-note">
            <Music2 size={18} />
            <span>Live music concept</span>
          </div>
          <a className="button button--primary" href="#reservation">
            Reserve for an Evening
          </a>
        </div>

        <article className="event-card">
          <span className="event-card__label">Concept Event Card</span>
          <h3>{sampleEvent.title}</h3>
          <p>{sampleEvent.description}</p>
          <div className="event-card__meta">
            <div>
              <Clock3 size={16} />
              <span>Timing to be confirmed</span>
            </div>
            <div>
              <CalendarDays size={16} />
              <span>Date to be confirmed</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function ReservationSection({ formState, formErrors, formSuccess, onChange, onSubmit }) {
  return (
    <section className="section" id="reservation">
      <div className="container reservation-layout reveal">
        <div className="section-copy">
          <p className="section-copy__eyebrow">Reservation Demo</p>
          <h2>Request a Table</h2>
          <p>
            Submit a demo reservation request using the form below. No real booking will be created. Please contact the
            restaurant directly to confirm availability.
          </p>
          <div className="reservation-callout">
            <Phone size={18} />
            <div>
              <strong>Call Malt</strong>
              <a href="tel:+9779829004333">982-9004333</a>
            </div>
          </div>
        </div>

        <form className="reservation-form" onSubmit={onSubmit} noValidate>
          <div className="form-grid">
            <Field
              label="Full Name"
              name="fullName"
              value={formState.fullName}
              onChange={onChange}
              error={formErrors.fullName}
              placeholder="Your full name"
            />
            <Field
              label="Phone Number"
              name="phoneNumber"
              value={formState.phoneNumber}
              onChange={onChange}
              error={formErrors.phoneNumber}
              placeholder="982-9004333"
            />
            <Field
              label="Number of Guests"
              name="guests"
              type="number"
              value={formState.guests}
              onChange={onChange}
              error={formErrors.guests}
              min="1"
              max="20"
            />
            <Field
              label="Preferred Date"
              name="date"
              type="date"
              value={formState.date}
              onChange={onChange}
              error={formErrors.date}
            />
            <Field
              label="Preferred Time"
              name="time"
              type="time"
              value={formState.time}
              onChange={onChange}
              error={formErrors.time}
            />
            <Field
              label="Message"
              name="message"
              as="textarea"
              value={formState.message}
              onChange={onChange}
              placeholder="Special request, celebration, or seating preference"
            />
          </div>

          {formSuccess ? <p className="form-success">{formSuccess}</p> : null}

          <button className="button button--primary button--full" type="submit">
            Request a Table
          </button>
        </form>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section section--alt" id="contact">
      <div className="container contact-layout reveal">
        <div className="section-copy">
          <p className="section-copy__eyebrow">Location &amp; Contact</p>
          <h2>Malt Fine &amp; Dine Family Restaurant</h2>
          <p>3rd Floor, Adarshnagar Chowk, Rungta Mall, Birgunj 44300, Nepal</p>
          <p>
            Phone: <a href="tel:+9779829004333">982-9004333</a>
          </p>
          <div className="contact-actions">
            <a className="button button--primary" href="tel:+9779829004333">
              Call Now
            </a>
            <a
              className="button button--ghost"
              href="https://www.google.com/maps/search/?api=1&query=Rungta%20Mall%20Birgunj%20Nepal"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions
            </a>
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram placeholder link">
              <Instagram size={18} />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook placeholder link">
              <Facebook size={18} />
            </a>
          </div>
          <p className="concept-note">Opening hours and verified social links should be added after confirmation.</p>
        </div>

        <div className="location-card">
          <MapPinned size={30} />
          <h3>Birgunj Location</h3>
          <p>Use a verified map link before publishing the live site. This demo uses a search placeholder rather than invented coordinates.</p>
          <div className="location-card__meta">
            <span>Demo-friendly</span>
            <span>Editable contact details</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <div className="footer__brand">MALT</div>
          <p>MALT Fine &amp; Dine Family Restaurant / Lounge Bar concept for Birgunj, Nepal.</p>
        </div>
        <div className="footer__nav">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="footer__contact">
          <a href="tel:+9779829004333">982-9004333</a>
          <span>Concept website demo</span>
          <div className="footer__socials">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <Instagram size={18} />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Field({ label, name, value, onChange, error, as = 'input', ...rest }) {
  const id = `field-${name}`;
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      {as === 'textarea' ? (
        <textarea id={id} name={name} value={value} onChange={onChange} rows="4" {...rest} />
      ) : (
        <input id={id} name={name} value={value} onChange={onChange} {...rest} />
      )}
      {error ? <em>{error}</em> : null}
    </label>
  );
}

export default App;
