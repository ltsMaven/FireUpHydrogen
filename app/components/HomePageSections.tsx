import {VideoHeroSection} from '~/components/VideoHeroSection';
import {CTASection} from '~/components/CTASection';
import {BenefitsSection} from '~/components/BenefitsSection';
import {ProductSection} from '~/components/ProductSection';
import {NutritionSection} from '~/components/NutritionSection';
import {TestimonialsSection} from '~/components/TestimonialSection';

export interface HomePageSectionsProps {
  scrollToProduct: () => void;
}

export function HomePageSections({scrollToProduct}: HomePageSectionsProps) {
  // TODO: replace this with a real variant id from Shopify (see note below)
  const merchandiseId = 'gid://shopify/ProductVariant/1234567890';

  return (
    <main className="bg-black text-white">
      <VideoHeroSection
        onShopNow={scrollToProduct}
        onDiscoverMore={() => {
          // ⚠️ if you use locales, this should be locale-aware (see note)
          window.location.href = '/about';
        }}
      />

      <CTASection onShopNow={scrollToProduct} />
      <BenefitsSection />
      <NutritionSection />

      <ProductSection merchandiseId={merchandiseId} />

      <TestimonialsSection />
    </main>
  );
}
