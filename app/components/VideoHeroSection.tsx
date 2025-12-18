import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '~/ui/button';
import { useState } from 'react';
import fireUpLogo from '../assets/fireup-logo.png';
import productVideo from '../assets/product-video-1.mp4';

interface VideoHeroSectionProps {
  onShopNow: () => void;
  onDiscoverMore: () => void;
}

export function VideoHeroSection({ onShopNow, onDiscoverMore }: VideoHeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="home"
      className="
        relative min-h-screen w-full overflow-hidden bg-black
        mt-28 md:mt-0      /* push hero down on small screens */
      "
    >
      {/* Background Gradient Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Main Content Container */}
      <div
        className="
          relative z-10 container mx-auto px-4 min-h-screen
          flex items-start md:items-center
          pt-32 pb-16        /* a bit less top padding on mobile */
          md:pt-40 md:pb-32
        "
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-7xl mx-auto">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-start mb-6"
            >
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 p-[3px] shadow-[0_0_32px_rgba(249,115,22,0.6)]">
                  <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                    <img
                      src={fireUpLogo}
                      alt="Fire Up logo"
                      className="w-full h-full rounded-2xl object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight"
              >
                <span className="text-white font-bold">FIRE</span>{' '}
                <span className="text-red-400 font-bold">UP</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-3xl lg:text-4xl text-white/90 uppercase tracking-wider"
              >
                THE WORLD FIRST ENERGY DRINK WITH 31 GRAMS OF PROTEIN
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0"
            >
              Zero sugar. Maximum energy. The premium energy drink engineered
              for champions who refuse to settle.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
            >
              <Button
                onClick={onShopNow}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 group text-lg px-8 py-6"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 shadow-lg border border-orange-400/60"
                onClick={onDiscoverMore}
              >
                Discover More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Vertical Card with Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-3xl blur-2xl scale-105" />

              <div
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
                style={{ aspectRatio: '9/16' }}
              >
                <div
                  className="relative w-full h-full group cursor-pointer"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <video
                    src={productVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none" />

                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-orange-500/90 flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                      <p className="text-white uppercase tracking-wider text-sm">
                        355ml
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}