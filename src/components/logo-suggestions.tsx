import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// Suggestion 1: Minimalist Typography "HH"
// Simple, bold, friendly.
export function LogoSuggestion1({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        fill="url(#sugg1)"
        fillOpacity="0.1"
        stroke="none"
      />
      <path d="M7 7v10M17 7v10M7 12h10" stroke="url(#sugg1)" strokeWidth="3" />
      <path
        d="M7 12c2 2 8 2 10 0"
        stroke="url(#sugg1)"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

// Suggestion 2: Hexagon Chat
// Community (honeycomb) + Communication (bubble).
export function LogoSuggestion2({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z"
        stroke="url(#sugg2)"
        fill="url(#sugg2)"
        fillOpacity="0.1"
      />
      <path d="M8 11h8M8 15h5" stroke="currentColor" strokeLinecap="round" />
      <circle cx="17" cy="9" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Suggestion 3: Overlapping Circles
// Diversity and Connection.
export function LogoSuggestion3({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg3a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="sugg3b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="url(#sugg3a)"
        strokeWidth="2"
        fill="url(#sugg3a)"
        fillOpacity="0.1"
      />
      <circle
        cx="16"
        cy="16"
        r="6"
        stroke="url(#sugg3b)"
        strokeWidth="2"
        fill="url(#sugg3b)"
        fillOpacity="0.1"
      />
      <path
        d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

// Suggestion 4: Playful Face
// Friendly and welcoming.
export function LogoSuggestion4({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg4" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" stroke="url(#sugg4)" strokeWidth="2" />
      <path
        d="M8 9h.01M16 9h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M8 15c1.5 2 4.5 2 6 0"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path d="M12 22v-2" stroke="url(#sugg4)" />
      <path d="M12 2v2" stroke="url(#sugg4)" />
    </svg>
  );
}

// Suggestion 5: Infinity Link
// Endless connection and continuity.
export function LogoSuggestion5({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg5" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 0c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4z"
        stroke="url(#sugg5)"
        strokeWidth="2"
        opacity="0.8"
      />
      <path
        d="M8 8l8 8M16 8l-8 8"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

// Suggestion 6: Signal / Pulse
// Communication and activity.
export function LogoSuggestion6({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg6" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path d="M2 12h3l3-9 4 18 3-9h3" stroke="url(#sugg6)" strokeWidth="2.5" />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.2"
      />
    </svg>
  );
}

// Suggestion 7: Modern Pin
// Location and presence.
export function LogoSuggestion7({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg7" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        fill="url(#sugg7)"
        fillOpacity="0.1"
        stroke="url(#sugg7)"
      />
      <circle cx="12" cy="10" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Suggestion 8: Abstract H
// Strong, stable, architectural.
export function LogoSuggestion8({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg8" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect
        x="4"
        y="4"
        width="4"
        height="16"
        rx="1"
        fill="url(#sugg8)"
        stroke="none"
      />
      <rect
        x="16"
        y="4"
        width="4"
        height="16"
        rx="1"
        fill="url(#sugg8)"
        stroke="none"
      />
      <rect
        x="4"
        y="11"
        width="16"
        height="2"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

// Suggestion 9: Circle Dots
// Community, gathering, circle of trust.
export function LogoSuggestion9({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg9" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="4" r="2" fill="url(#sugg9)" stroke="none" />
      <circle cx="12" cy="20" r="2" fill="url(#sugg9)" stroke="none" />
      <circle cx="4" cy="12" r="2" fill="url(#sugg9)" stroke="none" />
      <circle cx="20" cy="12" r="2" fill="url(#sugg9)" stroke="none" />
      <circle
        cx="17.66"
        cy="6.34"
        r="2"
        fill="url(#sugg9)"
        stroke="none"
        opacity="0.8"
      />
      <circle
        cx="17.66"
        cy="17.66"
        r="2"
        fill="url(#sugg9)"
        stroke="none"
        opacity="0.8"
      />
      <circle
        cx="6.34"
        cy="17.66"
        r="2"
        fill="url(#sugg9)"
        stroke="none"
        opacity="0.8"
      />
      <circle
        cx="6.34"
        cy="6.34"
        r="2"
        fill="url(#sugg9)"
        stroke="none"
        opacity="0.8"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" />
    </svg>
  );
}

// Suggestion 10: Arrow Up / Growth
// Progress, moving forward.
export function LogoSuggestion10({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg10" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path d="M12 19V5" stroke="currentColor" strokeWidth="3" />
      <path d="M5 12l7-7 7 7" stroke="url(#sugg10)" strokeWidth="3" />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="url(#sugg10)"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
    </svg>
  );
}

// Suggestion 11: Shield / Trust
// Security, reliability.
export function LogoSuggestion11({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg11" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        fill="url(#sugg11)"
        fillOpacity="0.1"
        stroke="url(#sugg11)"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

// Suggestion 12: Sunrise / Horizon
// New beginnings, hope.
export function LogoSuggestion12({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg12" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <path d="M12 12v9" stroke="none" />
      <path d="M17 18h5" stroke="currentColor" />
      <path d="M2 18h5" stroke="currentColor" />
      <path d="M7 18h10" stroke="currentColor" />
      <path
        d="M12 18a5 5 0 0 1-5-5 5 5 0 0 1 10 0"
        fill="url(#sugg12)"
        stroke="none"
      />
      <path d="M12 2v4" stroke="url(#sugg12)" />
      <path d="M4.93 4.93l2.83 2.83" stroke="url(#sugg12)" />
      <path d="M19.07 4.93l-2.83 2.83" stroke="url(#sugg12)" />
    </svg>
  );
}

// Suggestion 13: Network Nodes
// Digital connection, tech, network.
export function LogoSuggestion13({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg13" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="5" r="3" fill="url(#sugg13)" stroke="none" />
      <circle cx="6" cy="12" r="3" fill="url(#sugg13)" stroke="none" />
      <circle cx="18" cy="19" r="3" fill="url(#sugg13)" stroke="none" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" />
    </svg>
  );
}

// Suggestion 14: Linked Hands / Partnership
// Human connection, support.
export function LogoSuggestion14({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg14" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <path
        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <path
        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        fill="url(#sugg14)"
        stroke="none"
      />
      <path d="M12 15l-4 1 1-4" stroke="currentColor" />
      <path d="M16 5l3 3" stroke="currentColor" strokeOpacity="0.5" />
    </svg>
  );
}

// Suggestion 15: The Bridge
// Connecting two sides.
export function LogoSuggestion15({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg15" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path
        d="M4 21v-8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8"
        stroke="currentColor"
      />
      <path
        d="M2 10c0-4 4-8 10-8s10 4 10 8"
        stroke="url(#sugg15)"
        strokeWidth="3"
      />
      <path d="M12 2v4" stroke="currentColor" strokeOpacity="0.5" />
    </svg>
  );
}

// Suggestion 16: Interwoven / Knot
// Strong bond, inseparable.
export function LogoSuggestion16({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sugg16" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="8"
        height="8"
        rx="2"
        stroke="url(#sugg16)"
        strokeWidth="2.5"
      />
      <rect
        x="14"
        y="14"
        width="8"
        height="8"
        rx="2"
        stroke="url(#sugg16)"
        strokeWidth="2.5"
      />
      <path d="M6 10v4a4 4 0 0 0 4 4h4" stroke="currentColor" />
      <path d="M10 6h4a4 4 0 0 1 4 4v4" stroke="currentColor" />
    </svg>
  );
}
