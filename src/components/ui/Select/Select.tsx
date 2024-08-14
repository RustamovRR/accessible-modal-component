import { CheckIcon, ChevronDownIcon, CloseSmallIcon, SearchIcon } from '@/assets/icons'
import { cn, parseValue } from '@/utils'
import React, { FC, forwardRef, useEffect, useRef, useState } from 'react'

export interface OptionType {
  icon?: JSX.Element
  img?: string
  label: string
  smallLabel?: string
  value: string | number
}

interface SelectProps {
  options: OptionType[]
  isMulti?: boolean
  isSearchable?: boolean
  placeholder?: string
  value: string
  error?: string
  tabIndex?: number
  onChange: (value: string) => void
}

const Select: FC<SelectProps> = forwardRef(
  ({ options, isSearchable, isMulti, placeholder, value, error, onChange, tabIndex }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    const toggleSelect = () => setIsOpen(!isOpen)

    const handleSelect = (option: OptionType) => {
      contentRef.current?.focus()
      if (isMulti) {
        const currentValue = parseValue(value)
        const newValue = currentValue.includes(option.value.toString())
          ? currentValue.filter((v) => v !== option.value.toString())
          : [...currentValue, option.value.toString()]
        onChange(JSON.stringify(newValue))
      } else {
        onChange(option.value.toString())
        setIsOpen(false)
      }
    }

    const handleRemove = (optionValue: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation()
      if (isMulti) {
        const currentValue = parseValue(value)
        const newValue = currentValue.filter((v) => v !== optionValue)
        onChange(JSON.stringify(newValue))
      }
    }

    const renderValue = () => {
      const parsedValue = parseValue(value)

      if (parsedValue.length === 0) {
        return <p className="text-gray-500 text-md">{placeholder}</p>
      }

      if (isMulti) {
        return parsedValue.map((optionValue) => {
          const option = options.find((o) => o.value.toString() === optionValue)
          if (!option) return null
          return (
            <div
              key={optionValue}
              className="flex items-center justify-between border h-6 px-1 gap-1.5 mx-0.5 !bg-white border-gray-300 rounded-sm"
            >
              <section className="flex items-center gap-1 overflow-hidden">
                {option.img && (
                  <img src={option.img} alt="" className="flex-shrink-0 w-4 h-4 rounded-full object-cover" />
                )}
                {option.icon && <svg className="flex-shrink-0">{option.icon}</svg>}
                <p className="text-sm whitespace-nowrap text-ellipsis overflow-hidden">{option.label.split(' ')[0]}</p>
              </section>
              <div className="cursor-pointer flex-shrink-0" onClick={(e) => handleRemove(optionValue, e)}>
                <CloseSmallIcon />
              </div>
            </div>
          )
        })
      }

      const option = options.find((o) => o.value.toString() === parsedValue[0])
      if (!option) return <p className="text-gray-500 text-md">{placeholder}</p>

      return (
        <div className="flex items-center">
          {option.img && <img src={option.img} alt="" className="w-6 h-6 mr-2 rounded-full" />}
          {option.icon}
          <h2 className="text-gray-900 text-md line-clamp-1">{option.label.split(' ')[0]}</h2>
          <p className="text-gray-600 text-md ml-2">{option.smallLabel}</p>
        </div>
      )
    }

    const isOptionSelected = (option: OptionType) => {
      const parsedValue = parseValue(value)
      return parsedValue.includes(option.value.toString())
    }

    return (
      <div
        ref={wrapperRef}
        className="relative"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="listbox-id"
        aria-labelledby="select-label"
      >
        <div
          ref={contentRef}
          tabIndex={tabIndex}
          role="combobox"
          aria-controls="select-options"
          aria-expanded={isOpen}
          aria-label={placeholder || 'Select an option'}
          className={cn(
            'min-h-[44px] w-full flex items-center border border-gray-300 rounded-md px-3 cursor-pointer shadow-xs focus-within:!border-brand-500 focus:ring-1 ring-brand-500 placeholder:text-gray-500 placeholder:text-md',
            {
              '!border-red-500 hover:!border-red-500 focus:!border-red-500': !!error,
            },
          )}
          onClick={toggleSelect}
        >
          {isSearchable && (
            <span className="mr-2 flex-shrink-0">
              <SearchIcon />
            </span>
          )}
          <div className="flex flex-wrap flex-grow gap-1">{renderValue()}</div>
          <span className="flex-shrink-0">
            <ChevronDownIcon />
          </span>
        </div>
        {isOpen && (
          <ul
            id="listbox-id"
            role="listbox"
            className="absolute z-10 w-full p-1.5 flex flex-col gap-0.5 bg-white border border-gray-300 mt-1 max-h-80 min-h-[44px] rounded-md overflow-auto"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={isOptionSelected(option)}
                className={`p-2 hover:bg-gray-50 flex items-center justify-between cursor-default rounded-md ${
                  isOptionSelected(option) ? 'bg-gray-50' : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                <div className="flex items-center w-full">
                  {option.img && <img src={option.img} alt="" className="w-6 h-6 mr-2 rounded-full" />}
                  {option.icon}
                  <div className="flex justify-between w-full max-w-[80%]">
                    <h2 className="whitespace-nowrap text-ellipsis overflow-hidden">{option.label.split(' ')[0]}</h2>
                    <p className="text-gray-600 text-md ml-2">{option.smallLabel}</p>
                  </div>
                </div>
                {isOptionSelected(option) && (
                  <div className="ml-auto flex-shrink-0">
                    <CheckIcon />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {!!error && <p className="absolute -bottom-4 text-xs text-red-500">{error}</p>}
      </div>
    )
  },
)

export default Select
