// app/components/Aside.tsx
import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {createPortal} from 'react-dom';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

const AsideContext = createContext<AsideContextValue | null>(null);

export function Aside({
  children,
  heading,
  type,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [expanded, close]);

  if (!expanded) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483647,
        display: 'block',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          right: 16,
          top: 16,
          bottom: 16,
          borderRadius: 16,
          width: 'min(420px, calc(100vw - 32px))',
          background: '#111827',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.12)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
            fontWeight: 600,
          }}
        >
          <div>{heading}</div>
          <button
            type="button"
            onClick={close}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.75)',
              fontSize: 20,
              cursor: 'pointer',
              lineHeight: 1,
            }}
            aria-label="Close panel"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{flex: 1, overflow: 'auto'}}>{children}</div>
      </aside>
    </div>,
    document.body,
  );
}

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  const value = useMemo(
    () => ({
      type,
      open: setType,
      close: () => setType('closed'),
    }),
    [type],
  );

  return <AsideContext.Provider value={value}>{children}</AsideContext.Provider>;
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) throw new Error('useAside must be used within an Aside.Provider');
  return aside;
}