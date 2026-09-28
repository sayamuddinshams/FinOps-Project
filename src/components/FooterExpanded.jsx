import BrandLogo from './BrandLogo'
import { footerColumns } from '@/data/content'

const legalLinks = ['Terms of Service', 'Privacy Policy', 'Cookie Preferences']

export default function FooterExpanded() {
  return (
    <section className="w-full bg-surface-container-lowest pb-space-lg pt-space-xl">
      <div className="shell gutter-x flex flex-col gap-space-xl">
        <div className="grid grid-cols-2 gap-gutter md:grid-cols-3 lg:grid-cols-6">
          {/* Brand summary — 2 columns */}
          <div className="col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <BrandLogo className="h-7 w-7" />
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary">CloudPulse</span>
            </div>
            <p className="max-w-sm font-body-sm text-body-sm text-on-surface-variant">
              High-performance enterprise observability. Precision instrumentation for Kubernetes,
              serverless runtimes, and hybrid multi-cloud topologies.
            </p>
            <div className="inline-flex w-fit items-center gap-space-xs rounded-full bg-surface-container-high px-space-sm py-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />
              <span className="font-label-caps text-label-caps uppercase text-on-surface">
                All Systems Operational 99.99%
              </span>
            </div>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} className="flex flex-col gap-space-sm" aria-label={col.title}>
              <span className="font-title-md text-title-md text-on-surface">{col.title}</span>
              <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                {col.links.map((link) => (
                  <a key={link} href="#top" className="transition-colors hover:text-primary-container">
                    {link}
                  </a>
                ))}
              </div>
            </nav>
          ))}
        </div>

        {/* Legal sub-strip */}
        <div className="flex flex-col items-center justify-between gap-space-sm pt-space-md font-body-sm text-body-sm text-on-surface-variant md:flex-row">
          <span>
            © {new Date().getFullYear()} CloudPulse Platform Inc. Precision instrumentation for hyperscale
            enterprise multi-cloud.
          </span>
          <div className="flex items-center gap-space-md">
            {legalLinks.map((link) => (
              <a key={link} href="#top" className="transition-colors hover:text-on-surface">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
