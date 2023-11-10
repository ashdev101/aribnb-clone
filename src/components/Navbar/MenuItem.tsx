'use client'
import React from 'react'

type Props = {
  onClick: () => void
  label: String
  isVisible: boolean
}

function MenuItem({ onClick, label, isVisible }: Props) {

  return (
    <>
      {isVisible &&
        (<div onClick={onClick}
          className=' px-4 py-3 bg-neutral-100 transition font-semibold cursor-pointer relative z-40'
        >
          {label}
        </div>)
      }
    </>
  )
}

export default MenuItem