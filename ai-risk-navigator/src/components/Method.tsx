import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Eyebrow, Reveal } from './Reveal';

const STEPS = [
  {
    numeral: '01',
    title: 'Map',
    body: 'We trace how the system really works — models, prompts, data flows, integrations, and who can reach them.',
  },
  {
    numeral: '02',
    title: 'Score',
    body: 'Every risk is rated on a 5 × 5 likelihood-and-impact matrix, so a prompt-injection path and a contract gap sit on the same scale.',
  },
  {
    numeral: '03',
    title: 'Mitigate',
    body: 'Each risk gets concrete controls, a named owner and a residual rating showing where it lands once those controls are in place.',
  },
  {
    numeral: '04',
    title: 'Decide',
    body: 'A prioritised top-10 action plan and a clear go / no-go recommendation, written for the people who sign off.',
  },
];

export function Method() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const reduce = useReducedMotion();

  return (
    <section id="method" aria-labelledby="method-title" className="scroll-mt-24 px-6 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>02 · The method</Eyebrow>
        <h2 id="method-title" className="font-display text-4xl leading-[1.05] tracking-[-0.01em] text-[#f2f7fa] md:text-6xl">
          Four bearings. <em className="italic text-[#00d2ff]">One</em> clear course.
        </h2>
      </Reveal>

      <div ref={containerRef} className="relative mx-auto mt-16 max-w-5xl">
        <ol>
          {STEPS.map((s, i) => (
            <StepCard
              key={s.numeral}
              {...s}
              index={i}
              total={STEPS.length}
              progress={scrollYProgress}
              reduce={Boolean(reduce)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

type StepCardProps = (typeof STEPS)[number] & {
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
};

function StepCard({ numeral, title, body, index, total, progress, reduce }: StepCardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <li className="sticky flex h-[70vh] items-start justify-center md:h-[80vh]" style={{ top: `calc(14vh + ${index * 24}px)` }}>
      <motion.article
        style={reduce ? undefined : { scale, transformOrigin: 'top center' }}
        className="panel-solid grid w-full items-center gap-6 rounded-3xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:grid-cols-[1fr_1.4fr] md:gap-10 md:p-14"
      >
        <span
          className="font-display text-8xl leading-none text-[#00d2ff]/25 md:text-[10rem]"
          aria-hidden="true"
        >
          {numeral}
        </span>
        <div>
          <h3 className="font-display text-4xl text-[#f2f7fa] md:text-5xl">
            <span className="sr-only">Step {numeral}: </span>
            {title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#d7e2ea]/70">{body}</p>
        </div>
      </motion.article>
    </li>
  );
}
