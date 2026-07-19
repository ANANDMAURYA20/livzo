import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { inquiryService } from '../services/inquiryService';
import InquiryForm from '../components/forms/InquiryForm';
import { PageLoader } from '../components/ui/Skeleton';

const EditInquiryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    inquiryService.getById(id)
      .then((data) => setInquiry(data.inquiry))
      .catch(() => { toast.error('Inquiry not found'); navigate('/inquiries'); })
      .finally(() => setFetching(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await inquiryService.update(id, data);
      toast.success('Inquiry updated!');
      navigate(`/inquiries/${id}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <PageLoader />;

  return (
    <div className="max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="mb-6">
          <h2 className="text-lg font-medium text-text-primary">Edit Inquiry</h2>
          <p className="text-xs text-text-muted mt-0.5">Update details for {inquiry?.name}</p>
        </div>
        <div className="vf-card p-6">
          <InquiryForm
            defaultValues={inquiry}
            onSubmit={handleSubmit}
            loading={loading}
            isEdit
          />
        </div>
      </motion.div>
    </div>
  );
};

export default EditInquiryPage;
