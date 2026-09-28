/** Edge-to-edge topology mesh — AWS / Core collector / Azure / GCP. */
export default function TopologyMesh() {
  return (
    <div className="relative flex h-36 w-full items-center justify-center">
      <svg
        className="h-full w-full"
        fill="none"
        viewBox="0 0 380 140"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Inter-cloud topology mesh: us-east-1 to CloudPulse Core to westeurope and asia-east1"
      >
        {/* Grid guide lines */}
        {[35, 70, 105].map((y) => (
          <line
            key={y}
            className="text-surface-bright/40"
            stroke="currentColor"
            strokeDasharray="3 3"
            x1="0"
            x2="380"
            y1={y}
            y2={y}
          />
        ))}

        {/* Inter-cloud connections */}
        <path
          className="text-secondary/50"
          d="M 60 70 Q 130 20 190 60 T 320 70"
          stroke="currentColor"
          strokeDasharray="4 2"
          strokeWidth="1.5"
        />
        <path
          className="text-primary-container"
          d="M 60 70 Q 120 110 190 60 T 320 70"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="text-secondary/40"
          d="M 190 60 L 190 120"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        {/* AWS node */}
        <circle className="text-primary-container" cx="60" cy="70" r="14" stroke="currentColor" strokeWidth="2" />
        <circle className="fill-primary-container animate-ping" cx="60" cy="70" r="5" />
        <text
          className="fill-on-surface-variant font-code-sm"
          fontSize="10"
          textAnchor="middle"
          x="60"
          y="98"
        >
          us-east-1
        </text>

        {/* Core collector node */}
        <circle className="text-primary" cx="190" cy="60" r="18" stroke="currentColor" strokeWidth="2" />
        <circle className="fill-primary" cx="190" cy="60" r="7" />
        <text
          className="fill-primary font-title-md"
          fontSize="11"
          textAnchor="middle"
          x="190"
          y="40"
        >
          CloudPulse Core
        </text>

        {/* Azure node */}
        <circle className="text-secondary" cx="320" cy="70" r="14" stroke="currentColor" strokeWidth="2" />
        <circle className="fill-secondary" cx="320" cy="70" r="5" />
        <text
          className="fill-on-surface-variant font-code-sm"
          fontSize="10"
          textAnchor="middle"
          x="320"
          y="98"
        >
          westeurope
        </text>

        {/* GCP node */}
        <circle className="text-primary-fixed-dim" cx="190" cy="120" r="12" stroke="currentColor" strokeWidth="1.5" />
        <circle className="fill-primary-fixed-dim" cx="190" cy="120" r="4" />
        <text
          className="fill-on-surface-variant font-code-sm"
          fontSize="9"
          textAnchor="middle"
          x="190"
          y="136"
        >
          asia-east1
        </text>
      </svg>
    </div>
  )
}
