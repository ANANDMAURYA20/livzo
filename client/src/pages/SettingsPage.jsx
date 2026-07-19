import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Lock, Settings2, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { settingsService } from '../services/settingsService';
import { authService } from '../services/authService';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const FieldOptionsEditor = () => {
  const { settings, refreshSettings } = useSettings();
  const [loading, setLoading] = useState(false);
  const [newValues, setNewValues] = useState({
    branches: '',
    sources: '',
    propertyTypes: '',
    roomTypes: '',
    counselors: '',
  });

  if (!settings) return null;

  const handleAdd = async (field) => {
    const val = newValues[field].trim();
    if (!val) return;
    if (settings[field].includes(val)) {
      toast.error('Option already exists');
      return;
    }

    setLoading(true);
    try {
      const updatedArray = [...settings[field], val];
      await settingsService.update({ [field]: updatedArray });
      await refreshSettings();
      setNewValues(prev => ({ ...prev, [field]: '' }));
      toast.success('Option added');
    } catch (err) {
      toast.error('Failed to add option');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (field, itemToRemove) => {
    setLoading(true);
    try {
      const updatedArray = settings[field].filter(item => item !== itemToRemove);
      await settingsService.update({ [field]: updatedArray });
      await refreshSettings();
      toast.success('Option removed');
    } catch (err) {
      toast.error('Failed to remove option');
    } finally {
      setLoading(false);
    }
  };

  const renderOptionGroup = (title, field, placeholder) => (
    <div className="mb-6 last:mb-0" key={field}>
      <label className="vf-label text-text-primary mb-2 block">{title}</label>
      <div className="flex flex-wrap gap-2 mb-3">
        {settings[field].map(item => (
          <div key={item} className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-md px-2.5 py-1 text-sm text-text-secondary">
            <span>{item}</span>
            <button
              onClick={() => handleRemove(field, item)}
              disabled={loading}
              className="text-text-muted hover:text-danger transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 max-w-sm">
        <input
          type="text"
          value={newValues[field]}
          onChange={(e) => setNewValues(prev => ({ ...prev, [field]: e.target.value }))}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd(field)}
          placeholder={placeholder}
          className="vf-input text-sm flex-1"
          disabled={loading}
        />
        <button
          onClick={() => handleAdd(field)}
          disabled={loading || !newValues[field].trim()}
          className="btn-secondary px-3 py-1.5"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="vf-card p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
          <Settings2 size={15} className="text-text-muted" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary">Form Options</h3>
          <p className="text-xs text-text-muted mt-0.5">Customize the dropdown options available in the inquiry form</p>
        </div>
      </div>
      <div className="pt-2 border-t border-white/[0.06] mt-4 space-y-6">
        {renderOptionGroup('Branches', 'branches', 'Add new branch...')}
        {renderOptionGroup('Lead Sources', 'sources', 'Add new source...')}
        {renderOptionGroup('Property Types', 'propertyTypes', 'Add new property type...')}
        {renderOptionGroup('Counselors', 'counselors', 'Add new counselor name...')}
      </div>
    </motion.div>
  );
};

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const profileForm = useForm({ defaultValues: { name: user?.name, email: user?.email } });
  const passwordForm = useForm();

  const onProfileSubmit = async (data) => {
    setProfileLoading(true);
    try {
      const res = await authService.updateProfile(data);
      updateUser(res.user);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const onPasswordSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setPasswordLoading(true);
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password changed!');
      passwordForm.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const SectionHeader = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
        <Icon size={15} className="text-text-muted" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-text-primary">{title}</h3>
        <p className="text-xs text-text-muted mt-0.5">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-medium text-text-primary">Settings</h2>
        <p className="text-xs text-text-muted mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="vf-card p-6">
        <SectionHeader icon={User} title="Profile" description="Update your display name and email address" />
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            error={profileForm.formState.errors.name?.message}
            {...profileForm.register('name', { required: 'Name is required' })}
          />
          <Input
            label="Email Address"
            type="email"
            error={profileForm.formState.errors.email?.message}
            {...profileForm.register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
            })}
          />
          <div className="flex justify-end">
            <Button type="submit" variant="primary" loading={profileLoading}>
              Save Profile
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Password */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }} className="vf-card p-6">
        <SectionHeader icon={Lock} title="Change Password" description="Update your password to keep your account secure" />
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            error={passwordForm.formState.errors.currentPassword?.message}
            {...passwordForm.register('currentPassword', { required: 'Required' })}
          />
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            error={passwordForm.formState.errors.newPassword?.message}
            {...passwordForm.register('newPassword', {
              required: 'Required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            error={passwordForm.formState.errors.confirmPassword?.message}
            {...passwordForm.register('confirmPassword', { required: 'Required' })}
          />
          <div className="flex justify-end">
            <Button type="submit" variant="primary" loading={passwordLoading}>
              Change Password
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Form Field Options */}
      <FieldOptionsEditor />

      {/* Account info */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="vf-card p-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center">
            <span className="text-accent font-semibold text-sm">
              {user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{user?.name}</p>
            <p className="text-xs text-text-muted">{user?.email} · {user?.role}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
