import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Input from '.'

describe('Input component', () => {
  afterEach(() => cleanup())

  it('should render input with correct placeholder', () => {
    render(<Input placeholder="Enter some value" />)
    expect(screen.getByPlaceholderText('Enter some value')).toBeInTheDocument()
  })

  it('should display error when the error prop is provided', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('should handle input change', async () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} value="title" />)
    const input = screen.getByDisplayValue('title')
    userEvent.type(input, 'Main title')

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(10)
    })
  })
})
