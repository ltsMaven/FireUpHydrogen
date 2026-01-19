import {ArrowRight, Flame} from 'lucide-react';
import {Button} from '~/ui/button';
import {motion, type Variants} from 'framer-motion';
import {useEffect, useState} from 'react';

interface CTASectionProps {
  onShopNow: () => void;
}

const container: Variants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {staggerChildren: 0.12, delayChildren: 0.15},
  },
};

const fadeUp: Variants = {
  hidden: {opacity: 0, y: 18},
  show: {opacity: 1, y: 0, transition: {duration: 0.6, ease: 'easeOut'}},
};

const statsContainer: Variants = {
  hidden: {opacity: 0, y: 10},
  show: {
    opacity: 1,
    y: 0,
    transition: {staggerChildren: 0.08, delayChildren: 0.05},
  },
};

const statItem: Variants = {
  hidden: {opacity: 0, y: 10, scale: 0.98},
  show: {opacity: 1, y: 0, scale: 1, transition: {duration: 0.45, ease: 'easeOut'}},
};

export function CTASection({onShopNow}: CTASectionProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // ✅ SSR-safe static version (no motion)
    return (
      <section id="first" className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-red-600/20 to-yellow-600/20 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-500/30 mb-6">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-300">Limited Time Offer</span>
              </div>

              <h2 className="text-4xl md:text-6xl text-white uppercase mb-6 text-center">
                Ready to{' '}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Fire Up
                </span>{' '}
                Your Life?
              </h2>

              <p className="text-xl text-gray-300 mb-12 md:mb-14 max-w-2xl text-center mx-auto">
                Don&apos;t settle for ordinary. Join the Fire Up revolution and
                experience energy like never before.
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-12 w-full mt-2">
                <Button
                  onClick={onShopNow}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 group text-lg px-8"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl w-full">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl text-white mb-1">31 g</div>
                  <div className="text-sm text-gray-400">Protein</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl text-white mb-1">129</div>
                  <div className="text-sm text-gray-400">Calories per can</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl text-white mb-1">0 g</div>
                  <div className="text-sm text-gray-400">Sugars</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl text-white mb-1">112.9 mg</div>
                  <div className="text-sm text-gray-400">Caffeine</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ✅ Motion version (client only)
  return (
    <section id="first" className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-red-600/20 to-yellow-600/20 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center flex flex-col items-center"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{once: true, amount: 0.35}}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center justify-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-500/30 mb-6"
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-300">Limited Time Offer</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl text-white uppercase mb-6 text-center"
            >
              Ready to{' '}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Fire Up
              </span>{' '}
              Your Life?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-xl text-gray-300 mb-12 md:mb-14 max-w-2xl text-center mx-auto"
            >
              Don&apos;t settle for ordinary. Join the Fire Up revolution and
              experience energy like never before.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 justify-center mb-12 w-full mt-2"
            >
              <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                <Button
                  onClick={onShopNow}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 group text-lg px-8"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl w-full"
              variants={statsContainer}
              initial="hidden"
              whileInView="show"
              viewport={{once: true, amount: 0.35}}
              animate={{y: [0, -4, 0]}}
              transition={{duration: 5, repeat: Infinity, ease: 'easeInOut'}}
            >
              <motion.div variants={statItem} className="flex flex-col items-center text-center">
                <div className="text-3xl text-white mb-1">31 g</div>
                <div className="text-sm text-gray-400">Protein</div>
              </motion.div>

              <motion.div variants={statItem} className="flex flex-col items-center text-center">
                <div className="text-3xl text-white mb-1">129</div>
                <div className="text-sm text-gray-400">Calories per can</div>
              </motion.div>

              <motion.div variants={statItem} className="flex flex-col items-center text-center">
                <div className="text-3xl text-white mb-1">0 g</div>
                <div className="text-sm text-gray-400">Sugars</div>
              </motion.div>

              <motion.div variants={statItem} className="flex flex-col items-center text-center">
                <div className="text-3xl text-white mb-1">112.9 mg</div>
                <div className="text-sm text-gray-400">Caffeine</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}