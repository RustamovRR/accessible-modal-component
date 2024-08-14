import { cn } from '@/utils'
import { forwardRef, TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className={cn(
        'w-full border border-gray-300 p-3.5 rounded-md focus:ring-1 ring-brand-500 focus:outline-none focus:border-gray-500 placeholder:text-gray-500 placeholder:text-md',
        className,
      )}
    />
  )
})

export default Textarea
