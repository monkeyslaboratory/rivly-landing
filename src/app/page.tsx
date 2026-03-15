'use client';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { MetricsBar } from '@/components/sections/MetricsBar';
import { ProblemStatement } from '@/components/sections/ProblemStatement';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { DashboardPreview } from '@/components/sections/DashboardPreview';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { Pricing } from '@/components/sections/Pricing';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <CursorGlow />
        <div className="grain-overlay" />
        <Navigation />
        <main>
          <Hero />
          {/* <MetricsBar /> */}
          <ProblemStatement />
          <HowItWorks />
          <DashboardPreview />
          <FeaturesGrid />
          <Pricing />
          {/* <Testimonials /> */}
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  );
}
