import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import BrandLogo from '@/components/BrandLogo'
import DeltaChip from '@/components/DeltaChip'
import MaterialSymbol from '@/components/MaterialSymbol'
import Panel from '@/components/Panel'
import StatusPill from '@/components/StatusPill'
import ShareBar from '@/components/charts/ShareBar'
import Sparkline from '@/components/charts/Sparkline'
import SpendTrendChart from '@/components/charts/SpendTrendChart'
import DashboardNav from '@/components/dashboard/DashboardNav'
import StatCard from '@/components/dashboard/StatCard'

import {
  budgets,
  categories,
  kpis,
  monthlySpend,
  opportunities,
  providers,
  resources,
  services,
  spendSeries,
  stackSeries,
  totalMtd,
  totalResources,
} from '@/data/finops'
import { usd, usdCompact } from '@/utils/format'

const DOT = { aws: 'bg-primary-container', azure: 'bg-secondary', gcp: 'bg-tertiary-fixed-dim' }
const SHORT = { aws: 'AWS', azure: 'Azure', gcp: 'GCP' }
const TONE_BY_STATUS = { healthy: 'ok', underutilized: 'warn', oversized: 'warn', idle: 'crit', unallocated: 'muted' }
const TONE = { aws: 'cyan', azure: 'indigo', gcp: 'sky' }

const RANGES = ['7d', '30d', '90d', 'MTD', 'YTD']

