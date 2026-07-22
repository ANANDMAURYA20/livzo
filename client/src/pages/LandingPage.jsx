import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, ChevronDown, Utensils, Cctv, Phone, Mail, MapPin, Bus, CalendarHeart, HeartPulse, PartyPopper,
  PhoneCall, HeartHandshake, ShieldCheck, Info, Check, Shield, Lock, Users, Sparkles
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

const BRANCHES = [
  {
    id: 'yellow',
    name: 'Yellow House',
    type: 'Boys PG',
    tagline: 'Best Boys PG near Science City, Ahmedabad',
    location: 'Science City, Ahmedabad, Gujarat',
    price: '₹7,000',
    color: '#eab308', // yellow-500
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    highlights: [
      { title: 'AC & Non-AC', desc: 'Options for every budget' },
      { title: '9 Options', desc: 'Find your perfect fit' },
      { title: 'Switch Anytime', desc: 'Moving from Non-AC to AC mid-stay? We accommodate.' }
    ],
    pricing: [
      { label: '8 Sharing (Non-AC)', price: '₹7,000', badge: 'Best value' },
      { label: '6 Sharing (Non-AC)', price: '₹8,000' },
      { label: '5 Sharing (Non-AC)', price: '₹9,000' },
      { label: '4 Sharing (Non-AC)', price: '₹10,000' },
      { label: '8 Sharing (AC)', price: '₹8,000', badge: 'AC comfort' },
      { label: '6 Sharing (AC)', price: '₹9,000' },
      { label: '5 Sharing (AC)', price: '₹10,000' },
      { label: '4 Sharing (AC)', price: '₹11,000' },
      { label: '3 Sharing (AC)', price: '₹12,000', badge: 'Most premium' },
    ]
  },
  {
    id: 'purple',
    name: 'Purple House',
    type: 'Boys PG',
    tagline: 'Best Boys PG in Naranpura, Ahmedabad',
    location: '3H63+967, Sandhya, Pallav Flats, Ankur Rd, near Sanidhya Complex, Char Rasta, Naranpura, Ahmedabad, Gujarat 380013',
    price: '₹7,000',
    color: '#a855f7', // purple-500
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    highlights: [
      { title: 'IN Naranpura', desc: 'Competitors are 2.8 km away. We are right here.' },
      { title: '50% Cheaper', desc: 'Than Stanza Living properties nearby.' },
      { title: '6 Room Types', desc: 'From budget 6-sharing to fully private rooms.' }
    ],
    pricing: [
      { label: '6 Sharing', price: '₹7,000', badge: 'Budget pick' },
      { label: '5 Sharing', price: '₹7,500' },
      { label: '4 Sharing', price: '₹8,000' },
      { label: '3 Sharing', price: '₹8,500' },
      { label: '2 Sharing', price: '₹9,000' },
      { label: '1 Sharing (Private)', price: '₹16,000', badge: 'Most private' },
    ]
  },
  {
    id: 'pink',
    name: 'Pink House',
    type: 'Girls PG',
    tagline: 'Best Girls PG in Gota, Ahmedabad',
    location: '3rd Floor, Vrindavan Heights, Vandematram Rd, opposite Centre Point, Gota, Ahmedabad, Gujarat 382470',
    price: '₹8,000',
    color: '#ec4899', // pink-500
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    border: 'border-pink-200',
    highlights: [
      { title: '🔒 Security', desc: '24x7 CCTV surveillance · secure entry · no male visitor access after 9 PM' },
      { title: '👩 Female Staff', desc: 'Female caretaker on premises · dedicated women-only support' },
      { title: '✅ Parent Approved', desc: 'Share live room photos with parents · visit anytime before booking' }
    ],
    pricing: [
      { label: '8 Sharing (Bunk bed)', price: '₹8,000', badge: 'Best value' },
      { label: '7 Sharing (Single bed)', price: '₹12,000' },
      { label: '4 Sharing (Single bed)', price: '₹14,000' },
      { label: '3 Sharing (Single bed)', price: '₹16,000', badge: 'Most spacious' },
    ]
  }
];

