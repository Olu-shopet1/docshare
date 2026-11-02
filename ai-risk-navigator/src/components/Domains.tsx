import { Bot, Building2, Fingerprint, Link2, ShieldCheck, Users } from 'lucide-react';
import { Eyebrow, Reveal } from './Reveal';

const DOMAINS = [
  {
    icon: Bot,
    title: 'AI & LLM threats',
    body: 'Prompt injection, data leakage, insecure output handling and excessive agency — mapped to the OWASP Top 10 for LLM Applications.',
  },
  {
    icon: ShieldCheck,
    title: 'Data protection',
    body: 'Lawful basis, data minimisation, retention and DPIA support under UK GDPR.',
  },
  {
    icon: Building2,
    title: 'Sector regulation',
    body: 'Where they apply, financial-services duties such as FCA Consumer Duty and the Payment Services Regulations.',
  },
  {
    icon: Link2,
    title: 'Supply chain',
    body: 'Model providers, hosting platforms and third-party plugins — who touches your data, and on what terms.',
  },
  {
    icon: Fingerprint,
    title: 'Identity & infrastructure',
    body: 'Access control, secrets, network boundaries and logging around the model and every tool it can call.',
  },
  {
    icon: Users,
    title: 'Operational governance',
    body: 'Ownership, human oversight, monitoring and incident response once the system is live.',
  },
];

export function Domains() {
  return (
    <section id="domains" aria-labelledby="domains-title" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <Reveal className="max-w-2xl">
        <Eyebrow>01 · Coverage</Eyebrow>
        <h2 id="domains-title" className="font-display text-4xl leading-[1.05] tracking-[-0.01em] text-[#f2f7fa] md:text-6xl">
          Six domains. <em className="italic text-[#00d2ff]">No blind spots.</em>
        </h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-[#d7e2ea]/70">
          AI risk rarely sits in one team’s lane. Every assessment walks the whole map, so nothing falls between
          security, privacy and compliance.
        </p>
      </Reveal>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOMAINS.map((d, i) => (
          <Reveal as="li" key={d.title} index={i % 3} className="panel rounded-2xl p-7">
            <d.icon size={22} className="text-[#00d2ff]" aria-hidden="true" />
            <p className="mt-6 text-xs tabular-nums text-[#d7e2ea]/40">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-1 text-lg font-medium text-[#f2f7fa]">{d.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#d7e2ea]/65">{d.body}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
