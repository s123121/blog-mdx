import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  asChild?: boolean
}

function mergeClassName(a?: string, b?: string) {
  return [a, b].filter(Boolean).join(' ')
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild = false, children, ...props }, ref) => {
    const base = cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50',
      variant === 'default' && 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200',
      variant === 'outline' && 'border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800',
      variant === 'ghost' && 'hover:bg-slate-100 dark:hover:bg-slate-800',
      size === 'sm' && 'h-8 px-3',
      size === 'md' && 'h-9 px-4',
      size === 'lg' && 'h-10 px-6',
      size === 'icon' && 'h-9 w-9',
      className
    )

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as any, {
        className: mergeClassName((children as any).props?.className, base),
        ref,
        ...props,
      })
    }

    return (
      <button ref={ref} className={base} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
