import * as React from 'react';
import clsx from 'clsx';
import {twMerge} from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          // IMPORTANT: no fixed width here
          'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm',
          'bg-transparent text-inherit',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'max-w-none',
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';