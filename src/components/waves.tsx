export function Waves() {
  return (
    <svg className="absolute inset-x-0 bottom-[-1px] -z-10 h-[140px] w-full" viewBox="0 0 1440 320" aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="hsl(260 80% 60% / 0.35)" />
          <stop offset="100%" stopColor="hsl(200 90% 55% / 0.35)" />
        </linearGradient>
      </defs>
      <path fill="url(#g)" d="M0,192L60,181.3C120,171,240,149,360,160C480,171,600,213,720,234.7C840,256,960,256,1080,234.7C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
        </path>
    </svg>
  );
}


