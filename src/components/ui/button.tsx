import type * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 aria-invalid:!ring-error/80",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/40 focus-visible:bg-primary/95',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40 focus-visible:bg-destructive/95 dark:bg-destructive/80',
        outline:
          'bg-background/50 border border-border/60 hover:bg-background/80 hover:border-border/80 focus-visible:ring-ring/40 focus-visible:bg-background/90 backdrop-blur-sm',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary/50 focus-visible:bg-secondary/90',
        ghost:
          'bg-transparent hover:bg-accent/20 focus-visible:ring-accent/40 focus-visible:bg-accent/30 hover:backdrop-blur-sm',
        link: 'text-primary underline-offset-4 hover:underline bg-transparent focus-visible:ring-primary/40',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 rounded-lg px-6 has-[>svg]:px-4',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
