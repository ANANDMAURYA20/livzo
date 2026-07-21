import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/formatters';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inquiries', icon: Users, label: 'Inquiries' },
  { to: '/inquiries/create', icon: PlusCircle, label: 'Create Inquiry' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = ({ mini = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-white/[0.08] ${mini ? 'justify-center' : ''}`}>
        <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
          <LayoutDashboard size={14} className="text-white" />
        </div>
        {!mini && (
          <span className="font-semibold text-text-primary text-sm tracking-tight">
            LIVZO
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onMobileClose}
            className={({ isActive }) =>
              `${isActive ? 'nav-item-active' : 'nav-item-default'} ${mini ? 'justify-center' : ''}`
            }
            title={mini ? label : undefined}
          >
            <Icon size={16} className="flex-shrink-0" />
            {!mini && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-2 pb-3 border-t border-white/[0.08] pt-3 space-y-1">
        {!mini && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-btn">
            <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-accent">
                {getInitials(user?.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-primary truncate">{user?.name}</p>
              <p className="text-xs text-text-muted truncate">{user?.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`nav-item-default w-full ${mini ? 'justify-center' : ''}`}
        >
          <LogOut size={16} />
          {!mini && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 56 : 220 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="hidden md:flex flex-col flex-shrink-0 bg-card border-r border-white/[0.08] relative overflow-hidden"
      >
        <SidebarContent mini={collapsed} />

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="absolute top-4 -right-3 w-6 h-6 bg-panel border border-white/[0.1] rounded-full flex items-center justify-center text-text-muted hover:text-text-primary transition-colors z-10"
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronLeft size={12} />
          </motion.div>
        </button>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -220 }}
              animate={{ x: 0 }}
              exit={{ x: -220 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed left-0 top-0 h-full w-[220px] bg-card border-r border-white/[0.08] z-50 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
