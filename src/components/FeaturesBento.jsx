import MaterialSymbol from './MaterialSymbol'
import { features } from '@/data/content'

export default function FeaturesBento() {
  return (
    <section id="features" className="w-full scroll-mt-24 px-margin py-space-xl">
      <div className="shell mx-auto flex flex-col gap-space-xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-space-xs text-center">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">
            End-To-End Architecture
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Architected for Hyperscale Infrastructure
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Complete structural telemetry, cost optimization, and automated security posture unified
            across heterogeneous clusters.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="flex flex-col justify-between gap-space-md rounded-2xl bg-surface-container p-space-lg shadow-md transition-all hover:shadow-xl"
            >
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-high ${f.accent}`}
                  >
                    <MaterialSymbol name={f.icon} className="text-headline-md" />
                  </div>
                  <span className={`chip bg-surface-container-high ${f.tagAccent}`}>{f.tag}</span>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{f.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{f.body}</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-surface-container-low p-space-sm">
                <span className="font-code-sm text-code-sm text-on-surface-variant">{f.footLabel}</span>
                <span className={`tnum font-code-sm text-code-sm ${f.footAccent}`}>{f.footValue}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
