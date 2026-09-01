import pertaminaLogo from "../assets/pertamina-logo.png";

export default function PartnerBadge({ compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "justify-center"}`}>
      <img src={pertaminaLogo} alt="Pertamina Patra Niaga" className={compact ? "h-5 w-auto" : "h-7 w-auto"} />
      {!compact && (
        <span className="text-xs sm:text-sm text-muted">
          Program UMKM Binaan Fuel Terminal Sei Siak
        </span>
      )}
    </div>
  );
}