import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Textarea from '.'

describe('Textarea component', () => {
  afterEach(() => cleanup())

  it('should render textarea with correct placeholder', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('should handle textare change', async () => {
    const handleChange = vi.fn()
    render(<Textarea onChange={handleChange} />)
    const textarea = screen.getByRole('textbox')
    userEvent.type(textarea, 'Hello')

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(5)
    })
  })
})
