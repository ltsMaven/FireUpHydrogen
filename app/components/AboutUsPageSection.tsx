// app/components/AboutPageSections.tsx (for example)

import {
  Flame,
  Target,
  Users,
  Zap,
  Award,
  Rocket,
  Heart,
  Play,
  Instagram,
} from 'lucide-react';
import {Card} from '~/ui/card';
import {Badge} from '~/ui/badge';
import {FaTiktok} from 'react-icons/fa';

import aboutUsImage from '../assets/about-us.png';
import productImage5 from '../assets/product-image-5.jpeg';
import productVideo2 from '../assets/product-video-2.mov';
import productVideo3 from '../assets/product-video-3.mov';
import productVideo4 from '../assets/product-video-4.mov';

export function AboutPageSections() {
  const contentShowcase = [
    {video: productVideo2},
    {video: productVideo3},
    {video: productVideo4},
  ];

  const timeline = [
    {
      year: '2024',
      title: 'The Foundation',
      description:
        'Fire Up established its presence in the energy drink market with our signature zero-sugar formula and bold brand identity.',
    },
    {
      year: '2025',
      title: 'Explosive Growth',
      description:
        'Currently expanding nationwide with 1,000+ retail locations. Launched our new Tropical Thunder flavor and hit 10 million cans sold milestone.',
    },
    {
      year: '2026',
      title: 'Global Domination',
      description:
        'Planning international expansion to 15+ countries. New product lines and revolutionary packaging innovations on the horizon.',
    },
  ];

  const values = [
    {
      icon: Flame,
      title: 'Passion First',
      description:
        "We're obsessed with creating the best energy drink. Every detail matters.",
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: Heart,
      title: 'Health Conscious',
      description:
        'Zero sugar, natural ingredients. Fuel your body right without the crash.',
      color: 'from-red-500 to-pink-600',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description:
        'Built by athletes, for athletes. Your feedback shapes our future.',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Zap,
      title: 'Performance Focused',
      description:
        'Engineered for peak performance. Every ingredient has a purpose.',
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  const stats = [
    {icon: Users, value: '50K+', label: 'Happy Customers'},
    {icon: Award, value: '15+', label: 'Industry Awards'},
    {icon: Rocket, value: '10M+', label: 'Cans Sold'},
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-44 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-6">
              About Fire Up
            </Badge>
            <h1 className="text-5xl md:text-7xl uppercase mb-6 text-white">
              Fueling{' '}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Champions
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We&apos;re not just an energy drink company. We&apos;re a movement
              of dreamers, doers, and game-changers who refuse to settle for
              anything less than extraordinary.
            </p>
          </div>

          <div
            className="
              max-w-4xl mx-auto mt-16 gap-6
              flex flex-col items-center
              md:grid md:grid-cols-3 md:items-stretch
            "
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div key={index} className="w-full flex justify-center md:block">
                  <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-0 p-6 text-center w-full max-w-xs md:max-w-none">
                    <Icon className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">
                Our Story
              </Badge>
              <h2 className="text-4xl md:text-5xl text-white uppercase mb-6">
                Born from{' '}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Passion
                </span>
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2024, Fire Up was built off the backend of a dream
                  two 19 year old boys. To build muscle and look good. Struggling
                  to maintain energy throughout the day and hit protein intake
                  targets. Fire Up was born to tackle this, through natural
                  energy, reliable protein sources﻿ and countless nutritious
                  ingredients. Everyone can now build their dream body and look
                  how they desire. Everything you want in life can be achieved in
                  a can of Fire Up.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden max-w-md w-full">
                <img
                  src={aboutUsImage}
                  alt="Team"
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">
              Our Values
            </Badge>
            <h2 className="text-4xl md:text-5xl text-white uppercase mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These aren&apos;t just words on a wall. They&apos;re the
              principles that guide every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index}>
                  <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-0 p-6 transition-all duration-300 h-full">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${value.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {value.description}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">
              Our Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl text-white uppercase mb-4">
              The Fire Up Timeline
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From a garage startup to a global movement. Here&apos;s how we got
              here.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="relative mb-12 last:mb-0"
              >
                <div className="flex items-start gap-6">
                  {/* Year Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                      <span className="text-white">{item.year}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 bg-gradient-to-br from-white/5 to-white/[0.02] border-0 p-6 transition-all">
                    <h3 className="text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </Card>
                </div>

                {/* Connecting Line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-10 top-20 w-0.5 h-12 bg-gradient-to-b from-orange-500 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content / Videos */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">
              Our Content
            </Badge>

            <h2 className="text-4xl md:text-5xl text-white uppercase mb-4">
              Fire Up in Action
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto">
              See Fire Up in motion – real cans, real energy, real people.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <a
                href="https://www.instagram.com/drinkfireup"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-orange-500/20 rounded-full flex items-center justify-center text-white hover:text-orange-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@drinkfireup"
                target="_blank"
                rel="noreferrer"
                aria-label="Fire Up on TikTok"
                className="w-10 h-10 bg-white/5 hover:bg-orange-500/20 rounded-full flex items-center justify-center text-white hover:text-orange-400 transition-colors"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentShowcase.map((content, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl"
              >
                <Card
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-0 overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{aspectRatio: '9/16'}}
                >
                  <div className="relative h-full overflow-hidden">
                    <video
                      src={content.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-orange-500/85 flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-7 h-7 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white/10 to-white/[0.03] ...">
                <img
                  src={productImage5}
                  alt="Fire Up product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-orange-400" />
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  Our Mission
                </Badge>
              </div>

              <h2 className="text-4xl md:text-5xl text-white uppercase mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Quality
                </span>{' '}
                You Can Trust
              </h2>

              <div className="space-y-4 text-gray-300">
                <p>
                  At Fire Up, we ensure that all our products are authentic and
                  carefully handled to guarantee they reach you in perfect
                  condition. We take great care in sourcing from reputable
                  suppliers to provide you with only the finest quality.
                </p>
                <p>
                  Moreover, we back our commitment with a satisfaction guarantee
                  and a straightforward returns policy. If you&apos;re not
                  satisfied, simply contact us, and we&apos;ll do whatever it
                  takes to make it right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-red-600/20 to-yellow-600/20 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl text-white uppercase mb-6">
              Join the{' '}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Movement
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of a community that&apos;s redefining what&apos;s
              possible. Your journey starts now.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}