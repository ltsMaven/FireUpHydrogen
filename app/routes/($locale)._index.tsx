import {useLoaderData} from 'react-router';
import type {Route} from './+types/($locale)._index';
import {HomePageSections} from '~/components/HomePageSections';

export const meta: Route.MetaFunction = ({location}) => {
  const title = 'Fire Up Energy Drink | Zero Sugar, 31g Protein';
  const description =
    'Fire Up is a zero-sugar energy drink with 31g protein. Clean energy, great taste, built for performance.';

  const ORIGIN = 'https://shopfireup.com';

  const pathname = location?.pathname ?? '/';
  const canonical = `${ORIGIN}${pathname}`;

  const ogImage = `${ORIGIN}/og/home.png`;

  return [
    {title},
    {name: 'description', content: description},
    {rel: 'canonical', href: canonical},
    {name: 'robots', content: 'index,follow'},

    // Open Graph
    {property: 'og:type', content: 'website'},
    {property: 'og:site_name', content: 'Fire Up'},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:url', content: canonical},
    {property: 'og:image', content: ogImage},
    // optional but recommended
    {property: 'og:image:alt', content: 'Fire Up Energy Drink'},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},

    // Twitter
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: ogImage},
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  const data = await context.storefront.query(HOME_FEATURED_VARIANT_QUERY);

  const product = data?.products?.nodes?.[0];
  const selectedVariant = product?.selectedOrFirstAvailableVariant ?? null;

  return {selectedVariant};
}

export default function Homepage() {
  const {selectedVariant} = useLoaderData<typeof loader>();

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
