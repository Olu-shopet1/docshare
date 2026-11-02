import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const VIDEO_URL = '/hero.mp4';
const POSTER_URL = '/hero-poster.jpg';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ambient loop: pause when off-screen, and never play under reduced motion.
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* z-0 · video */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_URL}
          className="h-full w-full object-cover"
          src={VIDEO_URL}
        />
      </div>
      {/* z-[1] · contrast overlay */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[#051a24]/70 via-[#051a24]/30 to-[#051a24]"
        aria-hidden="true"
      />

      {/* z-10 · content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-32 text-center">
        <p className="animate-fade-up text-[11px] font-medium uppercase tracking-[0.24em] text-[#00d2ff] sm:text-xs">
          AI security &amp; privacy risk assessment
        </p>
        <h1
          id="hero-title"
          className="font-display animate-fade-up delay-1 text-glow mt-6 text-[2.9rem] leading-[0.95] tracking-[-0.02em] text-[#f2f7fa] sm:text-7xl md:text-8xl"
        >
          Know the terrain
          <br />
          <em className="italic text-[#00d2ff]">before</em> you deploy AI.
        </h1>
        <p className="animate-fade-up delay-2 mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#d7e2ea]/70 sm:text-lg">
          AI Risk Navigator maps your LLM apps, agents and AI features against security, privacy and regulatory
          risk — then hands your board a scored risk register and a clear go / no-go call.
        </p>
        <div className="animate-fade-up delay-3 mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href="#request"
            className="w-full rounded-full bg-[#00d2ff] px-8 py-3.5 text-base font-medium text-[#051a24] transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] sm:w-auto"
          >
            Request an assessment
          </a>
          <a
            href="#method"
            className="liquid-glass group flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base text-[#d7e2ea] transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] sm:w-auto"
          >
            See the method
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
