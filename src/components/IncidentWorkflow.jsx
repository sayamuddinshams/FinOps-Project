import MaterialSymbol from './MaterialSymbol'
import LatencySparkline from './LatencySparkline'
import { triagePoints } from '@/data/content'

export default function IncidentWorkflow() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="shell gutter-x grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
        {/* Story copy — 5 columns */}
        <div className="flex flex-col gap-space-md lg:col-span-5">
          <span className="font-label-caps text-label-caps uppercase text-primary">Autonomous Triage</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Detect Anomaly, Isolate Blast Radius, Resolve Instantly
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            When high latency strikes an EKS node in Frankfurt while cloud spend spikes in US-West,
            CloudPulse correlates metric correlations automatically without manual query hunting.
          </p>

          <div className="flex flex-col gap-space-sm pt-space-xs">
            {triagePoints.map((point) => (
              <div key={point.title} className="flex items-start gap-space-sm">
                <MaterialSymbol name="check_circle" className="mt-1 text-primary-container" />
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface">{point.title}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{point.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock SRE command palette & incident stream — 7 columns */}
        <div className="flex flex-col gap-space-md lg:col-span-7">
          <div className="flex flex-col gap-space-md rounded-2xl bg-surface-container p-space-lg shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="h-3 w-3 rounded-full bg-error-container" />
                <span className="h-3 w-3 rounded-full bg-surface-container-high" />
                <span className="h-3 w-3 rounded-full bg-surface-bright" />
                <span className="ml-space-xs font-code-sm text-code-sm text-on-surface-variant">
                  incident-correlator: cluster-eu-central-1
                </span>
              </div>
              <span className="font-code-sm text-code-sm text-primary-container">Autopilot Armed</span>
            </div>

            {/* Alert feed item */}
            <div className="flex flex-col justify-between gap-space-md rounded-xl bg-surface-container-low p-space-md md:flex-row md:items-center">
              <div className="flex items-center gap-space-sm">
                <div className="rounded-lg bg-surface-container p-2 text-primary-container">
                  <MaterialSymbol name="network_check" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title-md text-title-md text-on-surface">Egress Spike Correlated</span>
                    <span className="chip bg-surface-container-high text-primary">Resolved</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Auto-diverted 18% replica load from AWS frankfurt to Azure Zurich
                  </span>
                </div>
              </div>
              <span className="font-code-sm text-code-sm text-on-surface-variant">14s ago</span>
            </div>

            {/* Real-time metric graph */}
            <div className="flex flex-col gap-space-xs rounded-xl bg-surface-container-low p-space-md">
              <div className="flex items-center justify-between font-label-caps text-label-caps text-on-surface-variant">
                <span>System Latency Stabilization (Past 60 Seconds)</span>
                <span className="tnum font-mono text-primary-container">1.2ms P99</span>
              </div>
              <LatencySparkline />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
