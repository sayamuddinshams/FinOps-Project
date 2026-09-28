import BrandLogo from './BrandLogo'

const links = ['Privacy Policy', 'Security SLAs', 'Telemetry APIs']

export default function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-xl shadow-[0_-1px_8px_rgba(0,0,0,0.3)]">
      <div className="flex w-full flex-col items-center justify-between gap-space-md px-margin text-on-surface-variant md:flex-row">
        <div className="flex items-center gap-space-sm">
          <BrandLogo className="h-6 w-6" imgClassName="opacity-70" />
          <span className="font-headline-sm text-title-md text-on-surface">CloudPulse Telemetry Platform</span>
        </div>
        <p className="font-body-sm text-body-sm">
          © {new Date().getFullYear()} CloudPulse Inc. Enterprise Multi-Cloud Observability Architecture.
        </p>
        <div className="flex items-center gap-space-lg font-body-sm text-body-sm">
          {links.map((link) => (
            <a key={link} href="#top" className="text-on-surface-variant transition-colors hover:text-on-surface">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
