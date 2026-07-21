import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LayoutDashboard, ArrowLeft } from 'lucide-react';
import { inquiryService } from '../services/inquiryService';
import InquiryForm from '../components/forms/InquiryForm';
import { useAuth } from '../context/AuthContext';

const CreateInquiryPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await inquiryService.create(data);
      toast.success('Inquiry submitted successfully!');
      
      if (isAuthenticated) {
        navigate(`/inquiries/${res.inquiry._id}`);
      } else {
        // Since it's public, just go back to landing page
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(1,76,51,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(1,76,51,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="w-full max-w-4xl relative z-10 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <LayoutDashboard size={16} className="text-white" />
            </div>
            <span className="font-semibold text-text-primary text-base">LIVZO Command Center</span>
          </div>

          <Link to="/" className="text-sm text-text-muted hover:text-text-primary flex items-center gap-2 transition-colors">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-text-primary">Submit an Inquiry</h2>
            <p className="text-sm text-text-muted mt-1">Fill in the details below and we will get back to you.</p>
          </div>

          <div className="vf-card p-6 md:p-8">
            <InquiryForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateInquiryPage;
