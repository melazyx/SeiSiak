import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BrandStripe from "./BrandStripe";

export default function DetailHeader({ title }) {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-line">
      <BrandStripe />
      <div className="flex items-center gap-3 px-5 sm:px-8 py-4">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full bg-cream border border-line"
          aria-label="Kembali ke beranda"
        >
          <ArrowLeft size={16} className="text-ink" />
        </button>
        <h1 className="font-bold text-xl text-ink font-heading">{title}</h1>
      </div>
    </div>
  );
}