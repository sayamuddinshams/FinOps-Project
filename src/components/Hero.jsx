import { Link } from 'react-router-dom'
import MaterialSymbol from './MaterialSymbol'
import TopologyMesh from './TopologyMesh'
import { consoleStats, heroStats } from '@/data/content'

export default function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden px-margin py-space-xl">
      {/* Ambient atmospheric glows */}
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-96 w-96 rounded-full bg-primary-container/10 blur-[128px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 -z-10 h-[500px] w-[500px] rounded-full bg-secondary-container/15 blur-[140px]" />

      <div className="shell mx-auto grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
        {/* Hero copy — 7 columns */}
        <div className="flex flex-col gap-space-lg lg:col-span-7">
          <h1 className="text-balance font-display text-display leading-tight tracking-tight text-on-surface">
            Monitor Your Cloud Infrastructure in{' '}
            <span className="text-primary-container drop-shadow-[0_0_24px_rgba(0,240,255,0.4)]">
              One Place
            </span>
          </h1>

          <p className="max-w-2xl text-pretty font-body-lg text-body-lg text-on-surface-variant">
            Centralized visibility into cloud resources, telemetry, costs, and security health across
            AWS, Azure, and Google Cloud with zero overhead.
          </p>

          {/* CTA cluster */}
          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <a href="#dashboard" className="btn-primary group">
              <MaterialSymbol name="monitoring" className="text-headline-sm" />
              <span>View Our Dashboard</span>
              <span className="absolute -inset-0.5 -z-10 rounded-lg bg-primary-container opacity-40 blur-sm transition duration-300 group-hover:opacity-75" />
            </a>
            <Link to="/login" className="btn-secondary">
              <MaterialSymbol name="login" className="text-headline-sm" />
              <span>Login / Sign Up</span>
            </Link>
          </div>

          {/* Trust badges & metrics strip */}
          <div className="grid max-w-lg grid-cols-3 gap-space-md pt-space-lg">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-space-xs rounded-lg bg-surface-container-low p-space-sm">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {stat.label}
                </span>
                <span
                  className={`tnum font-headline-sm text-headline-sm ${stat.accent ? 'text-primary' : 'text-on-surface'}`}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual — 5 columns: glassmorphism live telemetry matrix */}
        <div className="relative flex flex-col gap-space-md lg:col-span-5">
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-tr from-secondary-container/20 to-primary-container/10 blur-xl" />

          <div id="dashboard" className="flex scroll-mt-24 flex-col gap-space-md rounded-2xl bg-surface-container/90 p-space-lg shadow-2xl backdrop-blur-2xl">
            {/* Widget header */}
            <div className="flex items-center justify-between pb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="h-3 w-3 animate-pulse rounded-full bg-primary-container" />
                <span className="font-title-md text-title-md text-on-surface">Global Mesh Telemetry</span>
              </div>
              <div className="rounded-full bg-surface-container-highest px-space-xs py-0.5 font-label-caps text-label-caps text-primary">
                Live Stream
              </div>
            </div>

            {/* Top-line stats bar */}
            <div className="grid grid-cols-3 gap-space-xs">
              {consoleStats.map((stat) => (
                <div key={stat.label} className="flex flex-col rounded-xl bg-surface-container-high p-space-sm">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">{stat.label}</span>
                  <span className={`tnum font-headline-sm text-headline-sm font-bold ${stat.valueClass}`}>
                    {stat.value}
                  </span>
                  <span className={`font-body-sm text-body-sm ${stat.detailClass}`}>{stat.detail}</span>
                </div>
              ))}
            </div>

            {/* Topology map */}
            <div className="relative flex flex-col gap-space-xs overflow-hidden rounded-xl bg-surface-container-lowest p-space-md">
              <div className="flex items-center justify-between font-label-caps text-label-caps text-on-surface-variant">
                <span>Topology Mesh Latency (Edge-to-Edge)</span>
                <span className="tnum font-mono text-primary-container">18.4 ms avg</span>
              </div>
              <TopologyMesh />
            </div>

            {/* Compliance health stream */}
            <div className="flex items-center justify-between rounded-xl bg-surface-container-high p-space-sm">
              <div className="flex items-center gap-space-sm">
                <MaterialSymbol name="shield" className="text-primary-container" />
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface">Compliance Health</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">CIS Level 2 Hardened</span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs rounded-full bg-surface-container-low px-space-sm py-1 text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
                <span className="font-label-caps text-label-caps">100% Pass</span>
              </div>
            </div>
          </div>

          {/* Overlapping quick-inspector floating node */}
          <div className="-ml-6 -mt-6 hidden max-w-sm items-center justify-between rounded-xl bg-surface-container-high/95 p-space-md shadow-xl backdrop-blur-xl sm:flex">
            <div className="flex items-center gap-space-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-bright text-primary-container">
                <MaterialSymbol name="memory" className="text-headline-sm" />
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface">Auto-Discovered Pods</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">GKE Cluster • 64 Pods Clean</span>
              </div>
            </div>
            <span className="tnum font-headline-sm text-headline-sm font-bold text-primary">0 err</span>
          </div>
        </div>
      </div>
    </section>
  )
}
