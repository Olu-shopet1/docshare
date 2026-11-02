// Reduced motion: transitions collapse via the global prefers-reduced-motion rule in index.css, plus motion-reduce:transition-none here.
import { useState, type FormEvent } from 'react';
import { Compass } from 'lucide-react';
import { Eyebrow, Reveal } from './Reveal';

type Status = 'idle' | 'sent';

export function RequestCta() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  // NOTE: not connected to a backend yet — wire this to your form service or CRM.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sent');
  };

  return (
    <section id="request" aria-labelledby="request-title" className="scroll-mt-24 px-6 pt-24 md:pt-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>04 · Get your bearings</Eyebrow>
        <h2 id="request-title" className="font-display text-4xl leading-[1.05] tracking-[-0.01em] text-[#f2f7fa] md:text-7xl">
          Find the risks <br className="hidden md:block" /><em className="italic text-[#00d2ff]">before</em> go-live does.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#d7e2ea]/70">
          Tell us where to reach you and we’ll set up a short scoping call for your AI system.
        </p>

        {status === 'sent' ? (
          <p role="status" className="panel mx-auto mt-9 max-w-md rounded-full px-6 py-4 text-sm text-[#f2f7fa]">
            Thanks — we’ll be in touch at <span className="text-[#00d2ff]">{email}</span>.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="work-email" className="sr-only">
              Work email
            </label>
            <input
              id="work-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="panel min-w-0 flex-1 rounded-full px-6 py-3.5 text-sm text-[#f2f7fa] placeholder-[#d7e2ea]/40"
            />
            <button
              type="submit"
              className="rounded-full bg-[#00d2ff] px-7 py-3.5 text-sm font-medium text-[#051a24] transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] motion-reduce:transition-none"
            >
              Request an assessment
            </button>
          </form>
        )}
      </Reveal>

      <footer className="mx-auto mt-28 flex max-w-6xl flex-col gap-4 border-t border-[#d7e2ea]/10 pb-10 pt-8 text-xs text-[#d7e2ea]/50 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2">
          <Compass size={14} className="text-[#00d2ff]" aria-hidden="true" />© 2026 AI Risk Navigator
        </p>
        <nav aria-label="Footer" className="flex gap-6">
          <a href="#domains" className="transition-colors hover:text-[#d7e2ea] motion-reduce:transition-none">Coverage</a>
          <a href="#method" className="transition-colors hover:text-[#d7e2ea] motion-reduce:transition-none">Method</a>
          <a href="#deliverables" className="transition-colors hover:text-[#d7e2ea] motion-reduce:transition-none">Deliverables</a>
        </nav>
      </footer>
    </section>
  );
}
