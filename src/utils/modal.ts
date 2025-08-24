import { RefObject } from "react";

export function closeModal(modalRef: RefObject<HTMLDialogElement | null>){
  if (modalRef?.current){
    modalRef.current.close();
  }
}

export function openModal(modalRef: RefObject<HTMLDialogElement | null>){
  if (modalRef?.current){
    modalRef.current.showModal();
  }
}