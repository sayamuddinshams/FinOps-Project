import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'

const links = [
  { label: 'View Our Dashboard', href: '/#dashboard' },
  { label: 'Login / Sign Up', to: '/login' },
]

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/85 shadow-[0_1px_8px_rgba(0,0,0,0.4)] backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-between gap-space-md px-margin">
        <a href="#top" className="flex items-center gap-space-sm" aria-label="CloudPulse home">
          <BrandLogo className="h-8 w-8" />
          <span className="font-headline-sm text-headline-sm tracking-tight text-primary">CloudPulse</span>
        </a>

        <div className="flex items-center gap-space-md">
          {/* Live status pill — decorative pulse only on md+ */}
          <div className="hidden items-center gap-space-xs rounded-full bg-surface-container-high px-space-sm py-1 text-on-surface-variant md:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />
            <span className="font-label-caps text-label-caps">All Systems Operational</span>
          </div>

          <a
            href={links[0].href}
            className="hidden rounded-lg bg-primary-container px-space-md py-space-sm font-headline-sm text-title-md text-on-primary shadow-[0_0_16px_rgba(0,240,255,0.3)] transition-all hover:shadow-[0_0_24px_rgba(0,240,255,0.5)] sm:inline-flex"
          >
            {links[0].label}
          </a>

          <Link
            to={links[1].to}
            className="inline-flex items-center justify-center rounded-lg bg-surface-container-high px-space-md py-space-sm font-title-md text-title-md text-on-surface transition-colors hover:bg-surface-bright"
          >
            {links[1].label}
          </Link>
        </div>
      </div>
    </header>
  )
}
