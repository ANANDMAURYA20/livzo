import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { STATUSES } from '../../utils/constants';
import { useSettings } from '../../context/SettingsContext';

const FilterPanel = ({ filters, onChange, onClear }) => {
  const [open, setOpen] = useState(false);
  const activeCount = Object.values(filters).filter((v) => v && v !== 'all').length;
  const { settings } = useSettings();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`btn-secondary flex items-center gap-2 text-sm ${open ? 'border-accent/30' : ''}`}
      >
        <Filter size={13} />
        Filters
        {activeCount > 0 && (
          <span className="bg-accent text-white text-xs px-1.5 py-0.5 rounded-full">
            {activeCount}
          </span>
        )}
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 z-30 w-[340px] bg-card border border-white/[0.08] rounded-card shadow-modal p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-text-primary">Filters</span>
              <button
                onClick={() => { onClear(); setOpen(false); }}
                className="text-xs text-text-muted hover:text-text-primary flex items-center gap-1"
              >
                <X size={11} /> Clear all
              </button>
            </div>

            <div className="space-y-3">
              {/* Status */}
              <div>
                <label className="vf-label">Status</label>
                <select
                  value={filters.status || 'all'}
                  onChange={(e) => onChange({ ...filters, status: e.target.value })}
                  className="vf-input text-sm"
                >
                  <option value="all">All Statuses</option>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Branch */}
              <div>
                <label className="vf-label">Branch</label>
                <select
                  value={filters.branch || 'all'}
                  onChange={(e) => onChange({ ...filters, branch: e.target.value })}
                  className="vf-input text-sm"
                >
                  <option value="all">All Branches</option>
                  {settings?.branches?.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label className="vf-label">Budget Range (₹)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.budgetMin || ''}
                    onChange={(e) => onChange({ ...filters, budgetMin: e.target.value })}
                    className="vf-input text-sm min-w-0"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.budgetMax || ''}
                    onChange={(e) => onChange({ ...filters, budgetMax: e.target.value })}
                    className="vf-input text-sm min-w-0"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="vf-label">Created Date Range</label>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="relative">
                    <span className="absolute -top-4 text-[10px] text-text-muted">From</span>
                    <input
                      type="date"
                      value={filters.dateFrom || ''}
                      onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
                      className="vf-input text-sm min-w-0"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute -top-4 text-[10px] text-text-muted">To</span>
                    <input
                      type="date"
                      value={filters.dateTo || ''}
                      onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
                      className="vf-input text-sm min-w-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="btn-accent w-full mt-4 text-sm"
            >
              Apply Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;
