import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '~/ui/button';

interface CTASectionProps {
  onShopNow: () => void;
}

export function CTASection({ onShopNow }: CTASectionProps) {
  return (
    <section id="first" className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-red-600/20 to-yellow-600/20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-500/30 mb-6">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-300">Limited Time Offer</span>
          </div>

          <h2 className="text-4xl md:text-6xl text-white uppercase mb-6">
            Ready to <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Fire Up</span> Your Life?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't settle for ordinary. Join the Fire Up revolution and experience energy like never before.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button
              onClick={onShopNow}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 group text-lg px-8"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl text-white mb-1">31 g</div>
              <div className="text-sm text-gray-400">Protein</div>
            </div>

            <div className="text-center">
              <div className="text-3xl text-white mb-1">129</div>
              <div className="text-sm text-gray-400">Calories per can</div>
            </div>

            <div className="text-center">
              <div className="text-3xl text-white mb-1">0 g</div>
              <div className="text-sm text-gray-400">Sugars</div>
            </div>

            <div className="text-center">
              <div className="text-3xl text-white mb-1">112.9 mg</div>
              <div className="text-sm text-gray-400">Caffeine</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
