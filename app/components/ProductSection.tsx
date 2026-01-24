import {CartForm} from '@shopify/hydrogen';
import {ShoppingCart, Star, Package, Shield, Zap} from 'lucide-react';
import {Badge} from '~/ui/badge';
import {useParams} from 'react-router';
import {Button} from '~/ui/button';
import {Card} from '~/ui/card';
import {useAside} from '~/components/Aside';
import {useState} from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '~/ui/carousel';
import productImage2 from '../assets/product-image-2.png';
import productImage3 from '../assets/product-image-3.png';
import {motion, type Variants} from 'framer-motion';

interface ProductSectionProps {
  /** Shopify ProductVariant GID, e.g. gid://shopify/ProductVariant/123 */
  merchandiseId: string;
}

const sectionV: Variants = {
  hidden: {opacity: 0, y: 10},
  show: {opacity: 1, y: 0, transition: {duration: 0.28, ease: 'easeOut'}},
};

const leftV: Variants = {
  hidden: {opacity: 0, x: -10},
  show: {
    opacity: 1,
    x: 0,
    transition: {duration: 0.28, ease: 'easeOut', delay: 0.05},
  },
};

const rightV: Variants = {
  hidden: {opacity: 0, x: 10},
  show: {
    opacity: 1,
    x: 0,
    transition: {duration: 0.28, ease: 'easeOut', delay: 0.08},
  },
};

