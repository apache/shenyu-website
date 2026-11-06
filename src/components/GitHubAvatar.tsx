import React, { useState, useEffect, useRef } from 'react';

interface Props {
  username: string;
  size?: number;
}

const PALETTE = [
  '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
  '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
  '#f39c12', '#d35400', '#c0392b', '#e67e22', '#7f8c8d',
];

function getInitials(name: string): string {
  const letters = name.replace(/[^a-zA-Z]/g, '');
  return letters.slice(0, 2).toUpperCase() || name.charAt(0).toUpperCase();
}

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export default function GitHubAvatar({ username, size = 64 }: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const initials = getInitials(username);
  const bgColor = getColor(username);
  const fontSize = initials.length === 2 ? size * 0.36 : size * 0.44;

  useEffect(() => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.onload = () => setLoaded(true);
    img.onerror = () => {}; // keep showing initials
    img.src = `https://github.com/${username}.png`;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [username]);

  if (loaded) {
    return (
      <img
        ref={imgRef}
        width={size}
        height={size}
        src={`https://github.com/${username}.png`}
        referrerPolicy="no-referrer"
        alt={`${username}'s avatar`}
        style={{ borderRadius: 4 }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label={`${username}'s avatar`}
    >
      <rect fill={bgColor} width={size} height={size} rx={4} />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#fff"
        fontSize={fontSize}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight={600}
      >
        {initials}
      </text>
    </svg>
  );
}
