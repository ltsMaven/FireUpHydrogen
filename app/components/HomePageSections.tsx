import {VideoHeroSection} from '~/components/VideoHeroSection';
import {CTASection} from '~/components/CTASection';
import {BenefitsSection} from '~/components/BenefitsSection';
import {ProductSection} from '~/components/ProductSection';
import {NutritionSection} from '~/components/NutritionSection';
import {TestimonialsSection} from '~/components/TestimonialSection';

export interface HomePageSectionsProps {
  onAddToCart: (quantity: number) => void;
  scrollToProduct: () => void;
  onDiscoverMore: () => void; // (kept for compatibility, but not used)
}



export function HomePageSections({
  onAddToCart,
  scrollToProduct,
  onDiscoverMore, // keep prop so nothing breaks
}: HomePageSectionsProps) {
  console.log('HomePageSections rendered with full sections');

  return (
    <main className="bg-black text-white">
      {/* Hero at the top */}
      <VideoHeroSection
        onShopNow={() => {
          // use your existing smooth scroll function
          scrollToProduct();
        }}
        onDiscoverMore={() => {
          // go to About page
          window.location.href = '/about';
        }}
      />

      {/* Call-to-action section */}
      <CTASection onShopNow={scrollToProduct} />

      {/* Static sections */}
      <BenefitsSection />
      <NutritionSection />

      {/* Product section MUST have id="product" inside it (see note below) */}
      <ProductSection onAddToCart={onAddToCart} />
      <TestimonialsSection />
    </main>
  );
}