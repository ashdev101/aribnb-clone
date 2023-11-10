'use client'
import Image, { ImageProps, StaticImageData } from 'next/image'
import { useSearchParams ,useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IconType } from 'react-icons'

type Props = {
    index: number
    icon: StaticImageData
    label: string

}

function CategoryBox({ index, icon: Icon, label }: Props) {
    const [selected, setSelected] = useState(false)
    const urlparams = useSearchParams()
    const params = new URLSearchParams(urlparams)
    const router = useRouter()
    const setCurrentCategory = () => {

        // console.log(urlparams)
        if (params.get("category") === label) {
            setSelected(false)
            params.delete("category")

        } else {
            setSelected(true)
            params.append("category", label)
        }

        const qs = params.toString()
        router.push(`/?${qs}`)

    }

    return (
        <div key={index} className=' flex flex-col item-center gap-1 min-w-max justify-center p-2 mx-4 cursor-pointer' onClick={e => setCurrentCategory()}>
            <Image src={Icon} alt='catImg' width={24} height={24} className=' self-center' />
            <div className = {`text-[12px] border-b-2 ${selected ? "border-neutral-500" : "border-b-transparent"}`} >
                {label}
            </div>
        </div>
    )
}

export default CategoryBox