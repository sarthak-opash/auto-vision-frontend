import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-b from-[#6d1b7e] to-[#60176F] text-white shadow-[0_12px_26px_rgba(96,23,111,0.28)] hover:scale-[1.01] hover:from-[#742085] hover:to-[#611970] active:scale-[0.99]',
        secondary:
          'glass-surface text-[#111111] shadow-[0_10px_22px_rgba(17,17,17,0.07)] hover:bg-white',
        outline:
          'border border-[#60176F]/22 bg-white/70 text-[#60176F] backdrop-blur-xl hover:bg-[#60176F]/5 hover:border-[#60176F]/30',
        ghost: 'bg-transparent text-[#4B4B4B] hover:bg-white/65 hover:text-[#111111]',
        danger:
          'bg-gradient-to-b from-[#ef5b72] to-[#e3445f] text-white shadow-[0_10px_24px_rgba(227,68,95,0.24)] hover:scale-[1.01]',
      },
      size: {
        default: 'h-11 px-5',
        lg: 'h-12 px-7 text-base',
        xl: 'h-14 px-9 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
}
