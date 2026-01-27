import React from 'react';
import {ArrowRight, Play} from 'lucide-react';
import {Button} from '~/ui/button';
import {useEffect, useState} from 'react';
import fireUpLogo from '../assets/fireup-logo.png';
// import productVideo from 'https://cdn.shopify.com/videos/c/o/v/670c3296701e4b1aa8157eb146e5970a.mp4';
import {motion, type Variants} from 'framer-motion';
const productVideo =
  'https://cdn.shopify.com/videos/c/o/v/670c3296701e4b1aa8157eb146e5970a.mp4';

interface VideoHeroSectionProps {
  onShopNow: () => void;
  onDiscoverMore: () => void;
}

const leftContainer: Variants = {
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

const rightCard: Variants = {
  hidden: {opacity: 0, x: 40, scale: 0.98},
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {duration: 0.7, ease: 'easeOut', delay: 0.15},
  },
};

export function VideoHeroSection({
  onShopNow,
  onDiscoverMore,
}: VideoHeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ SSR: show static content
  // ✅ Client: swap to motion version AFTER mount so animation runs
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <StaticHero
        onShopNow={onShopNow}
        onDiscoverMore={onDiscoverMore}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    );
  }

  return (
    <MotionHero
      onShopNow={onShopNow}
      onDiscoverMore={onDiscoverMore}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
    />
  );
}

function BaseLayout({
  Left,
  Right,
}: {
  Left: React.ReactNode;
  Right: React.ReactNode;
}) {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black mt-28 md:mt-0"
    >
      {/* Background Gradient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"
          style={{animationDelay: '1s'}}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-start md:items-center pt-32 pb-16 md:pt-40 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center justify-items-stretch lg:justify-items-center w-full max-w-7xl mx-auto">
          {Left}
          <div className="flex justify-center lg:justify-center w-full">
            {Right}
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticHero({
  onShopNow,
  onDiscoverMore,
  isPlaying,
  setIsPlaying,
}: {
  onShopNow: () => void;
  onDiscoverMore: () => void;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
}) {
  return (
    <BaseLayout
      Left={
        <motion.div
          variants={leftContainer}
          initial="hidden"
          animate="show"
          className="
      w-full max-w-xl mx-auto
      space-y-8
      text-center lg:text-left
      lg:pl-12
    "
        >
          {/* Logo + Title group */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-6 lg:items-start"
          >
            {/* Logo */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <img
                src={fireUpLogo}
                alt="Fire Up logo"
                className="w-full h-full rounded-2xl object-contain"
              />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.9]">
              <span className="text-white font-bold">FIRE</span>{' '}
              <span className="text-red-400 font-bold">UP</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-xl md:text-3xl lg:text-4xl text-white/90 uppercase tracking-wider"
          >
            THE WORLD FIRST ENERGY DRINK WITH 31 GRAMS OF PROTEIN
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0"
          >
            Zero sugar. Maximum energy. The premium energy drink engineered for
            champions who refuse to settle.
          </motion.p>

          {/* Buttons (only THIS is flex) */}
          <motion.div
            variants={fadeUp}
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
      }
      Right={
        // ✅ CHANGED: pull slightly toward the text on lg screens
        <div className="relative w-full max-w-sm lg:-translate-x-6">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-3xl blur-2xl scale-105" />

          <div
            className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            style={{aspectRatio: '9/16'}}
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
      }
    />
  );
}

function MotionHero({
  onShopNow,
  onDiscoverMore,
  isPlaying,
  setIsPlaying,
}: {
  onShopNow: () => void;
  onDiscoverMore: () => void;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
}) {
  return (
    <BaseLayout
      Left={
        <div className="w-full flex justify-center lg:justify-end">
          <motion.div
            className="w-full max-w-xl space-y-8 text-center lg:text-left"
            variants={leftContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={fadeUp}
              className="flex justify-center lg:justify-start mb-6"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <img
                  src={fireUpLogo}
                  alt="Fire Up logo"
                  className="w-full h-full rounded-2xl object-contain"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95]">
                <span className="text-white font-bold">FIRE</span>{' '}
                <span className="text-red-400 font-bold">UP</span>
              </h1>

              <p className="text-xl md:text-3xl lg:text-4xl text-white/90 uppercase tracking-wider">
                THE WORLD FIRST ENERGY DRINK WITH 31 GRAMS OF PROTEIN
              </p>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0"
            >
              Zero sugar. Maximum energy. The premium energy drink engineered
              for champions who refuse to settle.
            </motion.p>

            <motion.div
              variants={fadeUp}
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
        </div>
      }
      Right={
        <motion.div
          // ✅ CHANGED: pull slightly toward the text on lg screens
          className="relative w-full max-w-sm lg:-translate-x-6"
          variants={rightCard}
          initial="hidden"
          animate="show"
          whileHover={{scale: 1.01}}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-3xl blur-2xl scale-105" />

          <motion.div
            className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            style={{aspectRatio: '9/16'}}
            animate={{y: [0, -6, 0]}}
            transition={{duration: 4, repeat: Infinity, ease: 'easeInOut'}}
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
          </motion.div>
        </motion.div>
      }
    />
  );
}
