import * as React from 'react';
import { cn } from './utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

/**
 * Simple Avatar component – no Radix, no Node globals.
 */
export function Avatar({ src, alt, className, children, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 overflow-hidden',
        className,
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        children
      )}
    </div>
  );
}

/**
 * Optional fallback, if you want initials, etc.
 */
export function AvatarFallback({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'flex h-full w-full items-center justify-center text-sm font-medium text-white',
        className,
      )}
      {...props}
    />
  );
}