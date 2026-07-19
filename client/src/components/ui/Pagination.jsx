import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, pages, total, limit, onPageChange }) => {
  if (pages <= 1) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const getPages = () => {
    const arr = [];
    const delta = 2;
    const left = page - delta;
    const right = page + delta;

    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || (i >= left && i <= right)) {
        arr.push(i);
      }
    }

    const result = [];
    let prev = null;
    for (const p of arr) {
      if (prev && p - prev > 1) result.push('...');
      result.push(p);
      prev = p;
    }
    return result;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
      <span className="text-xs text-text-muted">
        Showing {start}–{end} of {total}
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="btn-icon disabled:opacity-30"
        >
          <ChevronLeft size={14} />
        </button>

        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-text-muted text-sm">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-7 h-7 rounded-md text-xs font-medium transition-colors ${
                p === page
                  ? 'bg-accent text-white'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/[0.05]'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
          className="btn-icon disabled:opacity-30"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
