import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '~/ui/card';

export function NutritionSection() {
  const coreRows = [
    { label: 'Energy', perServe: '540 kJ (129 Cal)', per100: '152 kJ (36 Cal)', highlight: true },
    { label: 'Protein', perServe: '31 g', per100: '8.7 g', highlight: true },
    { label: 'Fat, total', perServe: '0 g', per100: '0 g', highlight: false },
    { label: '– Saturated', perServe: '0 g', per100: '0 g', highlight: false },
    { label: 'Carbohydrate', perServe: '1.1 g', per100: '0.3 g', highlight: false },
    { label: '– Sugars', perServe: '0 g', per100: '0 g', highlight: true },
    { label: 'Sodium', perServe: '40.1 mg', per100: '11.3 mg', highlight: false },
  ];

  const activeRows = [
    { label: 'Caffeine', perServe: '112.9 mg', per100: '31.8 mg', highlight: true },
    { label: 'Vitamin C', perServe: '28.4 mg', per100: '8 mg', highlight: false },
    { label: 'Vitamin B6', perServe: '1.5 mg', per100: '0.42 mg', highlight: false },
    { label: 'Vitamin B12', perServe: '0.5 µg', per100: '0.14 µg', highlight: false },
    { label: 'Taurine', perServe: '500.6 mg', per100: '141 mg', highlight: true },
    { label: 'Ginseng root extract', perServe: '100 mg', per100: '28.2 mg', highlight: true },
    { label: 'Guarana seed extract', perServe: '300 mg', per100: '84.5 mg', highlight: true },
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 p-8 text-white">
            <h3 className="text-2xl mb-2 text-center uppercase tracking-wide">
              Nutrition Facts
            </h3>
            <p className="text-center text-sm text-gray-300 mb-8">
              Average quantities per serving (355 mL) and per 100 mL.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Core nutrition */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-100">
                  Core Nutrition
                </h4>
                <div className="rounded-2xl border border-white/15 bg-black/40 overflow-hidden">
                  <div className="grid grid-cols-3 text-xs uppercase text-gray-300 bg-white/10 px-4 py-2">
                    <span>Item</span>
                    <span className="text-right">Per 355 mL</span>
                    <span className="text-right">Per 100 mL</span>
                  </div>

                  <div className="divide-y divide-white/10 text-sm">
                    {coreRows.map((row) => (
                      <div
                        key={row.label}
                        className={`grid grid-cols-3 px-4 py-2 ${
                          row.highlight ? 'bg-white/5' : ''
                        }`}
                      >
                        <span
                          className={
                            row.highlight
                              ? 'font-semibold text-orange-200'
                              : 'text-gray-200'
                          }
                        >
                          {row.label}
                        </span>
                        <span
                          className={
                            row.highlight
                              ? 'text-right font-semibold text-orange-100'
                              : 'text-right text-gray-100'
                          }
                        >
                          {row.perServe}
                        </span>
                        <span
                          className={
                            row.highlight
                              ? 'text-right font-semibold text-orange-300'
                              : 'text-right text-gray-300'
                          }
                        >
                          {row.per100}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active ingredients */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-100">
                  Active Ingredients
                </h4>
                <div className="rounded-2xl border border-white/15 bg-black/40 overflow-hidden">
                  <div className="grid grid-cols-3 text-xs uppercase text-gray-300 bg-white/10 px-4 py-2">
                    <span>Ingredient</span>
                    <span className="text-right">Per 355 mL</span>
                    <span className="text-right">Per 100 mL</span>
                  </div>

                  <div className="divide-y divide-white/10 text-sm">
                    {activeRows.map((row) => (
                      <div
                        key={row.label}
                        className={`grid grid-cols-3 px-4 py-2 ${
                          row.highlight ? 'bg-white/5' : ''
                        }`}
                      >
                        <span
                          className={
                            row.highlight
                              ? 'font-semibold text-orange-200'
                              : 'text-gray-200'
                          }
                        >
                          {row.label}
                        </span>
                        <span
                          className={
                            row.highlight
                              ? 'text-right font-semibold text-orange-100'
                              : 'text-right text-gray-100'
                          }
                        >
                          {row.perServe}
                        </span>
                        <span
                          className={
                            row.highlight
                              ? 'text-right font-semibold text-orange-300'
                              : 'text-right text-gray-300'
                          }
                        >
                          {row.per100}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}