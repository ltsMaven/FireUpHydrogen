import React, {useEffect, useMemo, useState} from 'react';
import {ArrowRight, Play} from 'lucide-react';
import {Button} from '~/ui/button';
import {motion, useReducedMotion, type Variants} from 'framer-motion';
import fireUpLogo from '../assets/fireup-logo.png';

const productVideo =
  'https://cdn.shopify.com/videos/c/o/v/401c9495a69744cca790808fc314e66f.mp4';

interface VideoHeroSectionProps {
  onShopNow: () => void;
  onDiscoverMore: () => void;
}

type HeroMotion = {
  leftContainer: Variants;
  fadeUp: Variants;
  rightCard: Variants;
};

function getHeroMotion(reduceMotion: boolean): HeroMotion {
  return {
    leftContainer: {
      hidden: {opacity: 0},
      show: {
        opacity: 1,
        transition: reduceMotion
          ? {duration: 0}
          : {staggerChildren: 0.06, delayChildren: 0.05},
      },
    },
    fadeUp: {
      hidden: {opacity: 0, y: reduceMotion ? 0 : 8},
      show: {
        opacity: 1,
        y: 0,
        transition: reduceMotion
          ? {duration: 0}
          : {duration: 0.32, ease: 'easeOut'},
      },
    },
    rightCard: {
      hidden: {opacity: 0, x: reduceMotion ? 0 : 12},
      show: {
        opacity: 1,
        x: 0,
        transition: reduceMotion
          ? {duration: 0}
          : {duration: 0.35, ease: 'easeOut', delay: 0.05},
      },
    },
  };
}

export function VideoHeroSection({
  onShopNow,
  onDiscoverMore,
}: VideoHeroSectionProps) {
  const reduceMotion = useReducedMotion();

  // memo so variants object doesn’t change every render
  const motionDefs = useMemo(
    () => getHeroMotion(!!reduceMotion),
    [reduceMotion],
  );

  const [isPlaying, setIsPlaying] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <StaticHero
        motionDefs={motionDefs}
        onShopNow={onShopNow}
        onDiscoverMore={onDiscoverMore}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    );
  }

  return (
    <MotionHero
      motionDefs={motionDefs}
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
      {/* Cheaper background glows (no pulse, no big center glow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-80 h-80 bg-orange-500/15 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-48 w-80 h-80 bg-red-500/15 rounded-full blur-2xl" />
      </div>

      {/* Grid pattern (ok to keep) */}
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
  motionDefs,
  onShopNow,
  onDiscoverMore,
  isPlaying,
  setIsPlaying,
}: {
  motionDefs: HeroMotion;
  onShopNow: () => void;
  onDiscoverMore: () => void;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
}) {
  const {leftContainer, fadeUp} = motionDefs;

  return (
    <BaseLayout
      Left={
        <motion.div
          variants={leftContainer}
          initial="hidden"
          animate="show"
          className="w-full max-w-xl mx-auto space-y-8 text-center lg:text-left lg:pl-12"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-6 lg:items-start"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <img
                src={fireUpLogo}
                alt="Fire Up logo"
                className="w-full h-full rounded-2xl object-contain"
              />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.9]">
              <span className="text-white font-bold">FIRE</span>{' '}
              <span className="text-red-400 font-bold">UP</span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-3xl lg:text-4xl text-white/90 uppercase tracking-wider"
          >
            THE WORLD FIRST ENERGY DRINK WITH 31 GRAMS OF PROTEIN
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0"
          >
            Zero sugar. Maximum energy. The premium energy drink engineered for
            champions who refuse to settle.
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
      }
      Right={<HeroVideo isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}
    />
  );
}

function MotionHero({
  motionDefs,
  onShopNow,
  onDiscoverMore,
  isPlaying,
  setIsPlaying,
}: {
  motionDefs: HeroMotion;
  onShopNow: () => void;
  onDiscoverMore: () => void;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
}) {
  const {leftContainer, fadeUp, rightCard} = motionDefs;

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
          className="relative w-full max-w-sm lg:-translate-x-6"
          variants={rightCard}
          initial="hidden"
          animate="show"
          whileHover={{scale: 1.01}}
        >
          <HeroVideo isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </motion.div>
      }
    />
  );
}

function HeroVideo({
  isPlaying,
  setIsPlaying,
}: {
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
}) {
  return (
    <div className="relative w-full max-w-sm lg:-translate-x-6">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/25 to-red-500/25 rounded-3xl blur-xl scale-105" />
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
            preload="metadata"
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
  );
}
