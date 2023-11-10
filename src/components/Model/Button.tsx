'use client'
import React from 'react'
import { IconType } from "react-icons";

type Props = {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

function Button({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
}: Props) {
    return (
        <button
            // what to do when button is disabled hmm nice 
            className={` text-center relative disabled:opacity-70 rounded-lg hover:opacity-80 w-full ${outline ? "bg-white" : "bg-rose-500"} ${outline ? "border-black" : "border-rose-500"} ${outline ? "text-black" : "text-white"} ${small ? "py-1" : "py-3"} ${small ? "font-light" : "font-semibold"} ${small ? "border-[1px]" : "border-2"}`}
        >
            {
                Icon && (
                    <Icon
                        size={25}
                        className=' absolute left-3 '
                    />
                )
            }
            {label}
        </button>
    )
}

export default Button