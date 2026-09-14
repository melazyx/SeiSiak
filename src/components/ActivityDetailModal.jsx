import { X } from "lucide-react";

const badgeColor = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  accent: "bg-accent text-white",
};

export default function ActivityDetailModal({ activity, onClose }) {
  if (!activity) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 sm:h-64 bg-gradient-to-br from-secondary to-secondary-dark shrink-0">
          <div className="absolute inset-0 flex items-center justify-center text-6xl overflow-hidden">
            {activity.image || "📷"}
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-ink"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>

          {activity.category && (
            <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[activity.categoryColor || "primary"]}`}>
              {activity.category}
            </span>
          )}
        </div>

        <div className="p-6">
          <p className="text-xs text-muted mb-2">{activity.date}</p>
          <h2 className="text-xl font-bold text-ink font-heading mb-4">{activity.title}</h2>
          <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
            {activity.description || "Belum ada deskripsi lengkap untuk kegiatan ini."}
          </p>
        </div>
      </div>
    </div>
  );
}