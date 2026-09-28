/** Latency stabilisation sparkline with cyan area fill. */
export default function LatencySparkline({ id = 'cyanGlow' }) {
  const line = 'M0,50 Q40,15 80,45 T160,25 T240,55 T320,15 T400,20 L450,18'

  return (
    <div className="h-20 w-full">
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 450 70"
        role="img"
        aria-label="System latency stabilisation over the past 60 seconds, p99 at 1.2 milliseconds"
      >
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L450,70 L0,70 Z`} fill={`url(#${id})`} />
        <path d={line} fill="none" stroke="#00f0ff" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
