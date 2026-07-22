import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import { inquiryService } from '../services/inquiryService';
import InquiryForm from '../components/forms/InquiryForm';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const ContactPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await inquiryService.create(data);
      toast.success('Your inquiry has been submitted! We will contact you shortly.');
      navigate('/');
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Navbar Minimal */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center h-16">
          <Link to="/" className="text-sm font-semibold text-text-primary flex items-center gap-2 hover:text-accent transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left: Contact Info */}
          <motion.div {...fadeUp(0)} className="lg:col-span-2">
            <span className="eyebrow mb-2">Get in touch</span>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4">
              Schedule a Visit or Ask a Question
            </h1>
            <p className="text-text-secondary text-base font-light mb-10 leading-relaxed">
              We're here to help you find the perfect PG accommodation in Ahmedabad. Fill out the form, and our admissions team will get back to you instantly.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1 tracking-tight">Call or WhatsApp</p>
                  <p className="text-sm text-text-secondary">+91 70462 67684</p>
                  <p className="text-xs text-text-muted mt-0.5">Available 9 AM to 8 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1 tracking-tight">Email Us</p>
                  <p className="text-sm text-text-secondary">livzoindia@gmail.com</p>
                  <p className="text-xs text-text-muted mt-0.5">We usually reply within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1 tracking-tight">Our Locations</p>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Science City, Ahmedabad (Boys)</li>
                    <li>• Naranpura, Ahmedabad (Boys)</li>
                    <li>• Gota, Ahmedabad (Girls)</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-3">
            <div className="vf-card bg-white p-6 md:p-8 border-2    rounded-[20px]">
              <h2 className="text-xl font-semibold text-text-primary mb-6 tracking-tight">Inquiry Details</h2>
              <InquiryForm onSubmit={handleSubmit} loading={loading} />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
