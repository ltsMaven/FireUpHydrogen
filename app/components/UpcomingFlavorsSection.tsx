import {motion, type Variants} from 'framer-motion';
import {Badge} from '~/ui/badge';
import {buttonVariants} from '~/ui/button';
import {Card} from '~/ui/card';
import {Sparkles, Clock3, Flame, Droplets, ArrowUpRight} from 'lucide-react';
import {cn} from '~/ui/utils';

type Flavor = {
  name: string;
  accent: string;
  note: string;
  badge: string;
  code: string;
  mix: string;
};

const sectionV: Variants = {
  hidden: {opacity: 0, y: 10},
  show: {opacity: 1, y: 0, transition: {duration: 0.28, ease: 'easeOut'}},
};

const cardV: Variants = {
  hidden: {opacity: 0, y: 12},
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {duration: 0.28, ease: 'easeOut', delay: index * 0.05},
  }),
};

const flavors: Flavor[] = [
  {
    name: 'Pineapple',
    accent: 'from-yellow-200 via-yellow-300 to-amber-500',
    note: 'Bright pineapple sweetness with a sharp tropical finish.',
    badge: 'Fan Favorite',
    code: 'PX-01',
    mix: 'Tropical citrus',
  },
  {
    name: 'Watermelon Lemonade',
    accent: 'from-pink-300 via-rose-400 to-green-400',
    note: 'Juicy watermelon body cut with a clean lemonade edge.',
    badge: 'Early Drop',
    code: 'WL-02',
    mix: 'Sweet and sharp',
  },
  {
    name: 'Mango Lemonade',
    accent: 'from-yellow-300 via-orange-400 to-amber-500',
    note: 'Ripe mango layered with a bright citrus snap.',
    badge: 'Limited Run',
    code: 'ML-03',
    mix: 'Sunset citrus',
  },
  {
    name: 'Lemon Lime',
    accent: 'from-lime-200 via-yellow-200 to-lime-500',
    note: 'Classic lemon-lime refresh built for a clean lift.',
    badge: 'Fresh Pick',
    code: 'LL-04',
    mix: 'Clean refresh',
  },
  {
    name: 'Orange',
    accent: 'from-orange-200 via-orange-400 to-orange-600',
    note: 'Straight citrus energy with a bold orange finish.',
    badge: 'New Blend',
    code: 'OR-05',
    mix: 'Pure citrus',
  },
];

export function UpcomingFlavorsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#120604] to-black py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.14),transparent_32%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={{once: true, amount: 0.3}}
          style={{willChange: 'transform, opacity'}}
        >
          <Badge className="mb-5 border-orange-500/30 bg-orange-500/20 text-orange-300">
            Upcoming Flavors
          </Badge>
          <h2 className="mb-5 text-4xl uppercase text-white md:text-5xl">
            Preorder The Next Five Drops
          </h2>
          <p className="text-base leading-relaxed text-gray-300 md:text-lg">
            These flavors are not on open sale yet. Customers reserve their spot
            now and we confirm allocation before launch.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {flavors.map((flavor, index) => {
            const preorderHref = `mailto:fireupenergydrink@gmail.com?subject=${encodeURIComponent(
              `Preorder request - ${flavor.name}`,
            )}&body=${encodeURIComponent(
              `Hi Fire Up team,\n\nI want to preorder ${flavor.name}. Please contact me with launch timing, pack options, and payment details.\n\nThanks.`,
            )}`;

            return (
              <motion.div
                key={flavor.name}
                custom={index}
                variants={cardV}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.2}}
                style={{willChange: 'transform, opacity'}}
              >
                <Card className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-0 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/30 hover:shadow-[0_24px_80px_rgba(249,115,22,0.16)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_24%)] opacity-70" />

                  <div
                    className={`relative h-48 overflow-hidden bg-gradient-to-br ${flavor.accent}`}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.34),transparent_38%,rgba(0,0,0,0.16))]" />
                    <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/30 blur-2xl transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute bottom-3 left-5 right-5 h-px bg-black/15" />

                    <div className="relative flex h-full flex-col justify-between p-5">
                      <div className="flex items-start justify-between gap-3">
                        <Badge className="border-white/30 bg-black/20 text-white backdrop-blur-sm">
                          {flavor.badge}
                        </Badge>
                        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-black/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-black/70 backdrop-blur-sm">
                          <Flame className="h-3.5 w-3.5" />
                          <span>{flavor.code}</span>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-black/65">
                          Limited preorder
                        </p>
                        <h3 className="max-w-[11ch] text-3xl uppercase leading-[0.95] text-black/85">
                          {flavor.name}
                        </h3>
                        <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-black/60">
                          <span>{flavor.mix}</span>
                          <span>Series 01</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(249,115,22,0.9)]" />
                      <span className="text-[11px] uppercase tracking-[0.26em] text-orange-300/90">
                        Launch reservation
                      </span>
                    </div>

                    <p className="mb-5 min-h-16 text-sm leading-6 text-gray-300">
                      {flavor.note}
                    </p>

                    <div className="mb-6 space-y-3 text-sm text-gray-400">
                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                        <Clock3 className="h-4 w-4 text-orange-400" />
                        <span>Limited time only</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                        <Droplets className="h-4 w-4 text-orange-400" />
                        <span>Zero sugar, 31g protein</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                        <Sparkles className="h-4 w-4 text-orange-400" />
                        <span>Reserve before public launch</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <a
                        href={preorderHref}
                        className={cn(
                          buttonVariants({size: 'lg'}),
                          'w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-base font-semibold hover:from-orange-600 hover:to-red-700',
                        )}
                      >
                        Preorder This Flavor
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
