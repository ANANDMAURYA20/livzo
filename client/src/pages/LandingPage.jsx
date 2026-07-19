import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Users,
  CalendarCheck,
  Search,
  BarChart3,
  MessageCircle,
  Clock,
  ArrowRight,
  Check,
  ChevronRight,
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

const FEATURES = [
  {
    icon: Users,
    title: 'Inquiry Management',
    desc: 'Capture and organize every lead with full contact details, budget, and property preferences in one place.',
  },
  {
    icon: Clock,
    title: 'Visitor Tracking',
    desc: 'Track every visitor from first inquiry to move-in. Know exactly where each prospect stands.',
  },
  {
    icon: CalendarCheck,
    title: 'Visit Scheduling',
    desc: 'Schedule property visits, send reminders, and manage your calendar with ease.',
  },
  {
    icon: Search,
    title: 'Smart Search & Filter',
    desc: 'Find any inquiry instantly with powerful search and multi-dimensional filtering.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    desc: 'Understand your pipeline with conversion charts, branch performance, and monthly trends.',
  },
  {
    icon: MessageCircle,
    title: 'AI Follow-up',
    desc: 'Generate personalized WhatsApp messages instantly using AI — mention name, budget, and visit date.',
  },
];

const WORKFLOW_STEPS = [
  { step: '01', label: 'New', desc: 'Inquiry received' },
  { step: '02', label: 'Contacted', desc: 'Initial contact made' },
  { step: '03', label: 'Visit Scheduled', desc: 'Site visit booked' },
  { step: '04', label: 'Joined / Rejected', desc: 'Outcome recorded' },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-semibold text-sm">VisitorFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost text-sm">Log in</Link>
            <Link to="/inquiries/create" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-20 pb-24 text-center">
        <motion.div {...fadeUp(0)} className="mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs text-accent font-medium">
            <Zap size={11} />
            Visitor & Inquiry Management Platform
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="text-4xl md:text-5xl lg:text-[56px] font-semibold text-white leading-[1.15] tracking-tight mb-5 text-balance"
        >
          Track every inquiry.
          <br />
          Convert more visitors.
          <br />
          <span className="text-text-secondary">Manage everything from one dashboard.</span>
        </motion.h1>

        <motion.p {...fadeUp(0.14)} className="text-base text-text-muted max-w-xl mx-auto mb-8 leading-relaxed">
          Capture inquiries, schedule visits, monitor lead status, and follow up with prospects through one
          clean workflow built for admissions, real estate, and customer-facing teams.
        </motion.p>

        <motion.div {...fadeUp(0.18)} className="flex items-center justify-center gap-3 flex-wrap">
          <Link to="/inquiries/create" className="btn-primary btn-lg flex items-center gap-2">
            Create Inquiry <ArrowRight size={15} />
          </Link>
          <Link to="/login" className="btn-secondary btn-lg flex items-center gap-2">
            Open Dashboard <ChevronRight size={15} />
          </Link>
        </motion.div>
      </section>

      {/* Dashboard Preview */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-24">
        <motion.div {...fadeUp(0.1)}>
          <div className="vf-card overflow-hidden">
            <div className="bg-panel border-b border-white/[0.06] px-4 py-3 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="text-xs text-text-muted ml-2">VisitorFlow — Dashboard</span>
            </div>

            {/* Mock dashboard UI */}
            <div className="p-6">
              {/* Stat cards */}
              <div className="grid grid-cols-5 gap-3 mb-5">
                {[
                  { label: 'Total Inquiries', val: '284', color: '#3b82f6' },
                  { label: "Today's Visitors", val: '12', color: '#f59e0b' },
                  { label: 'Visit Scheduled', val: '38', color: '#a855f7' },
                  { label: 'Joined', val: '91', color: '#22c55e' },
                  { label: 'Rejected', val: '43', color: '#ef4444' },
                ].map((s) => (
                  <div key={s.label} className="bg-panel rounded-card p-4 border border-white/[0.06]">
                    <p className="text-xs text-text-muted mb-2">{s.label}</p>
                    <p className="text-xl font-semibold" style={{ color: s.color }}>{s.val}</p>
                  </div>
                ))}
              </div>

              {/* Mini table */}
              <div className="bg-panel rounded-card border border-white/[0.06] overflow-hidden">
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-xs font-medium text-text-primary">Recent Inquiries</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.04]">
                        {['Name', 'Branch', 'Budget', 'Status', 'Created'].map(h => (
                          <th key={h} className="text-left px-4 py-2 text-text-muted font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Aarav Mehta', 'Koramangala', '₹18,000', 'New', '2h ago'],
                        ['Priya Sharma', 'Indiranagar', '₹12,000', 'Contacted', '5h ago'],
                        ['Rohan Gupta', 'Whitefield', '₹22,000', 'Visit Scheduled', 'Yesterday'],
                        ['Sneha Patel', 'HSR Layout', '₹9,500', 'Joined', '2d ago'],
                      ].map(([name, branch, budget, status, created]) => (
                        <tr key={name} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                          <td className="px-4 py-2.5 text-text-primary font-medium">{name}</td>
                          <td className="px-4 py-2.5 text-text-secondary">{branch}</td>
                          <td className="px-4 py-2.5 text-text-secondary">{budget}</td>
                          <td className="px-4 py-2.5">
                            <span className={`badge ${
                              status === 'New' ? 'badge-new' :
                              status === 'Contacted' ? 'badge-contacted' :
                              status === 'Visit Scheduled' ? 'badge-visit' :
                              'badge-joined'
                            }`}>{status}</span>
                          </td>
                          <td className="px-4 py-2.5 text-text-muted">{created}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-24">
        <motion.div {...fadeUp()} className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Everything you need to convert inquiries
          </h2>
          <p className="text-text-muted text-sm max-w-md mx-auto">
            From first contact to move-in, VisitorFlow gives your team the tools to close more leads.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp(i * 0.05)}
              className="vf-card-hover p-5"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <f.icon size={15} className="text-accent" />
              </div>
              <h3 className="text-sm font-medium text-text-primary mb-2">{f.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-24">
        <motion.div {...fadeUp()} className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            A simple, powerful workflow
          </h2>
          <p className="text-text-muted text-sm">Follow every inquiry from start to finish</p>
        </motion.div>

        <div className="flex items-center justify-center gap-0 flex-wrap">
          {WORKFLOW_STEPS.map((step, i) => (
            <motion.div key={step.step} {...fadeUp(i * 0.08)} className="flex items-center">
              <div className="flex flex-col items-center text-center w-36">
                <div className="w-10 h-10 rounded-full bg-panel border border-white/[0.08] flex items-center justify-center mb-3">
                  <span className="text-xs font-semibold text-accent">{step.step}</span>
                </div>
                <p className="text-sm font-medium text-text-primary mb-0.5">{step.label}</p>
                <p className="text-xs text-text-muted">{step.desc}</p>
              </div>
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="flex items-center mx-2 mb-8">
                  <div className="h-px w-8 bg-white/[0.08]" />
                  <ChevronRight size={12} className="text-text-muted" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI WhatsApp Preview */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div {...fadeUp()}>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400 font-medium mb-4">
              <MessageCircle size={10} />
              AI Powered
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
              Generate WhatsApp follow-ups in one click
            </h2>
            <p className="text-text-muted text-sm leading-relaxed mb-5">
              Our AI crafts personalized, professional WhatsApp messages mentioning the customer's name,
              branch, visit date, and budget — all under 80 words.
            </p>
            <div className="space-y-2">
              {['Personalized for each inquiry', 'Under 80 words — perfect for WhatsApp', 'Copy and send instantly', 'Works without OpenAI key (template fallback)'].map(point => (
                <div key={point} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Check size={9} className="text-green-400" />
                  </div>
                  <span className="text-xs text-text-secondary">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <div className="vf-card p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-text-primary">WhatsApp Message Generator</p>
                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">AI</span>
              </div>
              <div className="bg-panel rounded-btn p-3 border border-white/[0.06] mb-3 text-xs text-text-secondary leading-relaxed">
                Hi Aarav! 👋 Thank you for your inquiry at <strong className="text-text-primary">Koramangala</strong>. We're excited to show you our{' '}
                <strong className="text-text-primary">1BHK options</strong> within your budget of <strong className="text-text-primary">₹18,000</strong>.
                Your visit is scheduled for <strong className="text-text-primary">25 Jul 2024</strong>. We look forward to meeting you! 😊
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary btn-sm flex-1">Copy</button>
                <button className="btn-accent btn-sm flex-1 flex items-center justify-center gap-1.5">
                  <MessageCircle size={12} />
                  Open WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-24">
        <motion.div {...fadeUp()} className="vf-card p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Start managing your inquiries today
          </h2>
          <p className="text-text-muted text-sm mb-6">
            Join teams using VisitorFlow to convert more leads with less effort.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/inquiries/create" className="btn-primary btn-lg flex items-center gap-2">
              Create Inquiry <ArrowRight size={15} />
            </Link>
            <Link to="/login" className="btn-secondary btn-lg">
              View Dashboard
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">VisitorFlow</p>
              <p className="text-xs text-text-muted">Modern Visitor & Inquiry Management Platform</p>
            </div>
          </div>
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} VisitorFlow. Built with ♥
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
