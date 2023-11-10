'use client'

import React, { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import Avatar from '../Avatar/Avatar'

import { useSession, signIn, signOut } from "next-auth/react"


import { useDispatch } from 'react-redux'
import { OpenAirBnbMyHomeModal } from '@/Feature/AirBnbMyHome/AirbnbMyHomeSlice'
import { useRouter } from 'next/navigation'
import UserMenuOption from './UserMenuOption'

type Props = {}

function UserMenu({ }: Props) {
    const router = useRouter()
    
    const dispatch = useDispatch()
    const [isOpeN, setIsOpeN] = useState(false)
    const toggleOpen = () => {
        setIsOpeN(!isOpeN)
    }



    return (
        <main className='relative'>
            <div
                className=' hidden md:flex flex-row justify-center items-center gap-2 text-sm font-semibold p-3 rounded-full hover:bg-neutral-100 transition cursor-pointer'

            >
                <span onClick={() => dispatch(OpenAirBnbMyHomeModal())}>Airbnb Your Home</span>

                <div className=' border-[1px] px-2 py-1 rounded-full flex flex-row items-center justify-between' onClick={e => toggleOpen()}>
                    <RxHamburgerMenu size={18} />
                    <Avatar />
                </div>

            </div>

            {
                isOpeN && (
                    <UserMenuOption
                        isOpeN={isOpeN}
                        setIsOpeN={setIsOpeN}
                    />
                )
            }

        </main>
    )
}

export default UserMenu