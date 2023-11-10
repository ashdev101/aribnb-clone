import Image from 'next/image'
import React from 'react'
import Logoimg from '/public/Images/logo.png'
import Link from 'next/link'

type Props = {}

function Logo({}: Props) {
  return (
    <Link href={"/"}>
    <Image 
    alt='logo'
    src={Logoimg}
    className="hidden md:block cursor-pointer w-[75px] h-[30px]"
    />
    </Link>
  )
}

export default Logo