import * as React from 'react';
import clsx from 'clsx';
import {twMerge} from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, ...props}, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // IMPORTANT: no fixed width here
          'flex h-10 w-full rounded-md border px-3 py-2 text-sm',
          'bg-transparent text-inherit',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // makes sure nothing caps it
          'max-w-none',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';