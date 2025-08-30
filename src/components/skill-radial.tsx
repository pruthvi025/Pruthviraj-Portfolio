"use client";
import { motion } from "framer-motion";

export function SkillRadial({
  label,
  value,
}: {
  label: string;
  value: number; // 0-100
}) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex items-center gap-3">
      <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0">
        <circle cx="40" cy="40" r={radius} className="stroke-muted fill-none" strokeWidth="8" />
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          className="stroke-primary fill-none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-base">{value}%</p>
      </div>
    </div>
  );
}


