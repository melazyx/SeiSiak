import { Plus } from "lucide-react";

export default function AddProductCard({ label = "Tambah produk", onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-card border-2 border-dashed border-primary bg-[#FDF9F2] text-primary-dark flex flex-col items-center justify-center gap-2 min-h-[160px]"
    >
      <Plus size={20} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}