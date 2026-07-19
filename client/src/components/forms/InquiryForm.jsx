import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { STATUSES } from '../../utils/constants';
import { formatDateInput } from '../../utils/formatters';
import { useSettings } from '../../context/SettingsContext';

const InquiryForm = ({ defaultValues, onSubmit, loading, isEdit = false }) => {
  const navigate = useNavigate();
  const { settings } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          moveInDate: formatDateInput(defaultValues.moveInDate),
          visitDate: formatDateInput(defaultValues.visitDate),
        }
      : { status: 'New' },
  });

  const onFormSubmit = async (data) => {
    try {
      // Clean up empty strings and convert types
      const cleaned = {
        ...data,
        budget: data.budget ? Number(data.budget) : 0,
        age: data.age ? Number(data.age) : undefined,
        moveInDate: data.moveInDate || undefined,
        visitDate: data.visitDate || undefined,
      };
      await onSubmit(cleaned);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const fieldVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
  };

  if (!settings) return null; // Wait for settings to load

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {/* Section: Personal Info */}
        <div className="col-span-full">
          <h2 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            Personal Information
          </h2>
        </div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.05 }}>
          <Input
            label="Full Name *"
            placeholder="e.g. Aarav Mehta"
            error={errors.name?.message}
            {...register('name', { required: 'Full name is required' })}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.07 }}>
          <Input
            label="Mobile Number *"
            placeholder="e.g. 9876543210"
            error={errors.mobile?.message}
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' },
            })}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.09 }}>
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. aarav@example.com"
            error={errors.email?.message}
            {...register('email', {
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
            })}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
          <Select
            label="Gender"
            options={settings.genderOptions || []}
            placeholder="Select Gender"
            error={errors.gender?.message}
            {...register('gender')}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.11 }}>
          <Input
            label="Age"
            type="number"
            placeholder="e.g. 24"
            min={1}
            max={100}
            error={errors.age?.message}
            {...register('age', {
              min: { value: 1, message: 'Age must be at least 1' },
              max: { value: 100, message: 'Age must be under 100' },
            })}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.12 }} className="md:col-span-2 xl:col-span-1">
          <Input
            label="Address"
            placeholder="e.g. 12 MG Road, Bengaluru"
            error={errors.address?.message}
            {...register('address')}
          />
        </motion.div>

        {/* Section: Inquiry Details */}
        <div className="col-span-full mt-2">
          <h2 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            Inquiry Details
          </h2>
        </div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.13 }}>
          <Select
            label="Branch *"
            options={settings.branches || []}
            placeholder="Select Branch"
            error={errors.branch?.message}
            {...register('branch', { required: 'Branch is required' })}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.14 }}>
          <Select
            label="Inquiry Source"
            options={settings.sources || []}
            placeholder="How did they hear about us?"
            {...register('source')}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.15 }}>
          <Input
            label="Budget (₹)"
            type="number"
            placeholder="e.g. 15000"
            error={errors.budget?.message}
            {...register('budget', {
              min: { value: 0, message: 'Budget cannot be negative' },
            })}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.16 }}>
          <Input
            label="Move-in Date"
            type="date"
            error={errors.moveInDate?.message}
            {...register('moveInDate')}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.17 }}>
          <Input
            label="Visit Date"
            type="date"
            error={errors.visitDate?.message}
            {...register('visitDate')}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.18 }}>
          <Select
            label="Property Type"
            options={settings.propertyTypes || []}
            placeholder="Select property type"
            {...register('propertyType')}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.19 }}>
          <Select
            label="Preferred Room"
            options={settings.roomTypes || []}
            placeholder="Select room type"
            {...register('preferredRoom')}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
          <Select
            label="Assigned Counselor"
            options={settings.counselors || []}
            placeholder="Assign counselor"
            {...register('assignedCounselor')}
          />
        </motion.div>

        <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.21 }}>
          <Select
            label="Status"
            options={STATUSES}
            {...register('status')}
          />
        </motion.div>

        {/* Notes */}
        <div className="col-span-full">
          <motion.div variants={fieldVariants} initial="initial" animate="animate" transition={{ delay: 0.22 }}>
            <Textarea
              label="Notes"
              placeholder="Any additional notes about this inquiry..."
              rows={3}
              {...register('notes')}
            />
          </motion.div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-white/[0.06]">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
        >
          {isEdit ? 'Save Changes' : 'Create Inquiry'}
        </Button>
      </div>
    </form>
  );
};

export default InquiryForm;
