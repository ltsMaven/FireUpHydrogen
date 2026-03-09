import type {Route} from './+types/($locale).contact';
import {ContactPage} from '~/components/ContactPage';

export const meta: Route.MetaFunction = ({location}) => {
  const ORIGIN = 'https://shopfireup.com';

  const pathname = location?.pathname ?? '/contact';
  const canonical = `${ORIGIN}${pathname}`;

  const title = 'Contact Fire Up | Support, Wholesale & Partnerships';
  const description =
    'Get in touch with Fire Up. Questions, wholesale orders, or partnerships — we’ll respond within 24 hours.';

  // ✅ reuse one shared OG image everywhere
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

export default function ContactRoute() {
  return <ContactPage />;
}
