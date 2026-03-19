import {motion, type Variants} from 'framer-motion';
import {Link, useParams} from 'react-router';
import {Badge} from '~/ui/badge';
import {buttonVariants} from '~/ui/button';
import {Card} from '~/ui/card';
import {Sparkles, Clock3, Flame, Droplets} from 'lucide-react';
import {cn} from '~/ui/utils';

type Flavor = {
  name: string;
  accent: string;
  note: string;
  releaseWindow: string;
  badge: string;
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
    name: 'Mango Inferno',
    accent: 'from-orange-400 via-amber-300 to-red-500',
    note: 'Tropical mango with a warm citrus finish.',
    releaseWindow: 'Ships in June',
    badge: 'Fan Favorite',
  },
  {
    name: 'Cherry Voltage',
    accent: 'from-rose-400 via-red-400 to-red-700',
    note: 'Bold cherry bite with a clean, sharp lift.',
    releaseWindow: 'Ships in June',
    badge: 'Early Drop',
  },
  {
    name: 'Blue Riptide',
    accent: 'from-sky-400 via-cyan-300 to-blue-600',
    note: 'Electric berry flavor with a crisp finish.',
    releaseWindow: 'Ships in July',
    badge: 'Limited Run',
  },
  {
    name: 'Lime Surge',
    accent: 'from-lime-300 via-emerald-300 to-green-500',
    note: 'Bright lime snap built for summer sessions.',
    releaseWindow: 'Ships in July',
    badge: 'Fresh Pick',
  },
  {
    name: 'Peach Blaze',
    accent: 'from-orange-200 via-pink-300 to-orange-500',
    note: 'Soft peach upfront with a fiery finish.',
    releaseWindow: 'Ships in August',
    badge: 'New Blend',
  },
];

export function UpcomingFlavorsSection() {
  const params = useParams();
  const locale = (params as {locale?: string}).locale;
  const prefix = locale ? `/${locale}` : '';

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
            const preorderHref =
              `${prefix}/contact?intent=preorder` +
              `&flavor=${encodeURIComponent(flavor.name)}` +
              `&subject=${encodeURIComponent(`Preorder request - ${flavor.name}`)}` +
              `&message=${encodeURIComponent(
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
                <Card className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.03] p-0 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30">
                  <div className={`h-40 bg-gradient-to-br ${flavor.accent}`}>
                    <div className="flex h-full flex-col justify-between p-5">
                      <div className="flex items-center justify-between">
                        <Badge className="border-white/30 bg-black/20 text-white">
                          {flavor.badge}
                        </Badge>
                        <Flame className="h-5 w-5 text-white/90" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs uppercase tracking-[0.22em] text-black/70">
                          Limited preorder
                        </p>
                        <h3 className="text-2xl uppercase text-black/85">
                          {flavor.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-4 min-h-12 text-sm leading-6 text-gray-300">
                      {flavor.note}
                    </p>

                    <div className="mb-5 space-y-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-orange-400" />
                        <span>{flavor.releaseWindow}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-orange-400" />
                        <span>Zero sugar, 31g protein</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-orange-400" />
                        <span>Reserve before public launch</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link
                        to={preorderHref}
                        className={cn(
                          buttonVariants({size: 'lg'}),
                          'w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-base font-semibold hover:from-orange-600 hover:to-red-700',
                        )}
                      >
                        Preorder This Flavor
                      </Link>
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
