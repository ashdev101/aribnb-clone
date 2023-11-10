'use client'
import React, { Component, ReactElement } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { category } from "../Navbar/Categories";
import Image from "next/image";

type Props = {
    footer : ReactElement
    body  : ReactElement
    title  : string 
    isOpen : boolean ,
    onClose : ()=>void
}

function BaseModalForForm({
    title ,
    body ,
    footer ,
    isOpen ,
    onClose
    
 }: Props) {
    

    return (
        <>
            
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior={"inside"}
            >
                <ModalContent className=" overflow-hidden">
                    
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {title}
                            </ModalHeader>
                            <ModalBody >
                                {body}
                            </ModalBody>
                            <ModalFooter>
                                {footer}
                            </ModalFooter>
                        </>
                    
                </ModalContent>
            </Modal>
        </>
    )
}

export default BaseModalForForm