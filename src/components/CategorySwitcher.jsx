import { Link } from "react-router-dom";

const CATEGORIES = [
  { to: "/kambing", label: "Kambing", emoji: "🐐" },
  { to: "/ayam", label: "Ayam", emoji: "🐔" },
  { to: "/maggot", label: "Maggot", emoji: "🪱" },
];

export default function CategorySwitcher({ active }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-white border border-[#dce8f2] rounded-full p-1.5 shadow-sm mb-5">
      {CATEGORIES.map((cat) => {
        const isActive = cat.label.toLowerCase() === active?.toLowerCase();
        return (
          <Link
            key={cat.to}
            to={cat.to}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
              isActive ? "bg-primary text-white" : "text-[#62738a] hover:bg-[#f5faff]"
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}