'use client'

import { OpenSearchModal } from '@/Feature/SearchModalSlice/SearchModalSlice'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { LuSettings2 } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import UserMenuOption from './UserMenuOption'
type Props = {}

function Search({ }: Props) {


    const [isopeN, setIsOpen] = useState(false)

    const dispatch = useDispatch()
    return (
        <main>

            <div className='  md:flex flex-row items-center justify-between shadow-sm rounded-full transition cursor-pointer' >
                <div className=' hidden md:block  text-sm font-semibold px-6' onClick={() => dispatch(OpenSearchModal())} >
                    AnyWhere
                </div>
                {/* how i wonder how border x gives horizontal border  */}
                <div className=' hidden md:block text-sm font-semibold px-6 border-x-[1px] text-center' onClick={() => dispatch(OpenSearchModal())}>
                    AnyWeek
                </div>
                <div className='hidden md:flex flex-row items-center pl-6 pe-2' onClick={() => dispatch(OpenSearchModal())}>
                    <div className=' text-sm text-gray-600 '>
                        Add Guest
                    </div>
                    <div className='ml-1 p-2 bg-rose-500 rounded-full text-white' onClick={() => dispatch(OpenSearchModal())}>
                        <BsSearch size={15} />
                    </div>
                </div>

                <div className=' h-[70px] p-4 md:hidden flex flex-row justify-between items-center w-screen '>
                    <div className='h-[55px] flex flex-row items-center justify-center w-[90%] border-[1px] rounded-full' onClick={() => dispatch(OpenSearchModal())} >
                        <div className='w-[10%] ml-3'>
                            <BsSearch size={20} />
                        </div>
                        <div className='w-[90%] flex flex-col items-start justify-around gap-1'>
                            <section className=' text-bold text-lg'>
                                Anywhere
                            </section>
                            <section className='flex flex-row gap-2'>
                                <span className=' text-sm'>Anyweek</span>
                                <span className=' text-sm'>Add guest</span>

                            </section>
                        </div>
                    </div>

                    <div className=' h-[55px] w-max  flex items-center justify-center relative '>

                        <div className=' h-max w-max rounded-full p-3 border-[1px]'>
                            {
                                isopeN &&

                                (
                                    <UserMenuOption
                                        isOpeN={isopeN}
                                        setIsOpeN={setIsOpen}
                                    />
                                )

                            }
                            <div onClick={() => setIsOpen(!isopeN)}><LuSettings2 size={20} /></div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Search