import { Eyebrow, Reveal } from './Reveal';

const ROWS = [
  { label: 'Format', value: 'Board-ready Word report' },
  { label: 'Risk register', value: 'Scored 5 × 5 · inherent & residual' },
  { label: 'Frameworks', value: 'OWASP LLM Top 10 · UK GDPR · NIST AI RMF' },
  { label: 'Action plan', value: 'Top 10, prioritised, with owners' },
  { label: 'Recommendation', value: 'Go / no-go, with conditions' },
  { label: 'Platforms', value: 'Vertex AI · Azure OpenAI · Bedrock · Claude API' },
];

// Illustrative matrix only: number of example risks in each likelihood (row) × impact (col) cell.
const EXAMPLE: Record<string, number> = { '4-4': 2, '3-5': 1, '4-3': 1, '2-4': 2, '3-3': 3, '2-2': 2, '1-3': 1, '5-2': 1 };

function RiskMatrix() {
  const levels = [5, 4, 3, 2, 1];
  return (
    <figure className="panel rounded-3xl p-6 sm:p-8">
      <div className="flex gap-3">
        <div className="flex items-center">
          <span className="-rotate-180 text-[11px] uppercase tracking-[0.2em] text-[#d7e2ea]/45 [writing-mode:vertical-rl]">
            Likelihood
          </span>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-5 gap-1.5" role="img" aria-label="Illustrative 5 by 5 risk matrix, with risk concentrated toward high likelihood and high impact">
            {levels.map((l) =>
              [1, 2, 3, 4, 5].map((imp) => {
                const score = l * imp;
                const count = EXAMPLE[`${l}-${imp}`] ?? 0;
                return (
                  <div
                    key={`${l}-${imp}`}
                    className="relative flex aspect-square items-center justify-center rounded-md"
                    style={{ backgroundColor: `rgba(0, 210, 255, ${0.04 + (score / 25) * 0.5})` }}
                  >
                    {count > 0 && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#051a24] text-[11px] font-medium tabular-nums text-[#f2f7fa] ring-1 ring-[#d7e2ea]/25">
                        {count}
                      </span>
                    )}
                  </div>
                );
              }),
            )}
          </div>
          <p className="mt-3 text-center text-[11px] uppercase tracking-[0.2em] text-[#d7e2ea]/45">Impact</p>
        </div>
      </div>
      <figcaption className="mt-5 text-xs text-[#d7e2ea]/50">Illustrative example — not client data.</figcaption>
    </figure>
  );
}

export function Deliverables() {
  return (
    <section id="deliverables" aria-labelledby="deliverables-title" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>03 · What you get</Eyebrow>
            <h2 id="deliverables-title" className="font-display text-4xl leading-[1.05] tracking-[-0.01em] text-[#f2f7fa] md:text-6xl">
              Every risk, <em className="italic text-[#00d2ff]">on one chart</em>.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#d7e2ea]/70">
              One document your security, privacy and risk leads can all sign — and your board can read in a single
              sitting.
            </p>
          </Reveal>
          <Reveal index={1} className="mt-10">
            <dl className="panel divide-y divide-[#d7e2ea]/10 rounded-2xl">
              {ROWS.map((r) => (
                <div key={r.label} className="flex flex-col gap-1 px-6 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <dt className="text-[#d7e2ea]/55">{r.label}</dt>
                  <dd className="font-medium text-[#f2f7fa] sm:text-right">{r.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal index={2} className="lg:sticky lg:top-28">
          <RiskMatrix />
        </Reveal>
      </div>
    </section>
  );
}
