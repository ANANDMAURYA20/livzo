import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';

const NotFoundPage = () => (
  <div className="min-h-screen bg-bg flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
          <LayoutDashboard size={16} className="text-white" />
        </div>
        <span className="font-semibold text-text-primary">LIVZO Command Center</span>
      </div>

      <h1 className="text-[80px] font-semibold text-white/[0.07] leading-none mb-2">404</h1>
      <h2 className="text-xl font-medium text-text-primary mb-2">Page not found</h2>
      <p className="text-sm text-text-muted mb-8 max-w-sm mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link to="/dashboard" className="btn-primary flex items-center gap-2 mx-auto w-fit">
        <ArrowLeft size={14} />
        Back to Dashboard
      </Link>
    </motion.div>
  </div>
);

export default NotFoundPage;
