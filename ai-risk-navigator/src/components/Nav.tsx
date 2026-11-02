// Reduced motion: transitions collapse via the global prefers-reduced-motion rule in index.css, plus motion-reduce:transition-none here.
import { Compass } from 'lucide-react';

const LINKS = [
  { label: 'Risk domains', href: '#domains' },
  { label: 'Method', href: '#method' },
  { label: 'Deliverables', href: '#deliverables' },
];

export function Nav() {
  return (
    <nav aria-label="Primary" className="fixed inset-x-0 top-0 z-20 px-4 py-4 sm:px-6 sm:py-5">
      <div className="liquid-glass nav-tint mx-auto flex max-w-5xl items-center justify-between rounded-full py-2.5 pl-5 pr-2.5 sm:pl-6">
        <div className="flex items-center">
          <a href="#top" className="flex items-center gap-2 text-[#d7e2ea]" aria-label="AI Risk Navigator — back to top">
            <Compass size={18} className="text-[#00d2ff]" aria-hidden="true" />
            <span className="text-base font-semibold tracking-tight">AI Risk Navigator</span>
          </a>
          <div className="ml-10 hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-[#d7e2ea]/70 transition-colors hover:text-[#d7e2ea] motion-reduce:transition-none">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <a
          href="#request"
          className="rounded-full bg-[#00d2ff] px-4 py-2 text-sm font-medium text-[#051a24] transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] motion-reduce:transition-none sm:px-5"
        >
          <span className="sm:hidden">Get started</span>
          <span className="hidden sm:inline">Request an assessment</span>
        </a>
      </div>
    </nav>
  );
}
