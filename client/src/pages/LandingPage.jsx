import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  CalendarCheck,
  Search,
  BarChart3,
  MessageCircle,
  ArrowRight,
  Check,
  ChevronRight,
  Building2,
  Phone,
  Globe,
  UserPlus,
  ClipboardList,
  Shield,
  Activity,
  TrendingUp,
  Filter,
  Sparkles,
  Copy,
  RefreshCw,
  Home,
  LayoutDashboard,
  Bell,
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

const FEATURES = [
  {
    icon: ClipboardList,
    title: 'Inquiry Management',
    desc: 'Capture every lead from website forms, WhatsApp, phone calls, and walk-ins — all in one unified inbox with full contact and budget details.',
  },
  {
    icon: Users,
    title: 'Visitor Tracking',
    desc: 'Track every prospect from the moment they inquire to their move-in date. See exactly where each lead stands across all branches.',
  },
  {
    icon: CalendarCheck,
    title: 'Visit Scheduling',
    desc: 'Schedule property tours, assign time slots, and keep your team aligned with a centralized visit calendar for every branch.',
  },
  {
    icon: Building2,
    title: 'Branch Management',
    desc: 'Manage multiple PG locations, assign branch-specific teams, track branch performance, and compare occupancy rates side by side.',
  },
  {
    icon: MessageCircle,
    title: 'AI WhatsApp Follow-up',
    desc: 'Generate personalized WhatsApp follow-up messages in one click — AI includes name, budget, visit date, and property preferences.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    desc: 'Monitor conversion funnels, branch performance, occupancy trends, and monthly inquiry volume with real-time charts and data.',
  },
  {
    icon: Search,
    title: 'Search & Filter',
    desc: 'Find any inquiry instantly with powerful multi-field search. Filter by status, branch, budget range, source, date, and more.',
  },
];

const WORKFLOW_STEPS = [
  { step: '01', label: 'Website Inquiry', desc: 'Lead captured', badge: 'badge-new' },
  { step: '02', label: 'Contacted', desc: 'Initial outreach made', badge: 'badge-contacted' },
  { step: '03', label: 'Visit Scheduled', desc: 'Property tour booked', badge: 'badge-visit' },
  { step: '04', label: 'Admission Confirmed', desc: 'Agreement signed', badge: 'badge-joined' },
  { step: '05', label: 'Move-In', desc: 'Resident onboarded', badge: 'badge-joined' },
];

