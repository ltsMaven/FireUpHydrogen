import {useLoaderData} from 'react-router';
import type {Route} from './+types/($locale)._index';
import {HomePageSections} from '~/components/HomePageSections';

export const meta: Route.MetaFunction = () => [{title: 'Fire Up | Home'}];

export async function loader({context}: Route.LoaderArgs) {
  const data = await context.storefront.query(HOME_FEATURED_VARIANT_QUERY);

  const product = data?.products?.nodes?.[0];
  const selectedVariant = product?.selectedOrFirstAvailableVariant ?? null;

  return {selectedVariant};
}

export default function Homepage() {
  const {selectedVariant} = useLoaderData<typeof loader>();

  const handleAddToCart = (quantity: number) => {
    console.log('Add to cart clicked with qty:', quantity);
  };

  const scrollToProduct = () => {
    const el = document.getElementById('product');
    if (!el) return;
    const headerOffset = 96;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
  };

  const handleDiscoverMore = () => {
    document.getElementById('about')?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="home bg-black text-white min-h-screen">
      <HomePageSections
        selectedVariant={selectedVariant}
        scrollToProduct={scrollToProduct}
        onDiscoverMore={handleDiscoverMore}
      />
    </div>
  );
}

const HOME_FEATURED_VARIANT_QUERY = `#graphql
  query HomeFeaturedVariant(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 1) {
      nodes {
        id
        title
        handle
        vendor
        selectedOrFirstAvailableVariant(
          selectedOptions: []
          ignoreUnknownOptions: true
          caseInsensitiveMatch: true
        ) {
          id
          availableForSale
          title
          image {
            url
            altText
          }
          price {
            amount
            currencyCode
          }
          product {
            title
            handle
          }
        }
      }
    }
  }
` as const;
