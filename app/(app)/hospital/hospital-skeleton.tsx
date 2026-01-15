export function HospitalSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border bg-card p-4 space-y-3 animate-pulse"
        >
          <div className="h-32 rounded-lg bg-muted" />
          <div className="h-4 w-3/4 bg-muted rounded" />
          <div className="h-3 w-1/2 bg-muted rounded" />
          <div className="h-8 w-full bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}
