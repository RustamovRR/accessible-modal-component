import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const parseValue = (val: string): string[] => {
  try {
    return JSON.parse(val)
  } catch {
    return val ? [val] : []
  }
}