export default function Dashboard() {
  const [section, setSection] = useState('overview')
  const [range, setRange] = useState('30d')
  const [provider, setProvider] = useState('all')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sort, setSort] = useState({ key: 'monthly', dir: 'desc' })

  const { peak } = stackSeries()
  const months = useMemo(() => monthlySpend(), [])

  const budgetPct = (kpis.mtdSpend / kpis.budget) * 100
  const forecastPct = (kpis.forecast / kpis.budget) * 100

  const resources_ = useMemo(() => {
    const q = query.trim().toLowerCase()
    const out = resources
      .filter((r) => (provider === 'all' ? true : r.provider === provider))
      .filter((r) => (statusFilter === 'all' ? true : r.status === statusFilter))
      .filter((r) => !q || r.name.includes(q) || r.type.toLowerCase().includes(q) || r.owner.includes(q) || r.region.includes(q))

    const { key, dir } = sort
    return [...out].sort((a, b) => {
      const av = a[key]
      const bv = b[key]
      if (typeof av === 'string') return dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      return dir === 'asc' ? av - bv : bv - av
    })
  }, [provider, statusFilter, query, sort])

  const services_ = useMemo(
    () => (provider === 'all' ? services : services.filter((s) => s.provider === provider)),
    [provider],
  )

  function toggleSort(key) {
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }))
  }

  const sortIcon = (key) => (sort.key === key ? (sort.dir === 'desc' ? 'arrow_downward' : 'arrow_upward') : 'unfold_more')

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      <div className="pointer-events-none fixed left-1/3 top-0 -z-10 h-[420px] w-[520px] rounded-full bg-primary-container/[0.07] blur-[140px]" />

      <div className="flex min-h-screen">
        {/* ---------- Sidebar ---------- */}
        <aside className="sticky top-0 hidden h-screen w-60 flex-none flex-col gap-space-md border-r border-white/[0.06] bg-surface-container-lowest/60 p-space-md md:flex">
          <Link to="/" className="flex items-center gap-space-sm px-space-xs">
            <BrandLogo className="h-7 w-7" />
            <span className="font-headline-sm text-headline-sm tracking-tight text-primary">CloudPulse</span>
          </Link>

          <div className="flex items-center gap-space-xs rounded-lg bg-surface-container px-space-sm py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-status-ok" />
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">FinOps · Prod</span>
          </div>

          <DashboardNav active={section} onSelect={setSection} />

          <div className="mt-auto flex flex-col gap-space-xs">
            <div className="rounded-xl bg-surface-container p-space-sm">
              <p className="font-label-caps text-label-caps uppercase text-on-surface-variant">Coverage</p>
              <p className="tnum font-headline-sm text-headline-sm font-bold text-primary">{kpis.coveragePct}%</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">of line items allocated</p>
            </div>
            <div className="rounded-xl bg-surface-container p-space-sm">
              <p className="font-label-caps text-label-caps uppercase text-on-surface-variant">Unallocated</p>
              <p className="tnum font-headline-sm text-headline-sm font-bold text-status-warn">
                {usdCompact(kpis.unallocated)}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">0.6% needs tagging</p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-space-sm rounded-lg px-space-sm py-2 font-title-md text-title-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            >
              <MaterialSymbol name="arrow_back" className="text-headline-sm" />
              Back to site
            </Link>
          </div>
        </aside>

        {/* ---------- Main ---------- */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-space-sm border-b border-white/[0.06] bg-surface/85 px-margin py-space-sm backdrop-blur-xl">
            <div className="flex items-center gap-space-sm">
              <h1 className="font-headline-sm text-headline-sm text-on-surface">
                {section === 'overview'
                  ? 'Cloud Cost Overview'
                  : section === 'inventory'
                    ? 'Resource Inventory'
                    : section === 'budgets'
                      ? 'Budgets & Allocation'
                      : section === 'savings'
                        ? 'Savings Recommendations'
                        : section === 'cost'
                          ? 'Cost Analytics'
                          : 'Governance Policies'}
              </h1>
              <StatusPill tone="ok" pulse className="hidden sm:inline-flex">
                Live
              </StatusPill>
            </div>

            <div className="flex flex-wrap items-center gap-space-sm">
              {/* Range */}
              <div className="flex items-center gap-1 rounded-lg bg-surface-container p-1">
                {RANGES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRange(r)}
                    aria-pressed={range === r}
                    className={`tnum rounded px-space-sm py-1 font-code-sm text-code-sm transition-all ${
                      range === r ? 'bg-surface-container-high text-primary-container' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Provider */}
              <div className="flex items-center gap-1 rounded-lg bg-surface-container p-1">
                {[{ id: 'all', label: 'All' }, ...providers.map((p) => ({ id: p.id, label: p.short }))].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setProvider(f.id)}
                    aria-pressed={provider === f.id}
                    className={`rounded px-space-sm py-1 font-title-md text-title-md transition-all ${
                      provider === f.id
                        ? 'bg-surface-container-high text-primary-container'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="flex items-center gap-space-xs rounded-lg bg-surface-container-high px-space-sm py-2 font-title-md text-title-md text-on-surface transition-colors hover:bg-surface-bright"
              >
                <MaterialSymbol name="refresh" className="text-title-md" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </header>

          <main className="flex flex-col gap-gutter p-margin">
            {/* ---------- KPI row ---------- */}
            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Month-to-Date Spend"
                value={usd(kpis.mtdSpend)}
                delta={3.8}
                positive={false}
                trend={services[0].trend}
                status={{ tone: 'warn', label: 'Over plan' }}
                foot="vs $1.24M last month"
              />
              <StatCard
                label="Forecast End of Month"
                value={usd(kpis.forecast)}
                delta={-2.5}
                positive
                foot={`${forecastPct.toFixed(1)}% of budget`}
                meter={
                  <ShareBar
                    height="h-1.5"
                    segments={[
                      { label: 'Forecast', value: kpis.forecast, tone: 'cyan' },
                      { label: 'Headroom', value: kpis.budget - kpis.forecast, tone: 'muted' },
                    ]}
                  />
                }
              />
              <StatCard
                label="Budget Consumed"
                value={`${budgetPct.toFixed(1)}%`}
                delta={8.1}
                positive={false}
                foot={`${usd(kpis.budget - kpis.mtdSpend)} remaining`}
                meter={
                  <ShareBar
                    height="h-1.5"
                    segments={[
                      { label: 'Spent', value: kpis.mtdSpend, tone: 'warn' },
                      { label: 'Remaining', value: kpis.budget - kpis.mtdSpend, tone: 'muted' },
                    ]}
                  />
                }
              />
              <StatCard
                label="Savings Realised"
                value={usd(kpis.savingsRealized)}
                delta={21.4}
                positive
                status={{ tone: 'ok', label: 'On track' }}
                foot={`${usdCompact(kpis.savingsIdentified)} still identified`}
              />
            </div>

            {/* ---------- Trend + category ---------- */}
            <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
              <Panel
                className="lg:col-span-8"
                title="Daily Spend by Cloud"
                subtitle={`Last 30 days · peak ${usdCompact(peak)}`}
                icon="monitoring"
              >
                <SpendTrendChart data={spendSeries} peak={peak} height={220} />

                <div className="mt-space-md grid grid-cols-1 gap-space-sm border-t border-white/[0.06] pt-space-md sm:grid-cols-3">
                  {providers.map((p) => (
                    <div key={p.id} className="flex flex-col gap-space-xs">
                      <span className="flex items-center gap-1.5 font-label-caps text-label-caps uppercase text-on-surface-variant">
                        <span className={`h-1.5 w-1.5 rounded-full ${DOT[p.id]}`} />
                        {p.short}
                      </span>
                      <span className="tnum font-headline-sm text-headline-sm font-semibold text-on-surface">
                        {usd(p.mtdSpend)}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {p.resources.toLocaleString()} resources · {p.share}% of spend
                      </span>
                    </div>
                  ))}
                </div>
              </Panel>

              <div className="flex flex-col gap-gutter lg:col-span-4">
                <Panel title="Spend by Category" subtitle={usd(totalMtd)} icon="donut_small">
                  <div className="flex flex-col gap-space-md">
                    {categories.map((c) => (
                      <div key={c.name} className="flex flex-col gap-space-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-body-md text-body-md text-on-surface">{c.name}</span>
                          <span className="tnum font-code-sm text-code-sm text-on-surface-variant">
                            {usdCompact(c.value)} · {c.pct}%
                          </span>
                        </div>
                        <ShareBar
                          height="h-1.5"
                          segments={[
                            { label: c.name, value: c.pct, tone: c.name === 'Compute' ? 'cyan' : c.name === 'Database' ? 'indigo' : 'sky' },
                          ]}
                        />
                      </div>
                    ))}
                  </div>
                </Panel>

                <Panel title="12-Month Run Rate" subtitle="Actual vs budget" icon="calendar_month">
                  <div className="flex h-28 items-end gap-1">
                    {months.map((m) => {
                      const h = (m.spend / 1_500_000) * 100
                      const over = m.spend > m.budget
                      return (
                        <div key={m.month} className="group relative flex flex-1 flex-col items-center gap-1">
                          <div
                            className={`w-full rounded-t ${over ? 'bg-status-crit/70' : 'bg-primary-container/60'} transition-colors group-hover:bg-primary-container`}
                            style={{ height: `${h}%` }}
                            title={`${m.month}: ${usd(m.spend)}`}
                          />
                          <span className="font-code-sm text-[9px] text-on-surface-variant">{m.month}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-space-sm flex items-center justify-between border-t border-white/[0.06] pt-space-sm">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Avg monthly</span>
                    <span className="tnum font-code-sm text-code-sm text-on-surface">
                      {usdCompact(months.reduce((s, m) => s + m.spend, 0) / months.length)}
                    </span>
                  </div>
                </Panel>
              </div>
            </div>

            {/* ---------- Services table ---------- */}
            <Panel
              title="Cost by Service"
              subtitle={`${services_.length} services · sorted by month-to-date`}
              icon="receipt_long"
              actions={
                <span className="tnum font-code-sm text-code-sm text-on-surface-variant">
                  {usd(services_.reduce((s, x) => s + x.mtd, 0))}
                </span>
              }
              bodyClassName="p-0"
            >
              <div className="max-h-[420px] overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  <thead className="sticky top-0 z-10 bg-surface-container/95 backdrop-blur-xl">
                    <tr className="border-b border-white/[0.08]">
                      {['Service', 'Cloud', 'Category', 'MTD Cost', 'vs Last Month', 'Trend'].map((h, i) => (
                        <th
                          key={h}
                          scope="col"
                          className={`px-space-md py-space-sm font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant ${
                            i === 3 || i === 4 ? 'text-right' : ''
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {services_.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-white/[0.04] odd:bg-white/[0.015] transition-colors hover:bg-primary-container/[0.03]"
                      >
                        <td className="px-space-md py-2.5 font-body-md text-body-md text-on-surface">{s.name}</td>
                        <td className="px-space-md py-2.5">
                          <span className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                            <span className={`h-1.5 w-1.5 rounded-full ${DOT[s.provider]}`} />
                            {SHORT[s.provider]}
                          </span>
                        </td>
                        <td className="px-space-md py-2.5 font-body-sm text-body-sm text-on-surface-variant">
                          {s.category}
                        </td>
                        <td className="tnum px-space-md py-2.5 text-right font-code-sm text-code-sm text-on-surface">
                          {usd(s.mtd)}
                        </td>
                        <td className="px-space-md py-2.5 text-right">
                          <DeltaChip value={s.deltaPct} />
                        </td>
                        <td className="px-space-md py-2.5 text-right">
                          <Sparkline points={s.trend} positive={s.deltaPct <= 0} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            {/* ---------- Resource inventory ---------- */}
            <Panel
              title="Resource Inventory"
              subtitle={`${resources_.length} shown · ${totalResources.toLocaleString()} tracked`}
              icon="inventory_2"
              bodyClassName="p-0"
              actions={
                <div className="flex items-center gap-space-xs">
                  <div className="relative flex items-center">
                    <MaterialSymbol
                      name="search"
                      className="pointer-events-none absolute left-2.5 text-title-md text-on-surface-variant"
                    />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search…"
                      aria-label="Search resources"
                      className="w-40 rounded-lg border border-white/[0.10] bg-surface-container-lowest py-1.5 pl-8 pr-2 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter by status"
                    className="rounded-lg border border-white/[0.10] bg-surface-container-lowest px-2 py-1.5 font-body-sm text-body-sm text-on-surface focus:border-primary-container focus:outline-none"
                  >
                    <option value="all">All status</option>
                    <option value="healthy">Healthy</option>
                    <option value="underutilized">Underutilized</option>
                    <option value="oversized">Oversized</option>
                    <option value="idle">Idle</option>
                    <option value="unallocated">No cost centre</option>
                  </select>
                </div>
              }
            >
              <div className="max-h-[520px] overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse text-left">
                  <thead className="sticky top-0 z-10 bg-surface-container/95 backdrop-blur-xl">
                    <tr className="border-b border-white/[0.08]">
                      {[
                        ['name', 'Resource'],
                        ['region', 'Cloud / Region'],
                        ['owner', 'Owner'],
                        ['monthly', 'Monthly Cost'],
                        ['util', 'Utilisation'],
                        ['status', 'Status'],
                      ].map(([key, label]) => (
                        <th
                          key={key}
                          scope="col"
                          className={`px-space-md py-space-sm font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant ${
                            key === 'monthly' || key === 'util' ? 'text-right' : ''
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleSort(key)}
                            className="inline-flex items-center gap-1 transition-colors hover:text-primary-container"
                          >
                            {label}
                            <MaterialSymbol name={sortIcon(key)} className="text-[14px] leading-none" />
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {resources_.map((r) => (
                      <tr
                        key={r.id}
                        className="border-b border-white/[0.04] odd:bg-white/[0.015] transition-colors hover:bg-primary-container/[0.03]"
                      >
                        <td className="px-space-md py-2.5">
                          <div className="flex flex-col">
                            <span className="font-code-sm text-code-sm text-on-surface">{r.name}</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {r.type} · {r.size}
                            </span>
                          </div>
                        </td>
                        <td className="px-space-md py-2.5">
                          <div className="flex flex-col">
                            <span className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface">
                              <span className={`h-1.5 w-1.5 rounded-full ${DOT[r.provider]}`} />
                              {SHORT[r.provider]}
                            </span>
                            <span className="font-code-sm text-code-sm text-on-surface-variant">{r.region}</span>
                          </div>
                        </td>
                        <td className="px-space-md py-2.5">
                          <div className="flex flex-col">
                            <span className="font-body-sm text-body-sm text-on-surface">{r.owner}</span>
                            <span className="font-code-sm text-code-sm text-on-surface-variant">
                              {r.env} · {r.commitment}
                            </span>
                          </div>
                        </td>
                        <td className="tnum px-space-md py-2.5 text-right">
                          <div className="flex flex-col">
                            <span className="font-code-sm text-code-sm text-on-surface">{usd(r.monthly)}</span>
                            <span className="font-code-sm text-code-sm text-on-surface-variant">
                              {usd(r.daily, { dp: 2 })}/day
                            </span>
                          </div>
                        </td>
                        <td className="px-space-md py-2.5">
                          <div className="flex items-center justify-end gap-space-sm">
                            <div className="h-1 w-12 overflow-hidden rounded-full bg-surface-container-highest">
                              <div
                                className={`h-full rounded-full ${
                                  r.util >= 45 ? 'bg-status-ok' : r.util >= 8 ? 'bg-status-warn' : 'bg-status-crit'
                                }`}
                                style={{ width: `${Math.max(r.util, 2)}%` }}
                              />
                            </div>
                            <span className="tnum w-9 text-right font-code-sm text-code-sm text-on-surface-variant">
                              {r.util}%
                            </span>
                          </div>
                        </td>
                        <td className="px-space-md py-2.5">
                          <StatusPill tone={TONE_BY_STATUS[r.status]}>{r.statusLabel}</StatusPill>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {resources_.length === 0 && (
                <p className="px-space-lg py-space-xl text-center font-body-md text-body-md text-on-surface-variant">
                  No resources match the current filters.
                </p>
              )}
            </Panel>

            {/* ---------- Budgets + savings ---------- */}
            <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
              <Panel
                className="lg:col-span-6"
                title="Budgets by Cost Centre"
                subtitle={`${usd(kpis.budget)} total allocation`}
                icon="account_balance_wallet"
              >
                <div className="flex flex-col gap-space-md">
                  {budgets.map((b) => (
                    <div key={b.owner} className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between gap-space-sm">
                        <span className="truncate font-body-md text-body-md text-on-surface">{b.team}</span>
                        <span className="tnum flex-none font-code-sm text-code-sm text-on-surface-variant">
                          {usdCompact(b.mtd)} / {usdCompact(b.budget)}
                        </span>
                      </div>
                      <ShareBar
                        height="h-1.5"
                        segments={[
                          {
                            label: b.team,
                            value: b.mtd,
                            tone: b.pct > 95 ? 'crit' : b.pct > 85 ? 'warn' : 'cyan',
                          },
                          { label: 'Remaining', value: b.budget - b.mtd, tone: 'muted' },
                        ]}
                      />
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel
                className="lg:col-span-6"
                title="Top Savings Recommendations"
                subtitle={`${usdCompact(opportunities.reduce((s, o) => s + o.monthly, 0))} / mo available`}
                icon="savings"
                bodyClassName="p-0"
              >
                <div className="divide-y divide-white/[0.04]">
                  {opportunities.slice(0, 6).map((o) => (
                    <div key={o.id} className="flex items-start justify-between gap-space-sm px-space-lg py-3">
                      <div className="flex min-w-0 flex-col gap-1">
                        <span className="truncate font-body-md text-body-md text-on-surface">{o.title}</span>
                        <div className="flex items-center gap-space-xs">
                          <StatusPill tone={o.confidence === 'High' ? 'ok' : 'warn'}>{o.confidence}</StatusPill>
                          <span className="font-code-sm text-code-sm text-on-surface-variant">{o.category}</span>
                        </div>
                      </div>
                      <div className="flex flex-none flex-col items-end gap-1">
                        <span className="tnum font-code-sm text-code-sm font-semibold text-primary">
                          {usd(o.monthly)}
                        </span>
                        <span className="font-code-sm text-code-sm text-on-surface-variant">/ mo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
