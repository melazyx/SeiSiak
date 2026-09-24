export default function ArrowMark({ className = "" }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 0 H42 L28 20 H8 Z" fill="#1A5D3A" />
      <path d="M2 20 H22 L14 40 H-6 Z" fill="#2F704A" transform="translate(8,0)" />
      <path d="M28 20 H48 L40 40 H20 Z" fill="#8DC63F" />
    </svg>
  );
}