import { cn } from '@/utils'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

type ButtonType = 'default' | 'primary'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: ButtonType
  icon?: ReactNode
  ariaLabel?: string
}

const Button: FC<Props> = ({ children, type = 'button', buttonType = 'default', icon, className, ...props }) => {
  const classNames = cn(
    'w-full h-11 flex items-center justify-center p-3.5 rounded-md font-semibold transition',
    {
      'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100': buttonType === 'default',
      'bg-brand-600 text-white hover:bg-brand-700': buttonType === 'primary',
      'opacity-40 cursor-not-allowed': props.disabled,
    },
    className,
  )

  return (
    <button {...props} type={type} className={classNames}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
