/* motion-site · profile: cinematic · archetype: full-landing · patterns: video-loop·staggered-fade-rise·whileInView-reveal·sticky-stack·press-scale · critique: P5 T5 C5 R4 A5 V4 */
// Reduced motion: handled globally by the prefers-reduced-motion block in index.css.
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Domains } from './components/Domains';
import { Method } from './components/Method';
import { Deliverables } from './components/Deliverables';
import { RequestCta } from './components/RequestCta';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#051a24] text-[#d7e2ea]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-30 focus:rounded-full focus:bg-[#00d2ff] focus:px-4 focus:py-2 focus:text-[#051a24]"
      >
        Skip to content
      </a>
      <Nav />
      <Hero />
      <main id="main">
        <Domains />
        <Method />
        <Deliverables />
        <RequestCta />
      </main>
    </div>
  );
}
