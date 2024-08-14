import { SaveIcon } from '@/assets/icons'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Button from '.'

describe('Button component', () => {
  afterEach(() => cleanup())

  it('should render the button with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('should have an icon', () => {
    render(<Button icon={<SaveIcon />}>Button with icon</Button>)
    const button = screen.getByRole('button', { name: 'Button with icon' })

    expect(button).toBeInTheDocument()
    const icon = button.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('should apply the correct class for default type', () => {
    render(<Button buttonType="default">Default Button</Button>)
    const button = screen.getByText('Default Button')

    expect(button).toHaveClass('bg-white hover:bg-gray-100')
  })

  it('should apply the correct class for primary type', () => {
    render(<Button buttonType="primary">Secondary Button</Button>)
    const button = screen.getByText('Secondary Button')

    expect(button).toHaveClass('bg-brand-600 hover:bg-brand-700')
  })

  it('should apply the disabled class when disabled', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByText('Disabled Button')

    expect(button).toHaveClass('opacity-40 cursor-not-allowed')
  })

  it('should handle click event', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    const button = screen.getByText('Click Me')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
