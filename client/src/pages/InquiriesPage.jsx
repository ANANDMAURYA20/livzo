import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye,
  Edit2,
  Trash2,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  PlusCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { inquiryService } from '../services/inquiryService';
import { formatDate, formatCurrency, getStatusBadgeClass } from '../utils/formatters';
import { STATUSES } from '../utils/constants';
import SearchBar from '../components/ui/SearchBar';
import FilterPanel from '../components/ui/FilterPanel';
import Pagination from '../components/ui/Pagination';
import Badge from '../components/ui/Badge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import WhatsAppModal from '../components/features/WhatsAppModal';
import { TableSkeleton } from '../components/ui/Skeleton';
import { useDebounce } from '../hooks/useHelpers';

const SortIcon = ({ field, current, order }) => {
  if (current !== field) return <div className="w-3" />;
  return order === 'asc' ? <ChevronUp size={12} className="text-accent" /> : <ChevronDown size={12} className="text-accent" />;
};

const InquiriesPage = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ sortBy: 'createdAt', sortOrder: 'desc' });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [whatsappTarget, setWhatsappTarget] = useState(null);
  const [statusDropdown, setStatusDropdown] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const fetchInquiries = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: pagination.limit,
        search: debouncedSearch,
        ...filters,
        ...sort,
      };
      const data = await inquiryService.getAll(params);
      setInquiries(data.inquiries);
      setPagination(data.pagination);
    } catch (err) {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters, sort, pagination.limit]);

  useEffect(() => {
    fetchInquiries(1);
  }, [debouncedSearch, filters, sort]);

  const handleSort = (field) => {
    setSort((prev) => ({
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await inquiryService.delete(deleteTarget._id);
      toast.success('Inquiry deleted');
      setDeleteTarget(null);
      fetchInquiries(pagination.page);
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await inquiryService.updateStatus(id, status);
      toast.success('Status updated');
      setStatusDropdown(null);
      fetchInquiries(pagination.page);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const clearFilters = () => setFilters({});

  const ThCell = ({ label, field }) => (
    <th
      className="cursor-pointer select-none"
      onClick={() => field && handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        {field && <SortIcon field={field} current={sort.sortBy} order={sort.sortOrder} />}
      </div>
    </th>
  );

  return (
    <div className="space-y-4 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-text-primary">Inquiries</h2>
          <p className="text-xs text-text-muted mt-0.5">{pagination.total} total inquiries</p>
        </div>
        <Link to="/inquiries/create" className="btn-primary text-sm flex items-center gap-2">
          <PlusCircle size={14} /> New Inquiry
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name, phone, email, branch..."
          className="flex-1 min-w-48"
        />
        <FilterPanel filters={filters} onChange={setFilters} onClear={clearFilters} />
      </div>

      {/* Table */}
      <div className="vf-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="vf-table">
            <thead>
              <tr>
                <ThCell label="Name" field="name" />
                <ThCell label="Mobile" />
                <ThCell label="Branch" field="branch" />
                <ThCell label="Budget" field="budget" />
                <ThCell label="Move-in" field="moveInDate" />
                <ThCell label="Visit Date" field="visitDate" />
                <ThCell label="Status" field="status" />
                <ThCell label="Assigned To" />
                <ThCell label="Created" field="createdAt" />
                <th>Actions</th>
              </tr>
            </thead>
            {loading ? (
              <TableSkeleton rows={8} cols={10} />
            ) : (
              <tbody>
                {inquiries.map((inq, i) => (
                  <motion.tr
                    key={inq._id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: i * 0.02 }}
                  >
                    <td>
                      <Link
                        to={`/inquiries/${inq._id}`}
                        className="font-medium text-text-primary hover:text-accent transition-colors"
                      >
                        {inq.name}
                      </Link>
                    </td>
                    <td className="text-text-secondary">{inq.mobile}</td>
                    <td className="text-text-secondary">{inq.branch}</td>
                    <td className="text-text-secondary">{formatCurrency(inq.budget)}</td>
                    <td className="text-text-muted text-xs">{formatDate(inq.moveInDate)}</td>
                    <td className="text-text-muted text-xs">{formatDate(inq.visitDate)}</td>
                    <td>
                      <div className="relative">
                        <button
                          onClick={() => setStatusDropdown(statusDropdown === inq._id ? null : inq._id)}
                          className="cursor-pointer"
                        >
                          <Badge status={inq.status} />
                        </button>
                        {statusDropdown === inq._id && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full mt-1 left-0 z-20 bg-panel border border-white/[0.08] rounded-btn shadow-modal min-w-36 py-1"
                          >
                            {STATUSES.map((s) => (
                              <button
                                key={s}
                                onClick={() => handleStatusChange(inq._id, s)}
                                className="w-full text-left px-3 py-1.5 text-xs hover:bg-white/[0.05] text-text-secondary hover:text-text-primary"
                              >
                                {s}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </td>
                    <td className="text-text-muted text-xs">
                      {inq.assignedCounselor || '—'}
                    </td>
                    <td className="text-text-muted text-xs whitespace-nowrap">
                      {formatDate(inq.createdAt)}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Link to={`/inquiries/${inq._id}`} className="btn-icon" title="View">
                          <Eye size={13} />
                        </Link>
                        <Link to={`/inquiries/${inq._id}/edit`} className="btn-icon hover:text-[#3B82F6]" title="Edit">
                          <Edit2 size={13} />
                        </Link>
                        <button
                          className="btn-icon hover:text-[#25D366]"
                          title="WhatsApp"
                          onClick={() => setWhatsappTarget(inq)}
                        >
                          <MessageCircle size={13} />
                        </button>
                        <button
                          className="btn-icon hover:text-danger"
                          title="Delete"
                          onClick={() => setDeleteTarget(inq)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {!loading && inquiries.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center py-12 text-text-muted text-sm">
                      No inquiries found.{' '}
                      {search || Object.keys(filters).length > 0 ? (
                        <button onClick={() => { setSearch(''); clearFilters(); }} className="text-accent hover:underline">
                          Clear filters
                        </button>
                      ) : (
                        <Link to="/inquiries/create" className="text-accent hover:underline">
                          Create one now
                        </Link>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>

        <Pagination
          page={pagination.page}
          pages={pagination.pages}
          total={pagination.total}
          limit={pagination.limit}
          onPageChange={(p) => fetchInquiries(p)}
        />
      </div>

      {/* Modals */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Inquiry"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
      />

      <WhatsAppModal
        isOpen={!!whatsappTarget}
        onClose={() => setWhatsappTarget(null)}
        inquiry={whatsappTarget}
      />

      {/* Close status dropdown on click outside */}
      {statusDropdown && (
        <div className="fixed inset-0 z-10" onClick={() => setStatusDropdown(null)} />
      )}
    </div>
  );
};

export default InquiriesPage;
