import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  Await,
} from 'react-router';
import type {Route} from './+types/root';
import faviconPng from '~/assets/fireup-logo.png';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import tailwindCss from './styles/tailwind.css?url';
import {Suspense} from 'react';
import {PageLayout} from './components/PageLayout';

// ✅ ADD THESE
import {Aside} from '~/components/Aside';
// If your cart drawer component is different, change this import:
import {CartDrawerHydrogen} from '~/components/CartDrawerHydrogen';

export type RootLoader = typeof loader;
export const meta: Route.MetaFunction = () => {
  const siteName = 'Fire Up Energy Drink';
  const description =
    'Zero-sugar energy drink with 31g protein. Clean energy, great taste, built for performance.';

  return [
    {title: siteName},
    {name: 'description', content: description},
    {name: 'robots', content: 'index,follow'},
    {name: 'theme-color', content: '#000000'},

    // Social defaults (routes can override)
    {property: 'og:site_name', content: siteName},
    {property: 'og:type', content: 'website'},
    {property: 'og:title', content: siteName},
    {property: 'og:description', content: description},
    {name: 'twitter:card', content: 'summary_large_image'},
  ];
};

export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  if (formMethod && formMethod !== 'GET') return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return false;
};

export function links() {
  return [
    {rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {rel: 'preconnect', href: 'https://shop.app'},
    {rel: 'icon', type: 'image/png', href: faviconPng},
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;
  const checkoutDomain = env.PUBLIC_CHECKOUT_DOMAIN.replace(/^https?:\/\//, '');
  const publicStoreDomain = env.PUBLIC_STORE_DOMAIN.replace(/^https?:\/\//, '');
  let shop = null;

  try {
    shop = await getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }).catch((error: Error) => {
      console.error(error);
      return null;
    });
  } catch (error) {
    console.error(error);
  }

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain,
    shop,
    consent: {
      checkoutDomain,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

async function loadCriticalData({context}: Route.LoaderArgs) {
  const {storefront} = context;

  const header = await storefront
    .query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {headerMenuHandle: 'main-menu'},
    })
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {header};
}

function loadDeferredData({context}: Route.LoaderArgs) {
  const {storefront, customerAccount, cart} = context;

  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {footerMenuHandle: 'footer'},
    })
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {
    cart: cart.get().catch((error: Error) => {
      console.error(error);
      return null;
    }),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={tailwindCss} />
        <link rel="stylesheet" href={resetStyles} />
        <link rel="stylesheet" href={appStyles} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData<RootLoader>('root');

  if (!data) return <Outlet />;

  return (
    <Analytics.Provider
      cart={data.cart}
      shop={data.shop}
      consent={data.consent}
    >
      {/* ✅ use Aside.Provider */}
      <Aside.Provider>
        <PageLayout {...data}>
          <Outlet />
        </PageLayout>

        <Aside type="cart" heading="Cart">
          <Suspense fallback={null}>
            <Await resolve={data.cart}>
              {(cart) => <CartDrawerHydrogen cart={cart} />}
            </Await>
          </Suspense>
        </Aside>
      </Aside.Provider>
    </Analytics.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}
