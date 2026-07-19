import { forwardRef } from 'react';
import clsx from 'clsx';

const Textarea = forwardRef(({
  label,
  error,
  rows = 3,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="vf-label">{label}</label>}
      <textarea
        ref={ref}
        rows={rows}
        className={clsx('vf-input resize-none', error && 'vf-input-error', className)}
        {...props}
      />
      {error && <span className="text-xs text-danger mt-0.5">{error}</span>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
