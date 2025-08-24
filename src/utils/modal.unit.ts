/* eslint-disable @typescript-eslint/unbound-method */
import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { openModal, closeModal } from './modal'
import { RefObject } from 'react'

describe('Modal utility functions', () => {
  let mockModalRef: RefObject<HTMLDialogElement>
  let mockDialogElement: HTMLDialogElement

  beforeEach(() => {
    // Create a mock dialog element
    mockDialogElement = {
      showModal: jest.fn(),
      close: jest.fn(),
    } as unknown as HTMLDialogElement

    // Create a mock ref object
    mockModalRef = {
      current: mockDialogElement,
    }
  })

  describe('openModal', () => {
    it('should call showModal when modal ref exists', () => {
      openModal(mockModalRef)

      expect(mockDialogElement.showModal).toHaveBeenCalledTimes(1)
    })

    it('should not call showModal when modal ref is null', () => {
      const nullRef: RefObject<HTMLDialogElement | null> = { current: null }
      
      openModal(nullRef as RefObject<HTMLDialogElement>)

      expect(mockDialogElement.showModal).not.toHaveBeenCalled()
    })

    it('should not call showModal when modal ref is undefined', () => {
      const undefinedRef: RefObject<HTMLDialogElement | undefined> = { current: undefined }
      
      openModal(undefinedRef as RefObject<HTMLDialogElement>)

      expect(mockDialogElement.showModal).not.toHaveBeenCalled()
    })

    it('should handle modal ref with current property', () => {
      const refWithCurrent: RefObject<HTMLDialogElement> = {
        current: mockDialogElement
      }
      
      openModal(refWithCurrent)

      expect(mockDialogElement.showModal).toHaveBeenCalledTimes(1)
    })
  })

  describe('closeModal', () => {
    it('should call close when modal ref exists', () => {
      closeModal(mockModalRef)

      expect(mockDialogElement.close).toHaveBeenCalledTimes(1)
    })

    it('should not call close when modal ref is null', () => {
      const nullRef: RefObject<HTMLDialogElement | null> = { current: null }
      
      closeModal(nullRef as RefObject<HTMLDialogElement>)

      expect(mockDialogElement.close).not.toHaveBeenCalled()
    })

    it('should not call close when modal ref is undefined', () => {
      const undefinedRef: RefObject<HTMLDialogElement | undefined> = { current: undefined }
      
      closeModal(undefinedRef as RefObject<HTMLDialogElement>)

      expect(mockDialogElement.close).not.toHaveBeenCalled()
    })

    it('should handle modal ref with current property', () => {
      const refWithCurrent: RefObject<HTMLDialogElement> = {
        current: mockDialogElement
      }
      
      closeModal(refWithCurrent)

      expect(mockDialogElement.close).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge cases', () => {
    it('should handle multiple calls to openModal', () => {
      openModal(mockModalRef)
      openModal(mockModalRef)
      openModal(mockModalRef)

      expect(mockDialogElement.showModal).toHaveBeenCalledTimes(3)
    })

    it('should handle multiple calls to closeModal', () => {
      closeModal(mockModalRef)
      closeModal(mockModalRef)
      closeModal(mockModalRef)

      expect(mockDialogElement.close).toHaveBeenCalledTimes(3)
    })

    it('should handle alternating open and close calls', () => {
      openModal(mockModalRef)
      closeModal(mockModalRef)
      openModal(mockModalRef)
      closeModal(mockModalRef)

      expect(mockDialogElement.showModal).toHaveBeenCalledTimes(2)
      expect(mockDialogElement.close).toHaveBeenCalledTimes(2)
    })

    it('should handle ref object without current property', () => {
      const refWithoutCurrent = {} as RefObject<HTMLDialogElement>
      
      expect(() => openModal(refWithoutCurrent)).not.toThrow()
      expect(() => closeModal(refWithoutCurrent)).not.toThrow()
    })
  })
})
