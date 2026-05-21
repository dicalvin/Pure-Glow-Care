import React from 'react';

/** Stylized wig silhouette for brand & loading */
export default function WigIcon({ size = 48, className = '', animated = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`wig-icon ${animated ? 'wig-icon--animated' : ''} ${className}`}
      aria-hidden
    >
      <ellipse cx="32" cy="38" rx="22" ry="14" fill="currentColor" opacity="0.9" />
      <path
        d="M12 36c0-12 9-22 20-22s20 10 20 22c-4-2-8-3-12-3s-8 1-12 3-8 2-12 3-16 1z"
        fill="currentColor"
      />
      <path
        d="M18 28c2-6 6-10 14-10s12 4 14 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <circle cx="26" cy="34" r="2" fill="var(--white, #fff)" opacity="0.6" />
      <circle cx="38" cy="34" r="2" fill="var(--white, #fff)" opacity="0.6" />
    </svg>
  );
}
