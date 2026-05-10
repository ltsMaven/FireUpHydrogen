import {useLoaderData} from 'react-router';
import type {Route} from './+types/($locale)._index';
import {AboutProductSection} from '~/components/AboutProductSection';
import {HomeProductDetailsSection} from '~/components/HomeProductDetailsSection';

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

    {property: 'og:type', content: 'website'},
    {property: 'og:site_name', content: 'Fire Up'},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:url', content: canonical},
    {property: 'og:image', content: ogImage},
    {property: 'og:image:alt', content: 'Fire Up Energy Drink'},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},

    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: ogImage},
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  try {
    const data = await context.storefront.query(HOME_PRODUCT_LINK_QUERY);
    const product = data?.products?.nodes?.[0] ?? null;

    return {productHandle: product?.handle ?? null};
  } catch {
    return {productHandle: null};
  }
}

export default function Homepage() {
  const {productHandle} = useLoaderData<typeof loader>();
  const buyHref = `/products/${productHandle ?? 'fire-up-energy-drink'}`;

  return (
    <div className="home bg-black text-white min-h-screen">
      <AboutProductSection
        variant="story"
        cta={{
          href: buyHref,
          label: 'Buy Product',
          kind: 'route',
        }}
      />
      <HomeProductDetailsSection />
    </div>
  );
}

const HOME_PRODUCT_LINK_QUERY = `#graphql
  query HomeProductLink(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 1) {
      nodes {
        handle
      }
    }
  }
` as const;
