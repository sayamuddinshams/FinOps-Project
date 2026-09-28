import { Link } from 'react-router-dom'
import MaterialSymbol from './MaterialSymbol'

const guarantees = [
  { icon: 'lock', label: 'Read-Only Telemetry' },
  { icon: 'credit_card_off', label: 'No Credit Card Required' },
  { icon: 'bolt', label: '3-Minute Setup' },
]

export default function FinalCta() {
  return (
    <section id="get-started" className="w-full scroll-mt-24 px-margin py-space-xl">
      <div className="shell relative mx-auto flex flex-col items-center gap-space-lg overflow-hidden rounded-3xl bg-gradient-to-br from-surface-container to-surface-container-high p-space-xl text-center shadow-2xl">
        {/* Atmospheric backdrop light */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary-container/15 blur-[100px]" />

        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-space-xs">
          <span className="mb-space-xs rounded-full bg-surface-container px-space-sm py-1 font-label-caps text-label-caps uppercase tracking-wider text-primary">
            Instant Deployment • Zero Agent Footprint
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Ready to get a complete view of your cloud infrastructure?
          </h2>
          <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">
            Spin up full multi-cloud observability in under 3 minutes. Connect your clouds with
            read-only IAM policies or explore the full platform demo immediately.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-space-md pt-space-xs">
          <a href="#dashboard" className="btn-primary">
            <MaterialSymbol name="play_arrow" className="text-headline-sm" />
            <span>View Our Dashboard</span>
          </a>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-space-xs rounded-lg bg-surface-container-highest px-space-xl py-space-md font-title-md text-title-md text-on-surface shadow-sm transition-all hover:bg-surface-bright"
          >
            <span>Get Started Free</span>
            <MaterialSymbol name="arrow_forward" className="text-headline-sm" />
          </Link>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-space-md pt-space-xs font-body-sm text-body-sm text-on-surface-variant">
          {guarantees.map((g, i) => (
            <span key={g.label} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true" className="mr-space-md">•</span>}
              <MaterialSymbol name={g.icon} className="text-sm text-primary" />
              {g.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