const ADMIN_FEATURES = [
  { icon: ClipboardList, label: 'Manage Inquiries', desc: 'Full CRUD with status tracking' },
  { icon: Users, label: 'Manage Visitors', desc: 'Walk-in and scheduled visit logs' },
  { icon: Building2, label: 'Manage Branches', desc: 'Multi-location operations' },
  { icon: Shield, label: 'Manage Users', desc: 'Role-based access control' },
  { icon: Filter, label: 'Search & Filter', desc: 'Advanced multi-field queries' },
  { icon: Activity, label: 'Status Updates', desc: 'Real-time pipeline management' },
  { icon: Sparkles, label: 'AI Follow-ups', desc: 'One-click WhatsApp messages' },
  { icon: BarChart3, label: 'Analytics', desc: 'Branch and conversion reports' },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col">
      {/* Dark Hero Section Wrapper */}
      <div className="bg-[#014C33] relative z-0 pb-16">
        {/* Background grid */}
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
                <LayoutDashboard size={16} className="text-white" />
              </div>
              <span className="font-semibold text-white text-base tracking-tight">LIVZO Command Center</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost text-white hover:bg-white/10 text-sm">Log in</Link>
            <Link to="/dashboard" className="btn bg-white text-[#014C33] hover:bg-white/90 px-4 py-2 text-sm rounded-[10px] shadow-sm font-semibold">
              Open Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div {...fadeUp(0)} className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-white font-medium tracking-wide">
                <Shield size={12} />
                Internal Operations Platform
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 text-balance"
            >
              Manage Every Inquiry.
              <br />
              Schedule Every Visit.
              <br />
              <span className="text-white/60">Welcome Every Resident.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.14)} className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed font-light">
              A centralized platform for managing inquiries, scheduling property visits, tracking admissions, generating AI-powered follow-ups, and monitoring every lead across all LIVZO branches.
            </motion.p>

            <motion.div {...fadeUp(0.18)} className="flex items-center gap-4 flex-wrap">
              <Link to="/dashboard" className="btn bg-white text-[#014C33] hover:bg-white/90 px-6 py-3 text-base rounded-[10px] shadow-lg font-semibold flex items-center gap-2">
                Open Dashboard <ArrowRight size={18} />
              </Link>
              <Link to="/inquiries/create" className="btn bg-white/10 text-white hover:bg-white/20 border border-white/20 px-6 py-3 text-base rounded-[10px] font-semibold flex items-center gap-2">
                Create Inquiry <ChevronRight size={18} />
              </Link>
            </motion.div>
          </div>

          {/* Right: Mini CRM Dashboard (Light Theme) */}
          <motion.div {...fadeUp(0.12)}>
            <div className="bg-card rounded-card shadow-modal overflow-hidden border border-border">
              <div className="bg-[#f8fafc] border-b border-border px-4 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-[11px] font-medium text-text-muted ml-2">LIVZO — Command Center</span>
              </div>
              <div className="p-4 bg-white">
                {/* Mini stat row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Today's Inquiries", val: '14', color: '#016B46' },
                    { label: 'Pending Follow-ups', val: '8', color: '#f59e0b' },
                    { label: 'Visits Today', val: '5', color: '#a855f7' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-card p-3 border border-border shadow-sm">
                      <p className="eyebrow mb-1.5">{s.label}</p>
                      <p className="text-xl font-bold tracking-tight" style={{ color: s.color }}>{s.val}</p>
                    </div>
                  ))}
                </div>
                {/* Mini table */}
                <div className="bg-white rounded-card border border-border overflow-hidden shadow-sm">
                  <div className="px-3 py-2.5 border-b border-border flex items-center justify-between bg-bg">
                    <p className="text-xs font-semibold text-text-primary tracking-tight">Recent Inquiries</p>
                    <div className="flex items-center gap-1.5">
                      <div className="h-6 rounded-btn bg-white border border-border flex items-center px-2">
                        <Search size={10} className="text-text-muted" />
                        <span className="text-[9px] text-text-muted ml-1.5 font-medium">Search</span>
                      </div>
                    </div>
                  </div>
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-border bg-[rgba(1,107,70,0.02)]">
                        {['Name', 'Source', 'Branch', 'Status'].map(h => (
                          <th key={h} className="text-left px-3 py-2 text-text-muted font-semibold uppercase tracking-wider text-[9px]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Aarav Mehta', 'Website', 'Koramangala', 'New'],
                        ['Priya Sharma', 'WhatsApp', 'Indiranagar', 'Contacted'],
                        ['Rohan Gupta', 'Walk-in', 'Whitefield', 'Visit Scheduled'],
                        ['Sneha Patel', 'Phone', 'HSR Layout', 'Joined'],
                      ].map(([name, source, branch, status]) => (
                        <tr key={name} className="border-b border-border hover:bg-[rgba(1,107,70,0.02)]">
                          <td className="px-3 py-2.5 text-text-primary font-medium">{name}</td>
                          <td className="px-3 py-2.5 text-text-secondary">{source}</td>
                          <td className="px-3 py-2.5 text-text-secondary">{branch}</td>
                          <td className="px-3 py-2.5">
                            <span className={`badge ${
                              status === 'New' ? 'badge-new' :
                              status === 'Contacted' ? 'badge-contacted' :
                              status === 'Visit Scheduled' ? 'badge-visit' :
                              'badge-joined'
                            }`}>{status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>

      {/* Dashboard Preview */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-24">
        <motion.div {...fadeUp()} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
            Your operations command center
          </h2>
          <p className="text-text-secondary text-base max-w-lg mx-auto">
            A real-time overview of every inquiry, visit, admission, and follow-up across all LIVZO branches.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <div className="vf-card overflow-hidden">
            <div className="bg-bg border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="text-[11px] font-medium text-text-muted ml-2">LIVZO Command Center — Dashboard</span>
            </div>

            <div className="p-6 bg-white">
              {/* Stat cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
                {[
                  { label: "Today's Inquiries", val: '24', color: '#016B46', icon: ClipboardList },
                  { label: 'Pending Follow-ups', val: '16', color: '#f59e0b', icon: Bell },
                  { label: 'Visits Scheduled', val: '9', color: '#a855f7', icon: CalendarCheck },
                  { label: 'Admissions (MTD)', val: '42', color: '#22c55e', icon: UserPlus },
                  { label: 'Revenue (MTD)', val: '₹7.2L', color: '#016B46', icon: TrendingUp },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-card p-4 border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <p className="eyebrow">{s.label}</p>
                      <div className="w-6 h-6 rounded-lg bg-[rgba(1,107,70,0.06)] flex items-center justify-center">
                        <s.icon size={12} style={{ color: s.color }} />
                      </div>
                    </div>
                    <p className="text-xl font-bold tracking-tight" style={{ color: s.color }}>{s.val}</p>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                {/* Line chart mock */}
                <div className="md:col-span-2 bg-white rounded-card border border-border p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-semibold text-text-primary tracking-tight">Monthly Inquiries</p>
                      <p className="text-[11px] text-text-secondary">Inquiry volume over the last 6 months</p>
                    </div>
                    <span className="text-[10px] text-text-muted bg-[rgba(1,107,70,0.04)] px-2 py-1 rounded-badge border border-border font-medium">6 months</span>
                  </div>
                  <div className="h-28 flex items-end gap-1.5">
                    {[
                      { month: 'Feb', h: 35 },
                      { month: 'Mar', h: 52 },
                      { month: 'Apr', h: 44 },
                      { month: 'May', h: 68 },
                      { month: 'Jun', h: 58 },
                      { month: 'Jul', h: 82 },
                    ].map((bar) => (
                      <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5">
                        <div
                          className="w-full rounded-t-[4px] bg-accent/80"
                          style={{ height: `${bar.h}%` }}
                        />
                        <span className="text-[10px] font-medium text-text-muted">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status distribution */}
                <div className="bg-white rounded-card border border-border p-4 shadow-sm">
                  <p className="text-sm font-semibold text-text-primary mb-4 tracking-tight">Status Distribution</p>
                  <div className="space-y-3">
                    {[
                      { status: 'New', count: 48, color: '#016B46', pct: 34 },
                      { status: 'Contacted', count: 31, color: '#f59e0b', pct: 22 },
                      { status: 'Visit Scheduled', count: 26, color: '#a855f7', pct: 18 },
                      { status: 'Joined', count: 24, color: '#22c55e', pct: 17 },
                      { status: 'Rejected', count: 13, color: '#ef4444', pct: 9 },
                    ].map((item) => (
                      <div key={item.status}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-medium text-text-secondary">{item.status}</span>
                          <span className="text-[11px] font-bold text-text-primary">{item.count}</span>
                        </div>
                        <div className="h-1.5 bg-[rgba(1,107,70,0.06)] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent inquiries table */}
              <div className="bg-white rounded-card border border-border overflow-hidden shadow-sm">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-bg">
                  <p className="text-sm font-semibold text-text-primary tracking-tight">Recent Inquiries</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-white border border-border rounded-btn px-2.5 py-1.5">
                      <Search size={12} className="text-text-muted" />
                      <span className="text-[11px] text-text-muted font-medium">Search inquiries...</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white border border-border rounded-btn px-2.5 py-1.5">
                      <Filter size={12} className="text-text-muted" />
                      <span className="text-[11px] text-text-muted font-medium">Filters</span>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border bg-[rgba(1,107,70,0.02)]">
                        {['Name', 'Source', 'Branch', 'Budget', 'Status', 'Follow-up', 'Created'].map(h => (
                          <th key={h} className="text-left px-4 py-2.5 text-text-muted font-semibold uppercase tracking-wider text-[10px]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Aarav Mehta', 'Website', 'Koramangala', '₹18,000', 'New', 'Pending', '2h ago'],
                        ['Priya Sharma', 'WhatsApp', 'Indiranagar', '₹12,000', 'Contacted', 'Sent', '5h ago'],
                        ['Rohan Gupta', 'Walk-in', 'Whitefield', '₹22,000', 'Visit Scheduled', '—', 'Yesterday'],
                        ['Sneha Patel', 'Phone', 'HSR Layout', '₹9,500', 'Joined', 'Completed', '2d ago'],
                        ['Vikram Singh', 'Website', 'BTM Layout', '₹15,000', 'Contacted', 'Pending', '3d ago'],
                      ].map(([name, source, branch, budget, status, followup, created]) => (
                        <tr key={name} className="border-b border-border hover:bg-[rgba(1,107,70,0.02)]">
                          <td className="px-4 py-3 text-text-primary font-semibold">{name}</td>
                          <td className="px-4 py-3 text-text-secondary">
                            <span className="inline-flex items-center gap-1.5">
                              {source === 'Website' && <Globe size={12} className="text-text-muted" />}
                              {source === 'WhatsApp' && <MessageCircle size={12} className="text-text-muted" />}
                              {source === 'Walk-in' && <Users size={12} className="text-text-muted" />}
                              {source === 'Phone' && <Phone size={12} className="text-text-muted" />}
                              {source}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-text-secondary">{branch}</td>
                          <td className="px-4 py-3 text-text-secondary font-medium">{budget}</td>
                          <td className="px-4 py-3">
                            <span className={`badge ${
                              status === 'New' ? 'badge-new' :
                              status === 'Contacted' ? 'badge-contacted' :
                              status === 'Visit Scheduled' ? 'badge-visit' :
                              'badge-joined'
                            }`}>{status}</span>
                          </td>
                          <td className="px-4 py-3 text-text-muted font-medium">{followup}</td>
                          <td className="px-4 py-3 text-text-muted">{created}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Activity feed */}
                <div className="px-4 py-4 border-t border-border bg-white">
                  <p className="eyebrow mb-3">Activity Feed</p>
                  <div className="space-y-2.5">
                    {[
                      { text: 'Priya Sharma moved to Contacted', time: '5m ago', color: '#f59e0b' },
                      { text: 'Visit scheduled for Rohan Gupta — Whitefield', time: '22m ago', color: '#a855f7' },
                      { text: 'New inquiry from website — Aarav Mehta', time: '2h ago', color: '#016B46' },
                    ].map((activity) => (
                      <div key={activity.text} className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: activity.color }} />
                        <span className="text-[11px] font-medium text-text-secondary flex-1">{activity.text}</span>
                        <span className="text-[10px] text-text-muted font-medium">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-32">
        <motion.div {...fadeUp()} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
            Everything your admissions team needs
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto font-light">
            From capturing the first inquiry to welcoming a new resident, LIVZO Command Center gives your team complete control.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp(i * 0.05)}
              className="vf-card-hover bg-white p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(1,107,70,0.08)] flex items-center justify-center mb-5">
                <f.icon size={18} className="text-accent" />
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2.5 tracking-tight">{f.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-32">
        <motion.div {...fadeUp()} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
            From inquiry to move-in
          </h2>
          <p className="text-text-secondary text-base font-light">Every lead follows a structured pipeline — no one falls through the cracks</p>
        </motion.div>

        {/* Desktop: Horizontal */}
        <div className="hidden md:flex items-start justify-center gap-2">
          {WORKFLOW_STEPS.map((step, i) => (
            <motion.div key={step.step} {...fadeUp(i * 0.08)} className="flex items-start">
              <div className="flex flex-col items-center text-center w-40">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-border flex items-center justify-center mb-4 relative z-10">
                  <span className="text-sm font-bold text-accent">{step.step}</span>
                </div>
                <p className="text-base font-semibold text-text-primary mb-1 tracking-tight">{step.label}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="flex items-center mx-1 mt-6">
                  <div className="h-px w-10 bg-border" />
                  <ChevronRight size={14} className="text-text-muted" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: Vertical */}
        <div className="md:hidden space-y-0 pl-4">
          {WORKFLOW_STEPS.map((step, i) => (
            <motion.div key={step.step} {...fadeUp(i * 0.06)}>
              <div className="flex items-start gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-border flex items-center justify-center relative z-10">
                    <span className="text-xs font-bold text-accent">{step.step}</span>
                  </div>
                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div className="w-px h-12 bg-border -mt-1" />
                  )}
                </div>
                <div className="pt-2 pb-6">
                  <p className="text-base font-semibold text-text-primary mb-1 tracking-tight">{step.label}</p>
                  <p className="text-sm text-text-secondary">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Outcome badges */}
        <motion.div {...fadeUp(0.3)} className="flex items-center justify-center gap-3 mt-8">
          <span className="badge-joined">✓ Move-In Complete</span>
          <span className="text-xs text-text-muted">or</span>
          <span className="badge-rejected">✗ Rejected</span>
        </motion.div>
      </section>

      {/* AI WhatsApp Preview */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp()}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-600 font-bold mb-6 tracking-wide uppercase">
              <Sparkles size={12} />
              AI Powered
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-5 leading-tight tracking-tight">
              Generate WhatsApp follow-ups in one click
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-8 font-light">
              LIVZO's AI engine crafts personalized, professional WhatsApp messages that mention the prospect's name,
              preferred branch, visit date, and budget — ready to copy and send in seconds.
            </p>
            <div className="space-y-2">
              {[
                'Personalized for each inquiry — name, branch, budget',
                'Under 80 words — optimized for WhatsApp',
                'Copy and send instantly from the inquiry detail page',
                'Template fallback when AI is unavailable',
              ].map(point => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-text-secondary">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <div className="vf-card bg-white p-6">
              {/* Customer card */}
              <div className="bg-bg rounded-btn p-4 border border-border mb-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-accent">AM</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-text-primary tracking-tight">Aarav Mehta</p>
                    <p className="text-xs text-text-secondary">Koramangala • ₹18,000/mo • Visit: 25 Jul</p>
                  </div>
                  <span className="badge-new ml-auto font-bold px-2 py-1">New</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-text-primary tracking-tight">Generated Message</p>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-600 px-2.5 py-1 rounded-full border border-green-500/20 flex items-center gap-1.5">
                  <Sparkles size={10} />
                  AI
                </span>
              </div>
              <div className="bg-bg rounded-btn p-4 border border-border mb-4 text-sm text-text-secondary leading-relaxed font-light">
                Hi Aarav! 👋 Thank you for your inquiry at <strong className="font-semibold text-text-primary">LIVZO Koramangala</strong>. We're excited to show you our{' '}
                <strong className="font-semibold text-text-primary">premium PG options</strong> within your budget of <strong className="font-semibold text-text-primary">₹18,000/month</strong>.
                Your visit is scheduled for <strong className="font-semibold text-text-primary">25 Jul 2024</strong>. We look forward to welcoming you! 😊
              </div>
              <div className="flex gap-3">
                <button className="btn-secondary btn-sm flex-1 flex items-center justify-center gap-2 py-2">
                  <Copy size={14} />
                  Copy
                </button>
                <button className="btn-accent btn-sm flex-1 flex items-center justify-center gap-2 py-2">
                  <RefreshCw size={14} />
                  Generate Again
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-32">
        <motion.div {...fadeUp()} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
            Data-driven decisions for every branch
          </h2>
          <p className="text-text-secondary text-base max-w-lg mx-auto font-light">
            Monitor conversion funnels, occupancy rates, and branch performance in real time.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Monthly Inquiries', value: '142', sub: '+18% vs last month', icon: ClipboardList, color: '#016B46' },
              { label: 'Branch Performance', value: '6 branches', sub: 'Koramangala leads', icon: Building2, color: '#a855f7' },
              { label: 'Occupancy Rate', value: '87%', sub: 'Across all properties', icon: Home, color: '#22c55e' },
              { label: 'Conversion Rate', value: '32%', sub: 'Inquiry → Move-in', icon: TrendingUp, color: '#f59e0b' },
              { label: 'Upcoming Visits', value: '14', sub: 'This week', icon: CalendarCheck, color: '#a855f7' },
              { label: 'Follow-ups Pending', value: '23', sub: 'Across all branches', icon: Bell, color: '#ef4444' },
            ].map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp(i * 0.05)} className="vf-card-hover bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(1,107,70,0.06)] flex items-center justify-center">
                    <stat.icon size={18} style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-text-primary mb-1 tracking-tight">{stat.value}</p>
                <p className="text-sm font-semibold text-text-secondary mb-1">{stat.label}</p>
                <p className="text-[11px] text-text-muted">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Admin Features */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-32">
        <motion.div {...fadeUp()} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
            Complete admin control
          </h2>
          <p className="text-text-secondary text-base max-w-lg mx-auto font-light">
            Every tool your operations team needs — from inquiry management to AI-powered follow-ups.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ADMIN_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.label}
              {...fadeUp(i * 0.04)}
              className="vf-card-hover bg-white p-5 flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(1,107,70,0.08)] flex items-center justify-center mb-4">
                <feature.icon size={18} className="text-accent" />
              </div>
              <p className="text-base font-semibold text-text-primary mb-1 tracking-tight">{feature.label}</p>
              <p className="text-xs text-text-secondary leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-32">
        <motion.div {...fadeUp()} className="vf-card bg-white p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-5 tracking-tight">
            From first inquiry to move-in — everything in one place
          </h2>
          <p className="text-text-secondary text-base mb-8 max-w-2xl mx-auto font-light">
            LIVZO Command Center is built for your admissions and operations team. Start managing your pipeline today.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/dashboard" className="btn-primary btn-lg flex items-center gap-2 px-8 py-3.5 shadow-sm font-semibold">
              Open Dashboard <ArrowRight size={18} />
            </Link>
            <Link to="/inquiries/create" className="btn-secondary btn-lg px-8 py-3.5 font-semibold">
              Create Inquiry
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-start justify-between flex-wrap gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <LayoutDashboard size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-base font-bold text-text-primary tracking-tight">LIVZO Command Center</p>
                </div>
              </div>
              <p className="text-xs text-text-muted">Internal Visitor & Inquiry Management Platform</p>
            </div>

            <div className="flex gap-8">
              <div>
                <p className="text-xs font-medium text-text-secondary mb-2">Platform</p>
                <div className="space-y-1.5">
                  <Link to="/dashboard" className="block text-xs text-text-muted hover:text-text-primary transition-colors">Dashboard</Link>
                  <Link to="/analytics" className="block text-xs text-text-muted hover:text-text-primary transition-colors">Analytics</Link>
                  <Link to="/settings" className="block text-xs text-text-muted hover:text-text-primary transition-colors">Settings</Link>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary mb-2">Support</p>
                <div className="space-y-1.5">
                  <span className="block text-xs text-text-muted">help@livzo.com</span>
                  <span className="block text-xs text-text-muted">Documentation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="vf-divider mt-6 mb-4" />
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} LIVZO Command Center. Internal use only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
