import {VideoHeroSection} from '~/components/VideoHeroSection';
import {CTASection} from '~/components/CTASection';
import {BenefitsSection} from '~/components/BenefitsSection';
import {ProductSection} from '~/components/ProductSection';
import {NutritionSection} from '~/components/NutritionSection';
import {TestimonialsSection} from '~/components/TestimonialSection';

export type SelectedVariant = {
  id: string;
  availableForSale?: boolean | null;
  title?: string | null;
  image?: {url?: string | null; altText?: string | null} | null;
  price?: {amount: string; currencyCode: string} | null;
  product?: {title?: string | null; handle?: string | null} | null;
};

export interface HomePageSectionsProps {
  scrollToProduct: () => void;
  onDiscoverMore: () => void; // ✅ add this
  selectedVariant: SelectedVariant | null;
}

export function HomePageSections({
  scrollToProduct,
  onDiscoverMore,
  selectedVariant,
}: HomePageSectionsProps) {
  return (
    <main className="bg-black text-white">
      <VideoHeroSection
        onShopNow={scrollToProduct}
        onDiscoverMore={onDiscoverMore}
      />

      <CTASection onShopNow={scrollToProduct} />
      <BenefitsSection />
      <NutritionSection />

      {selectedVariant ? (
        <ProductSection selectedVariant={selectedVariant} />
      ) : (
        <div className="py-16 text-center text-white/70">
          No product variant found yet.
        </div>
      )}

      <TestimonialsSection />
    </main>
  );
}
