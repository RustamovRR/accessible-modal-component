import { cn } from '@/utils'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  addonBefore?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, addonBefore, ...props }, ref) => {
  const errorId = props.id ? `${props.id}-error` : undefined

  return (
    <div className="relative flex">
      {addonBefore && (
        <div
          className={cn(
            'flex items-center pointer-events-none rounded-l-md border border-gray-300 border-r-0 px-[13px] text-md text-gray-600',
            {
              '!border-red-500 hover:!border-red-500 focus:!border-red-500': !!error,
            },
          )}
        >
          {addonBefore}
        </div>
      )}
      <input
        {...props}
        ref={ref}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'w-full h-11 border border-gray-300 px-3.5 rounded-md focus:ring-1 ring-brand-500 shadow-xs focus:outline-none placeholder:text-gray-500 placeholder:text-md',
          {
            '!border-red-500 hover:!border-red-500 focus:!border-red-500': !!error,
            'rounded-l-none': !!addonBefore,
          },
          className,
        )}
      />
      {!!error && (
        <p id={errorId} className="absolute -bottom-4 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
})

export default Input
