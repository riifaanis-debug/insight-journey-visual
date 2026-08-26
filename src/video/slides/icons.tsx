import React from "react";

/** أيقونات متجهة نظيفة (SVG) بنفس أسلوب وألوان الشريحة المرجعية */
export type IconKey =
  | "database"
  | "document"
  | "user"
  | "cloud"
  | "dashboard"
  | "target"
  | "merge"
  | "idcard"
  | "duplicate"
  | "filter"
  | "chart"
  | "wallet"
  | "signal"
  | "behavior"
  | "grid"
  | "radar"
  | "library"
  | "persona"
  | "match"
  | "gauge"
  | "weight"
  | "priority"
  | "check"
  | "gate"
  | "engine"
  | "branch"
  | "compare"
  | "package"
  | "clock"
  | "message"
  | "phone"
  | "send"
  | "eye"
  | "coins"
  | "list"
  | "refresh"
  | "brain"
  | "arrowback"
  | "calendar"
  | "shield";

const S = 2.6;

export const Glyph: React.FC<{ k: IconKey; size?: number; color?: string }> = ({
  k,
  size = 44,
  color = "#FFFFFF",
}) => {
  const p = {
    fill: "none",
    stroke: color,
    strokeWidth: S,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      {k === "database" && (
        <g {...p}>
          <ellipse cx="16" cy="8" rx="10" ry="4" />
          <path d="M6 8v8c0 2.2 4.5 4 10 4s10-1.8 10-4V8" />
          <path d="M6 16v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8" />
        </g>
      )}
      {k === "document" && (
        <g {...p}>
          <path d="M8 4h11l5 5v19H8z" />
          <path d="M19 4v5h5" />
          <path d="M12 15h8M12 20h8M12 25h5" />
        </g>
      )}
      {k === "user" && (
        <g {...p}>
          <circle cx="16" cy="11" r="5.5" />
          <path d="M5.5 27c1.6-6 5.6-9 10.5-9s8.9 3 10.5 9" />
        </g>
      )}
      {k === "cloud" && (
        <g {...p}>
          <path d="M9 22a5.5 5.5 0 0 1 .6-11A7.5 7.5 0 0 1 24 12.5a5 5 0 0 1-1 9.5z" />
          <path d="M13 26v-6M13 20l-2.5 2.5M13 20l2.5 2.5M19 20v6M19 26l-2.5-2.5M19 26l2.5-2.5" />
        </g>
      )}
      {k === "dashboard" && (
        <g {...p}>
          <rect x="3" y="5" width="26" height="17" rx="2.5" />
          <path d="M12 27h8M16 22v5" />
          <path d="M9 18v-4M14 18v-7M19 18v-5M24 18v-8" />
        </g>
      )}
      {k === "target" && (
        <g {...p}>
          <circle cx="15" cy="17" r="11" />
          <circle cx="15" cy="17" r="6" />
          <circle cx="15" cy="17" r="1.6" />
          <path d="M20 12l8-8M24 4h4v4" />
        </g>
      )}
      {k === "merge" && (
        <g {...p}>
          <path d="M5 5v6c0 3.5 3 5 6 5h10" />
          <path d="M5 27v-6c0-3.5 3-5 6-5h10" />
          <path d="M18 12l5 4-5 4" />
        </g>
      )}
      {k === "idcard" && (
        <g {...p}>
          <rect x="3" y="7" width="26" height="18" rx="3" />
          <circle cx="11" cy="14.5" r="3" />
          <path d="M6.5 21c1-2.6 2.6-3.6 4.5-3.6s3.5 1 4.5 3.6" />
          <path d="M20 13h6M20 17.5h6M20 21h4" />
        </g>
      )}
      {k === "duplicate" && (
        <g {...p}>
          <rect x="4" y="4" width="16" height="16" rx="2.5" />
          <rect x="12" y="12" width="16" height="16" rx="2.5" />
        </g>
      )}
      {k === "filter" && (
        <g {...p}>
          <path d="M4 6h24l-9 11v9l-6 3v-12z" />
        </g>
      )}
      {k === "chart" && (
        <g {...p}>
          <path d="M4 27h24" />
          <rect x="6" y="16" width="5" height="9" rx="1.2" />
          <rect x="14" y="10" width="5" height="15" rx="1.2" />
          <rect x="22" y="5" width="5" height="20" rx="1.2" />
        </g>
      )}
      {k === "wallet" && (
        <g {...p}>
          <rect x="3" y="7" width="26" height="19" rx="3" />
          <path d="M3 13h26" />
          <circle cx="23" cy="19.5" r="1.8" />
        </g>
      )}
      {k === "signal" && (
        <g {...p}>
          <path d="M4 26h24" />
          <path d="M4 20c5 0 6-10 11-10s7 6 13 6" />
          <circle cx="15" cy="10" r="1.8" />
        </g>
      )}
      {k === "behavior" && (
        <g {...p}>
          <circle cx="16" cy="16" r="12" />
          <path d="M16 8v8l6 3" />
        </g>
      )}
      {k === "grid" && (
        <g {...p}>
          <rect x="4" y="4" width="10" height="10" rx="2" />
          <rect x="18" y="4" width="10" height="10" rx="2" />
          <rect x="4" y="18" width="10" height="10" rx="2" />
          <rect x="18" y="18" width="10" height="10" rx="2" />
        </g>
      )}
      {k === "radar" && (
        <g {...p}>
          <path d="M16 3l11 8-4.2 13H9.2L5 11z" />
          <path d="M16 9l6 4.5-2.3 7h-7.4L10 13.5z" />
          <path d="M16 3v6M27 11l-5 2.5M22.8 24l-3.1-3.5M9.2 24l3.1-3.5M5 11l5 2.5" />
        </g>
      )}
      {k === "library" && (
        <g {...p}>
          <rect x="4" y="6" width="6" height="20" rx="1.6" />
          <rect x="13" y="6" width="6" height="20" rx="1.6" />
          <rect x="22" y="9" width="6" height="17" rx="1.6" />
        </g>
      )}
      {k === "persona" && (
        <g {...p}>
          <rect x="5" y="3" width="22" height="26" rx="3" />
          <circle cx="16" cy="12" r="4" />
          <path d="M10 23c1.3-3 3.4-4.4 6-4.4s4.7 1.4 6 4.4" />
        </g>
      )}
      {k === "match" && (
        <g {...p}>
          <circle cx="11" cy="16" r="8" />
          <circle cx="21" cy="16" r="8" />
        </g>
      )}
      {k === "gauge" && (
        <g {...p}>
          <path d="M4 24a12 12 0 1 1 24 0" />
          <path d="M16 24l7-8" />
          <circle cx="16" cy="24" r="2" />
        </g>
      )}
      {k === "weight" && (
        <g {...p}>
          <path d="M16 5v22M6 12h20" />
          <path d="M6 12l-3 8h6zM26 12l-3 8h6z" />
        </g>
      )}
      {k === "priority" && (
        <g {...p}>
          <path d="M8 28V5M8 6h16l-3.5 5L24 16H8" />
        </g>
      )}
      {k === "check" && (
        <g {...p}>
          <circle cx="16" cy="16" r="12" />
          <path d="M10.5 16.5l4 4 7.5-8" />
        </g>
      )}
      {k === "gate" && (
        <g {...p}>
          <path d="M6 28V8a10 10 0 0 1 20 0v20" />
          <path d="M12 28V9M20 28V9M6 16h6M20 16h6" />
        </g>
      )}
      {k === "engine" && (
        <g {...p}>
          <circle cx="16" cy="16" r="5" />
          <path d="M16 3v4M16 25v4M3 16h4M25 16h4M7 7l3 3M22 22l3 3M25 7l-3 3M10 22l-3 3" />
        </g>
      )}
      {k === "branch" && (
        <g {...p}>
          <circle cx="7" cy="16" r="3" />
          <circle cx="25" cy="7" r="3" />
          <circle cx="25" cy="25" r="3" />
          <path d="M10 15l12-6M10 17l12 6" />
        </g>
      )}
      {k === "compare" && (
        <g {...p}>
          <path d="M16 4v24" />
          <path d="M6 10h8M18 22h8" />
          <path d="M10 10l-4 8h8zM22 22l-4-8h8z" />
        </g>
      )}
      {k === "package" && (
        <g {...p}>
          <path d="M16 3l12 6v14l-12 6-12-6V9z" />
          <path d="M4 9l12 6 12-6M16 15v14" />
        </g>
      )}
      {k === "clock" && (
        <g {...p}>
          <circle cx="16" cy="16" r="12" />
          <path d="M16 8v8l5.5 3.5" />
        </g>
      )}
      {k === "message" && (
        <g {...p}>
          <path d="M4 7h24v16H13l-7 5v-5H4z" />
          <path d="M10 13h12M10 18h8" />
        </g>
      )}
      {k === "phone" && (
        <g {...p}>
          <rect x="8" y="2" width="16" height="28" rx="3.5" />
          <path d="M13.5 6h5" />
          <circle cx="16" cy="25.5" r="1.4" />
        </g>
      )}
      {k === "send" && (
        <g {...p}>
          <path d="M28 4L3 14l10 4 4 10z" />
          <path d="M28 4L13 18" />
        </g>
      )}
      {k === "eye" && (
        <g {...p}>
          <path d="M2 16s5-8 14-8 14 8 14 8-5 8-14 8S2 16 2 16z" />
          <circle cx="16" cy="16" r="4" />
        </g>
      )}
      {k === "coins" && (
        <g {...p}>
          <ellipse cx="16" cy="8" rx="10" ry="4" />
          <path d="M6 8v6c0 2.2 4.5 4 10 4s10-1.8 10-4V8" />
          <path d="M6 14v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6" />
        </g>
      )}
      {k === "list" && (
        <g {...p}>
          <path d="M12 8h16M12 16h16M12 24h16" />
          <path d="M4 7l2 2 3-3.5M4 15l2 2 3-3.5M4 23l2 2 3-3.5" />
        </g>
      )}
      {k === "refresh" && (
        <g {...p}>
          <path d="M28 16a12 12 0 1 1-3.6-8.5" />
          <path d="M28 5v7h-7" />
        </g>
      )}
      {k === "brain" && (
        <g {...p}>
          <path d="M13 5a5 5 0 0 0-5 5 4.5 4.5 0 0 0-2 7.5A5 5 0 0 0 10 27h3z" />
          <path d="M19 5a5 5 0 0 1 5 5 4.5 4.5 0 0 1 2 7.5A5 5 0 0 1 22 27h-3z" />
          <path d="M16 5v22" />
        </g>
      )}
      {k === "arrowback" && (
        <g {...p}>
          <path d="M28 24a11 11 0 0 0-11-11H5" />
          <path d="M11 7L5 13l6 6" />
        </g>
      )}
      {k === "calendar" && (
        <g {...p}>
          <rect x="4" y="6" width="24" height="22" rx="3" />
          <path d="M4 13h24M11 3v6M21 3v6" />
        </g>
      )}
      {k === "shield" && (
        <g {...p}>
          <path d="M16 3l11 4v9c0 7-5 11.5-11 13-6-1.5-11-6-11-13V7z" />
          <path d="M11 16l3.5 3.5L21 13" />
        </g>
      )}
    </svg>
  );
};

/** أيقونة داخل دائرة ملونة */
export const IconBadge: React.FC<{
  k: IconKey;
  color: string;
  size?: number;
}> = ({ k, color, size = 132 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `linear-gradient(150deg, ${color} 0%, ${shade(color, -18)} 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 10px 22px ${hexA(color, 0.32)}, inset 0 2px 0 rgba(255,255,255,.35)`,
      border: "3px solid rgba(255,255,255,.85)",
    }}
  >
    <Glyph k={k} size={size * 0.52} />
  </div>
);

function clamp(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}
export function shade(hex: string, pct: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  const r = clamp(((n >> 16) & 255) * (1 + pct / 100));
  const g = clamp(((n >> 8) & 255) * (1 + pct / 100));
  const b = clamp((n & 255) * (1 + pct / 100));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
export function hexA(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
