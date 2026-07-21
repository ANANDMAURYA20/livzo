import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Edit2,
  Trash2,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Building2,
  DollarSign,
  ArrowLeft,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { inquiryService } from '../services/inquiryService';
import { PageLoader } from '../components/ui/Skeleton';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import WhatsAppModal from '../components/features/WhatsAppModal';
import { formatDate, formatCurrency } from '../utils/formatters';
import { STATUSES } from '../utils/constants';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-3 border-b border-white/[0.04] last:border-0">
    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon size={14} className="text-text-muted" />
    </div>
    <div>
      <p className="text-xs text-text-muted mb-0.5">{label}</p>
      <p className="text-sm text-text-primary">{value || '—'}</p>
    </div>
  </div>
);

const InquiryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    inquiryService.getById(id)
      .then((data) => setInquiry(data.inquiry))
      .catch(() => { toast.error('Inquiry not found'); navigate('/inquiries'); })
      .finally(() => setFetching(false));
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await inquiryService.delete(id);
      toast.success('Inquiry deleted');
      navigate('/inquiries');
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdatingStatus(true);
    try {
      const res = await inquiryService.updateStatus(id, newStatus);
      setInquiry(res.inquiry);
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (fetching) return <PageLoader />;
  if (!inquiry) return null;

  return (
    <div className="max-w-4xl space-y-4">
      {/* Back */}
      <Link to="/inquiries" className="btn-ghost text-xs flex items-center gap-1.5 w-fit">
        <ArrowLeft size={12} /> Back to Inquiries
      </Link>

      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="vf-card p-5"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-semibold text-base">
                {inquiry.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-text-primary">{inquiry.name}</h2>
              <p className="text-sm text-text-muted">{inquiry.branch} Branch</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge status={inquiry.status} />
                {inquiry.source && (
                  <span className="text-xs text-text-muted bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                    via {inquiry.source}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={inquiry.status}
              onChange={handleStatusChange}
              disabled={updatingStatus}
              className="vf-input text-xs py-1.5 pr-6 w-auto"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <Button
              variant="whatsapp"
              size="sm"
              icon={MessageCircle}
              onClick={() => setShowWhatsApp(true)}
            >
              WhatsApp
            </Button>
            <Link to={`/inquiries/${id}/edit`} className="btn-edit btn-sm flex items-center gap-2">
              <Edit2 size={13} /> Edit
            </Link>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => setShowDelete(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="vf-card p-5"
        >
          <h3 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            Contact Information
          </h3>
          <InfoRow icon={Phone} label="Mobile" value={inquiry.mobile} />
          <InfoRow icon={Mail} label="Email" value={inquiry.email} />
          <InfoRow icon={MapPin} label="Address" value={inquiry.address} />
          <InfoRow icon={User} label="Gender" value={inquiry.gender} />
          <InfoRow icon={User} label="Age" value={inquiry.age} />
        </motion.div>

        {/* Inquiry Info */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="vf-card p-5"
        >
          <h3 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            Inquiry Information
          </h3>
          <InfoRow icon={Building2} label="Branch" value={inquiry.branch} />
          <InfoRow icon={DollarSign} label="Budget" value={formatCurrency(inquiry.budget)} />
          <InfoRow icon={Calendar} label="Move-in Date" value={formatDate(inquiry.moveInDate)} />
          <InfoRow icon={Calendar} label="Visit Date" value={formatDate(inquiry.visitDate)} />
          <InfoRow icon={Building2} label="Property Type" value={inquiry.propertyType} />
          <InfoRow icon={Building2} label="Preferred Room" value={inquiry.preferredRoom} />
        </motion.div>

        {/* Assignment */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="vf-card p-5"
        >
          <h3 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            Assignment & Dates
          </h3>
          <InfoRow icon={User} label="Assigned Counselor" value={inquiry.assignedCounselor} />
          <InfoRow icon={Calendar} label="Created At" value={formatDate(inquiry.createdAt)} />
          <InfoRow icon={Calendar} label="Last Updated" value={formatDate(inquiry.updatedAt)} />
        </motion.div>

        {/* Notes */}
        {inquiry.notes && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="vf-card p-5"
          >
            <h3 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
              Notes
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">{inquiry.notes}</p>
          </motion.div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Inquiry"
        message={`Delete "${inquiry.name}"? This cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
      />

      <WhatsAppModal
        isOpen={showWhatsApp}
        onClose={() => setShowWhatsApp(false)}
        inquiry={inquiry}
      />
    </div>
  );
};

export default InquiryDetailPage;
