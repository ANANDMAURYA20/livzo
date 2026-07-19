import { forwardRef } from 'react';
import clsx from 'clsx';

const Select = forwardRef(({
  label,
  error,
  options = [],
  placeholder = 'Select...',
  className = '',
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="vf-label">{label}</label>}
      <select
        ref={ref}
        className={clsx('vf-input appearance-none cursor-pointer', error && 'vf-input-error', className)}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) =>
          typeof opt === 'string' ? (
            <option key={opt} value={opt}>{opt}</option>
          ) : (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          )
        )}
      </select>
      {error && <span className="text-xs text-danger mt-0.5">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
