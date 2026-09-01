export default function EarTagBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-primary-tint text-primary-dark">
      <span className="w-2 h-2 rounded-full bg-white border border-primary-dark" />
      {children}
    </span>
  );
}