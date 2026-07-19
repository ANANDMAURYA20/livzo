import { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(({
  label,
  error,
  hint,
  className = '',
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="vf-label">{label}</label>}
      <input
        ref={ref}
        type={type}
        className={clsx('vf-input', error && 'vf-input-error', className)}
        {...props}
      />
      {error && <span className="text-xs text-danger mt-0.5">{error}</span>}
      {hint && !error && <span className="text-xs text-text-muted mt-0.5">{hint}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
