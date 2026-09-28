export const heroStats = [
  { label: 'Egress Latency', value: '0.42 ms', accent: true },
  { label: 'Collection Rate', value: '2.4M/sec', accent: false },
  { label: 'Overhead', value: '< 0.01%', accent: true },
]

export const consoleStats = [
  {
    label: 'Active Nodes',
    value: '128',
    detail: 'AWS • GCP • AZ',
    valueClass: 'text-primary',
    detailClass: 'text-primary/70',
  },
  {
    label: 'SLA Uptime',
    value: '99.98%',
    detail: 'Target Met',
    valueClass: 'text-on-surface',
    detailClass: 'text-primary-container',
  },
  {
    label: 'Monthly Run',
    value: '$4,280',
    detail: '-14.2% optimized',
    valueClass: 'text-on-surface',
    detailClass: 'text-tertiary-fixed-dim',
  },
]

export const platforms = [
  {
    id: 'aws',
    icon: 'cloud',
    accent: 'text-primary-container',
    hoverAccent: 'group-hover:text-primary-container',
    name: 'Amazon Web Services',
    detail: 'CloudWatch API • EventBridge',
    services: 'EC2 • S3 • EKS • RDS • Lambda • DynamoDB',
    resources: '1,482',
    latency: '1.2 sec',
    latencyAccent: 'text-primary',
    auth: 'Agentless IAM Role Ingest',
  },
  {
    id: 'azure',
    icon: 'dns',
    accent: 'text-secondary',
    hoverAccent: 'group-hover:text-secondary',
    name: 'Microsoft Azure',
    detail: 'Azure Monitor • Event Grid',
    services: 'Azure VMs • AKS • CosmosDB • Blob • App Services',
    resources: '894',
    latency: '1.8 sec',
    latencyAccent: 'text-secondary',
    auth: 'Service Principal Authentication',
  },
  {
    id: 'gcp',
    icon: 'hub',
    accent: 'text-primary-fixed-dim',
    hoverAccent: 'group-hover:text-primary-fixed-dim',
    name: 'Google Cloud (GCP)',
    detail: 'Stackdriver • Pub/Sub Telemetry',
    services: 'GCE • GKE • BigQuery • Cloud Run • Cloud SQL',
    resources: '612',
    latency: '1.4 sec',
    latencyAccent: 'text-primary-fixed-dim',
    auth: 'Workload Identity Federation',
  },
]

export const features = [
  {
    icon: 'inventory_2',
    accent: 'text-primary-container',
    tag: 'INVENTORY',
    tagAccent: 'text-primary',
    title: 'Cloud Resource Monitoring',
    body: 'Real-time automated discovery and inventory synchronization of VM instances, Kubernetes clusters, and serverless runtimes.',
    footLabel: 'Discovery Interval',
    footValue: 'Every 15s',
    footAccent: 'text-primary',
  },
  {
    icon: 'device_hub',
    accent: 'text-secondary',
    tag: 'TOPOLOGY',
    tagAccent: 'text-secondary',
    title: 'Infrastructure Overview',
    body: 'Complete topology visualization with unified multi-region health checks, traffic routing matrices, and latency heatmaps.',
    footLabel: 'Global Reach',
    footValue: '38 Regions Active',
    footAccent: 'text-secondary',
  },
  {
    icon: 'payments',
    accent: 'text-tertiary-fixed-dim',
    tag: 'FINOPS',
    tagAccent: 'text-tertiary-fixed-dim',
    title: 'Cost Monitoring & Forecasting',
    body: 'Granular spending breakdown, anomaly detection, predictive runway forecasting, and automated waste reduction insights.',
    footLabel: 'Avg. Spend Saved',
    footValue: '28.4% Monthly',
    footAccent: 'text-primary-container',
  },
  {
    icon: 'speed',
    accent: 'text-primary-container',
    tag: 'TELEMETRY',
    tagAccent: 'text-primary',
    title: 'Performance Insights',
    body: 'Sub-millisecond metric aggregation for CPU, RAM, IOPS, and network egress across hybrid topologies.',
    footLabel: 'Granularity',
    footValue: '100ms Precision',
    footAccent: 'text-primary',
  },
  {
    icon: 'verified_user',
    accent: 'text-secondary',
    tag: 'SECURITY',
    tagAccent: 'text-secondary',
    title: 'Security & Compliance',
    body: 'Continuous CIS benchmarks, IAM permission auditing, secret leakage scans, and automated compliance posture.',
    footLabel: 'Standards',
    footValue: 'SOC2 • HIPAA • ISO',
    footAccent: 'text-secondary',
  },
  {
    icon: 'visibility',
    accent: 'text-primary-container',
    tag: 'UNIFIED',
    tagAccent: 'text-primary',
    title: 'Single Pane Visibility',
    body: 'Single-pane glass eliminating siloed AWS CloudWatch, Azure Monitor, and GCP Stackdriver browser consoles.',
    footLabel: 'Context Switching',
    footValue: 'Reduced to Zero',
    footAccent: 'text-primary-container',
  },
]

export const triagePoints = [
  {
    title: 'Cross-Telemetry Correlation',
    body: 'Logs, metrics, and distributed spans aligned to nanosecond offsets.',
  },
  {
    title: 'Zero Data Egress Tax',
    body: 'In-cluster edge filtering cuts telemetry bandwidth bills by 60%.',
  },
]

export const footerColumns = [
  {
    title: 'Product',
    links: [
      'Cloud Resources',
      'Topology Mesh',
      'Cost Forecaster',
      'Metrics Aggregator',
      'Log Stream Engine',
    ],
  },
  {
    title: 'Integrations',
    links: [
      'Amazon Web Services',
      'Microsoft Azure',
      'Google Cloud Platform',
      'Kubernetes / OpenShift',
      'OpenTelemetry Collector',
    ],
  },
  {
    title: 'Developers',
    links: [
      'API Documentation',
      'Terraform Provider',
      'SDK Reference (Go/Python)',
      'Webhook Ingest',
      'Audit Export SLAs',
    ],
  },
  {
    title: 'Compliance & Trust',
    links: [
      'Security Whitepaper',
      'SOC2 Type II Report',
      'GDPR & Data Residency',
      'Incident Disclosure',
      '24/7 Dedicated SRE',
    ],
  },
]
