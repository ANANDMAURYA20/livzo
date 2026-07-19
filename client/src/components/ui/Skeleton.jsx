const SkeletonRow = ({ cols = 8 }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="skeleton h-4 w-full" style={{ width: `${60 + Math.random() * 30}%` }} />
      </td>
    ))}
  </tr>
);

export const TableSkeleton = ({ rows = 5, cols = 8 }) => (
  <tbody>
    {Array.from({ length: rows }).map((_, i) => (
      <SkeletonRow key={i} cols={cols} />
    ))}
  </tbody>
);

export const CardSkeleton = ({ className = '' }) => (
  <div className={`vf-card p-5 ${className}`}>
    <div className="skeleton h-3 w-20 mb-3" />
    <div className="skeleton h-7 w-28 mb-2" />
    <div className="skeleton h-3 w-16" />
  </div>
);

export const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="flex flex-col items-center gap-3">
      <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-text-muted">Loading...</span>
    </div>
  </div>
);

export default TableSkeleton;
