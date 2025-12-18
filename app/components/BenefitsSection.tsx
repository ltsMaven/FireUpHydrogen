import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, Trophy, Heart, Target, Sparkles } from 'lucide-react';
import { Card } from '~/ui/card';

export function BenefitsSection() {
  const benefits = [
    {
      icon: Zap,
      title: 'Instant Energy Boost',
      description: '112mg of premium caffeine for immediate power when you need it most.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Brain,
      title: 'Enhanced Focus',
      description: 'Natural ingredients to sharpen your mental clarity and concentration.',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Peak Performance',
      description: 'Optimize your workout and push past your limits with every sip.',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Heart,
      title: 'Zero Sugar',
      description: 'All the energy, none of the crash. Only 5 calories per can.',
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: Target,
      title: 'Precision Formula',
      description: 'Scientifically crafted blend of vitamins, amino acids, and electrolytes.',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Sparkles,
      title: 'Great Taste',
      description: 'Refreshing flavor that makes you want to conquer the day.',
      color: 'from-orange-400 to-red-500'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white uppercase mb-4">
            Why Choose <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Fire Up?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Not just another energy drink. Fire Up is engineered for those who demand excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 p-6 hover:border-orange-500/30 transition-all duration-300 group h-full">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
