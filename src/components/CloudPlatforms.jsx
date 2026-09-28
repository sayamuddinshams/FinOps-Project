import MaterialSymbol from './MaterialSymbol'
import { platforms } from '@/data/content'

export default function CloudPlatforms() {
  return (
    <section id="platforms" className="w-full scroll-mt-24 bg-surface-container-low py-space-xl">
      <div className="shell gutter-x flex flex-col gap-space-lg">
        <div className="flex flex-col justify-between gap-space-sm md:flex-row md:items-end">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary">
              Multi-Cloud Ingestion Engine
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Supported Cloud Platforms</h2>
          </div>
          <p className="max-w-md font-body-md text-body-md text-on-surface-variant">
            Ready for enterprise deployment. Seamless agentless ingestion or lightweight OpenTelemetry
            collectors.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {platforms.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col justify-between gap-space-md rounded-2xl bg-surface-container p-space-lg shadow-md transition-all hover:bg-surface-bright"
            >
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-high ${p.accent}`}
                    >
                      <MaterialSymbol name={p.icon} className="text-headline-md" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">{p.name}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{p.detail}</span>
                    </div>
                  </div>
                  <span
                    className={`chip bg-surface-container-high ${p.accent}`}
                    title={`${p.name} ingestion health`}
                  >
                    Healthy
                  </span>
                </div>

                <div className="flex items-center gap-space-xs rounded-lg bg-surface-container-low px-space-sm py-space-xs font-label-caps text-label-caps text-on-surface-variant">
                  <span className={p.accent}>•</span>
                  <span>{p.services}</span>
                </div>

                <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                  <div className="flex flex-col rounded bg-surface-container-low p-space-xs">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">Active Resources</span>
                    <span className="tnum font-headline-sm text-headline-sm font-semibold text-on-surface">
                      {p.resources}
                    </span>
                  </div>
                  <div className="flex flex-col rounded bg-surface-container-low p-space-xs">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">Sync Latency</span>
                    <span className={`tnum font-headline-sm text-headline-sm font-semibold ${p.latencyAccent}`}>
                      {p.latency}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-space-xs">
                <span className="font-body-sm text-body-sm text-on-surface-variant">{p.auth}</span>
                <MaterialSymbol
                  name="arrow_forward"
                  className={`text-on-surface-variant transition-colors ${p.hoverAccent}`}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
