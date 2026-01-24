import type {Route} from './+types/($locale).terms';
import TermsAndConditionsPageSection from '~/components/TermsAndConditionPageSection';

export const meta: Route.MetaFunction = () => [
  {title: 'Fire Up | Terms & Conditions'},
];

export default function TermsRoute() {
  return (
    <div className="bg-black text-white min-h-screen">
      <TermsAndConditionsPageSection />
    </div>
  );
}
