"use client";
import { useEffect, useState } from "react";

export function Typewriter({
  words,
  speed = 80,
  pause = 1200,
}: {
  words: string[];
  speed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    if (!deleting && subIndex === current.length) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((s) => s + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, speed, pause]);

  const text = words[index % words.length].slice(0, subIndex);
  return (
    <span className="inline-flex items-center">
      <span>{text}</span>
      <span className="ml-1 h-5 w-[2px] bg-foreground animate-pulse" />
    </span>
  );
}


