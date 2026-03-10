import {VideoHeroSection} from '~/components/VideoHeroSection';
import {CTASection} from '~/components/CTASection';
import {BenefitsSection} from '~/components/BenefitsSection';
import {ProductSection} from '~/components/ProductSection';
import {NutritionSection} from '~/components/NutritionSection';
import {TestimonialsSection} from '~/components/TestimonialSection';

export type Variant = {
  id: string;
  availableForSale?: boolean | null;
  title?: string | null;
  image?: {url?: string | null; altText?: string | null} | null;
  price?: {amount: string; currencyCode: string} | null;
  selectedOptions?: Array<{name: string; value: string}> | null;
  product?: {title?: string | null; handle?: string | null} | null;
};

export interface HomePageSectionsProps {
  scrollToProduct: () => void;
  onDiscoverMore: () => void;
  product: {title?: string | null; handle?: string | null} | null;
  variants: Variant[];
}

export function HomePageSections({
  scrollToProduct,
  onDiscoverMore,
  product,
  variants,
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

      {variants.length > 0 ? (
        <ProductSection variants={variants} />
      ) : (
        <div className="py-16 text-center text-white/70">
          No product variants found yet.
        </div>
      )}

      <TestimonialsSection />
    </main>
  );
}
