'use client'
import React, { ReactElement } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { GrClose } from 'react-icons/gr'


type Props = {
  title: string
  body: ReactElement
  fotter?: ReactElement
  isOpen: boolean
  onClose: () => void



}

export default function BaseModal({ title, body, isOpen, onClose, fotter }: Props) {

  // console.log(isOpen)

  // const isOpen = true
  return (
    <>

      <Modal isOpen={isOpen}
        hideCloseButton

      >
        <ModalContent>
          <ModalHeader className="flex flex-row gap-1 justify-center relative z-50">
            <div className=" absolute left-3 top-4 cursor-pointer" onClick={onClose}>
              <GrClose size={18} />
            </div >
            {title}
          </ModalHeader>
          <ModalBody className=" text-center text-lg ">

            {body}
          </ModalBody>

          <hr />
          <ModalFooter className=" flex flex-col w-full">

          </ModalFooter >
          {fotter}

        </ModalContent>
      </Modal>
    </>
  );
}