export function ProductSection({merchandiseId}: ProductSectionProps) {
  const {open} = useAside();
  const params = useParams();
  const locale = (params as any).locale as string | undefined;
  const cartRoute = locale ? `/${locale}/cart` : '/cart';

  const [quantity, setQuantity] = useState(1);
  const [selectedPack, setSelectedPack] = useState<
    'single' | 'pack6' | 'pack12'
  >('single');

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const productImages = [
    {url: productImage2, alt: 'Fire Up Can - Close Up 1'},
    {url: productImage3, alt: 'Fire Up Can - Close Up 2'},
  ];

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

  const totalIngredients = ingredients.length;

  const packs = {
    single: {price: 3.99, cans: 1, savings: 0},
    pack6: {price: 21.99, cans: 6, savings: 10},
    pack12: {price: 39.99, cans: 12, savings: 20},
  } as const;

  const currentPack = packs[selectedPack];
  const linesQuantity = quantity * currentPack.cans;
  const addQty = quantity * currentPack.cans;

  const handleCarouselSelect = (api: CarouselApi) => {
    if (!api) return;
    setCarouselApi(api);
    setCurrentSlide(api.selectedScrollSnap());
    api.on('select', () => setCurrentSlide(api.selectedScrollSnap()));
  };

  const scrollToSlide = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <section id="product" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-red-600/20 to-yellow-600/20 blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={{once: true, amount: 0.35}}
          style={{willChange: 'transform, opacity'}}
        >
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">
            Premium Energy
          </Badge>
          <h2 className="text-4xl md:text-5xl text-white uppercase mb-4">
            Fire Up Energy Drink
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            355ml of pure energy. Zero sugar, maximum performance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: carousel */}
          <motion.div
            className="relative"
            variants={leftV}
            initial="hidden"
            whileInView="show"
            viewport={{once: true, amount: 0.25}}
            style={{willChange: 'transform, opacity'}}
          >
            <div className="relative bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-3xl p-8 border border-orange-500/20">
              <Carousel
                className="w-full max-w-sm mx-auto"
                setApi={handleCarouselSelect}
              >
                <CarouselContent>
                  {productImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-96 flex items-center justify-center rounded-2xl">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="h-full w-auto object-contain drop-shadow-2xl rounded-xl"
                          draggable={false}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/60 border-white/20 hover:bg-black/80 text-white" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-black/60 border-white/20 hover:bg-black/80 text-white" />
              </Carousel>

              <div className="absolute top-8 right-8 bg-yellow-400 text-white px-4 py-2 rounded-full rotate-12 z-10">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-white" />
                  <span>Best Seller</span>
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6 justify-center">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToSlide(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentSlide === index
                      ? 'border-orange-500 scale-105'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {currentSlide === index && (
                    <div className="absolute inset-0 bg-orange-500/20" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: details */}
          <motion.div
            className="space-y-6"
            variants={rightV}
            initial="hidden"
            whileInView="show"
            viewport={{once: true, amount: 0.25}}
            style={{willChange: 'transform, opacity'}}
          >
            <div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl text-white">
                  ${currentPack.price.toFixed(2)}
                </span>
                {currentPack.savings > 0 && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Save {currentPack.savings}%
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-gray-400">(2,847 reviews)</span>
              </div>

              {/* Ingredients details block unchanged */}
              <div className="mt-4">
                <details
                  className="group bg-gradient-to-r from-orange-500/15 via-red-500/15 to-yellow-400/15 border border-white/60 rounded-xl shadow-[0_0_30px_rgba(248,113,113,0.35)] overflow-hidden"
                  style={{borderColor: 'rgba(255,255,255,0.9)'}}
                >
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm text-white select-none outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/40 border border-orange-200/70 text-[12px]">
                        ⚡
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-white">
                          Full Ingredient Breakdown
                        </span>
                        <span className="text-xs text-gray-200">
                          Collagen, taurine, natural caffeine, vitamins, and
                          more.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-orange-100 ml-4">
                      <span>{totalIngredients} ingredients</span>
                      <span className="transition-transform group-open:rotate-180">
                        ▲
                      </span>
                    </div>
                  </summary>

                  <div className="px-4 pb-4 pt-3 text-sm text-gray-100 bg-black/40 border-t border-white/40 space-y-3">
                    <p className="text-xs text-gray-300">
                      Crafted for clean energy, smooth mouthfeel, and bold
                      flavour—without the sugar crash.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {ingredients.map((item) => (
                        <span
                          key={item}
                          className="text-[11px] px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20 shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Pack selection */}
            <div>
              <label className="text-white mb-3 block">Choose Your Pack</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPack('single')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPack === 'single'
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <div className="text-white">Single</div>
                  <div className="text-sm text-gray-400">1 Can</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPack('pack6')}
                  className={`p-4 rounded-lg border-2 transition-all relative ${
                    selectedPack === 'pack6'
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  {packs.pack6.savings > 0 && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      -10%
                    </div>
                  )}
                  <div className="text-white">6-Pack</div>
                  <div className="text-sm text-gray-400">6 Cans</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPack('pack12')}
                  className={`p-4 rounded-lg border-2 transition-all relative ${
                    selectedPack === 'pack12'
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  {packs.pack12.savings > 0 && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      -20%
                    </div>
                  )}
                  <div className="text-white">12-Pack</div>
                  <div className="text-sm text-gray-400">12 Cans</div>
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-white mb-3 block">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-400">
                  {linesQuantity} can{linesQuantity > 1 ? 's' : ''} total
                </span>
              </div>
            </div>

            {/* ✅ REAL Hydrogen add-to-cart */}
            <CartForm
              route={cartRoute}
              action={CartForm.ACTIONS.LinesAdd}
              inputs={{lines: [{merchandiseId, quantity: addQty}]}}
            >
              <Button
                type="submit"
                size="lg"
                onClick={() => {
                  console.log(
                    'ADD merchId:',
                    merchandiseId,
                    'qty:',
                    addQty,
                    'route:',
                    cartRoute,
                  );
                  open('cart');
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 group"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(currentPack.price * quantity).toFixed(2)}
              </Button>
            </CartForm>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <Card className="bg-white/5 border-white/10 p-4 text-center">
                <Package className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-xs text-gray-400">Free Shipping</div>
              </Card>
              <Card className="bg-white/5 border-white/10 p-4 text-center">
                <Shield className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-xs text-gray-400">Secure Payment</div>
              </Card>
              <Card className="bg-white/5 border-white/10 p-4 text-center">
                <Zap className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-xs text-gray-400">Fast Delivery</div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
