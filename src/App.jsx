import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CloudPlatforms from '@/components/CloudPlatforms'
import FeaturesBento from '@/components/FeaturesBento'
import IncidentWorkflow from '@/components/IncidentWorkflow'
import FinalCta from '@/components/FinalCta'
import FooterExpanded from '@/components/FooterExpanded'
import SiteFooter from '@/components/SiteFooter'

export default function App() {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      <Header />
      <main className="min-h-screen w-full bg-surface pt-16">
        <div className="flex w-full flex-col">
          <Hero />
          <CloudPlatforms />
          <FeaturesBento />
          <IncidentWorkflow />
          <FinalCta />
          <FooterExpanded />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
