const badgeColor = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  accent: "bg-accent text-white",
};

export default function ActivityCard({ image, category, categoryColor = "primary", title, date, large = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl overflow-hidden border border-line bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className={`relative w-full ${large ? "h-64 sm:h-72" : "h-48"} bg-gradient-to-br from-secondary to-secondary-dark`}>
        <div className="absolute inset-0 flex items-center justify-center text-5xl overflow-hidden">
          {image || "📷"}
        </div>
        {category && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[categoryColor]}`}>
            {category}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-ink leading-snug line-clamp-2">{title}</h3>
        <p className="text-xs text-muted mt-2">{date}</p>
      </div>
    </button>
  );
}