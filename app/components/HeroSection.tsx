import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '~/ui/button';

interface HeroSectionProps {
  onShopNow: () => void;
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-orange-900/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-500/30">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-300">Unleash Your Energy</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl uppercase tracking-tight">
              <span className="block">The World</span>
              <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">Is Yours</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-lg">
              Ignite your potential with FireUp – the ultimate energy drink designed for champions who refuse to settle.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                onClick={onShopNow}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 group"
              >
                Grab a Can
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-3xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">200mg</div>
                <div className="text-sm text-gray-400">Caffeine</div>
              </div>
              <div>
                <div className="text-3xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">0g</div>
                <div className="text-sm text-gray-400">Sugar</div>
              </div>
              <div>
                <div className="text-3xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">5 Cal</div>
                <div className="text-sm text-gray-400">Only</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-transparent blur-3xl"></div>
              
              {/* Product image with tilt */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateZ: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1741519735476-cfc8bf0b2ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBkcmluayUyMGNhbnxlbnwxfHx8fHwxNzYwMjcwNzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Fire Up Energy Drink"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </motion.div>

              {/* Floating particles */}
              <motion.div
                animate={{ 
                  y: [0, -100],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute bottom-10 left-1/4 w-2 h-2 bg-orange-400 rounded-full"
              ></motion.div>
              <motion.div
                animate={{ 
                  y: [0, -120],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1
                }}
                className="absolute bottom-20 right-1/4 w-3 h-3 bg-red-400 rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-orange-400 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