const AMENITIES = [
  { icon: Utensils, title: 'Fresh Fruit Daily Breakfast', desc: 'Start your day right with fresh fruits served daily as part of your breakfast' },
  { icon: Bus, title: 'Transport Facilities', desc: 'Convenient transport facilities available for your daily commute and travel needs' },
  { icon: PartyPopper, title: 'Happy Saturday Night (Events)', desc: 'Engaging events and fun activities every Saturday night to unwind and relax' },
  { icon: HeartPulse, title: 'Emergency Medical Support', desc: '24/7 on-call medical support ensuring your health and safety are prioritized' },
  { icon: CalendarHeart, title: 'Festival Celebrations', desc: 'Joyous festival celebrations and resident activities to build a vibrant community' },
  { icon: PhoneCall, title: 'One Call. Instant Action.', desc: 'Dedicated support team available on one call for instant action and resolution' }
];

const FAQ = [
  { q: 'Is food included in the PG rent?', a: 'Yes, wholesome meals are included in most of our PG plans. Our girls PG includes special daily breakfast with fruits.' },
  { q: 'Is LIVZO safe for girls?', a: 'Absolutely. Our Pink House in Gota features 24/7 CCTV, secure entry, and is exclusively managed by female staff for complete safety and peace of mind.' },
  { q: 'Who can stay at LIVZO PG?', a: 'We welcome both students and working professionals looking for a clean, disciplined, and comfortable living environment.' },
  { q: 'How can I book a room?', a: 'You can select your preferred location above and click Book Now, or simply Call/WhatsApp us at +91 70462 67684 to schedule a visit.' },
  { q: 'What are the PG locations?', a: 'We have 3 premium branches in Ahmedabad: Yellow House (Science City), Purple House (Naranpura), and Pink House (Gota).' },
  { q: 'What is the starting price?', a: 'Our transparent pricing varies slightly by branch and room sharing type. Please contact us for the most up-to-date availability and pricing.' }
];

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-semibold text-text-primary pr-4">{faq.q}</span>
        <ChevronDown size={18} className={`text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-text-secondary leading-relaxed font-light">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col font-sans">
      {/* Dark Hero Section Wrapper */}
      <div className="bg-[#014C33] relative z-0 pb-20">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Navbar */}
        <nav className="sticky top-0 z-40 bg-[#014C33]/90 backdrop-blur-md border-b border-white/[0.1]">
          <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                <HeartHandshake size={16} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">LIVZO PG</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="btn bg-white text-[#014C33] hover:bg-white/90 px-5 py-2 text-sm rounded-[10px] shadow-sm font-semibold">
                Login
              </Link>
              <Link to="/contact" className="btn bg-white text-[#014C33] hover:bg-white/90 px-5 py-2 text-sm rounded-[10px] shadow-sm font-semibold">
                Contact Us
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-8 relative z-10 text-center">
          <motion.div {...fadeUp(0)} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs text-white font-medium tracking-wide">
              <ShieldCheck size={14} />
              Premium PG Accommodation in Ahmedabad
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 text-balance max-w-4xl mx-auto"
          >
            Live comfortably. <br />
            Live safely. <br />
            <span className="text-white/60">Live like family at LIVZO.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.14)} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            3 premium branches across Ahmedabad with modern amenities, wholesome meals, and a family-like environment for students and professionals.
          </motion.p>

          <motion.div {...fadeUp(0.18)} className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/contact" className="btn bg-white text-[#014C33] hover:bg-white/90 px-8 py-3.5 text-base rounded-[10px] shadow-lg font-semibold flex items-center gap-2">
              Book Your PG Today <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/917046267684" target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-white hover:bg-[#20bd5a] px-8 py-3.5 text-base rounded-[10px] shadow-lg font-semibold flex items-center gap-2">
              <Phone size={18} /> WhatsApp Us
            </a>
          </motion.div>
        </section>
      </div>

      {/* Community Stats */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 -mt-10 relative z-20 mb-24">
        <motion.div {...fadeUp(0.2)} className="bg-white rounded-[20px] shadow-modal border border-border p-6 md:p-10 flex flex-wrap justify-between gap-8 text-center">
          {[
            { v: '1000+', l: 'Consumers' },
            { v: '90', l: 'Rooms' },
            { v: '322', l: 'Beds' },
            { v: '3', l: 'Branches' }
          ].map(stat => (
            <div key={stat.l} className="flex-1 min-w-[120px]">
              <p className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.v}</p>
              <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">{stat.l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Detailed Branches */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mb-32">
        <motion.div {...fadeUp()} className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
            Our Premium PG Locations
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto font-light">
            Find the perfect home near your college or workplace. Every room includes: bed, mattress, cupboard, study table, chair, and power backup.
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {BRANCHES.map((b, idx) => (
            <motion.div key={b.id} {...fadeUp(0.1)} className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch relative bg-white rounded-3xl border-2 overflow-hidden shadow-xl" style={{ borderColor: b.color }}>
              {/* Branch Info (Left side) */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between" style={{ backgroundColor: b.color + '0A' }}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`px-4 py-1.5 rounded-full ${b.bg} ${b.text} ${b.border} border-2 text-sm font-bold uppercase tracking-widest shadow-sm`}>
                      {b.type}
                    </span>
                    <span className="text-sm font-bold text-text-primary bg-white border-2 border-black/10 px-4 py-1.5 rounded-full shadow-sm">
                      Starting {b.price}/mo
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-6xl font-black text-text-primary mb-4 tracking-tighter leading-none" style={{ color: b.color }}>
                    {b.name}
                  </h3>
                  <p className="text-xl md:text-2xl text-text-secondary font-medium mb-8 leading-snug text-balance">
                    {b.tagline}
                  </p>

                  <div className="flex items-start gap-3 text-text-primary mb-10 bg-white/60 p-4 rounded-xl border border-black/5">
                    <MapPin size={24} className="mt-1 flex-shrink-0" style={{ color: b.color }} />
                    <span className="text-base md:text-lg leading-relaxed font-medium">{b.location}</span>
                  </div>

                  <div className="space-y-6 mb-10">
                    {b.highlights.map(h => (
                      <div key={h.title} className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-black/5" style={{ color: b.color }}>
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-text-primary tracking-tight mb-1">{h.title}</p>
                          <p className="text-base text-text-secondary font-medium leading-relaxed">{h.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-auto pt-4">
                  <Link to="/contact" className="py-4 px-8 rounded-2xl flex items-center justify-center gap-3 font-bold flex-1 text-white shadow-lg text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]" style={{ backgroundColor: b.color }}>
                    Schedule a Visit <ArrowRight size={20} />
                  </Link>
                </div>
              </div>

              {/* Pricing Grid (Right side) */}
              <div className="flex-1 bg-white p-8 lg:p-12 border-l border-black/10 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-black/5">
                  <div>
                    <h4 className="text-2xl font-black text-text-primary tracking-tight">Room Pricing</h4>
                    <p className="text-base font-medium text-text-muted mt-1">{b.pricing.length} options available</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-1">Starts from</p>
                    <p className="text-3xl font-black" style={{ color: b.color }}>{b.price}<span className="text-lg font-medium text-text-muted">/mo</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {b.pricing.map(p => (
                    <div key={p.label} className="p-5 rounded-2xl border-2 border-black/5 bg-gray-50/50 relative hover:border-black/20 transition-colors">
                      {p.badge && (
                        <span className={`absolute -top-3 -right-3 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-lg border-2 shadow-md ${b.bg} ${b.text} ${b.border}`}>
                          {p.badge}
                        </span>
                      )}
                      <p className="text-base font-bold text-text-primary mb-2 tracking-tight">{p.label}</p>
                      <p className="text-2xl font-black tracking-tight" style={{ color: b.color }}>{p.price}<span className="text-sm font-semibold text-text-muted">/mo</span></p>
                    </div>
                  ))}
                </div>

                <p className="text-xs font-medium text-text-muted mt-8 leading-relaxed bg-gray-50 p-4 rounded-xl border border-black/5">
                  *Denotes starting price inclusive of taxes. Final prices may vary based on room occupancy, customized services, and additional attributes.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-white border-y border-border py-24 mb-32">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              World class amenities
            </h2>
            <p className="text-text-secondary text-base max-w-xl mx-auto font-light">
              Everything you need for a comfortable and productive life as a student or professional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {AMENITIES.map((a, i) => (
              <motion.div key={a.title} {...fadeUp(i * 0.05)} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-[rgba(1,107,70,0.08)] flex items-center justify-center flex-shrink-0">
                  <a.icon size={22} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2 tracking-tight">{a.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-light">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Workflow */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl font-bold text-text-primary mb-6 tracking-tight">
              Why Choose LIVZO PG?
            </h2>
            <div className="space-y-4">
              {[
                'Family-like living environment — feel at home from day one',
                'Clean, disciplined & hygienic lifestyle',
                'Transparent pricing — no hidden charges',
                'Professional full-time management team',
                '3 convenient locations across Ahmedabad',
                'Trusted by 1000+ consumers & working professionals'
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={14} className="text-accent" />
                  </div>
                  <span className="text-base text-text-secondary leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="bg-white rounded-card p-8 border border-border shadow-sm">
            <h3 className="text-xl font-bold text-text-primary mb-8 tracking-tight">
              Simple & Hassle-Free Booking Process
            </h3>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {[
                { step: '1', title: 'Choose Location', desc: 'Select from Science City, Naranpura, or Gota' },
                { step: '2', title: 'Call / WhatsApp', desc: 'Contact us to check availability — +91 70462 67684' },
                { step: '3', title: 'Visit the PG', desc: 'Schedule a visit to see the rooms in person' },
                { step: '4', title: 'Move In Comfortably', desc: 'Complete booking & move into your new home' }
              ].map((s, i) => (
                <div key={s.step} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-white text-text-primary font-bold shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    {s.step}
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-btn border border-border bg-bg shadow-sm">
                    <h4 className="font-semibold text-text-primary mb-1 text-sm">{s.title}</h4>
                    <p className="text-xs text-text-secondary font-light">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 mb-32">
        <motion.div {...fadeUp()} className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>
        <motion.div {...fadeUp(0.1)} className="bg-white rounded-card p-2 border border-border shadow-sm">
          {FAQ.map((faq) => (
            <div key={faq.q} className="px-4">
              <FAQItem faq={faq} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-32">
        <motion.div {...fadeUp()} className="vf-card bg-white p-10 md:p-16 text-center shadow-lg border border-border">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-5 tracking-tight text-balance">
            Looking for the Best PG in Ahmedabad?
          </h2>
          <p className="text-text-secondary text-base mb-10 max-w-xl mx-auto font-light">
            Don't compromise on your comfort and safety. Contact us today to schedule a visit and experience the LIVZO difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+917046267684" className="w-full sm:w-auto btn-primary btn-lg flex items-center justify-center gap-2 px-8 py-3.5 shadow-sm font-semibold">
              <Phone size={18} /> Call Now
            </a>
            <Link to="/contact" className="w-full sm:w-auto btn-secondary btn-lg flex items-center justify-center gap-2 px-8 py-3.5 font-semibold">
              Schedule a Visit Today
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <HeartHandshake size={16} className="text-white" />
                </div>
                <span className="text-lg font-bold text-text-primary tracking-tight">LIVZO</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed font-light mb-4">
                PG for students & working professionals in Gota | Naranpura | Science City
              </p>
              <div className="flex flex-col gap-2">
                <a href="mailto:livzoindia@gmail.com" className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2">
                  <Mail size={14} /> livzoindia@gmail.com
                </a>
                <a href="tel:+917046267684" className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2">
                  <Phone size={14} /> +91 70462 67684
                </a>
              </div>
            </div>

            <div className="flex gap-12">
              <div>
                <p className="text-sm font-bold text-text-primary mb-4 tracking-tight">Locations</p>
                <div className="space-y-2.5">
                  <span className="block text-sm text-text-muted font-light">PG in Science City (Boys)</span>
                  <span className="block text-sm text-text-muted font-light">PG in Naranpura (Boys)</span>
                  <span className="block text-sm text-text-muted font-light">PG in Gota (Girls)</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary mb-4 tracking-tight">Legal</p>
                <div className="space-y-2.5">
                  <Link to="#" className="block text-sm text-text-muted hover:text-accent transition-colors font-light">Privacy Policy</Link>
                  <Link to="#" className="block text-sm text-text-muted hover:text-accent transition-colors font-light">Terms of Service</Link>
                  <Link to="#" className="block text-sm text-text-muted hover:text-accent transition-colors font-light">Refund Policy</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="vf-divider mt-10 mb-6" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-muted font-light">
              © {new Date().getFullYear()} LIVZO. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] text-text-muted opacity-50 max-w-md hidden md:block">SEO Keywords: PG in Gota, PG in Naranpura, PG in Science City, Boys PG Ahmedabad, Girls PG Ahmedabad</span>
              <Link to="/login" className="text-xs text-text-muted hover:text-accent font-medium transition-colors">Admin Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
