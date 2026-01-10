import dynamic from 'next/dynamic';
import { Navigation, Hero, Footer } from '@/components';

// Lazy load below-the-fold components to improve LCP
const FeaturedWork = dynamic(() => import('@/components/FeaturedWork').then(m => m.FeaturedWork), { ssr: true });
const Services = dynamic(() => import('@/components/Services').then(m => m.Services), { ssr: true });
const ToolStack = dynamic(() => import('@/components/ToolStack').then(m => m.ToolStack), { ssr: true });
const Testimonials = dynamic(() => import('@/components/Testimonials').then(m => m.Testimonials), { ssr: true });
const About = dynamic(() => import('@/components/About').then(m => m.About), { ssr: true });
const CTA = dynamic(() => import('@/components/CTA').then(m => m.CTA), { ssr: true });

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <FeaturedWork />
        <Services />
        <ToolStack />
        <Testimonials />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
