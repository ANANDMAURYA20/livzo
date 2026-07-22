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
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      
      {/* Left Side: Dark Immersive Brand Panel */}
      <div className="lg:w-5/12 bg-[#014C33] text-white flex flex-col relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="p-8 lg:p-12 z-10 flex-1 flex flex-col">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-16 text-sm font-bold tracking-widest uppercase">
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <motion.div {...fadeUp(0)} className="mt-auto mb-16">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
              Let's find<br />your perfect<br /><span className="text-[#25D366]">space.</span>
            </h1>
            <p className="text-xl text-white/80 font-medium leading-relaxed max-w-md">
              Whether you want to schedule a visit or just ask a question, our team is ready to help you settle in.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="space-y-8 mt-auto pb-8">
            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-white/20 transition-colors">
                <Phone size={24} className="text-[#25D366]" />
              </div>
              <div className="pt-1">
                <p className="text-sm font-bold text-white/60 uppercase tracking-widest mb-1">Call or WhatsApp</p>
                <p className="text-2xl font-bold tracking-tight">+91 70462 67684</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-white/20 transition-colors">
                <Mail size={24} className="text-white" />
              </div>
              <div className="pt-1">
                <p className="text-sm font-bold text-white/60 uppercase tracking-widest mb-1">Email Us</p>
                <p className="text-2xl font-bold tracking-tight">livzoindia@gmail.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Form Area */}
      <div className="lg:w-7/12 bg-[#F4F1EA] flex flex-col justify-center p-8 lg:p-16 relative">
        <motion.div {...fadeUp(0.2)} className="max-w-2xl w-full mx-auto">
          
          <div className="mb-12">
            <span className="inline-block py-1.5 px-4 rounded-full bg-black/5 border border-black/10 text-xs font-bold uppercase tracking-widest mb-4">
              Direct Inquiry
            </span>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              Send a Message
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Fill out the details below and we'll reply within 2 hours.
            </p>
          </div>

          <div className="bg-white p-8 lg:p-10 rounded-[32px] shadow-2xl border-2 border-black/5 relative overflow-hidden">
            {/* Subtle design accent inside form card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#014C33]/5 rounded-bl-[100px] -z-10" />
            
            <InquiryForm onSubmit={handleSubmit} loading={loading} />
          </div>

          <div className="mt-12 flex items-start gap-4 p-6 bg-white/50 rounded-2xl border border-black/5">
            <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-gray-900" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-widest">Our Locations</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-black/10 rounded-full text-sm font-medium">📍 Science City (Boys)</span>
                <span className="px-3 py-1 bg-white border border-black/10 rounded-full text-sm font-medium">📍 Naranpura (Boys)</span>
                <span className="px-3 py-1 bg-white border border-black/10 rounded-full text-sm font-medium">📍 Gota (Girls)</span>
              </div>
            </div>
          </div>

        </motion.div>
      </div>

    </div>
  );
};

export default ContactPage;
