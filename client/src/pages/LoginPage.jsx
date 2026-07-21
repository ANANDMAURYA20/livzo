import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { LayoutDashboard, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
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
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Wrong credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(1,76,51,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(1,76,51,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <span className="font-semibold text-text-primary text-base">LIVZO Command Center</span>
        </div>

        {/* Card */}
        <div className="vf-card p-6">
          <h1 className="text-lg font-medium text-text-primary mb-1">Sign in</h1>
          <p className="text-sm text-text-muted mb-6">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label className="vf-label">Email address</label>
              <input
                type="email"
                placeholder="admin@livzo.com"
                autoComplete="email"
                className={`vf-input ${errors.email ? 'vf-input-error' : ''}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                })}
              />
              {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="vf-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`vf-input pr-10 ${errors.password ? 'vf-input-error' : ''}`}
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-danger mt-1">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
              iconRight={ArrowRight}
            >
              Sign in
            </Button>
          </form>
        </div>

        {/* Hint */}
        <p className="text-xs text-text-muted text-center mt-4">
          Demo: admin@livzo.com / Admin@123
        </p>

        {/* <p className="text-xs text-text-muted mt-6 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </p> */}
      </motion.div>
    </div>
  );
};

export default LoginPage;
