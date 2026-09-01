import { Search } from "lucide-react";

export default function SearchInput({ placeholder = "Cari produk...", value, onChange }) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full sm:w-72 rounded-full border border-line bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-secondary"
      />
    </div>
  );
}