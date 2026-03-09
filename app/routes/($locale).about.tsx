import type {Route} from './+types/($locale).about';
import {AboutPageSections} from '~/components/AboutUsPageSection';

export const meta: Route.MetaFunction = ({location}) => {
  const ORIGIN = 'https://shopfireup.com';

  // locale-safe canonical (whatever the actual URL is)
  const pathname = location?.pathname ?? '/about';
  const canonicalUrl = `${ORIGIN}${pathname}`;

  const title = 'About Fire Up | Zero Sugar Energy + 31g Protein';
  const description =
    'Fire Up is built for performance: zero sugar energy with 31g of protein. Learn our story, mission, and what makes Fire Up different.';

  // ✅ reuse one shared OG image
  const ogImage = `${ORIGIN}/og/home.png`;

  return [
    {title},
    {name: 'description', content: description},
    {rel: 'canonical', href: canonicalUrl},
    {name: 'robots', content: 'index,follow'},

    // Open Graph
    {property: 'og:type', content: 'website'},
    {property: 'og:site_name', content: 'Fire Up'},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:url', content: canonicalUrl},
    {property: 'og:image', content: ogImage},
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

export default function AboutRoute() {
  return (
    <div className="bg-black text-white min-h-screen">
      <AboutPageSections />
    </div>
  );
}
