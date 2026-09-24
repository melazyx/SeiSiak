import { MessageCircle } from "lucide-react";

const WA_NUMBER = "6281270958582"; // sesuaikan kalau nomornya beda

export default function WaButton({ message, full = false, label = "Tanya via WhatsApp" }) {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    
     <a href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm text-white bg-primary hover:bg-primary-dark transition-colors ${
        full ? "w-full py-3.5 text-base" : "w-full px-4 py-2.5"
      }`}
    >
      <MessageCircle size={17} />
      {label}
    </a>
  );
}