'use client'
import React from 'react'
import BaseModal from './BaseModel'

type Props = {}
const body =
 <>
    Hellow
</>
function RentModel({}: Props) {
  return (
    <BaseModal
    title={"Air bnb your home "}
    body={body}
    isOpen={true}
    onClose={()=>{}}
    />
  )
}

export default RentModel