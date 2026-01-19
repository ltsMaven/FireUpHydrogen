import {CartForm, Money} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {X, Trash2, Plus, Minus, ShoppingBag} from 'lucide-react';
import {Button} from '~/ui/button';
import {Badge} from '~/ui/badge';
import {useAside} from '~/components/Aside';

type VariantLike = {
  product?: {title?: string | null} | null;
  title?: string | null;
  image?: {url?: string | null; altText?: string | null} | null;
  price?: {amount: string; currencyCode: string} | null;
};

function isVariantLike(m: unknown): m is VariantLike {
  return !!m && typeof m === 'object' && ('product' in m || 'price' in m || 'image' in m);
}

export function CartDrawerHydrogen({cart}: {cart: CartApiQueryFragment | null}) {
  const {close} = useAside();

  const lines = cart?.lines?.nodes ?? [];
  const itemCount = lines.reduce((sum, l) => sum + (l?.quantity ?? 0), 0);

  const subtotal = cart?.cost?.subtotalAmount ?? null;
  const total = cart?.cost?.totalAmount ?? null;

  const checkoutUrl = (cart as any)?.checkoutUrl as string | undefined;

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-orange-400" />
          <h2 className="text-white text-xl">Your Cart</h2>
          {itemCount > 0 && <Badge className="bg-orange-500">{itemCount}</Badge>}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={close}
          className="text-white hover:bg-white/10"
          aria-label="Close cart"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-6">
        {lines.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-white mb-2">Your cart is empty</h3>
            <p className="text-gray-400 mb-6">Add some Fire Up to ignite your day!</p>
            <Button
              onClick={close}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {lines.map((line) => {
              const m = line?.merchandise;
              const v = isVariantLike(m) ? m : null;

              const productTitle = v?.product?.title ?? 'Product';
              const variantTitle = v?.title ?? null;
              const imageUrl = v?.image?.url ?? null;
              const imageAlt = v?.image?.altText ?? productTitle;
              const price = v?.price ?? null;

              return (
                <div
                  key={line.id}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex gap-4">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={imageAlt ?? ''}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded bg-white/5 border border-white/10" />
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white mb-1 truncate">{productTitle}</h3>
                      {variantTitle ? (
                        <p className="text-xs text-gray-400 mb-2 truncate">{variantTitle}</p>
                      ) : null}

                      <div className="text-orange-400 mb-2">
                        {price ? <Money data={price} /> : null}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-white/20 rounded overflow-hidden">
                          {/* - */}
                          <CartForm
                            route="/cart"
                            action={CartForm.ACTIONS.LinesUpdate}
                            inputs={{
                              lines: [{id: line.id, quantity: Math.max(0, line.quantity - 1)}],
                            }}
                          >
                            <button
                              type="submit"
                              className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          </CartForm>

                          <span className="px-3 text-white text-sm">{line.quantity}</span>

                          {/* + */}
                          <CartForm
                            route="/cart"
                            action={CartForm.ACTIONS.LinesUpdate}
                            inputs={{
                              lines: [{id: line.id, quantity: line.quantity + 1}],
                            }}
                          >
                            <button
                              type="submit"
                              className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </CartForm>
                        </div>

                        {/* Remove */}
                        <CartForm
                          route="/cart"
                          action={CartForm.ACTIONS.LinesRemove}
                          inputs={{lineIds: [line.id]}}
                        >
                          <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </CartForm>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {lines.length > 0 && (
        <div className="border-t border-white/10 p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>{subtotal ? <Money data={subtotal} /> : '-'}</span>
            </div>

            <div className="flex justify-between text-white pt-2 border-t border-white/10">
              <span>Total</span>
              <span>{total ? <Money data={total} /> : '-'}</span>
            </div>
          </div>

          {checkoutUrl ? (
            <a href={checkoutUrl} onClick={close} className="block">
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                size="lg"
              >
                Checkout
              </Button>
            </a>
          ) : (
            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              size="lg"
              disabled
              title="checkoutUrl not present in cart query"
            >
              Checkout
            </Button>
          )}
        </div>
      )}
    </div>
  );
}