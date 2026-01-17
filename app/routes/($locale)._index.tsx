import type {Route} from './+types/($locale)._index';
import {HomePageSections} from '~/components/HomePageSections';

export const meta: Route.MetaFunction = () => [
  {title: 'Fire Up | Home'},
];

export default function Homepage() {
  const handleAddToCart = (quantity: number) => {
    console.log('Add to cart clicked with qty:', quantity);
  };

  const scrollToProduct = () => {
    const el = document.getElementById('product');
    if (!el) return;

    const headerOffset = 96; // adjust (px). try 80–120 depending on your navbar height
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const handleDiscoverMore = () => {
    if (typeof document !== 'undefined') {
      document.getElementById('about')?.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <div className="home bg-black text-white min-h-screen">
      <HomePageSections
        onAddToCart={handleAddToCart}
        scrollToProduct={scrollToProduct}
        onDiscoverMore={handleDiscoverMore}
      />
    </div>
  );
}