import { BackgroundPatternIcon, CloseModalIcon, FlagIcon } from '@/assets/icons'
import { cn } from '@/utils'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  title?: string
  titleSecondary?: string
  open: boolean
  children: ReactNode
  onClose: () => void
  containerClassName?: string
}

const Modal: FC<ModalProps> = ({ open, title, titleSecondary, children, onClose, containerClassName }) => {
  const modalRoot = document.getElementById('modal-root')
  const modalRef = useRef<HTMLDivElement>(null)
  const lastFocusedElement = useRef<HTMLElement | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (open) {
      setIsClosing(false)
      lastFocusedElement.current = document.activeElement as HTMLElement
      modalRef.current?.focus()
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose()
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        lastFocusedElement.current?.focus()
      }
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open && isClosing) {
      const timer = setTimeout(() => {
        setIsClosing(false)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [open, isClosing])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleFocusTrap = (event: KeyboardEvent) => {
    if (!modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }
  }

  useEffect(() => {
    if (open) {
      modalRef.current?.addEventListener('keydown', handleFocusTrap)
    }
    return () => {
      modalRef.current?.removeEventListener('keydown', handleFocusTrap)
    }
  }, [open])

  if (!modalRoot || (!open && !isClosing)) return null

  return createPortal(
    <div
      className={`fixed top-0 left-0 z-10 flex justify-center w-full h-full overflow-y-auto bg-gray-600 transition-opacity duration-300 ease-in-out ${
        open && !isClosing ? 'opacity-100' : 'opacity-0'
      }`}
      ref={modalRef}
      tabIndex={-1}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className={cn(
          'relative w-lg p6 flex flex-col m-auto self-center justify-between bg-white rounded-xl transition-all duration-300 ease-in-out',
          containerClassName,
          open && !isClosing ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute bg-red-20 top-0 left-0 max-sm:hidden">
          <BackgroundPatternIcon />
        </div>
        <header className="mt-6 px-6 w-full flex justify-between max-sm:px-4 max-sm:mt-4">
          <div className="">
            <div className="flex items-center justify-center w-11 h-11 max-sm:hidden">
              <FlagIcon />
            </div>
            <div className="sticky">
              <h3 id="modal-title" className="text-lg text-gray-900 dark:text-gray-dark-50">
                {title}
              </h3>
              <h6 id="modal-description" className="text-sm text-gray-600 dark:text-gray-dark-400">
                {titleSecondary}
              </h6>
            </div>
          </div>
          <div>
            <button onClick={handleClose} className="flex items-center justify-center w-11 h-11" aria-label="Close">
              <CloseModalIcon />
            </button>
          </div>
        </header>

        <main className="p-6 overflow-y-auto max-sm:p-4">{children}</main>
      </div>
    </div>,
    modalRoot,
  )
}

export default Modal
