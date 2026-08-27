/**
 * Stylised Ashoka Pillar / Lion Capital emblem for the government header.
 * This is a simplified silhouette — not the official national emblem.
 */
export function AshokaEmblem({ className = "size-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ashoka Pillar Emblem"
    >
      {/* Base / Abacus */}
      <rect x="14" y="52" width="36" height="4" rx="1" fill="currentColor" opacity="0.9" />
      <rect x="18" y="48" width="28" height="4" rx="1" fill="currentColor" opacity="0.7" />

      {/* Pillar shaft */}
      <rect x="28" y="24" width="8" height="24" rx="1" fill="currentColor" opacity="0.85" />

      {/* Capital — simplified Lion Capital silhouette */}
      {/* Main body */}
      <path
        d="M20 24 C20 16 24 10 32 8 C40 10 44 16 44 24 Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* Lion head left */}
      <circle cx="26" cy="14" r="3" fill="currentColor" opacity="0.8" />
      {/* Lion head right */}
      <circle cx="38" cy="14" r="3" fill="currentColor" opacity="0.8" />
      {/* Lion head center */}
      <circle cx="32" cy="11" r="3.5" fill="currentColor" />

      {/* Ashoka Chakra (wheel) on the abacus */}
      <circle cx="32" cy="54" r="1.8" fill="white" opacity="0.9" />
      <circle cx="32" cy="54" r="1.2" fill="currentColor" opacity="0.9" />
      {/* Spokes */}
      {[0, 45, 90, 135].map((angle) => (
        <line
          key={angle}
          x1="32"
          y1={54 - 1.6}
          x2="32"
          y2={54 + 1.6}
          stroke="white"
          strokeWidth="0.4"
          opacity="0.7"
          transform={`rotate(${angle} 32 54)`}
        />
      ))}

      {/* Satyameva Jayate text area indicator */}
      <text
        x="32"
        y="60"
        textAnchor="middle"
        fontSize="2.5"
        fill="currentColor"
        opacity="0.6"
        fontFamily="serif"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
}
