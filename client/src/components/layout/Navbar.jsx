import { Menu, Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/inquiries': 'All Inquiries',
  '/inquiries/create': 'Create Inquiry',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};

const Navbar = ({ onMobileMenuOpen }) => {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('/inquiries/') && path.includes('/edit')) return 'Edit Inquiry';
    if (path.includes('/inquiries/') && path !== '/inquiries' && path !== '/inquiries/create') return 'Inquiry Details';
    return PAGE_TITLES[path] || 'LIVZO Command Center';
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3.5 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onMobileMenuOpen}
          className="btn-icon md:hidden"
        >
          <Menu size={18} />
        </button>

        <h1 className="text-sm font-medium text-text-primary">{getTitle()}</h1>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-text-muted hidden sm:block">
          {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
