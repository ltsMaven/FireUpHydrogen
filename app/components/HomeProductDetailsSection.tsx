import {Badge} from '~/ui/badge';

const ingredients = [
  'Carbonated Water',
  'Bovine Collagen Protein',
  'Acidity Regulator (Citric Acid, Sodium Citrate)',
  'Natural Flavour',
  'Taurine',
  'Green Tea Extract',
  'Guarana Extract',
  'Potassium Citrate',
  'Sodium Benzoate',
  'Magnesium Citrate',
  'Natural Caffeine',
  'Ginseng Extract',
  'Sweetener (Sucralose, Ace K)',
  'Vitamin (Vitamin C, B6, B12)',
  'L-Carnitine',
  'Pink Salt',
  'Sweet Osmanthus Ear Glycolipids',
];

const nutritionRows = [
  ['Energy', '540 kJ (129 Cal)', '152 kJ (36 Cal)'],
  ['Protein', '31 g', '8.7 g'],
  ['Fat, Total', '0 g', '0 g'],
  ['- Saturated', '0 g', '0 g'],
  ['Carbohydrate, Total', '1.1 g', '0.3 g'],
  ['- Sugars', '0 g', '0 g'],
  ['Sodium', '40.1 mg', '11.3 mg'],
];

const compositionRows = [
  ['Caffeine', '112.9 mg', '31.8 mg'],
  ['Vitamin C', '28.4 mg', '8 mg'],
  ['Vitamin B6', '1.5 mg', '0.42 mg'],
  ['Vitamin B12', '0.5 ug', '0.14 ug'],
  ['Taurine', '500.6 mg', '141 mg'],
  ['Ginseng Root Extract', '100 mg', '28.2 mg'],
  ['Guarana Seed Extract', '300 mg', '84.5 mg'],
];

function LabelTable({
  rows,
  title,
}: {
  rows: string[][];
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/15 bg-black/52">
      <div className="border-b border-white/15 bg-white/[0.055] px-4 py-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
          {title}
        </h3>
      </div>
      <table className="w-full text-left text-xs text-white/82">
        <thead className="border-b border-white/12 text-[10px] uppercase tracking-[0.18em] text-orange-200">
          <tr>
            <th className="px-4 py-3 font-semibold">Average Quantity</th>
            <th className="px-3 py-3 text-right font-semibold">Per Serving</th>
            <th className="px-4 py-3 text-right font-semibold">Per 100ml</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, serving, per100]) => (
            <tr key={label} className="border-b border-white/[0.07] last:border-0">
              <td className="px-4 py-2.5 font-medium text-white/88">
                {label}
              </td>
              <td className="px-3 py-2.5 text-right">{serving}</td>
              <td className="px-4 py-2.5 text-right">{per100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HomeProductDetailsSection() {
  return (
    <section
      id="product-details"
      className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#190604_0%,#050201_24%,#000_100%)] px-4 py-20 text-white md:py-28"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(249,115,22,0.75),transparent)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-5 border-orange-300/25 bg-orange-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.28em] text-orange-100">
              Label Breakdown
            </Badge>
            <h2 className="text-4xl font-semibold uppercase tracking-[0.08em] text-white md:text-5xl">
              What is inside the can.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/72 md:text-lg">
              Nutrition facts, composition information, and the full ingredient
              breakdown from the product label.
            </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="rounded-lg border border-white/15 bg-black/48 p-5 text-sm text-white/78">
              <p className="text-3xl font-semibold tracking-[0.02em] text-white">
                Nutrition Information
              </p>
              <div className="mt-3 grid gap-1 text-base text-white/78">
                <p>Servings per package: 1</p>
                <p>Serving size: 355ml</p>
              </div>
            </div>

            <LabelTable rows={nutritionRows} title="Nutrition Facts" />
          </div>

          <div className="space-y-5">
            <LabelTable rows={compositionRows} title="Composition Information" />

            <div className="rounded-lg border border-white/15 bg-black/40 p-5 shadow-[0_26px_90px_rgba(0,0,0,0.32)] backdrop-blur-md md:p-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-orange-200">
                  Ingredients
                </p>
                <h3 className="mt-2 text-2xl font-semibold uppercase tracking-[0.1em] text-white">
                  Full Breakdown
                </h3>
              </div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/60">
                17 items
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {ingredients.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/[0.045] px-3 py-2.5"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/18 text-[10px] font-semibold text-orange-100">
                    {index + 1}
                  </span>
                  <span className="text-xs leading-5 text-white/82">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
