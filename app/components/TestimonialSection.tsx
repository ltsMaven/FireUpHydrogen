import {Star, Quote, Play, Instagram} from 'lucide-react';
import {Card} from '~/ui/card';
import {Avatar, AvatarFallback} from '~/ui/avatar';
import {Badge} from '~/ui/badge';
import {FaTiktok} from 'react-icons/fa';

import productVideo2 from '../assets/product-video-2.mov';
import productVideo3 from '../assets/product-video-3.mov';
import productVideo4 from '../assets/product-video-4.mov';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Alex Rodriguez',
      role: 'Professional Athlete',
      avatar: 'AR',
      rating: 5,
      text: "Fire Up is my go-to before every game. The energy boost is incredible and it doesn't give me the jitters like other brands.",
    },
    {
      name: 'Sarah Chen',
      role: 'Fitness Instructor',
      avatar: 'SC',
      rating: 5,
      text: 'I recommend Fire Up to all my clients. Zero sugar, great taste, and the perfect energy kick for intense workouts.',
    },
    {
      name: 'Marcus Johnson',
      role: 'Entrepreneur',
      avatar: 'MJ',
      rating: 5,
      text: 'Long work days need serious fuel. Fire Up keeps me sharp and focused without the sugar crash. Game changer!',
    },
  ];

  const contentShowcase = [
    {video: productVideo2},
    {video: productVideo3},
    {video: productVideo4},
  ];

  return (
    <>
      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          {/* was motion.div */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white uppercase mb-4">
              What People Are Saying
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've made Fire Up their
              energy drink of choice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              // was motion.div
              <div key={index}>
                <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 p-6 hover:border-orange-500/30 transition-all duration-300 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-orange-400 mb-4" />

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 mb-6 flex-grow">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTION UNDER TESTIMONIALS */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="container mx-auto px-4 relative z-10">
          {/* was motion.div */}
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

            <div className="mt-6 flex justify-center">
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
                className="w-10 h-10 bg-white/5 hover:bg-orange-500/20 rounded-full flex items-center justify-center text-white hover:text-orange-400 transition-colors ml-3"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentShowcase.map((content, index) => (
              // was motion.div
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl"
              >
                <Card
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 overflow-hidden hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
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
                        <Play className="w-7 h-7 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}