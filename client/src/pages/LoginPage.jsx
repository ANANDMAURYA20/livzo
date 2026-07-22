import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back to your LIVZO dashboard!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Wrong credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white font-sans">
      
      {/* Left side: Image/Branding Panel */}
      <div className="hidden lg:flex w-1/2 relative bg-[#014C33] overflow-hidden">
        {/* Placeholder for the building image from the screenshot. 
            User can replace this URL with their actual building photo asset. */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80')`,
            backgroundPosition: 'center',
          }}
        />
        
        {/* Gradient overlay to make text readable at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#014C33] via-[#014C33]/60 to-transparent" />

        {/* Content over image */}
        <div className="relative z-10 w-full p-12 flex flex-col justify-end h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5 mb-6 text-white text-sm font-medium">
              <ShieldCheck size={16} />
              Secure resident access
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.2] tracking-tight mb-4 text-balance">
              Welcome back to your LIVZO home.
            </h1>
            
            <p className="text-white/80 text-lg max-w-md leading-relaxed font-light">
              Sign in to manage your stay, booking details, visits, and resident requests from one calm dashboard.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px]"
        >
          {/* Logo */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#014C33] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              LIVZO
            </h2>
          </div>

          <div className="mb-8">
            <div className="w-12 h-12 bg-[#014C33]/10 rounded-xl flex items-center justify-center mb-6">
              <Lock size={20} className="text-[#014C33]" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-3 tracking-tight">Login</h1>
            <p className="text-sm text-text-secondary leading-relaxed font-light">
              Enter your email and password to access your LIVZO account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail size={18} className="text-[#014C33]/60" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-3 bg-white border border-[#014C33]/20 rounded-[10px] text-sm focus:outline-none focus:border-[#014C33] focus:ring-1 focus:ring-[#014C33] transition-colors placeholder:text-[#014C33]/40 text-[#014C33] font-medium ${errors.email ? 'border-danger focus:border-danger focus:ring-danger' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                  })}
                />
              </div>
              {errors.email && <p className="text-xs text-danger mt-1.5">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-text-primary">Password</label>
                <Link to="#" className="text-sm font-semibold text-[#014C33] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#014C33]/60" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-10 py-3 bg-white border border-[#014C33]/20 rounded-[10px] text-sm focus:outline-none focus:border-[#014C33] focus:ring-1 focus:ring-[#014C33] transition-colors placeholder:text-[#014C33]/40 text-[#014C33] font-medium ${errors.password ? 'border-danger focus:border-danger focus:ring-danger' : ''}`}
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#014C33]/60 hover:text-[#014C33] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-danger mt-1.5">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#014C33] hover:bg-[#014C33]/90 text-white font-semibold py-3.5 px-4 rounded-[10px] transition-colors flex items-center justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-8">
            New to LIVZO?{' '}
            <Link to="/contact" className="font-bold text-[#014C33] hover:underline">
              Book a visit
            </Link>
          </p>
        </motion.div>
      </div>

    </div>
  );
};

export default LoginPage;
