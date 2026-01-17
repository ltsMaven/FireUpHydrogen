import type {Route} from './+types/($locale).about';
import {AboutPageSections} from '~/components/AboutUsPageSection';

export const meta: Route.MetaFunction = () => [
  {title: 'Fire Up | About'},
];

export default function AboutRoute() {
  return (
    <div className="bg-black text-white min-h-screen">
      <AboutPageSections />
    </div>
  );
}