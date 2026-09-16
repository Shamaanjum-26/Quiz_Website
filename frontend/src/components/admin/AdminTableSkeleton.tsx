interface AdminTableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function AdminTableSkeleton({ rows = 5, columns = 6 }: AdminTableSkeletonProps) {
  return (
    <div className="w-full animate-pulse divide-y divide-slate-100">
      <div className="bg-slate-50/80 px-4 py-3 flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="h-3.5 bg-slate-200/80 rounded-md"
            style={{ width: `${Math.max(60, 100 - i * 10)}px` }}
          />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="px-4 py-3.5 flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-slate-100 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 bg-slate-100 rounded w-1/3" />
            <div className="h-2.5 bg-slate-50 rounded w-1/4" />
          </div>
          <div className="h-4 bg-slate-100 rounded w-16" />
          <div className="h-4 bg-slate-100 rounded w-20" />
          <div className="h-4 bg-slate-100 rounded w-12" />
          <div className="w-6 h-6 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}
