import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Modal from './Modal'

describe('Modal Component', () => {
  const modalRootId = 'modal-root'
  beforeEach(() => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', modalRootId)
    document.body.appendChild(modalRoot)
  })

  afterEach(() => {
    const modalRoot = document.getElementById(modalRootId)
    if (modalRoot) {
      document.body.removeChild(modalRoot)
    }
  })

  it('should render and display content when open', () => {
    render(
      <Modal open={true} onClose={() => {}} title="Test Modal">
        Hello, Modal!
      </Modal>,
    )
    expect(screen.getByText('Hello, Modal!')).toBeInTheDocument()
  })

  it('closes when escape key is pressed', () => {
    const handleClose = vi.fn()
    render(
      <Modal open={true} onClose={handleClose} title="Test Modal">
        Hello, Modal!
      </Modal>,
    )

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('should not render when open is false', () => {
    render(
      <Modal open={false} onClose={() => {}} title="Test Modal">
        Hello, Modal!
      </Modal>,
    )
    expect(screen.queryByText('Hello, Modal!')).not.toBeInTheDocument()
  })
})
