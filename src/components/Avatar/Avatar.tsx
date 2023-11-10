import Image from 'next/image'
import React from 'react'
import Avatarimg from '/public/Images/placeholder.jpg'
type Props = {}

function Avatar({}: Props) {
  return (
    <Image
    alt='Avatar'
    src={Avatarimg}
    className='h-[25px] w-[25px] rounded-full'
    />
  )
}

export default Avatar