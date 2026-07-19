import { getStatusBadgeClass } from '../../utils/formatters';

const Badge = ({ status, children, className = '' }) => {
  const badgeClass = status ? getStatusBadgeClass(status) : 'badge';
  return (
    <span className={`${badgeClass} ${className}`}>
      {children || status}
    </span>
  );
};

export default Badge;
