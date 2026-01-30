import {Card} from '~/ui/card';
import {motion, type Variants} from 'framer-motion';

const wrap: Variants = {
  hidden: {opacity: 0, y: 8},
  show: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.32, ease: 'easeOut'},
  },
};

const cols: Variants = {
  hidden: {},
  show: {transition: {staggerChildren: 0.06, delayChildren: 0.05}},
};

const col: Variants = {
  hidden: {opacity: 0, y: 6},
  show: {opacity: 1, y: 0, transition: {duration: 0.28, ease: 'easeOut'}},
};

export function NutritionSection() {
  const coreRows = [
    {
      label: 'Energy',
      perServe: '540 kJ (129 Cal)',
      per100: '152 kJ (36 Cal)',
      highlight: true,
    },
    {label: 'Protein', perServe: '31 g', per100: '8.7 g', highlight: true},
    {label: 'Fat, total', perServe: '0 g', per100: '0 g', highlight: false},
    {label: '– Saturated', perServe: '0 g', per100: '0 g', highlight: false},
    {
      label: 'Carbohydrate',
      perServe: '1.1 g',
      per100: '0.3 g',
      highlight: false,
    },
    {label: '– Sugars', perServe: '0 g', per100: '0 g', highlight: true},
    {label: 'Sodium', perServe: '40.1 mg', per100: '11.3 mg', highlight: false},
  ];

  const activeRows = [
    {
      label: 'Caffeine',
      perServe: '112.9 mg',
      per100: '31.8 mg',
      highlight: true,
    },
    {label: 'Vitamin C', perServe: '28.4 mg', per100: '8 mg', highlight: false},
    {
      label: 'Vitamin B6',
      perServe: '1.5 mg',
      per100: '0.42 mg',
      highlight: false,
    },
    {
      label: 'Vitamin B12',
      perServe: '0.5 µg',
      per100: '0.14 µg',
      highlight: false,
    },
    {label: 'Taurine', perServe: '500.6 mg', per100: '141 mg', highlight: true},
    {
      label: 'Ginseng root extract',
      perServe: '100 mg',
      per100: '28.2 mg',
      highlight: true,
    },
    {
      label: 'Guarana seed extract',
      perServe: '300 mg',
      per100: '84.5 mg',
      highlight: true,
    },
  ];

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.18]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={wrap}
            initial="hidden"
            whileInView="show"
            viewport={{once: true, amount: 0.35}}
            style={{willChange: 'transform, opacity'}}
          >
            <Card className="relative overflow-hidden rounded-3xl border border-orange-500/25 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-black p-10 md:p-12 shadow-[0_0_60px_rgba(249,115,22,0.12)]">
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />

              <div className="relative">
                <h3 className="text-3xl md:text-4xl text-center uppercase tracking-wide text-white">
                  Nutrition Facts
                </h3>
                <p className="text-center text-base md:text-lg text-white/70 mt-3 mb-10">
                  Average quantities per serving (355 mL) and per 100 mL.
                </p>

                <motion.div
                  className="grid lg:grid-cols-2 gap-10 lg:gap-12"
                  variants={cols}
                  initial="hidden"
                  whileInView="show"
                  viewport={{once: true, amount: 0.35}}
                  style={{willChange: 'transform, opacity'}}
                >
                  <motion.div
                    variants={col}
                    style={{willChange: 'transform, opacity'}}
                  >
                    <NutritionTable title="Core Nutrition" rows={coreRows} />
                  </motion.div>

                  <motion.div
                    variants={col}
                    style={{willChange: 'transform, opacity'}}
                  >
                    <NutritionTable
                      title="Active Ingredients"
                      rows={activeRows}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function NutritionTable({
  title,
  rows,
}: {
  title: string;
  rows: {label: string; perServe: string; per100: string; highlight: boolean}[];
}) {
  return (
    <div className="min-w-0">
      <h4 className="text-base font-semibold uppercase tracking-wide text-white mb-3">
        {title}
      </h4>

      {/* ✅ MOBILE: stacked rows (no 3-col squeeze) */}
      <div className="md:hidden space-y-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-2xl border border-white/15 bg-black/60 backdrop-blur-sm px-4 py-3"
          >
            <div className="text-sm text-white/90 break-words">{row.label}</div>

            <div className="mt-2 grid grid-cols-2 gap-3 text-[12px]">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2">
                <div className="text-white/60 uppercase tracking-wide text-[10px]">
                  Per 355 mL
                </div>
                <div className="mt-0.5 text-white/90 tabular-nums">
                  {row.perServe}
                </div>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2">
                <div className="text-white/60 uppercase tracking-wide text-[10px] text-right">
                  Per 100 mL
                </div>
                <div
                  className={
                    row.highlight
                      ? 'mt-0.5 text-right font-semibold text-orange-400 tabular-nums'
                      : 'mt-0.5 text-right text-white/80 tabular-nums'
                  }
                >
                  {row.per100}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ DESKTOP: your current table */}
      <div className="hidden md:block rounded-2xl border border-white/15 bg-black/60 backdrop-blur-sm overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(140px,auto)_minmax(140px,auto)] gap-4 px-5 py-2.5 bg-white/10 text-[11px] uppercase tracking-wide text-white/70">
          <span className="min-w-0">Item</span>
          <span className="text-left whitespace-nowrap">Per 355 mL</span>
          <span className="text-right whitespace-nowrap">Per 100 mL</span>
        </div>

        <div className="divide-y divide-white/10">
          {rows.map((row, idx) => (
            <div
              key={row.label}
              className={[
                'grid grid-cols-[minmax(0,1fr)_minmax(140px,auto)_minmax(140px,auto)] gap-4 px-5 py-3',
                idx % 2 === 0 ? 'bg-white/[0.03]' : 'bg-transparent',
                'hover:bg-white/[0.06] transition-colors',
              ].join(' ')}
            >
              <span className="min-w-0 break-words whitespace-normal text-sm text-white/90">
                {row.label}
              </span>

              <span className="text-left whitespace-nowrap text-sm text-white/90 tabular-nums">
                {row.perServe}
              </span>

              <span
                className={
                  row.highlight
                    ? 'text-right whitespace-nowrap text-sm font-semibold text-orange-400 tabular-nums'
                    : 'text-right whitespace-nowrap text-sm text-white/70 tabular-nums'
                }
              >
                {row.per100}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
